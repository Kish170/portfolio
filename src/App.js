import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import About from "./components/about.js"
import Hero from "./components/hero"
import Edu from "./components/edu.js";
import Exp from "./components/exp.js";
import Skills from "./components/skills.js";
import Proj from "./components/proj.js";
import { useRef } from "react"

function App() {
  const AboutRef = useRef(null)
  const EduRef = useRef(null)
  const HeroRef = useRef(null)
  const ProjRef = useRef(null)
  const ExpRef = useRef(null)
  const SkillsRef = useRef(null)

  const refs = {
    AboutC: AboutRef,
    EduC: EduRef,
    HeroC: HeroRef,
    ProjC: ProjRef,
    ExpC: ExpRef,
    SkillsC: SkillsRef
  }


  return (
    <>
      <Navbar refs={refs}/>
      <Hero HeroC={HeroRef}/>
      <About AboutC={AboutRef}/>
      <Edu EduC={EduRef}/>
      <Proj ProjC={ProjRef}/>
      <Exp ExpC={ExpRef}/>
      <Skills SkillsC={SkillsRef}/>
    </>
  );
}

export default App;
