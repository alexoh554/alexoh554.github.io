import React, {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder'

function Navbar() {
    // State variable for when navbar button is clicked
    const [expandNavbar, setExpandNavbar] = useState(false); 

    // Stores which route user is in
    const location = useLocation();

    // Sets navbar to false if location changes
    useEffect(() => {
        setExpandNavbar(false)
    }, [location])

    return (
    <div className="navbar" id={expandNavbar ? "open" : "close"}>
        <div className="toggleButton">
            <button onClick={()=>{
                setExpandNavbar((prev) => !prev);
            }}>
                <ReorderIcon />
            </button>
        </div>
        <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/experience">Experience</Link>
        </div>
    </div>)
}

export default Navbar