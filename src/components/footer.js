import stu from './foot.module.css'
import link from '../images/linkdin.png'
import git from '../images/git.png'

export default function Foot() {
    return (
    <>
        <div className='background' id={stu.banner}>
            <h2 className='footer'>Kishan Rajagunathas &#169;</h2>
            <div className='footlinks'>
                <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/">
                    <div id="link"/>
                </a>
                <a href="https://github.com/Kish170">
                    <div id="git"/>
                </a>
            </div>
        </div>
    </>
    );
}