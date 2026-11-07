import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center bg-gray-600 text-white px-10 py-5">
        <h1 className="font-bold text-3xl">Taskly Todo App</h1>
        <ul className="hidden gap-6 md:flex">
            <Link className="font-semibold hover:underline" href="#">Home</Link>
            <Link className="font-semibold hover:underline" href="#features">Features</Link>
            <Link className="font-semibold hover:underline" href="#about">About</Link>
        </ul>
        <ul className="flex flex-col md:flex-row gap-2">
            <Link className="w-25 text-center rounded-xl font-semibold bg-blue-500 px-5 py-2" href="">Sign Up</Link>
            <Link className="w-25 text-center rounded-xl font-semibold bg-green-500 px-5 py-2" href="">Login</Link>
            
        </ul>
    </nav> 
     )
}

export default Navbar