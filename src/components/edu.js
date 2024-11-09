import style from './edu.module.css'
import js from '../images/jslogo.png'
import java from '../images/javalogo.png'
import python from '../images/python.png'
import html from '../images/html.png'
import css from '../images/css.png'
import { useState, useEffect } from 'react';

export default function Edu({EduC}) {
    const [visbility, setVisibility] = useState("lang");

    useEffect (() => {
        if (visbility === "lang") {
            document.getElementsByClassName(style.lang)[0].style.display = "grid";
            document.getElementsByClassName(style.tools)[0].style.display = "none";
            document.getElementsByClassName(style.tech)[0].style.display = "none";
        } else if (visbility === "tools") {
            document.getElementsByClassName(style.lang)[0].style.display = "none";
            document.getElementsByClassName(style.tools)[0].style.display = "grid";
            document.getElementsByClassName(style.tech)[0].style.display = "none";
        }else if (visbility === "tech") {
            document.getElementsByClassName(style.lang)[0].style.display = "none";
            document.getElementsByClassName(style.tools)[0].style.display = "none";
            document.getElementsByClassName(style.tech)[0].style.display = "grid";
        }
    },[visbility]);

    return (
    <>
        <div ref={EduC} id={style.banner}>
            <div id={style.selection}>
                <h1>SKILLS</h1> 
                <hr></hr>
                <button onClick={() => setVisibility("lang")}>Languages</button>
                <button onClick={() => setVisibility("tools")}>Developer Tools</button>
                <button onClick={() => setVisibility("tech")}>Technologies</button>
            </div>
            <div className={style.lang} >
                <div>
                    <img src={js}></img>
                    <p>JavaScript</p>
                </div>
                <div>
                    <img src={java}></img>
                    <p>Java</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Python</p>
                </div>
                <div>
                    <img src={html}></img>
                    <p>HTML</p>
                </div>
                <div>
                    <img src={css}></img>
                    <p>CSS</p>
                </div>
            </div>
            <div className={style.tools} >
                <div>
                    <img src={js}></img>
                    <p> VS code</p>
                </div>
                <div>
                    <img src={java}></img>
                    <p>IntelliJ</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>GitHub/Git</p>
                </div>
                <div>
                    <img src={html}></img>
                    <p>Processing</p>
                </div>
            </div>
            <div className={style.tech} >
                <div>
                    <img src={js}></img>
                    <p>JavaFX</p>
                </div>
                <div>
                    <img src={java}></img>
                    <p>Vue.js</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>React.js</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>JSON</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Axios</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Pinia</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Node.js</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Deno.js</p>
                </div>
                <div>
                    <img src={python}></img>
                    <p>Firebase</p>
                </div>
            </div>
        </div>
    </>
    );
}