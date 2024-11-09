import React, { useEffect, useRef } from "react";
import style from './navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = ({refs}) => {

    const scrollTo = (refName) => {
        window.scrollTo({ top: refs[refName].current.offsetTop, behavior: 'smooth' });
    }

    let prevScroll = useRef(0);
    useEffect (() => {
        const handleScroll = () => {
            const curScroll = window.scrollY;
            if (curScroll >= prevScroll.current) {
                document.getElementsByClassName(style.nav)[0].classList.add(style.close);
            } else {
                document.getElementsByClassName(style.nav)[0].classList.remove(style.close);
                document.getElementsByClassName(style.nav)[0].style.display = "flex";
            }
            prevScroll.current = curScroll;
        };
        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={style.nav}>
                <h1 id={style.name}>Kishan Rajagunathas</h1>
                <h1 id={style.snam}>KR</h1>
                <div className={style.menu}>
                    <Link id="home" className={style.pages} onClick={() => scrollTo("HeroC")}>Home</Link>
                    <Link id="about" className={style.pages} onClick={() => scrollTo("AboutC")}>About</Link>
                    <Link id="edu" className={style.pages} onClick={() => scrollTo("EduC")}>Education</Link>
                    <Link id="projs" className={style.pages} onClick={() => scrollTo("ProjC")}>Projects</Link>
                    <Link id="exps" className={style.pages} onClick={() => scrollTo("ExpC")}>Experience</Link>
                </div> 
                <div id={style.box}></div>
            </div>
           
        </>
    );
};

export default Navbar;