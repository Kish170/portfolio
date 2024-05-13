import React from "react";
import './navbar.css';
import { Link } from "react-router-dom";

const Navbar = ({refs}) => {
    
    const scrollTo = (refName) => {
        window.scrollTo({ top: refs[refName].current.offsetTop, behavior: 'smooth' });
    }

    return (
        <div className="nav-items">
            <h1>KISHAN RAJAGUNATHAS</h1>
            <div className="menu">
                <Link className="pages" onClick={() => scrollTo("HeroC")}>HOME</Link>
                <Link className="pages" onClick={() => scrollTo("AboutC")}>ABOUT ME</Link>
                <Link className="pages" onClick={() => scrollTo("EduC")}>EDUCATION</Link>
                <Link className="pages" onClick={() => scrollTo("ProjC")}>PROJECTS</Link>
                <Link className="pages" onClick={() => scrollTo("ExpC")}>EXPERIENCE</Link>
                <Link className="pages" onClick={() => scrollTo("SkillsC")}>SKILLS</Link>
            </div>
        </div>
    );
};

export default Navbar;