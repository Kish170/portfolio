import Navbar from "./components/Navbar/navbar.js";
import About from "./components/about.js"
import Hero from "./components/hero"
import Edu from "./components/edu.js";
import Exp from "./components/exp.js";
import Proj from "./components/proj.js";
import Foot from "./components/footer.js";
import Switch from "react-switch";
import { useRef } from "react";

function App() {
  const AboutRef = useRef(null)
  const EduRef = useRef(null)
  const HeroRef = useRef(null)
  const ProjRef = useRef(null)
  const ExpRef = useRef(null)

  const refs = {
    AboutC: AboutRef,
    EduC: EduRef,
    HeroC: HeroRef,
    ProjC: ProjRef,
    ExpC: ExpRef
  }

  return (
    <>
      <Navbar refs={refs}/>
      <Hero HeroC={HeroRef}/>
      <About AboutC={AboutRef}/>
      <Edu EduC={EduRef}/>
      <Exp ExpC={ExpRef}/>
      <Proj ProjC={ProjRef}/>
      <Foot/>
    </>
  );
}

export default App;
