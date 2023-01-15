import React from "react";
import Carousel from "nuka-carousel";
import "../styles/ProjectSlider.css"
import proj1Img from "../static/ProFeedImg.png" 
import proj2Img from "../static/hangmanImg.png"
import proj3Img from "../static/JetpackRunImg.png"
import proj4Img from "../static/Trig-SolverImg.png"

// ProFeed
const proj1Name = "ProFeed";
const proj1Desc = "Web application that displays real-time sports news articles (by ESPN) from four major sports leagues. The application allows users to create accounts and set preferences on the leagues that they want to follow. This data is stored in a SQLite3 database and accessed using Flask."
const proj1URL = "https://github.com/alexoh554/ProFeed";

// Hangman
const proj2Name = "Hangman";
const proj2Desc = "Command line C++ word guessing game. Users can choose between three difficulties based on word complexity. Player must guess a letter or a word until the word is found or they run out of guesses. Users can also add words to a mutable word bank without changing source code."
const proj2URL = "https://github.com/alexoh554/hangman"

// Jetpack Run
const proj3Name = "Jetpack Run"
const proj3Desc = "Python scrolling runner game made using the Pygame module. Similar to the hit game, \"Jetpack Joyride\", players must vertically dodge obstacles by thrusting up or falling down. The difficulty of the game increases as the game goes on, and points are achieved for survival time."
const proj3URL = "https://github.com/alexoh554/Jetpack-Run"

// Trig Solver
const proj4Name = "Trig-Solver"
const proj4Desc = "Web application that queries user for values of a triangle and outputs the unknown sides and angles. The calculations are made in the backend using Python and sent with Flask. This program recognizes ambiguous cases where there are more than one possible solution."
const proj4URL = "https://github.com/alexoh554/Trig-Solver"


function ProjectSlider() {
    return (
        <div className="slider-container">
            <Carousel class="slider" defaultControlsConfig={{
                nextButtonClassName: "next",
                prevButtonClassName: "prev",
                pagingDotsClassName: "dots"
            }}>
                <div className="project-box">
                    <h1>{proj1Name}</h1>
                    <img src={proj1Img} alt={proj1Name} />
                    <p>{proj1Desc}</p>
                    <a href={proj1URL} target="_blank" >Github</a>
                </div>
                <div className="project-box">
                    <h1>{proj2Name}</h1>
                    <img src={proj2Img} alt={proj2Name} />
                    <p>{proj2Desc}</p>
                    <a href={proj2URL} target="_blank" >Github</a>
                </div>
                <div className="project-box">
                    <h1>{proj3Name}</h1>
                    <img src={proj3Img} alt={proj3Name} />
                    <p>{proj3Desc}</p>
                    <a href={proj3URL} target="_blank" >Github</a>
                </div>
                <div className="project-box">
                    <h1>{proj4Name}</h1>
                    <img src={proj4Img} alt={proj4Name} />
                    <p>{proj4Desc}</p>
                    <a href={proj4URL} target="_blank" >Github</a>
                </div>
            </Carousel>
        </div>
    )
}




export default ProjectSlider;