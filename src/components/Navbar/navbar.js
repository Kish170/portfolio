import React from "react";
import style from './navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = ({refs}) => {

    const burger = () => {
        const x = document.getElementsByClassName(style.sidebar)[0];
        const y = document.getElementById(style.box);
        if (x) {
          if (x.style.display === "none" || x.style.display === "" ) {
            y.style.background = "rgba(0, 0, 0, 0.6)";
            y.style.display = "block"
            x.style.display = "block";
          } else {
            y.style.display = "none";
            x.style.display = "none";
          }
        }
    }
    
    const scrollTo = (refName) => {
        window.scrollTo({ top: refs[refName].current.offsetTop, behavior: 'smooth' });
    }

    return (
        <>
            <div className={style.nav}>
                <h1 id={style.name}>KISHAN RAJAGUNATHAS</h1>
                <h1 id={style.snam}>KR</h1>
                <div id={style.burg} onClick={burger}>
                    <div class={style.ham}></div>
                    <div class={style.ham}></div>
                    <div class={style.ham}></div>
                </div>
                <div class={style.sidebar}>
                    <div id={style.x} onClick={burger}></div>
                    <Link className={style.pages} onClick={() => scrollTo("HeroC")}>HOME</Link>
                    <Link className={style.pages} onClick={() => scrollTo("AboutC")}>ABOUT ME</Link>
                    <Link className={style.pages} onClick={() => scrollTo("EduC")}>EDUCATION & SKILLS</Link>
                    <Link className={style.pages} onClick={() => scrollTo("ProjC")}>PROJECTS</Link>
                    <Link className={style.pages} onClick={() => scrollTo("ExpC")}>EXPERIENCE</Link>
                </div>
                <div className={style.menu}>
                    <Link className={style.pages} onClick={() => scrollTo("HeroC")}>HOME</Link>
                    <Link className={style.pages} onClick={() => scrollTo("AboutC")}>ABOUT ME</Link>
                    <Link className={style.pages} onClick={() => scrollTo("EduC")}>EDUCATION & SKILLS</Link>
                    <Link className={style.pages} onClick={() => scrollTo("ProjC")}>PROJECTS</Link>
                    <Link className={style.pages} onClick={() => scrollTo("ExpC")}>EXPERIENCE</Link>
                </div> 
                <div id={style.box}></div>
            </div>
           
        </>
    );
};

export default Navbar;