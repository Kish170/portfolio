import profile from "../images/profile.JPG";
import style from "./about.module.css";

export default function About({ AboutC }) {
  return (
    <>
      <div ref={AboutC} id={style.banner}>
        <div id={style.border}>
          <img id={style.profile} src={profile} alt=""></img>
          <div id={style.text}>
            <div id={style.abu}>
              <h1>ABOUT ME</h1>
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
            <div id={style.links}>
              <h1>PERSONAL LINKS</h1>
              <div className={style.linknames}>
                <h3>Email: </h3>
                <h3>LinkedIn: </h3>
                <h3>GitHub: </h3>
                <h3>Resume: </h3>
              </div>
              <div className={style.linkers}>
                <tr>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=kishanrajagunathas@gmail.com">
                    kishanrajagunathas@gmail.com
                  </a>
                </tr>
                <tr>
                  <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/">
                    Click for LinkedIn
                  </a>
                </tr>
                <tr>
                  <a href="https://github.com/Kish170">Click for GitHub</a>
                </tr>
                <tr>
                  <a href="https://violet-aida-64.tiiny.site/">
                    Click for Resume
                  </a>
                </tr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
