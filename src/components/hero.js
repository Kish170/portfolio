import React, { useState, useEffect } from 'react';
import heroimg from '../images/white.jpg'
import style from './hero.module.css'

export default function Hero({HeroC}) {

const letterlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const wordlist = [
    "Softwaredeveloper",
    "WebDeveloper",
    "TechEnthusiast"
]

const [wordIndex, setWordIndex] = useState(0);
const [letterIndex, setLetterIndex] = useState([]);

useEffect (() => {    
    const word = wordlist[wordIndex];    
    const intervals = [];
    
    const lIndices = [];
    for (let i = 0; i < word.length; i++) {
        const newInd = Math.floor(Math.random() * 52);
        lIndices.push(letterlist[newInd]);
    }
    setLetterIndex(lIndices);

    for (let x=0; x < word.length; x++) {
        const id = setInterval(() => {
            setLetterIndex((prevState) => {
                const updatedArray = [...prevState];
                const newIndex = Math.floor(Math.random() * 52);
                if (letterlist[newIndex] === word[x]) {
                    updatedArray[x] = word[x];
                    clearInterval(id);
                } else{
                    updatedArray[x] = letterlist[newIndex];
                }
                if(updatedArray.join('') === word) {
                    setTimeout(() => {
                        setWordIndex((prevIndex) => (prevIndex + 1) % wordlist.length);
                    },2000)
                    
                }
                return updatedArray;
            });
        }, 50)
        intervals.push(id);
    }

    return () => intervals.forEach(clearInterval);
},[wordIndex])


return ("fuck me",
<>
    <div id={style.hlinks} className='footlinks'>
        <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/">
            <div id="link"/>
        </a>
        <a href="https://github.com/Kish170">
            <div id="git"/>
        </a>
    </div>
    <div ref={HeroC} id={style.banner}>
        <h3>WELCOME TO MY PORTFOLIO WEBSITE</h3>
        <h1 className="typer" id={style.typer}>Hello World, I'm Kishan</h1>
        <div  id={style.slotanim}>
            <h1 className="accents">{letterIndex.join('')}</h1>
        </div>
        <p>Computer Science @Carleton University</p>
    </div>
</>
);
}
