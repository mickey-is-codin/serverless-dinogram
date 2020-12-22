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

  const toCurrentActive = toClassName(pageName);
  
  const LinkToHome = (<Link to={'/'} className={toCurrentActive(PageNames["Home"])}><button>Home</button></Link>);
  const LinkToTimeline = (<Link to={'/timeline'} className={toCurrentActive(PageNames["Timeline"])}><button>Timeline</button></Link>);
  const LinkToPeople = (<Link to={'/people'} className={toCurrentActive(PageNames["People"])}><button>People</button></Link>);
  const LinkToAbout = (<Link to={'/about'} className={toCurrentActive(PageNames["About"])}><button>About</button></Link>);

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