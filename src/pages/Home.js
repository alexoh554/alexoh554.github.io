import React from 'react'
import "../styles/Home.css";
import face from "../static/face.jpeg";
import {AiFillMail, AiFillLinkedin, AiFillGithub} from "react-icons/ai";
import ResumeButton from "../components/ResumeButton.js"
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion"



function Home() {
  return (
    <div className="home">
        <motion.div 
        initial={{ y: -300}}
        animate={{ y: 0}}
        transition={{duration: 2}} 
        id="face">
          <img src={face} alt="Alex Oh"/>
        </motion.div>
        <motion.div 
        id="title"
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{duration: 2}}>
          <h1>Alex Oh</h1>
        </motion.div> 
        <div>
          <TypeAnimation speed={200}
            sequence={[
              2800,
              'Software Developer'
            ]}
            wrapper="div"
            cursor={true}
          />
        </div>

        <motion.div
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{duration: 2}}>
          <AiFillMail onClick={event => window.location.href='mailto: alex.oh@uwaterloo.ca'} className='urlButton'/>
          <AiFillGithub onClick={event => window.location.href='https://github.com/alexoh554'} className='urlButton'/>
          <AiFillLinkedin onClick={event => window.location.href='https://www.linkedin.com/in/alexoh554/'} className='urlButton'/>
        </motion.div>
        <motion.div
        initial={{y: 300}}
        animate={{y: 0}}
        transition={{duration: 2}}>
          <ResumeButton />
        </motion.div>
    </div>
  )
}



export default Home