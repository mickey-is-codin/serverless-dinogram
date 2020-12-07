import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';

const Navbar = (props: any) => {
  
  const LinkToHome = <Link to={'/'} className="hover:text-bone"><button>Home</button></Link>
  const LinkToTimeline = <Link to={'/timeline'} className="hover:text-bone"><button>Timeline</button></Link>
  const LinkToPeople = <Link to={'/people'} className="hover:text-bone"><button>People</button></Link>
  const LinkToAbout = <Link to={'/about'} className="hover:text-bone"><button>About</button></Link>

  return (
    <div className="navbar xs:p-4 sm:p-6 sm:text-2xl">
      <nav className="flex justify-around">
        {LinkToHome}
        {LinkToTimeline}
        {LinkToPeople}
        {LinkToAbout}
      </nav>
    </div>
  )
};

export default Navbar;