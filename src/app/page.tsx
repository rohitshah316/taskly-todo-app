import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";


const page = () => {
  return (
    <div className="">
      <Navbar/>
      <Hero/>
      <Features/>
      <About/>
      <Footer/>
    </div>
  )
}

export default page