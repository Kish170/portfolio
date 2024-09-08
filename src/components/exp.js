import profile from '../images/download.jpg'
import sti from './exp.module.css'

export default function Exp({ExpC}) {
    return (
    <>
        <div ref={ExpC}id={sti.ban}>
            <h1>EXPERIENCE</h1>
            <div class={sti.expb}>
                <div class={sti.exps}>
                    <h2>VICE PRESIDENT OF TECHNOLOGY OF BOOKERIES</h2>
                    <h3>TIMELINE: 11/2023 - 04/2024</h3>
                    <ul>
                        <li>Worked with a team to create a website using Shopify and placed top in Ontario and 3rd in Canada for Best Store Builder of the Year Award</li>
                        <li>Made alterations to the appearance of the website theme through the source code by adding our own visual elements and creating media queries for them</li>
                        <li>Managed virtual communication and technology problems that arose in other departments.</li>
                    </ul>
                </div>
                <div class={sti.exps}>
                    <h2>YOUR VOICE IS POWER HACKATHON</h2>
                    <h3>TIMELINE: 11/2022</h3>
                    <ul>
                        <li>Working with a partner to compose music using beats and rhythms provided by the artists who sponsored the event using our programming skills and secured a position among the top 40 finalists from a pool of hundreds of contestants in the competition.</li>
                        <li>Worked with EarSketch’s environment using Python to access the multiple rhythms and beats provided to construct a soundtrack of approximately 2 minutes</li>
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
}