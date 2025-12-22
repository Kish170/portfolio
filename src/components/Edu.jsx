import style from './Edu.module.css';
import js from '../images/jslogo.svg';
import java from '../images/javalogo.svg';
import python from '../images/python.svg';
import html from '../images/html.svg';
import css from '../images/css.svg';
import processing from '../images/processing.svg';
import vs from '../images/vscode.svg';
import intelli from '../images/intellij.svg';
import git from '../images/github.svg';
import vue from '../images/vue.svg';
import react from '../images/React.webp';
import json from '../images/json.svg';
import pinia from '../images/pinia.svg';
import node from '../images/node.svg';
import deno from '../images/deno.svg';
import axios from '../images/axios.webp';
import firebase from '../images/firebase.svg';
import c from '../images/c-1.svg'
import cplus from '../images/cplus.svg'
import { useEffect, useRef } from 'react';

export default function Edu({EduC}) {
    const sectionRef = useRef(null)
    const options = {
        root: null,
        threshold: 0.2,
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
            <div ref={EduC} className={`banner_col ${style.border}`}>
                <div className={`decor`}>
                    <hr></hr>
                    <h1>SKILLS</h1>
                    <hr></hr>
                </div>
                <div className={style.skillsGrid}>
                    <div className={style.categoryCard}>
                        <div className={style.accentBar}></div>
                        <div className={style.cardContent}>
                            <h3 className={style.categoryTitle}>Languages</h3>
                            <div className={`${style.grid} skills`} >
                        <div>
                            <img src={python}></img>
                            <p>Python</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>SQL</p>
                        </div>
                        <div>
                            <img src={js}></img>
                            <p>TypeScript</p>
                        </div>
                        <div>
                            <img src={js}></img>
                            <p>JavaScript</p>
                        </div>
                        <div>
                            <img src={java}></img>
                            <p>Java</p>
                        </div>
                        <div>
                            <img src={c}></img>
                            <p>C</p>
                        </div>
                        <div>
                            <img src={cplus}></img>
                            <p>C++</p>
                        </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.categoryCard}>
                        <div className={style.accentBar}></div>
                        <div className={style.cardContent}>
                            <h3 className={style.categoryTitle}>ML/AI Frameworks</h3>
                            <div className={`${style.grid} skills`} >
                        <div>
                            <img src={python}></img>
                            <p>PyTorch</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>NumPy</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>LangChain</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>scikit-learn</p>
                        </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.categoryCard}>
                        <div className={style.accentBar}></div>
                        <div className={style.cardContent}>
                            <h3 className={style.categoryTitle}>Data Infrastructure</h3>
                            <div className={`${style.grid} skills`} >
                        <div>
                            <img src={python}></img>
                            <p>BigQuery</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>PostgreSQL</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>MongoDB</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>Kafka</p>
                        </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.categoryCard}>
                        <div className={style.accentBar}></div>
                        <div className={style.cardContent}>
                            <h3 className={style.categoryTitle}>Web Development</h3>
                            <div className={`${style.grid} skills`} >
                        <div>
                            <img src={react}></img>
                            <p>Next.js</p>
                        </div>
                        <div>
                            <img src={react}></img>
                            <p>React</p>
                        </div>
                        <div>
                            <img src={node}></img>
                            <p>Node.js</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>FastAPI</p>
                        </div>
                        <div>
                            <img src={node}></img>
                            <p>Express.js</p>
                        </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.categoryCard}>
                        <div className={style.accentBar}></div>
                        <div className={style.cardContent}>
                            <h3 className={style.categoryTitle}>Developer Tools</h3>
                            <div className={`${style.grid} skills`} >
                        <div>
                            <img src={git}></img>
                            <p>Git</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>Docker</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>Jenkins</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>Selenium</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>Postman</p>
                        </div>
                        <div>
                            <img src={python}></img>
                            <p>REST APIs</p>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}