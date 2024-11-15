import React, { useEffect, useRef, useState } from "react";
import style from './navbar.module.css';
import { Link } from "react-router-dom";
import Switch from "react-switch";
import '../../style.css';

const Navbar = ({refs}) => {
    const [theme, setTheme] = useState('dark');

    const scrollTo = (refName) => {
        window.scrollTo({ top: refs[refName].current.offsetTop, behavior: 'smooth' });
    }

    const themeSwitch = () => {
        setTheme(curr => (curr === 'light' ? 'dark' : 'light'));
        console.log(theme);
    };

    let prevScroll = useRef(0);
    useEffect (() => {
        const handleScroll = () => {
            const curScroll = window.scrollY;
            if ((curScroll - prevScroll.current) >= 20) {
                // setTimeout (() => {
                    document.getElementsByClassName(style.nav)[0].classList.add(style.close);    
                // },100)
                
            } else if ((curScroll - prevScroll.current) <= -1 ){
                // setTimeout (() => {
                    document.getElementsByClassName(style.nav)[0].classList.remove(style.close);
                    document.getElementsByClassName(style.nav)[0].style.display = "flex";  
                // },100)
            }
            prevScroll.current = curScroll;
        };
        window.addEventListener("scroll", handleScroll);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(`${theme}`);
    }, [theme]);

    return (
        <>
            <div className={style.nav}>
                <h1 id="name">Kishan Rajagunathas</h1>
                <div className={style.menu}>
                    <Link id="home" className="pages" onClick={() => scrollTo("HeroC")}>Home</Link>
                    <Link id="about" className="pages" onClick={() => scrollTo("AboutC")}>About</Link>
                    <Link id="edu" className="pages" onClick={() => scrollTo("EduC")}>Education</Link>
                    <Link id="projs" className="pages" onClick={() => scrollTo("ProjC")}>Projects</Link>
                    <Link id="exps" className="pages" onClick={() => scrollTo("ExpC")}>Experience</Link>
                    {/* <button type="toggle" id={style.ice}></button> */}
                    <div className={style.ice}><Switch  onChange={themeSwitch} checked={theme === 'dark'}/></div>
                </div> 
                <div id={style.box}></div>
            </div>
           
        </>
    );
};

export default Navbar;