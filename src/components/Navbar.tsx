import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';
import { PageNames } from '../util/types';

const toDetermineActiveClass = (
  pageName: string
) => (
  elementName: string
): string => {
  const active = pageName === elementName;
  return `hover:text-bone ${active && 'text-bone'}`;
};

interface NavLinkProps {
  route: string;
  pageName: string;
  className: string;
};
const NavLink: React.FC<NavLinkProps> = (props) => {
  const { route, pageName, className } = props;
  return (
    <Link to={route} className={className}>
      <div className="bg-green-700 px-4 py-2 rounded-md">
        <button>{pageName}</button>
      </div>
    </Link>
  )
};

interface NavbarProps {
  pageName: string;
};
const Navbar: React.FC<NavbarProps> = (props) => {

  const { pageName } = props;
  const toClassName = toDetermineActiveClass(pageName);

  return (
    <div
      className="bg-teal-400 border-b-8 border-green-800 p-6 sm:text-2xl"
    >
      <nav className="flex justify-around">
        <NavLink route="/" pageName="Home" className={toClassName(PageNames["Home"])} />
        <NavLink route="/timeline" pageName="Timeline" className={toClassName(PageNames["Timeline"])} />
        <NavLink route="/people" pageName="People" className={toClassName(PageNames["People"])} />
        <NavLink route="/about" pageName="About" className={toClassName(PageNames["About"])} />
        <NavLink route="/contact" pageName="Contact" className={toClassName(PageNames["Contact"])} />
      </nav>
    </div>
  )
};

export default Navbar;