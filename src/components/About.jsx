import profile from "../images/profile.svg";
import style from "./About.module.css";
import { useEffect, useRef } from "react"

export default function About({ AboutC }) {
  const sectionRef = useRef(null)
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
  }

  const callbackFunction = (entries) => {
    const[entry] = entries
    if (entry.isIntersecting) {
      document.getElementById(style.border).classList.add(style.slidein)
    } 
  }
  useEffect (() => {
    const section = sectionRef.current
    if (!section) return; 
    const theObserver = new IntersectionObserver(callbackFunction, options)
    theObserver.observe(section);
    return () => {
      theObserver.unobserve(section);
    }
  }, [options])

  return (
    <>
      <div ref={sectionRef}>
        <div ref={AboutC} id={style.border} className={`background banner_col`}>
          <div className={`decor`} id={style.decor}>
            <hr></hr>
            <h1>ABOUT ME</h1>
            <hr></hr>
          </div>
          <div id={style.abu}>
            <img id={style.profile} src={profile} alt=""></img>
            <p>
                Hi, I’m Kishan Rajagunathas, currently pursuing a Bachelor of Science in 
                Computer Science with a Minor in Statistics and Mathematics at Carleton University. <br/><br/> 
                Throughout my academic journey, I’ve built a strong foundation in web technologies, 
                demonstrated by my diverse portfolio of projects and experiences which furthermore showcase my proficiency 
                across multiple programming languages.
                <br/> <br/>Recently, I’ve been expanding my expertise in web development and exploring 
                other exciting fields in computer science, such as machine learning and artificial intelligence. 
                <br/><br/> Outside of my academic pursuits, I try to be active by playing sports, such as ultimate frisbee, 
                or taking part in activities like rock climning and weight lifting. 
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
