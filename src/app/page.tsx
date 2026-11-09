import React from 'react'
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import {Features} from './components/Features';
import { About } from './components/About';
import { Footer } from './components/Footer';

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