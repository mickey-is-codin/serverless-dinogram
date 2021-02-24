import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';
import { PageNames } from '../util/types';

const toClassName = (pageName: any) => (elementName: any): string => {
  const active = pageName === elementName;
  return `hover:text-bone ${active && 'text-bone'}`;
};

interface NavbarProps {
  pageName: string;
};
const Navbar: React.FC<NavbarProps> = (props) => {

  const { pageName } = props;

  console.log('pageName: ', pageName);

  const toCurrentActive = toClassName(pageName);
  
  const LinkToHome = (
    <Link to={'/'} className={toCurrentActive(PageNames["Home"])}>
      <div className="bg-green-700 px-4 py-2 rounded-md">
        <button>Home</button>
      </div>
    </Link>
  );
  const LinkToTimeline = (
    <Link to={'/timeline'} className={toCurrentActive(PageNames["Timeline"])}>
      <div className="bg-green-700 px-4 py-2 rounded-md">
        <button>Timeline</button>
      </div>
    </Link>
  );
  const LinkToPeople = (
    <Link to={'/people'} className={toCurrentActive(PageNames["People"])}>
      <div className="bg-green-700 px-4 py-2 rounded-md">
        <button>People</button>
      </div>
    </Link>
  );
  const LinkToAbout = (
    <Link to={'/about'} className={toCurrentActive(PageNames["About"])}>
      <div className="bg-green-700 px-4 py-2 rounded-md">
        <button>About</button>
      </div>
    </Link>
  );

  return (
    <div
      className="bg-teal-400 border-b-8 border-green-800 p-6 sm:text-2xl"
    >
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