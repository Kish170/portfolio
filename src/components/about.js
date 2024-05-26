import profile from '../images/profile.JPG'
import style from './about.module.css';


export default function About({AboutC}) {
    return (
    <>
        <div ref={AboutC} id={style.banner}>
            <div id={style.border}>
                <img id={style.profile} src={profile} alt=""></img>
                <div id={style.text}>
                    <div id={style.abu}>
                        <h1>ABOUT ME</h1>
                        <p>I love exploring how extended reality 
                            (XR) technologies can inspire and 
                            facilitate creativity. From publishing 
                            research on VR interactions during my 
                            master's to working on the engineering 
                            behind those experiences, I want to help 
                            build tools that enable novel interactions 
                            with immersive technologies. Let's connect 
                            and chat about XR, HCI, or your latest craft idea!</p>
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
                            <td>
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=kishanrajagunathas@gmail.com" >kishanrajagunathas@gmail.com</a>
                            </td>
                            <tr>
                                <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/">Click for LinkedIn</a>
                            </tr>
                            <td>
                                <a href="https://github.com/Kish170">Click for GitHub</a>
                            </td>
                            <tr>
                                <a>kishanrajagunathas@gmail.com</a>
                            </tr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}