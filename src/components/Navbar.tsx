import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdTimeline } from 'react-icons/md';
// import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';
import { BASE_TIMELINE_DATA, DNE } from '../util/constants';
import { pluck } from '../util/fp';
// import { PageNames } from '../util/types';
// import { BASE_TIMELINE_DATA, NAV_MENU_ITEMS } from '../util/constants';
// import { pluck } from '../util/fp';
import { Campaign } from '../util/types';
// import { GeologicTimeline } from '../util/types';

// const toDetermineActiveClass = (
//   pageName: string
// ) => (
//   elementName: string
// ): string => {
//   const active = pageName === elementName;
//   return `hover:text-bone ${active && 'text-bone'}`;
// };

// interface NavLinkProps {
//   route: string;
//   pageName: string;
//   className: string;
// };
// const NavLink: React.FC<NavLinkProps> = (props) => {
//   const { route, pageName, className } = props;
//   return (
//     <Link to={route} className={className}>
//       <div className="bg-green-700 px-4 py-2 rounded-md">
//         <button>{pageName}</button>
//       </div>
//     </Link>
//   )
// };

// interface NavbarProps {
//   pageName: string;
// };
// const Navbar: React.FC<NavbarProps> = (props) => {

//   const { pageName } = props;
//   const toClassName = toDetermineActiveClass(pageName);

//   return (
//     <div
//       className="bg-teal-400 border-b-8 border-green-800 p-6 sm:text-2xl"
//     >
//       <nav className="flex justify-around">
//         <NavLink route="/" pageName="Home" className={toClassName(PageNames["Timeline"])} />
//         <NavLink route="/people" pageName="People" className={toClassName(PageNames["People"])} />
//         <NavLink route="/about" pageName="About" className={toClassName(PageNames["About"])} />
//         <NavLink route="/contact" pageName="Contact" className={toClassName(PageNames["Contact"])} />
//       </nav>
//     </div>
//   )
// };


interface NavbarBaseProps {

};
const NavbarBase: React.FC<NavbarBaseProps> = (props) => {
  const { children } = props;

  return (
    <div
      className="bg-teal-400 border-b-8 border-green-800 sm:text-2xl h-20 w-screen"
    >
      {children}
    </div>
  );
};

interface PopupProps {
  name: string;
};
const Popup: React.FC<PopupProps> = (props) => {
  const { name, children } = props;

  return (
    <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl w-full flex-1 z-90 my-2 rounded-lg overflow-scroll">
      <div className="text-3xl text-bone">{name}</div>
      {children}
    </div>
  );
};

interface MenuSectionProps {
  name: string;
  data: any[];
  toName: (x: any) => string,
  toRef: (x: any) => React.MutableRefObject<(HTMLDivElement | null)>,
  onClose: () => void;
}
const MenuSection: React.FC<MenuSectionProps> = (props) => {
  const { name, data, toName, toRef, onClose } = props;

  const [ sectionOpen, setSectionOpen ] = useState(false);

  const toggleSectionOpen = () => {
    setSectionOpen((prevSectionState) => {
      return !prevSectionState;
    });
  };

  return (
    <div>
      <div className="text-2xl text-bone my-4" onClick={toggleSectionOpen}>{name}</div>
      {sectionOpen ? (
        <div className="mb-4">
          {data.map((value) => {
            const { current } = toRef(value);
            return (
              <div
                className="text-bone text-xl"
                key={`campaign-data-${toName(value)}`}
                onClick={() => {
                  onClose();
                  if (current) return current.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {toName(value)}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="flex">
        <div className="flex-1" />
        <hr className="flex-none text-bone w-2/6" />
        <div className="flex-1" />
      </div>
    </div>
  );
};

interface TimelinePopupProps {
  campaignList: Campaign[];
  onClose: () => void;
};
const TimelinePopup: React.FC<TimelinePopupProps> = (props) => {
  const { campaignList, onClose } = props;

  const { eon: { strata: eons } } = BASE_TIMELINE_DATA;
  const { era: { strata: eras } } = BASE_TIMELINE_DATA;
  const { period: { strata: periods } } = BASE_TIMELINE_DATA;
  const { epoch: { strata: epochs } } = BASE_TIMELINE_DATA;

  const toNameExceptDNE = (x: any): string => {
    return pluck('name')(x) !== DNE ? pluck('name')(x) : () => "";
  };

  return (
    <Popup name="Geology Navigation">
      <MenuSection
        name="Dinosaurs"
        toName={pluck('title')}
        toRef={pluck('ref')}
        data={campaignList}
        onClose={onClose}
      />
      <MenuSection
        name="Eons"
        toName={toNameExceptDNE}
        toRef={pluck('ref')}
        data={eons}
        onClose={onClose}
      />
      <MenuSection
        name="Eras"
        toName={toNameExceptDNE}
        toRef={pluck('ref')}
        data={eras}
        onClose={onClose}
      />
      <MenuSection
        name="Periods"
        toName={toNameExceptDNE}
        toRef={pluck('ref')}
        data={periods}
        onClose={onClose}
      />
      <MenuSection
        name="Epochs"
        toName={toNameExceptDNE}
        toRef={pluck('ref')}
        data={epochs}
        onClose={onClose}
      />
    </Popup>
  )
};

const NavPopup = () => {
  return (
    <Popup name="Website Navigation">
      <div>
        Menu
      </div>
    </Popup>
  )
};

interface SmallScreenNavbarProps {
  campaignList?: Campaign[];
}
const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { campaignList } = props;

  const timelineButtonClassName = "flex-none bg-white rounded-md p-2";
  const menuButtonClassName = "flex-none bg-white rounded-md p-2";
  const buttonSize = 36;

  const [ timelineOpen, setTimelineOpen ] = useState(false);
  const [ navOpen, setNavOpen ] = useState(false);

  const toggleTimeline = () => {
    setTimelineOpen((prevTimelineState) => !prevTimelineState);
  };
  const toggleMenu = () => {
    setNavOpen((prevNavState) => !prevNavState);
  };

  const menusClosedClassName = "fixed z-90 flex flex-col w-screen px-4 py-2";
  const menusOpenedClassName = "fixed z-90 flex flex-col w-screen h-screen px-4 py-2";
  const navClassName = timelineOpen || navOpen ? menusOpenedClassName : menusClosedClassName;

  return (
    <div className={navClassName} >
      <div className="flex-none flex flex-row">
        <div className={timelineButtonClassName} >
          <MdTimeline size={buttonSize} onClick={toggleTimeline} />
        </div>
        <div className="flex-1" />
        <div className={menuButtonClassName} >
          <GiHamburgerMenu size={buttonSize} onClick={toggleMenu} />
        </div>
      </div>
      {campaignList && timelineOpen ? (
        <TimelinePopup
          campaignList={campaignList}
          onClose={() => {
            toggleTimeline();
          }}
        />
      ) : null}
      {navOpen ? (
        <NavPopup />
      ) : null}
    </div>
  );
};

// const LargeScreenNavbar = () => {
//   return (
//     <div>

//     </div>
//   );
// };

interface NavbarProps {
  pageName: string;
  campaignList?: Campaign[];
};
const Navbar: React.FC<NavbarProps> = (props) => {
  const { pageName, campaignList } = props;
  console.log('pageName: ', pageName);

  return (
    <NavbarBase>
      {/* <LargeScreenNavbar /> */}
      <SmallScreenNavbar campaignList={campaignList} />
    </NavbarBase>
  );
};

export default Navbar;