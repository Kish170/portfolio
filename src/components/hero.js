import React, { useRef } from 'react';
import heroimg from '../images/white.jpg'
import style from './hero.module.css'

export default function Hero({HeroC}) {

return (
<>
    <div ref={HeroC} id={style.banner}>
        <h3>WELCOME TO MY PORTFOLIO WEBSITE</h3>
        <h1 className="typer" id={style.typer}>Hello World, I'm Kishan</h1>
        <p>Computer Science @Carleton University</p>
    </div>
</>
);
}
