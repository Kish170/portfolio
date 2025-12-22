import sti from './Exp.module.css';
import { useEffect, useRef } from 'react';

export default function Exp({ExpC}) {
    const sectionRef = useRef(null)
    const options = {
        root: null,
        threshold: 0.1,
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
    },[options]);


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
                    <div className={`${sti.exps} ${sti.expCard1}`}>
                        <div className={sti.accentBar}></div>
                        <div className={sti.cardContent}>
                            <div className={sti.roleTag}>Data Science</div>
                            <h2 className={sti.position}>Data Scientist Intern</h2>
                            <h3 className={sti.company}>theScore</h3>
                            <div className={sti.techStack}>
                                <span className={sti.techText}>Python</span>
                                <span className={sti.techText}>SQL</span>
                                <span className={sti.techText}>BigQuery</span>
                                <span className={sti.techText}>scikit-learn</span>
                            </div>
                            <div className={sti.details}>
                                <span className={sti.date}>Sept 2025 - Dec 2025</span>
                                <span className={sti.separator}>•</span>
                                <span className={sti.location}>Toronto, ON</span>
                            </div>
                            <p className={sti.description}>Built data-driven risk frameworks to identify fraud patterns and optimize marketing efficiency.</p>
                        </div>
                    </div>
                    <div className={`${sti.exps} ${sti.expCard2}`}>
                        <div className={sti.accentBar}></div>
                        <div className={sti.cardContent}>
                            <div className={sti.roleTag}>Software Engineering</div>
                            <h2 className={sti.position}>Software Engineer Intern</h2>
                            <h3 className={sti.company}>theScore</h3>
                            <div className={sti.techStack}>
                                <span className={sti.techText}>Kotlin</span>
                                <span className={sti.techText}>Java</span>
                                <span className={sti.techText}>FastAPI</span>
                                <span className={sti.techText}>MongoDB</span>
                                <span className={sti.techText}>Kafka</span>
                            </div>
                            <div className={sti.details}>
                                <span className={sti.date}>May 2025 - Aug 2025</span>
                                <span className={sti.separator}>•</span>
                                <span className={sti.location}>Toronto, ON</span>
                            </div>
                            <p className={sti.description}>Engineered scalable developer tooling to streamline testing and improve system reliability for millions of users.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}