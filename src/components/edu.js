import style from './edu.module.css'
import js from '../images/jslogo.png'
import java from '../images/javalogo.png'
import python from '../images/python.png'
import html from '../images/html.png'
import css from '../images/css.png'
import processing from '../images/processing.svg'
import vs from '../images/vscode.png'
import intelli from '../images/intellij.png'
import git from '../images/github.png'
import vue from '../images/vue.png'
import react from '../images/React.webp'
import json from '../images/json.jpg'
import pinia from '../images/pinia.png'
import node from '../images/node.png'
import deno from '../images/deno.svg'
import axios from '../images/axios.webp'
import firebase from '../images/firebase.png'

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
            <div className={`${style.lang} grid`} >
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
            <div className={`${style.tools} grid`} >
                <div>
                    <img src={vs}></img>
                    <p> VS code</p>
                </div>
                <div>
                    <img src={intelli}></img>
                    <p>IntelliJ</p>
                </div>
                <div>
                    <img src={git}></img>
                    <p>GitHub/Git</p>
                </div>
                <div>
                    <img src={processing}></img>
                    <p>Processing</p>
                </div>
            </div>
            <div className={`${style.tech} grid`} >
                <div>
                    <img src={java}></img>
                    <p>JavaFX</p>
                </div>
                <div>
                    <img src={vue}></img>
                    <p>Vue.js</p>
                </div>
                <div>
                    <img src={react}></img>
                    <p>React.js</p>
                </div>
                <div>
                    <img src={json}></img>
                    <p>JSON</p>
                </div>
                <div>
                    <img src={axios}></img>
                    <p>Axios</p>
                </div>
                <div>
                    <img src={pinia}></img>
                    <p>Pinia</p>
                </div>
                <div>
                    <img src={node}></img>
                    <p>Node.js</p>
                </div>
                <div>
                    <img src={deno}></img>
                    <p>Deno.js</p>
                </div>
                <div>
                    <img src={firebase}></img>
                    <p>Firebase</p>
                </div>
            </div>
        </div>
    </>
    );
}