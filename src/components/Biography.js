import React, { Component } from 'react'
import '../styles/Biography.css'

function Biography(prop) {
    const className = prop.imageSide === 'left' ? 'left-img' : 'right-img';
    return(
        <div className ='bio' style={{backgroundColor: prop.color}}>
            <p>{prop.bio}</p>
            <img className={className} src={prop.image} alt="About me" />
        </div>
    )
}


export default Biography;