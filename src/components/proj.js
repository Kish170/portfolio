import style from './proj.module.css'
import emp from '../images/download.jpg'
import prof from '../images/white.jpg'
import { useEffect } from 'react';
import { useState } from 'react';
import Modal from './modal'
import movie from '../images/movie.png'
import webpage from '../images/webpage.png'
import crawl from '../images/crawl.png'

export default function Proj({ ProjC}) {
    let slideI = 1;
    
    const incSlide = (n) => {
        showSlide(slideI += n);
    }

    const currentSlide = (n) => {
        showSlide(slideI =n)
    }

    const showSlide = (n) => {
        let i;
        const slides = document.getElementsByClassName(style.projs);
        if (n > slides.length) {
            slideI = 1;
        } 
        if (n < 1) {
            slideI = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideI - 1].style.display = "block";
    }

    useEffect(() => {
        showSlide(slideI);
    }, []);

    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState(null)

    return (
        <>
            <div ref={ProjC} id={style.banner}>
                <div id={style.aproj}>
                    <h1>PROJECTS</h1>
                    <div id={style.all}>
                        <a id={style.prev} onClick={() => incSlide(-1)}>&#10094;</a>
                        <div class={style.projs} onClick={() => {setIsOpen(true); setActive("proj_one")}}> 
                            <div class={style.image}>
                                <img src={emp}></img>
                            </div>
                            <div class={style.info}>
                                <h2>QUIZ GAME</h2>
                                <p>A simple quiz game created using Processing</p>
                                <h3 class={style.hide}>CLICK FOR MORE INFO</h3>
                            </div>
                        </div>
                        <div class={style.projs} onClick={() => {setIsOpen(true); setActive("proj_two")}}> 
                            <div class={style.image}>
                                <img src={movie}></img>
                                <div class={style.overlay}></div>
                            </div>
                            <div class={style.info}>
                                <h2>TERRY PICTURES(MOVIE STREAMING WEBSITE)</h2>
                                <p>A movie streaming website created using Vue.js as the framework and Firebase as the database</p>
                                <h3 class={style.hide}>CLICK FOR MORE INFO</h3>
                            </div>
                        </div>
                        <div class={style.projs} onClick={() => {setIsOpen(true); setActive("proj_three")}}> 
                            <div class={style.image}>
                                <img src={crawl}></img>
                                <div class={style.overlay}></div>
                            </div>
                            <div class={style.info}>
                                <h2>WEB CRAWLER + SEARCH ENGINE</h2>
                                <p>A simple Web Crawler and Search Engine(The information on this project is restricted due to Carleton University's Academic Intergrity Policy. Please contact me for more details)</p>
                                <h3 class={style.hide}>CLICK FOR MORE INFO</h3>
                            </div>
                        </div>
                        <div class={style.projs} onClick={() => {setIsOpen(true); setActive("proj_four")}}> 
                            <div class={style.image}>
                                <img src={webpage}></img>
                                <div class={style.overlay}></div>
                            </div>
                            <div class={style.info}>
                                <h2>WEBSITE PORTFOLIO</h2>
                                <p>My websitie portfoltio created using React.js as the framework </p>
                                <h3 class={style.hide}>CLICK FOR MORE INFO</h3>
                            </div>
                        </div>
                        <a id={style.next} onClick={() => incSlide(1)}>&#10095;</a>
                        <div id={style.dots}>
                            <span class={style.dot} onClick={() => currentSlide(4)}></span>
                            <span class={style.dot} onClick={() => currentSlide(3)}></span>
                            <span class={style.dot}onClick={() => currentSlide(2)}></span>
                            <span class={style.dot} onClick={() => currentSlide(1)}></span>
                        </div>
                        {isOpen && <Modal setIsOpen={setIsOpen} activeProj={active}/>}
                    </div>
                </div>
            </div>
    </>
    );
}