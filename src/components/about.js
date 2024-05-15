import profile from '../images/profile.JPG'
import style from './about.module.css';


export default function About({AboutC}) {
    return (
    <>
        <div ref={AboutC} id={style.banner}>
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
                            <p>kishanrajagunathas@gmail.com</p>
                            <p>kishanrajagunathas@gmail.com</p>
                            <p>kishanrajagunathas@gmail.com</p>
                            <p>kishanrajagunathas@gmail.com</p>
                        </div>
                    </div>
                </div>
          
        </div>
    </>
    );
}