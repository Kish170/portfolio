import profile from "../images/profile.JPG";
import style from "./about.module.css";
import { useEffect, useRef } from "react"

export default function About({ AboutC }) {
  const sectionRef = useRef(null)
  const options = {
    root: null,
    threshold: 0.4,
    rootMargin: "0px"
  }

  const callbackFunction = (entries) => {
    const[entry] = entries
    if (entry.isIntersecting) {
      document.getElementById(style.border).classList.remove(style.slideout)
      document.getElementById(style.border).classList.add(style.slidein)
    } else {
      document.getElementById(style.border).classList.add(style.slideout)
      document.getElementById(style.border).classList.remove(style.slidein)
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
  }, [])

  return (
    <>
      <div ref={sectionRef}>
        <div ref={AboutC} id={style.border} class="background">
          <div id={style.decor}>
            <hr></hr>
            <h1>ABOUT ME</h1>
            <hr></hr>
          </div>
          <div id={style.abu}>
            <img id={style.profile} src={profile} alt=""></img>
            <p>
                Hi, I’m Kishan Rajagunathas, currently developing my skills in
                Front End Web Development, with a goal to transition into Full
                Stack Development by the end of 2024. I’m pursuing a Bachelor of
                Science in Computer Science with a Minor in Statistics and
                Mathematics at Carleton University. <br/><br/>Through various projects,
                including a Movie Streaming Website (Vue.js, Firebase) and my
                portfolio (React.js), I’ve built responsive, user-focused
                applications that demonstrate my solid foundation in web
                technologies. You can also explore other projects in my
                portfolio showcasing my skills in Java and Python. <br/> <br/>I’m
                passionate about solving complex problems and transforming ideas
                into functional applications. I love diving into new frameworks,
                algorithms, and technologies, constantly pushing myself to grow
                as I work towards becoming a Full Stack Developer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
