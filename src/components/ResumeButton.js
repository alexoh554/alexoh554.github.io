import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import '../styles/ResumeButton.css'
import resume from "../static/External_Resume.pdf"

function ResumeButton(props) {
    return (
        <div className="resume_button" onClick={() => window.open(resume, '_blank')} >
            <h>View Resume</h>
        </div>


    )
}

export default ResumeButton