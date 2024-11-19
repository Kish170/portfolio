import style from './proj.module.css'
import movie from '../images/movie.png'
import webpage from '../images/webpage.png'
import crawl from '../images/crawl.png'
import quiz from '../images/quiz.png'
import { useEffect, useRef } from 'react';

export default function Proj({ ProjC}) {
    const sectionRef = useRef(null)
    const options = {
        root: null,
        threshold: 0.05,
        rootMargin: "0px"
    }
    const callbackFunction = (entries) => {
        const[entry] = entries
        if (entry.isIntersecting) {
          document.getElementsByClassName(style.border)[0].classList.add(style.slidein)
        } 
      }

    useEffect (() => {
        const section = sectionRef.current
        if (!section) return; 
        const theObserver = new IntersectionObserver(callbackFunction, options)
        theObserver.observe(section);
        return () => {
            theObserver.unobserve(section);
        }
    },[]);


    return (
        <>
            <div ref={sectionRef}>
                <div ref={ProjC} className={`banner_col ${style.border} `}>
                    <h1>PROJECTS</h1>
                    <hr></hr>
                    <div className={`${style.projs} grid`}>
                        <div className='background'>
                            <div className={style.images}><img src={quiz}></img></div>
                            <div>
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
                        <div className='background'>
                            <div className={style.images}><img src={movie}></img></div>
                            <div>
                                <h2>MOVIE STREAMING WEBSITE</h2>
                                <h3>02/2023</h3>
                                <p>I created a movie streaming website that allows users to browse through 
                                    movies based on their search queries or through specific genres. In order to deploy 
                                    the web application, store data retrieved from the API, and provide secure user authentication,
                                    I used Firebase technologies: Hosting, Firebase, and Authentication. Utilized Axios to make 
                                    it easy to interact and retrieve data from the TMDb API
                                </p>
                            </div>
                        </div>
                        <div className='background'>
                            <div className={style.images}><img src={crawl}></img></div>
                            <div >
                                <h2>Web Crawler</h2>
                                <h3>12/2023</h3>
                                <p>This project implements a web crawler and search engine in Java 
                                    (with a version also in python that does not have a GUI). The 
                                    crawler navigates the web starting from a seed URL, collecting 
                                    data from various web pages, and storing the information necessary 
                                    for search and ranking purposes. The search engine component processes 
                                    user queries, providing relevant search results based on the collected 
                                    data using various PageRank algorithms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}