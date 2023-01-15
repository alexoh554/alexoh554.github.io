import React from 'react'
import Biography from "../components/Biography"
import img1 from "../static/podium.JPG"
import img2 from "../static/slss.jpeg"
import img3 from "../static/CS50.png"
import img4 from "../static/hockey.jpg"

const bio1 = "Hello there! My name is Alex Oh and I am a first-year Computer Engineering Student at the University of Waterloo. I have been programming software since I was 15 years old, and working with technology is one of my many passions. Currently, I am looking for a co-op position for the spring/summer 2023 term."
const bio2 = "I grew up primarily in Richmond, BC, Canada, where I attended Steveston-London Secondary School. In high school, I was awarded the Principal's Honour Roll three times. I was also awarded individual academic awards for Grade 12 Programming and Grade 12 Physics. I left to pursue my studies at UWaterloo in 2022."
const bio3 = "I was introduced to programming when I took the online course, Harvard's Introduction to CS50 during the pandemic. Since then, I have worked on projects using C++, Python, C, and Javascript. I also have experiences with SQL, Flask, React.js, HTML, CSS and Git. I am an avid learner, and I am always looking to advance my knowledge in many different branches of this field."
const bio4 = "One thing you should know about me is that I love sports, particularly hockey. I have played hockey since I was eight years old, and throughout the years, I have won awards such as the BC Hockey Bruce Allison Scholarship and the Richmond Jets Minor Hockey Association scholarship. Unfortunately for many, I am an avid supporter of the Boston Bruins, but I believe this will not affect any professional relationships."



function About() {
  return (
    <div>
      <Biography bio={bio1} image={img1} imageSide={"right"} color={"#D0D0D0"} />
      <Biography bio={bio2} image={img2} imageSide={"left"}/>
      <Biography bio={bio3} image={img3} imageSide={"right"} color={"#D0D0D0"} />
      <Biography bio={bio4} image={img4} imageSide={"left"}/>
    </div>
  )
}

export default About