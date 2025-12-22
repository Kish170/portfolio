import Navbar from "./components/Navbar.jsx";
// import About from "./components/About.jsx";
import Hero from "./components/Hero.jsx";
import Edu from "./components/Edu.jsx";
import Exp from "./components/Exp.jsx";
import Proj from "./components/Proj.jsx";
import Foot from "./components/Footer.jsx";
import { useRef } from "react";

function App() {
  const AboutRef = useRef(null)
  const EduRef = useRef(null)
  const HeroRef = useRef(null)
  const ProjectRef = useRef(null)
  const ExpRef = useRef(null)

  const refs = {
    AboutC: AboutRef,
    EduC: EduRef,
    HeroC: HeroRef,
    ProjC: ProjectRef,
    ExpC: ExpRef
  }

  return (
    <>
      <Navbar refs={refs}/>
      <Hero HeroC={HeroRef}/>
      <Exp ExpC={ExpRef}/>
      {/* <About AboutC={AboutRef}/> */}
      <Edu EduC={EduRef}/>
      <Proj ProjC={ProjectRef}/>
      <Foot/>
    </>
  );
}

export default App;
