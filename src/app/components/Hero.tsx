import { LucideArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export const Hero = () => {
  return (
    <section id="#home" className="h-90 flex flex-col items-center justify-center bg-green-300 text-purple-900">
        <p className="font-bold text-3xl ">Add your Task for seamless Management</p>
        <Link href="/register" className="bg-white w-40 px-5 font-bold py-2 mt-5 rounded-2xl flex gap-3 justify-between items-center hover:bg-green-100 transition">Try it Free <LucideArrowRight className="bg-gray-300 rounded-4xl transition hover:translate-x-1 "/></Link>

    </section>
  )
}
