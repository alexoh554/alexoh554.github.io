---
layout: post
title: Winning 2nd at the Trend Micro Hackathon
tags: [Project, Systems Design, Hackathon]
---
During my internship at Trend Micro, I created a fully-integrated Slackbot to automate company raffles and showcased it to the company. This was a great project to learn about AWS architecture, serverless computing, and API integration.

## Motivation
Trend Micro hosts tri-annual "Hack Days", days where developers are encouraged to work on and share a project. Ideas can be anything - some make useful tools for productivity, while others may work on technical debt or workflow optimizations. This was one of the great showcases of Trend Micro's continuous learning work culture and how it benefits everyone. Developers like myself can learn new skills and the company can also benefit greatly from some of these projects (one team worked on migrating a huge repository to a newer version of a programming language).

One of the perks of working at Trend Micro is the Ottawa Senators ticket raffles. For every game, employees can email an HR organizer to be entered in a draw. Near the day of the game, winners are notified via email or teams. 

Someone on my hackathon team had the great idea of simplifying this tedious email process and making it easier for the HR team to manage entrants. We thought a Slack bot would be a fun and interactive way for employees to participate in the frequent raffles. Because of this, we created Cyber SweepStakes.

<div style="text-align: center;">
  <img src="/attachments/2024-12-19-attachments/titleimg.png" alt="newraffle">
</div>

## Design Decisions
Using the Slack API to create a Slack bot is fairly straightforward. You can obtain a Webhook URL as an endpoint to send messages (via HTTP POST requests) to a channel in your workspace. Setting up slash commands is also easy - you need to provide the endpoint of your app/function that Slack will send requests to.

Our main (and most time-consuming) design decision for this project was deciding how to host our backend architecture. I'll highlight some of the options we considered below:

### Heroku Web Application
We initially saw another group using Heroku for their Slackbot and considered the pros and cons.

**Pros**
- Easy to set up and manage different endpoints for different functionality
- Easy to integrate third party add-ons such as databases

**Cons**
- The other group used their personal money to host this site 
- Trend Micro is a cybersecurity company, so hosting the architecture of our app on Heroku seemed a little counterintuitive 

### Ngrok
A co-worker suggested Ngrok, a way to host the backend on our local machine. We never used Ngrok before, so we had to do some research.

**Pros**
- Free
- Easily develop and test changes

**Cons**
- Not sustainable long term for the HR team to use (since someone would have to be hosting it on their device)

### AWS

**Pros**
- Use the company's account and security rules
- Easily integrate a variety of services such as databases, computing, and queues
- Sustainable (until someone shuts down the service)

**Cons**
- Could be costly if not implemented properly

Using AWS was the obvious choice. We chose Lambda over EC2 since our bot is event-driven, requiring computation only when invoked.

## Architecture
Our backend infrastructure consists of 3 main AWS services: API gateway, Lambda, and DynamoDB.

The API Gateway is our endpoint that connects our services to the Slack API. All of our computation is handled on Lambdas and processed data is stored in DynamoDB.

### /createraffle 
The `/createraffle` slash command is the the first input for a user looking to initiate a raffle. The workflow is seen below. Slack sends a request which ends up at our CreateRaffle Lambda, which identifies the request as a slash command and responds with a JSON payload. Slack processes the JSON and opens a dialogue box for the user. The dialogue box is a form that the user can enter key details about their raffle event (Event name, date, entry deadline).

![createraffle](/attachments/2024-12-19-attachments/createraffle.png)

Once the user submits the form, a JSON payload is sent and receieved at the CreateRaffle Lambda. This payload includes the event details submitted by the user. We parse this data and create a new "event" stored in our events table (DynamoDB). Event data includes:
```
{
    "eventName": "Name of the event",
    "eventDate": "Date of the event",
    "eventDeadline": "Raffle entry deadline",
    "eventOwner": "Slack user ID of the raffle creator",
    "eventId": "UUID for event",
    "eventParticipants": [] // Initially empty
}
```
Note, at this point, the `eventParticipants` field will be empty, since noone has officially entered the raffle. Once this data is stored in our table, we send back another JSON to Slack, this time to initiate an interactive message. Our interactive message includes event details and a button that reads "I'm in!".

![eventsubmission](/attachments/2024-12-19-attachments/eventsubmission.png)

