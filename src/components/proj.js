import style from './proj.module.css'
import emp from '../images/download.jpg'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from './modal'
import movie from '../images/movie.png'
import webpage from '../images/webpage.png'
import crawl from '../images/crawl.png'
import quiz from '../images/quiz.png'

export default function Proj({ ProjC}) {

    return (
        <>
            <div ref={ProjC} id={style.banner}>
                <h1>PROJECTS</h1>
                <hr></hr>
                <div className={`${style.projs} grid`}>
                    <div>
                        <img src={quiz}></img>
                        <h2>Quiz Game</h2>
                        <h3>04/2021</h3>
                        <p>I created a quiz game focused on Computer Science topics 
                            using Processing which facilitated the development of this visually 
                            oriented application. To make the game appear more appealing I 
                            incorporated animations and sound effects and created a scoreboard 
                            so users could see their progress over time. I used third-party libraries 
                            to perform certain functionalities such as creating a timer and adding sound 
                            effects to captivate further and engage users
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}