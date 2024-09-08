import React, { useRef } from 'react';
import heroimg from '../images/white.jpg'
import style from './hero.module.css'

export default function Hero({HeroC}) {

return (
<>
    <div ref={HeroC} id={style.banner}>
        <h1>
            <span>W</span>
            <span>E</span>
            <span>L</span>
            <span>C</span>
            <span>O</span>
            <span>M</span>
            <span>E</span>
            <br></br>
            <span>T</span>
            <span>O</span>
            <br></br>
            <span>K</span>
            <span>I</span>
            <span>S</span>
            <span>H</span>
            <span>A</span>
            <span>N</span>
            <span>'</span>
            <span>S</span>
            <br></br>
            <span>P</span>
            <span>O</span>
            <span>R</span>
            <span>T</span>
            <span>F</span>
            <span>O</span>
            <span>L</span>
            <span>I</span>
            <span>O</span>
        </h1>
    </div>
</>
);
}
