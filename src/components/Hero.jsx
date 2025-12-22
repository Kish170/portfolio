import React, { useState, useEffect } from 'react';
import style from './Hero.module.css';

export default function Hero({HeroC}) {

const letterlist = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const wordlist = [
    "Softwaredeveloper",
    "WebDeveloper",
    "TechEnthusiast"
]

const maxWordLength = Math.max(...wordlist.map(word => word.length));
const [wordIndex, setWordIndex] = useState(0);
const [letterIndex, setLetterIndex] = useState([]);
const [typedText, setTypedText] = useState('');
const [showCursor, setShowCursor] = useState(true);
const [typingComplete, setTypingComplete] = useState(false);

useEffect(() => {
    const text = "Hello World, I'm Kishan";
    let currentIndex = 0;

    const typeNextCharacter = () => {
        if (currentIndex < text.length) {
            setTypedText(text.substring(0, currentIndex + 1));
            currentIndex++;

            let delay = Math.random() * 130 + 50; 

            if (text[currentIndex - 1] === ' ' || text[currentIndex - 1] === ',') {
                delay = Math.random() * 200 + 150; 
            }

            if (Math.random() < 0.1) {
                delay += Math.random() * 100 + 50;
            }

            setTimeout(typeNextCharacter, delay);
        } else {
            setTypingComplete(true);
        }
    };

    const startDelay = setTimeout(typeNextCharacter, 300);

    return () => clearTimeout(startDelay);
}, []); 

useEffect(() => {
    const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
}, []);

useEffect(() => {
    const word = wordlist[wordIndex];
    const intervals = [];
    const timeouts = [];

    const padding = Math.floor((maxWordLength - word.length) / 2);
    const paddedWord = ' '.repeat(padding) + word + ' '.repeat(maxWordLength - word.length - padding);

    const initialLetters = paddedWord.split('');
    setLetterIndex(initialLetters);

    const startAnimation = setTimeout(() => {
        const center = Math.floor(maxWordLength / 2);
        const animationOrder = [];

        for (let offset = 0; offset < Math.ceil(maxWordLength / 2); offset++) {
            if (center + offset < maxWordLength) {
                animationOrder.push(center + offset);
            }
            if (offset > 0 && center - offset >= 0) {
                animationOrder.push(center - offset);
            }
        }

        animationOrder.forEach((x, index) => {
            const letterDelay = index * 100;

            const startSlot = setTimeout(() => {
                let spinCount = 0;
                const maxSpins = 15 + Math.floor(Math.random() * 10);

                const id = setInterval(() => {
                    setLetterIndex((prevState) => {
                        const updatedArray = [...prevState];

                        if (spinCount < maxSpins) {
                            const nextWordIndex = (wordIndex + 1) % wordlist.length;
                            const nextWord = wordlist[nextWordIndex];
                            const nextPadding = Math.floor((maxWordLength - nextWord.length) / 2);
                            const nextPaddedWord = ' '.repeat(nextPadding) + nextWord + ' '.repeat(maxWordLength - nextWord.length - nextPadding);

                            if (nextPaddedWord[x] !== ' ') {
                                const randomIndex = Math.floor(Math.random() * 52);
                                updatedArray[x] = letterlist[randomIndex];
                            } else {
                                updatedArray[x] = ' ';
                            }
                            spinCount++;
                        } else {
                            const nextWordIndex = (wordIndex + 1) % wordlist.length;
                            const nextWord = wordlist[nextWordIndex];
                            const nextPadding = Math.floor((maxWordLength - nextWord.length) / 2);
                            const nextPaddedWord = ' '.repeat(nextPadding) + nextWord + ' '.repeat(maxWordLength - nextWord.length - nextPadding);
                            updatedArray[x] = nextPaddedWord[x];
                            clearInterval(id);

                            if (index === animationOrder.length - 1) {
                                setTimeout(() => {
                                    setWordIndex((prevIndex) => (prevIndex + 1) % wordlist.length);
                                }, 1500);
                            }
                        }

                        return updatedArray;
                    });
                }, 100);

                intervals.push(id);
            }, letterDelay);

            timeouts.push(startSlot);
        });
    }, 1000);

    timeouts.push(startAnimation);

    return () => {
        intervals.forEach(clearInterval);
        timeouts.forEach(clearTimeout);
    };
}, [wordIndex]);


return (
<>
    <div id={style.hlinks} className='footlinks'>
        <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/" target='_blank'>
           <div id="link"/>
        </a>
        <a href="https://github.com/Kish170" target='_blank'>
            <div id="git"/>
       </a>
    </div>
    <div ref={HeroC} id={style.banner}>
        <h3>WELCOME TO MY PORTFOLIO WEBSITE</h3>

        <h1 className={style.typingText}>
            {typedText}
            <span className={`${style.cursor} ${!showCursor ? style.hidden : ''}`}>|</span>
        </h1>
        <div id={style.slotanim}>
            <h1 className="accents">
                {letterIndex.map((letter, index) => (
                    <span key={index} className={style.slotLetter}>
                        {letter}
                    </span>
                ))}
            </h1>
        </div>
        <p>Computer Science @Carleton University</p>
    </div>
</>
);
}
