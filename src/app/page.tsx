import React from 'react'
import Navbar from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import {Features} from './components/landing/Features';
import { About } from './components/landing/About';
import { Footer } from './components/landing/Footer';

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