At this point, users that are interested in entering the raffle can press the "I'm in" button. Once they click the button, a JSON payload arrives at the CreateRaffle Lambda. The data that is receieved is the event info and the Slack identity of the user that wants to enter the raffle. From this data, we do 2 things:

1. We query the Events table for a matching `eventName` and add the entrant's Slack user ID to the `eventParticipants` field. An event could look something like this:
```
{
    "eventName": "Senators vs Bruins",
    "eventDate": "2024-12-25",
    "eventDeadline": "2024-12-24",
    "eventOwner": "B234JVB4L",
    "eventId": "550e8400-e29b-41d4-a716-446655440000"
    "eventParticipants": [T352SFSMJ4E, F023NMJ2R] 
}
```

2. We register the user (if not already registered) in our Users table. The reason for this will be explained later. Data for a new user could look like this:
```
{
    "userId": "F023NMJ2R",
    "username": "alex_oh",
    "winCount": 0
}
```

Note that we made this raffle entry process as robust as possible - users cannot click the button more than once to try to get more entries! We also check if the event exists before sending back a 200 status code. 

![raffleentry](/attachments/2024-12-19-attachments/raffleentry.png)

### /endraffle
Once a user wants to end the raffle and select winners, the `/endraffle` command must be initiated. `/endraffle` takes a command-line argument - an integer representing the number of winners to be selected. 

This data is directed to our EndRaffle Lambda where we parse 2 critical pieces of information: initiator user ID and the # of winners. We check if the initiator owns an event in the Events table (to prevent a troublesome user from ending someone else's raffle). 

![endraffle](/attachments/2024-12-19-attachments/endraffle.png)

If the initiator owns an event, we read the event info and the list of raffle participants from the Events table. With this list of participants, we scan the Users table and create a dictionary of `userName` - `winCount` pairs. 

Why is the `winCount` important? At Trend Micro, if someone enters a raffle for an event and they haven't attended an event before, they are given priority. Thus, the purpose of the Users table is to keep track of every user's Slack username and their cumulative number of wins.

In our random selection "algorithm", we first run a raffle with those who have 0 wins first, before expanding the pool to everyone else. This way, we replicate the selection process used by the HR team. 

![scandb](/attachments/2024-12-19-attachments/scandb.png)

Once we randomly select our winners in our EndRaffle Lambda, we run 2 database operations:
1. Increment the `winCount` for the winners in the Users table.
2. Delete the event from the Events table (since it is no longer an active raffle event).

We format the list of winners' Slack usernames into a message string which is sent to Slack. Users are announced in a Slack message.

![notifywinners](/attachments/2024-12-19-attachments/notifywinners.png)

### Added Feature: Carpool Channel Creation
Once we finished the above functionality for our Slack bot, we had some time left over to implement some additional features. Often times when there is an event (such as a hockey game), we will see people in various Slack channels asking for any rides to the game (Transit to the Canadian Tire Centre is non-existant). As an attendee for these games, I've also had cases where someone coordinated a Slack channel of all the attendees to figure out rides. To resolve this annoyance, we added a carpool channel feature to our Slack bot.

Right before we notify the winners in a Slack message, we send a couple of requests to Slack from the EndRaffle Lambda:
1. First request -> Create a Slack channel with the date and eventId as the channel name
2. Second request -> Add winners to the Slack channel
3. Third request -> Send a message explaining the purpose of the channel

This feature seemed to impress the most people during our interactive demo. Our interactive demo had more than 35 participants enter a mock raffle and we selected 4 winners! The 4 winners all verified that this feature worked.

![carpool](/attachments/2024-12-19-attachments/carpool.png)

## Conclusion
Participating in Hack Day was a very rewarding experience as I got to apply what I learned during my internship (particularly with AWS Lambdas) to create a useful Slack app. Of course, there are ways to make this more robust - one limitation of the app is that a single user creating multiple raffles may have trouble ending their desired raffle. In the end, we had a working solution that didn't run into any problems - even with 35+ people testing it during our demo. 

A project that I really enjoyed was a Microsoft Teams add-on that calculated the "true" cost of hosting a meeting based on the attendees (estimated) salaries. Another project was a spinoff daily "-dle" game, where players can guess the story points of randomly selected JIRA issues from our organization. 

My experience at Trend Micro was very special especially due to events such as this hackathon, a company-wide CTF, and weekly mentorship sessions catered to co-op students. These events really motivated me to learn new technologies and concepts.
