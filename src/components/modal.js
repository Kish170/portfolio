import React from 'react'
import sty from './modal.module.css'
import { useEffect } from 'react';
import emp from '../images/download.jpg'
import movie from '../images/movie.png'
import crawl from '../images/crawl.png'

export default function Modal({ setIsOpen, activeProj}) {

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';  
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    
    
    return (
        <>  
            <div id={sty.box} onClick={() => closeModal()}>
                <div id={sty.modal} onClick={(e) => e.stopPropagation()}>
                    <div id={sty.info}>
                        <div style={{ display: activeProj === "proj_one" ? 'inline' : 'none'}}class={sty.projes} >
                            <div class={sty.partOne}>
                                <div>
                                    <h1>QUIZ GAME</h1>
                                    <h3>TIMELINE:</h3>
                                    <li>04/2021</li>
                                    <h3>TECH STACK:</h3>
                                    <ul>
                                        <li>Python</li>
                                        <li>Processing</li>
                                    </ul>
                                </div>
                                <img src={emp}></img>
                            </div>
                            <p>Description: I created a quiz game focused on Computer Science topics using Processing 
                                which facilitated the development of this visually oriented application. To make the 
                                game appear more appealing I incorporated animations and sound effects and created a 
                                scoreboard so users could see their progress over time. I used third-party libraries to 
                                perform certain functionalities such as creating a timer and adding sound effects to 
                                captivate further and engage users
                            </p>
                        </div>
                        <div style={{ display: activeProj === "proj_two" ? 'inline' : 'none'}} class={sty.projes}>
                            <div class={sty.partOne}>
                                <div class={sty.one}>
                                    <h1>TERRY PICTURES(MOVIE STREAMING WEBSITE)</h1>
                                    <div class={sty.imga}>
                                        <img src={movie}></img>
                                    </div>
                                </div>
                                <div class={sty.times}>
                                    <h3>TIMELINE:02/2023</h3>
                                </div>
                                <div>
                                    <h3>TECH STACK:</h3>
                                    <ul>
                                        <li>Javascript</li>
                                        <li>GitHub</li>
                                        <li>Vue.js</li>
                                        <li>Firebase</li>
                                        <li>Pinia</li>
                                        <li>Axios</li>
                                        <li>NoSQL</li>
                                        <li>HTML/CSS</li>
                                        <li>TMDb API</li>
                                    </ul>
                                </div>
                            </div>
                            <p>Description: I created a movie streaming website that allows users to browse 
                                through movies based on their search queries or through specific genres. In 
                                order to deploy the web application, store data retrieved from the API, and 
                                provide secure user authentication, I used Firebase technologies: Hosting, 
                                Firebase, and Authentication. Utilized Axios to make it easy to interact and 
                                retrieve data from the TMDb API
                            </p>
                        </div>
                        <div style={{ display: activeProj === "proj_three" ? 'inline' : 'none'}} class={sty.projes}>
                            <div class={sty.partOne}>
                                <div>
                                    <h2>WEB CRAWLER + SEARCH ENGINE</h2>
                                    <h3>TIMELINE: </h3>
                                    <li>12/2023</li>
                                    <h3>TECH STACK:</h3>
                                    <ul>
                                        <li>Java</li>
                                        <li>JavaFX</li>
                                    </ul> 
                                </div>
                                <img src={crawl}></img>
                            </div>
                            <p>Description: I worked with a colleague to create a Web Crawler and Search Engine that parses 
                                the data required for the search through the HTML 5 links traversed. In order to configure the 
                                top 10 search results multiple mathematical models were used to produce the page rank values and 
                                content scores. Our JavaFX component illustrates the search engine component which allows the user
                                to type in a search bar and see the results of their query   
                            </p>
                        </div>
                        <div style={{ display: activeProj === "proj_four" ? 'inline' : 'none'}} class={sty.projes}>
                            <div class={sty.partOne}>
                                <div>
                                    <h2>WEBSITE PORTFOLIO</h2>
                                    <h3>TIMELINE: </h3>
                                    <li>05/2024</li>
                                    <h3>TECH STACK:</h3>
                                    <ul>
                                        <li>React.js</li>
                                        <li>Javascript</li>
                                        <li>HTML/CSS</li>
                                    </ul>
                                </div>
                                <img src={emp}></img>
                                </div>
                                <p>Description: IDK YET ILL ADD Later</p> 
                        </div>
                    </div>       
                </div>
            </div>
        </>
    )
}