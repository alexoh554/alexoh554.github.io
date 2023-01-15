import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import React from 'react'
import "../styles/JobTimeline.css"


function JobTimeline() {
    return (
      <Timeline position='alternate'>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className='job-box'>         
                <h1>Dishwasher</h1>
                <h2>The Keg Steakhouse and Grill</h2>
                <h2>Richmond, BC</h2>
                <h2>March - August 2022</h2>
                <p>Part-time role as a dishwasher at a fast-paced restaurant. Worked in a team to wash dishes as quickly and effectively as possible.</p>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className='job-box'>         
                <h1>Volunteer Basketball Coach</h1>
                <h2>Richmond Youth Basketball League</h2>
                <h2>Richmond, BC</h2>
                <h2>November 2021 - March 2022</h2>
                <p>Coached a team of 10 youth in weekly practices and games. Created practice plans and encouraged individual improvement and teamwork abilities.</p>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <div className='job-box'>         
                <h1>Cashier</h1>
                <h2>Freshco</h2>
                <h2>Richmond, BC</h2>
                <h2>May - September 2021</h2>
                <p>Managed transactions for a grocery store. Interacted with customers on a constant basis and developed communication skills.</p>
            </div>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <div className='job-box'>         
                <h1>Courtesy Clerk</h1>
                <h2>Real Canadian Superstore</h2>
                <h2>Richmond, BC</h2>
                <h2>June - August 2019</h2>
                <p>Restocked shelves, attended customers, and performed price checks at the biggest grocery store in the city.</p>
            </div>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  }

export default JobTimeline;