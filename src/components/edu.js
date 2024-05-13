import profile from '../images/download.jpg'
import './hero.css'


export default function Edu({EduC}) {
    return (
    <>
        <div ref={EduC} id="banner">
            <img src={profile} alt=""></img>
            <div id="text">
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
            <div id="links">
                <h1>PERSONAL LINKS</h1>
                <p>Email: </p>
            </div>
        </div>
    </>
    );
}