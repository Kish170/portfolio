import React from "react";
import style from './navbar.module.css';
import { Link } from "react-router-dom";

const Navbar = ({refs}) => {
    
    const scrollTo = (refName) => {
        window.scrollTo({ top: refs[refName].current.offsetTop, behavior: 'smooth' });
    }

    return (
        <div className={style.nav}>
            <h1>KISHAN RAJAGUNATHAS</h1>
            <div className={style.menu}>
                <Link className={style.pages} onClick={() => scrollTo("HeroC")}>HOME</Link>
                <Link className={style.pages} onClick={() => scrollTo("AboutC")}>ABOUT ME</Link>
                <Link className={style.pages} onClick={() => scrollTo("EduC")}>EDUCATION & SKILLS</Link>
                <Link className={style.pages} onClick={() => scrollTo("ProjC")}>PROJECTS</Link>
                <Link className={style.pages} onClick={() => scrollTo("ExpC")}>EXPERIENCE</Link>
            </div>
        </div>
    );
};

export default Navbar;