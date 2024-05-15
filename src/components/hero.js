import React, { useRef } from 'react';
import heroimg from '../images/white.jpg'
import style from './hero.module.css'

export default function Hero({HeroC}) {

return (
<>
    <div ref={HeroC} id={style.banner}>
        <img src={heroimg} alt=""></img>
        <h1>WELCOME TO KISHAN'S PORTFOLIO</h1>
    </div>
</>
);
}
