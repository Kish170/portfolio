import stu from './Footer.module.css'
export default function Foot() {
    return (
    <>
        <div className='background' id={stu.banner}>
            <h2 className='footer'>Kishan Rajagunathas &#169;</h2>
            <div className='footlinks'>
                <a href="https://www.linkedin.com/in/kishan-rajagunathas-54a2a7245/" target='_blank'>
                    <div id="link"/>
                </a>
                <a href="https://github.com/Kish170" target='_blank'>
                    <div id="git"/>
                </a>
            </div>
        </div>
    </>
    );
}