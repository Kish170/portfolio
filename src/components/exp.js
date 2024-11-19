import profile from '../images/download.jpg'
import sti from './exp.module.css'
import { useEffect, useRef } from 'react';

export default function Exp({ExpC}) {
    const sectionRef = useRef(null)
    const options = {
        root: null,
        threshold: 0.05,
        rootMargin: "0px"
    }
    const callbackFunction = (entries) => {
        const[entry] = entries
        if (entry.isIntersecting) {
          document.getElementsByClassName(sti.border)[0].classList.add(sti.slidein)
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
    },[]);


    return (
    <>
        <div ref={sectionRef}>
            <div ref={ExpC} className={`${sti.border} banner_col`}>
                <div className={`decor`}>
                    <hr></hr>
                    <h1>EXPERIENCE</h1>
                    <hr></hr>
                </div>
                <div className={sti.expb}>
                    <div className={`background ${sti.exps}`}>
                        <h2>VICE PRESIDENT OF TECHNOLOGY OF BOOKERIES</h2>
                        <h3>TIMELINE: 11/2023 - 04/2024</h3>
                        <ul>
                            <li>Worked with a team to create a website using Shopify and placed top in Ontario and 3rd in Canada for Best Store Builder of the Year Award</li>
                            <li>Made alterations to the appearance of the website theme through the source code by adding our own visual elements and creating media queries for them</li>
                            <li>Managed virtual communication and technology problems that arose in other departments.</li>
                        </ul>
                    </div>
                    <div  className={`background ${sti.exps}`}>
                        <h2>YOUR VOICE IS POWER HACKATHON</h2>
                        <h3>TIMELINE: 11/2022</h3>
                        <ul>
                            <li>Worked with a partner to compose music using beats and rhythms provided by the artists who sponsored the event using our programming skills </li>
                            <li>Secured a position among the top 40 finalists from a pool of hundreds of contestants in the competition.</li>
                            <li>Worked with EarSketch’s environment using Python to access the multiple rhythms and beats provided to construct a soundtrack of approximately 2 minutes</li>
                        </ul>
                    </div>
                    <div  className={`background ${sti.exps}`}>
                        <h2>INNOVATENOW HACKATHON</h2>
                        <h3>TIMELINE: 10/2024</h3>
                        <ul>
                            <li>Collaborated with a team to develop, Vitalog, a healthcare solution aimed at empowering providers to track patient vitals more efficiently while educating citizens on proactive self-care.</li>
                            <li>Designed and built a prototype website using React.js and Chakra UI, creating a responsive and intuitive user interface</li>
                            <li>Presented the concept to judges, clearly articulating its potential impact on healthcare management and health awareness</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}