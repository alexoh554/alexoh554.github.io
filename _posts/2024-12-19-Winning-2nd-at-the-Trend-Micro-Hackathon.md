---
layout: post
title: Winning 2nd at the Trend Micro Hackathon
tags: [Project, System Design, Hackathon]
---
During my internship at Trend Micro, I created a fully-integrated Slackbot to automate company raffles and showcased it to the company. This was a great project to learn about AWS architecture, serverless computing, and API integration.

## Motivation
Trend Micro hosts tri-annual "Hack Days", days where developers are encouraged to work on and share a project. Ideas can be anything - some make useful tools for productivity, while others may work on technical debt or workflow optimizations. This was one of the great showcases of Trend Micro's continuous learning work culture and how it benefits everyone. Developers like myself can learn new skills and the company can also benefit greatly from some of these projects (one team worked on migrating a huge repository to a newer programming language).

One of the perks of working at Trend Micro is the Ottawa Senators ticket raffles. For every game, employees can email an HR organizer to be entered in a draw. Near the day of the game, winners are notified via email or teams. 

Someone on my hackathon team had the great idea of simplifying this tedious email process and making it easier for the HR team to manage entrants. We thought a Slack bot would be a fun and interactive way for employees to participate in the frequent raffles. Because of this, we created Cyber SweepStakes.

## Architecture
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

