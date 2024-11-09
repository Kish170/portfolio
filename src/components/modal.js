// import React from 'react'
// import sty from './modal.module.css'
// import { useEffect } from 'react';
// import emp from '../images/download.jpg'
// import movie from '../images/movie.png'
// import crawl from '../images/crawl.png'
// import web from '../images/webpage.png'
// import quix from '../images/quiz.png'

// export default function Modal({ setIsOpen, activeProj}) {

//     const closeModal = () => {
//         setIsOpen(false);
//         document.body.style.overflow = 'auto';  
//     }

//     useEffect(() => {
//         document.body.style.overflow = 'hidden';
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, []);
    
//     return (
//         <>  
//             <div id={sty.box} onClick={() => closeModal()}>
//                 <div id={sty.modal} onClick={(e) => e.stopPropagation()}>
//                     <div id={sty.info}>
//                         <div style={{ display: activeProj === "proj_one" ? 'inline' : 'none'}}class={sty.projes} >
//                         <div id={sty.x} onClick={() => closeModal()}></div>
//                             <div class={sty.partOne}>
//                                 <div class={sty.one}>
//                                     <h1>QUIZ GAME</h1>
//                                     <div class={sty.imga}>
//                                         <img src={quix}></img>
//                                     </div>
//                                 </div>
//                                 <div class={sty.partTwo}>
//                                     <div class={sty.deets}>
//                                         <h3>TIMELINE:</h3>
//                                         <ul>
//                                             <li>04/2021</li>
//                                         </ul>
//                                         <h3>TECH STACK:</h3>
//                                         <ul>
//                                             <li>Python</li>
//                                             <li>Processing</li>
//                                         </ul>
//                                     </div>
//                                     <p>I created a quiz game focused on Computer Science topics using Processing 
//                                         which facilitated the development of this visually oriented application. To make the 
//                                         game appear more appealing I incorporated animations and sound effects and created a 
//                                         scoreboard so users could see their progress over time. I used third-party libraries to 
//                                         perform certain functionalities such as creating a timer and adding sound effects to 
//                                         captivate further and engage users
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ display: activeProj === "proj_two" ? 'inline' : 'none'}} class={sty.projes}>
//                             <div id={sty.x} onClick={() => closeModal()}></div>
//                             <div class={sty.partOne}>
//                                 <div class={sty.one}>
//                                     <h1>TERRY PICTURES(MOVIE STREAMING WEBSITE)</h1>
//                                     <div class={sty.imga}>
//                                         <img src={movie}></img>
//                                     </div>
//                                 </div>
//                                 <div class={sty.partTwo}>
//                                     <div class={sty.deets}>
//                                         <h3>TIMELINE:</h3>
//                                         <ul>
//                                             <li>02/2023</li>
//                                         </ul>
//                                         <h3>TECH STACK:</h3>
//                                         <ul>
//                                             <li>Javascript</li>
//                                             <li>GitHub</li>
//                                             <li>Vue.js</li>
//                                             <li>Firebase</li>
//                                             <li>Pinia</li>
//                                             <li>Axios</li>
//                                             <li>NoSQL</li>
//                                             <li>HTML/CSS</li>
//                                             <li>TMDb API</li>
//                                         </ul>
//                                     </div>
//                                     <p>I created a movie streaming website that allows users to browse 
//                                         through movies based on their search queries or through specific genres. In 
//                                         order to deploy the web application, store data retrieved from the API, and 
//                                         provide secure user authentication, I used Firebase technologies: Hosting, 
//                                         Firebase, and Authentication. Utilized Axios to make it easy to interact and 
//                                         retrieve data from the TMDb API
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ display: activeProj === "proj_three" ? 'inline' : 'none'}} class={sty.projes}>
//                             <div id={sty.x} onClick={() => closeModal()}></div>
//                             <div class={sty.partOne}>
//                                 <div class={sty.one}>
//                                     <h1>WEB CRAWLER + SEARCH ENGINE</h1>
//                                     <div class={sty.imga}>
//                                         <img src={crawl}></img>
//                                     </div>
//                                 </div>
//                                 <div class={sty.partTwo}>
//                                     <div class={sty.deets}>
//                                         <h3>TIMELINE: </h3>
//                                         <ul>
//                                             <li>12/2023</li>
//                                         </ul>
//                                         <h3>TECH STACK:</h3>
//                                         <ul>
//                                             <li>Java</li>
//                                             <li>JavaFX</li>
//                                         </ul> 
//                                     </div>
//                                     <p>I worked with a colleague to create a Web Crawler and Search Engine. 
//                                         To recieve more information on this project please contact me directly as I am unable 
//                                         to currently disclose an information on the project due to Carleton Universitiy's Academic Integrity Policy
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div style={{ display: activeProj === "proj_four" ? 'inline' : 'none'}} class={sty.projes}>
//                             <div id={sty.x} onClick={() => closeModal()}></div>
//                             <div class={sty.partOne}>
//                                 <div class={sty.one}>
//                                     <h1>WEBSITE PORTFOLIO</h1>
//                                     <div class={sty.imga}>
//                                         <img src={web}></img>
//                                     </div>
//                                 </div>
//                                 <div class={sty.partTwo}>
//                                     <div class={sty.deets}> 
//                                         <h3>TIMELINE: </h3>
//                                         <ul>
//                                             <li>05/2024</li>
//                                         </ul>
//                                         <h3>TECH STACK:</h3>
//                                         <ul>
//                                             <li>React.js</li>
//                                             <li>Javascript</li>
//                                             <li>HTML/CSS</li>
//                                         </ul>
//                                     </div>
//                                     <p>IDK YET ILL ADD Later</p> 
//                                 </div>
//                             </div>
//                         </div>
//                     </div>       
//                 </div>
//             </div>
//         </>
//     )
// }