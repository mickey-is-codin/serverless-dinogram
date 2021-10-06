import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdTimeline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';
import { BASE_TIMELINE_DATA, DNE } from '../util/constants';
import { pluck, toDetermineActiveClass } from '../util/fp';
import { PageNames } from '../util/types';
import { Campaign, Stratum } from '../util/types';

// TODO: Major Cleanup!

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
      <div className="text-3xl text-bone text-center mb-4">{name}</div>
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
    console.log('toggling');
    setSectionOpen((prevSectionState) => {
      return !prevSectionState;
    });
  };

  console.log(name, ' sectionOpen: ', sectionOpen);

  return (
    <div>
      <div className="text-2xl text-bone my-4" onClick={toggleSectionOpen}>{name}</div>
      {sectionOpen ? (
        <div className="mb-4">
          {data.map((value) => {
            const { current } = toRef(value);
            return (
              <div
                className="text-bone text-xl break-normal mx-2"
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

  const toNameExceptDNE = (stratum: Stratum): string => {
    const name: string = pluck('name')(stratum);
    if (name === DNE) return "";
    const time: number = pluck('start')(stratum) / 100;
    return `${name} (${time}Mya)`;
  };

  return (
    <Popup name="Geology Navigation">
      <div
        className="my-4 text-2xl text-bone"
        onClick={() => {
          onClose();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        Present Day
      </div>
      <div className="flex">
        <div className="flex-1" />
        <hr className="flex-none text-bone w-2/6" />
        <div className="flex-1" />
      </div>
      <MenuSection
        name="Dinosaurs"
        toName={(campaign: Campaign) => {
          const name: string = pluck('title')(campaign);
          const time: number = pluck('end')(campaign) / 100;
          return `${name} (${time}Mya)`;
        }}
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

interface NavPopupProps {
  pageName: string;
}
const NavPopup: React.FC<NavPopupProps> = (props) => {
  const { pageName } = props;

  return (
    <Popup name="Website Navigation">
      <nav className="flex flex-col justify-around">
        <Link to="/" className="text-2xl text-bone">
          <div className="flex">
            <div className="flex-1" />
            <button className="flex-none text-bone w-2/6">Home</button>
            <div className="flex-1" />
          </div>
          <div className="flex my-4">
            <div className="flex-1" />
            <hr className="flex-none text-bone w-2/6" />
            <div className="flex-1" />
          </div>
        </Link>
        <Link to="/people" className="text-2xl text-bone">
        <div className="flex">
            <div className="flex-1" />
            <button className="flex-none text-bone w-2/6">People</button>
            <div className="flex-1" />
          </div>
        </Link>
        <div className="flex my-4">
          <div className="flex-1" />
          <hr className="flex-none text-bone w-2/6" />
          <div className="flex-1" />
        </div>
        <Link to="/about" className="text-2xl text-bone">
          <div className="flex">
            <div className="flex-1" />
            <button className="flex-none text-bone w-2/6">About</button>
            <div className="flex-1" />
          </div>
        </Link>
        <div className="flex mt-4 mb-2">
          <div className="flex-1" />
          <hr className="flex-none text-bone w-2/6" />
          <div className="flex-1" />
        </div>
        <Link to="/contact" className="text-2xl text-bone">
          <div className="flex mt-2 mb-4">
            <div className="flex-1" />
            <button className="flex-none text-bone w-2/6">Contact</button>
            <div className="flex-1" />
          </div>
        </Link>
        <div className="flex">
          <div className="flex-1" />
          <hr className="flex-none text-bone w-2/6" />
          <div className="flex-1" />
        </div>
      </nav>
    </Popup>
  )
};

interface SmallScreenNavbarProps {
  campaignList?: Campaign[];
  pageName: string;
}
const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { campaignList, pageName } = props;

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

  const menusClosedClassName = "md:invisible fixed z-90 flex flex-col w-screen px-4 py-2";
  const menusOpenedClassName = "md:invisible fixed z-90 flex flex-col w-screen h-screen px-4 py-2";
  const navClassName = timelineOpen || navOpen ? menusOpenedClassName : menusClosedClassName;

  return (
    <div className={navClassName} >
      <div className="flex-none flex flex-row">
        <div className={timelineButtonClassName} >
          <MdTimeline size={buttonSize} onClick={() => {
            if (navOpen) {
              toggleTimeline();
              toggleMenu();
              return
            }
            toggleTimeline();
          }} />
        </div>
        <div className="flex-1" />
        <div className={menuButtonClassName} >
          <GiHamburgerMenu size={buttonSize} onClick={() => {
            if (timelineOpen) {
              toggleMenu();
              toggleTimeline();
              return
            }
            toggleMenu();
          }} />
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
        <NavPopup pageName={pageName} />
      ) : null}
    </div>
  );
};

interface LargeScreenNavbarProps {
  campaignList?: Campaign[]
  pageName: string;
};
const LargeScreenNavbar: React.FC<LargeScreenNavbarProps> = (props) => {
  const { pageName, campaignList } = props;
  const toClassName = toDetermineActiveClass(pageName);
  const buttonSize = 36;

  const [ timelineOpen, setTimelineOpen ] = useState(false);

  const toggleTimeline = () => {
    setTimelineOpen((prevTimelineState) => !prevTimelineState);
  };

  const name = "Geology Timeline";

  const onClose = () => {
    toggleTimeline();
  };

  const { eon: { strata: eons } } = BASE_TIMELINE_DATA;
  const { era: { strata: eras } } = BASE_TIMELINE_DATA;
  const { period: { strata: periods } } = BASE_TIMELINE_DATA;
  const { epoch: { strata: epochs } } = BASE_TIMELINE_DATA;

  const toNameExceptDNE = (stratum: Stratum): string => {
    const name: string = pluck('name')(stratum);
    if (name === DNE) return "";
    const time: number = pluck('start')(stratum) / 100;
    return `${name} (${time}Mya)`;
  };

  return (
    <div className="w-full invisible md:visible fixed flex z-90 justify-around my-2 mx-4">
      <div className="bg-white rounded-md flex-grow-none p-2 z-90" >
        <MdTimeline size={buttonSize} onClick={toggleTimeline} />
      </div>
      <nav className="flex-1 flex justify-around">
        <NavLink route="/" pageName="Home" className={toClassName(PageNames.TIMELINE)} />
        <NavLink route="/people" pageName="People" className={toClassName(PageNames.PEOPLE)} />
        <NavLink route="/about" pageName="About" className={toClassName(PageNames.ABOUT)} />
        <NavLink route="/contact" pageName="Contact" className={toClassName(PageNames.CONTACT)} />
      </nav>
      {campaignList && timelineOpen ? (
        <div className="fixed left-0 top-0 mx-4 h-2/6 w-2/6 h-screen flex flex-col">
          <div className="flex-grow-none h-24 pointer-events-none" />
          <div className="z-80 flex-1 mb-24 rounded-md bg-black bg-opacity-50 backdrop-filter backdrop-blur-xl overflow-scroll">
            <div className="text-3xl text-bone">{name}</div>
            <div className="text-bone 2xl content-center">
              <div
                className="mb-4"
                onClick={() => {
                  onClose();
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Present Day
              </div>
              <div className="flex">
                <div className="flex-1" />
                <hr className="flex-none text-bone w-2/6" />
                <div className="flex-1" />
              </div>
            </div>
            <MenuSection
              name="Dinosaurs"
              toName={(campaign: Campaign) => {
                const name: string = pluck('title')(campaign);
                const time: number = pluck('end')(campaign) / 100;
                return `${name} (${time}Mya)`;
              }}
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
          </div>
        </div>
      ) : null}
    </div>
  );
};

interface NavbarProps {
  pageName: string;
  campaignList?: Campaign[];
};
const Navbar: React.FC<NavbarProps> = (props) => {
  const { pageName, campaignList } = props;

  return (
    <NavbarBase>
      <LargeScreenNavbar campaignList={campaignList} pageName={pageName} />
      <SmallScreenNavbar campaignList={campaignList} pageName={pageName} />
    </NavbarBase>
  );
};

export default Navbar;