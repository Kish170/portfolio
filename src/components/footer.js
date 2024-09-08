import stu from './foot.module.css'
import link from '../images/linkdin.png'
import git from '../images/git.png'

export default function Foot() {
    return (
    <>
        <div id={stu.banner}>
            <h2>KISHANRAJAGUNATHAS</h2>
            <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/">
                <img src={link}/>
            </a>
            <a href="https://github.com/Kish170">
                <img src={git}/>
            </a>
        </div>
    </>
    );
}