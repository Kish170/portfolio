import React, { useRef } from 'react';
import heroimg from '../images/monkey.png'
import './hero.css'

export default function Hero({HeroC}) {

return (
<>
    <div ref={HeroC} id="banner">
        <img src={heroimg} alt=""></img>
        <h1>WELCOME TO KISHAN'S PORTFOLIO</h1>
    </div>
</>
);
}
