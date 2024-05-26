import style from './edu.module.css'

export default function Edu({EduC}) {
    return (
    <>
        <div ref={EduC} id={style.banner}>
            <div id={style.edu}>
                <h1>EDUCATION</h1>
                <h2 class={style.green}>Bachelor of Science in Computer Science, Honours</h2>
                <h3>Carleton University</h3>
                <p>Ottawa, ON</p>
                <h2 class={style.green}>Course Work</h2>
                <h3>First Year Courses</h3>
                <ul>
                    <li>Introduction to Statistics Modelling</li>
                    <li>Linear Algebra</li>
                    <li>Introduction to Computer Science</li>
                    <li>Discrete Structures</li>
                    <li id={style.odd}>Abstract Data Types and Algorithms</li>
                </ul>
            </div>
            <div id={style.skills}>
                <h1>SKILLS</h1>
                    <div class={style.part}>
                        <div class={style.sskills}>
                            <h2 class={style.green}>LANGUAGES:</h2>
                                <ul>
                                    <li>Java</li>
                                    <li>Python</li>
                                    <li>Javascript</li>
                                    <li>CSS</li>
                                    <li>HTML</li>
                                </ul>
                        </div>
                        <div class={style.sskills}>
                            <h2 class={style.green}>DEVELOPER TOOLS:</h2>
                                <ul>
                                    <li>Visual Studio Code</li>
                                    <li>IntelliJ</li>
                                    <li>GitHub/Git</li>
                                    <li>Processing</li>
                                </ul>
                        </div>
                    </div>
                    <div class={style.part}>
                        <div class={style.sskills}>
                            <h2 class={style.green}>TECHNOLOGIES:</h2>
                                <ul>
                                    <li>JavaFX</li>
                                    <li>Vue.js</li>
                                    <li>JSON</li>
                                    <li>Axios</li>
                                    <li>Pinia</li>
                                    <li>Firebase</li>
                                    <li id={style.lodd}>Node.js</li>
                                </ul>
                            </div>
                        <div class={style.sskills}>
                            <h2 class={style.green}>SOFT SKILLS:</h2>
                                <ul>
                                    <li>Sales</li>
                                    <li>Design</li>
                                    <li>IT communication</li>
                                    <li>Teamwork</li>
                                </ul>
                        </div>
                    </div>     
            </div>
        </div>
    </>
    );
}