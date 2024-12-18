import style from './proj.module.css'
import movie from '../images/movie.png'
import webpage from '../images/webpage.png'
import crawl from '../images/crawl.png'
import quiz from '../images/quiz.png'
import { useEffect, useRef } from 'react';

export default function Proj({ ProjC}) {
    var index = 0;
    const cRef = useRef(null);
    const theta = 360/3;
    const radius = Math.round( (1000/ 2) / Math.tan( Math.PI / 3 ) );
    const rotate = () => {
        if (cRef.current) {
            const angle = theta * index * -1;
            cRef.current.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
        }
    }
    const next = () => {
        index++;
        rotate();
    }
    const prev = () => {
        index--;
        rotate()
    }

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
        const resize = () => {
            if (window.innerWidth <= 767) {
                cRef.current.style.transform = "none";
            } else {
                const angle = theta * index * -1;
                cRef.current.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
            }
        }

        window.addEventListener("resize", resize)

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
            <div className={`${style.box} ${style.border}`} ref={sectionRef}>
                <h1>PROJECTS</h1>
                <hr></hr>
                <div ref={ProjC} className={`banner_col ${style.projbox} `}>
                    <div ref={cRef} className={style.projs}>
                        <div className={`${style.carousel_cell} background`}>
                            <div className={style.images}><img src={quiz}></img></div>
                            <div className={style.descrip}>
                                <h2>Quiz Game</h2>
                                <h3>04/2021</h3>
                                <p>This project is a quiz game focused on Computer Science topics 
                                    using Processing. I have incorporated animations, sound effects
                                    and a scoreboard so users could see their progress over time. 
                                    I used third-party libraries  to perform certain functionalities 
                                    such as creating a timer and adding sound effects.
                                </p>
                            </div>
                        </div>
                        <div className={`${style.carousel_cell} background`}>
                            <div className={style.images}><img src={movie}></img></div>
                            <div className={style.descrip}>
                                <h2>MOVIE STREAMING WEBSITE</h2>
                                <h3>02/2023</h3>
                                <p>This project is a movie streaming website that allows users to browse through 
                                    movies based on their search queries or through specific genres. Optimized Firebase 
                                    to store data, deploy the website and secure authentication. Utilized Axios to make 
                                    it easy to interact and retrieve data from the TMDb API
                                </p>
                            </div>
                        </div>
                        <div className={`${style.carousel_cell} background`}>
                            <div className={style.images}><img src={crawl}></img></div>
                            <div className={style.descrip}>
                                <h2>Web Crawler</h2>
                                <h3>12/2023</h3>
                                <p>This project uses Java to construct a web crawler and search engine
                                    (with a Python version that lacks a graphical user interface). 
                                    Beginning with a seed URL, the crawler searches the web, gathering 
                                    information from different web pages and storing it for use in search 
                                    and ranking. Utilizing a variety of PageRank algorithms, the search 
                                    engine component analyzes user queries and returns pertinent search 
                                    results based on the information gathered.
                               
                                </p>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <a onClick={prev} id={style.prev} className='pages'>PREV</a>
                <a onClick={next} id={style.next} className='pages'>NEXT</a>
            </div>
        </>
    );
}