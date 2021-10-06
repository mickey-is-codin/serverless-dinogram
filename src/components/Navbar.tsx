import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdTimeline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../styles/tailwind.output.css';
import { BASE_TIMELINE_DATA, DEFAULT_POPUP_CLASSNAME, GEOLOGY_MENU_NAME, ICON_SIZE, LOADING_TEXT, NAV_CLOSED_CLASS_NAME, NAV_MENU_NAME, NAV_OPENED_CLASS_NAME } from '../util/constants';
import { invert, pluck, toNavClass, toNameExceptDNE, toCampaignMenuName } from '../util/fp';
import { PageNames } from '../util/types';
import { Campaign } from '../util/types';

const Loading: React.FC = () => {
  return (
    <div className="text-bone text-2xl my-4">
      {LOADING_TEXT}
    </div>
  );
};

const MenuBreak: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-1" />
      <hr className="flex-none text-bone w-2/6" />
      <div className="flex-1" />
    </div>
  );
};

interface MenuIconProps {
  Icon: IconType;
  onClick: () => void;
  className: string;
};
const MenuIcon: React.FC<MenuIconProps> = (props) => {
  const { Icon, onClick, className } = props;

  return (
    <div className={className} >
      <Icon size={ICON_SIZE} onClick={onClick} />
    </div>
  );
};

interface PresentDayProps {
  className: string;
  onClose: () => void;
};
const PresentDay: React.FC<PresentDayProps> = (props) => {
  const { className, onClose } = props;

  return (
    <>
      <div
        className={className}
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
      <MenuBreak />
    </>
  )
};

interface NavLinkProps {
  route: string;
  pageName: PageNames;
  className: string;
};
const NavLink: React.FC<NavLinkProps> = (props) => {
  const { route, pageName, className } = props;
  return (
    <Link to={route} className={className}>
      <button>{pageName}</button>
    </Link>
  )
};

interface PopupProps {
  name: string;
  className?: string;
};
const Popup: React.FC<PopupProps> = (props) => {
  const { name, className = DEFAULT_POPUP_CLASSNAME, children } = props;

  return (
    <div className={className}>
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
  const toggleSectionOpen = () => setSectionOpen(invert);

  return (
    <>
      <div className="text-2xl text-bone my-4 cursor-pointer" onClick={toggleSectionOpen}>{name}</div>
      {sectionOpen ? (
        <div className="mb-4">
          {data.map((value) => {
            const { current } = toRef(value);
            return (
              <div
                className="text-bone text-xl break-normal mx-2 cursor-pointer"
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
    </>
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

  return (
    <Popup name={GEOLOGY_MENU_NAME}>
      <PresentDay className="text-2xl mb-4 text-bone cursor-pointer" onClose={onClose} />
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
  pageName: PageNames;
}
const NavPopup: React.FC<NavPopupProps> = (props) => {
  const { pageName } = props;
  const toNavClassName = toNavClass({
    pageName,
    activeClass: "text-green-500",
    inactiveClass: "text-bone",
    baseClass: "text-2xl my-4 mx-auto",
  });

  return (
    <Popup name={NAV_MENU_NAME}>
      <nav className="flex flex-col justify-around">
        <NavLink
          route="/"
          pageName={PageNames.TIMELINE}
          className={toNavClassName(PageNames.TIMELINE)}
        />
        <MenuBreak />
        <NavLink
          route="/people"
          pageName={PageNames.PEOPLE}
          className={toNavClassName(PageNames.PEOPLE)}
        />
        <MenuBreak />
        <NavLink
          route="/about"
          pageName={PageNames.ABOUT}
          className={toNavClassName(PageNames.ABOUT)}
        />
        <MenuBreak />
        <NavLink
          route="/contact"
          pageName={PageNames.CONTACT}
          className={toNavClassName(PageNames.CONTACT)}
        />
        <MenuBreak />
      </nav>
    </Popup>
  )
};

interface LargeScreenTimelinePopupProps {
  campaignList?: Campaign[];
  onClose: () => void;
};
const LargeScreenTimelinePopup: React.FC<LargeScreenTimelinePopupProps> = (props) => {
  const { campaignList, onClose } = props;

  const { eon: { strata: eons } } = BASE_TIMELINE_DATA;
  const { era: { strata: eras } } = BASE_TIMELINE_DATA;
  const { period: { strata: periods } } = BASE_TIMELINE_DATA;
  const { epoch: { strata: epochs } } = BASE_TIMELINE_DATA;

  return (
    <Popup name={GEOLOGY_MENU_NAME} >
      <PresentDay className="text-2xl mb-4 text-bone cursor-pointer" onClose={onClose}/>
      {campaignList && campaignList.length ? (
        <MenuSection
          name="Dinosaurs"
          toName={toCampaignMenuName}
          toRef={pluck('ref')}
          data={campaignList}
          onClose={onClose}
        />
      ) : <Loading />}
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
  );
};

interface LargeScreenNavbarProps {
  campaignList?: Campaign[]
  pageName: PageNames;
};
const LargeScreenNavbar: React.FC<LargeScreenNavbarProps> = (props) => {
  const { pageName, campaignList } = props;

  const toNavClassName = toNavClass({
    pageName,
    activeClass: "text-bone", 
    inactiveClass: "text-black",
  });

  const [ timelineOpen, setTimelineOpen ] = useState(false);
  const onToggleTimelineOpen = () => setTimelineOpen(invert);
  const onCloseTimeline = () => setTimelineOpen(false);

  return (
    <div className="w-full invisible md:visible fixed flex z-90 justify-around my-2 mx-4">
      {pageName === PageNames.TIMELINE ? (
        <MenuIcon
          Icon={MdTimeline}
          onClick={onToggleTimelineOpen}
          className="bg-white rounded-md flex-grow-none p-2 z-90"
        />
      ) : null}
      {timelineOpen ? (
        <div className="fixed left-0 top-0 mx-4 h-2/6 w-2/6 h-screen flex flex-col">
          <div className="flex-grow-none h-24 pointer-events-none" />
          <LargeScreenTimelinePopup
            campaignList={campaignList}
            onClose={onCloseTimeline}
          />
        </div>
      ) : null}
      <nav className="flex-1 flex justify-around">
        <NavLink route="/" pageName={PageNames.TIMELINE} className={toNavClassName(PageNames.TIMELINE)} />
        <NavLink route="/people" pageName={PageNames.PEOPLE} className={toNavClassName(PageNames.PEOPLE)} />
        <NavLink route="/about" pageName={PageNames.ABOUT} className={toNavClassName(PageNames.ABOUT)} />
        <NavLink route="/contact" pageName={PageNames.CONTACT} className={toNavClassName(PageNames.CONTACT)} />
      </nav>
    </div>
  );
};

interface SmallScreenNavbarProps {
  campaignList?: Campaign[];
  pageName: PageNames;
}
const SmallScreenNavbar: React.FC<SmallScreenNavbarProps> = (props) => {
  const { campaignList, pageName } = props;

  const [ timelineOpen, setTimelineOpen ] = useState(false);
  const [ navOpen, setNavOpen ] = useState(false);

  const onToggleTimelineOpen = () => setTimelineOpen(invert);
  const onToggleNavOpen = () => setNavOpen(invert);
  const onCloseTimeline = () => setTimelineOpen(false);
  const onCloseNav = () => setNavOpen(false);

  const onClickTimeline = () => {
    if (navOpen) {
      onToggleTimelineOpen();
      onCloseNav();
      return;
    } else {
      onToggleTimelineOpen();
    }
  };

  const onClickNav = () => {
    if (timelineOpen) {
      onToggleNavOpen();
      onCloseTimeline();
      return;
    } else {
      onToggleNavOpen();
    }
  };

  const navClassName = timelineOpen || navOpen ? NAV_OPENED_CLASS_NAME : NAV_CLOSED_CLASS_NAME;

  return (
    <div className={navClassName} >
      <div className="flex-none flex flex-row">
        {pageName === PageNames.TIMELINE ? (
          <MenuIcon
            Icon={MdTimeline}
            onClick={onClickTimeline}
            className="bg-white rounded-md flex-grow-none p-2 z-90"
          />
        ) : null}
        <div className="flex-1" />
        <MenuIcon
          Icon={GiHamburgerMenu}
          onClick={onClickNav}
          className="bg-white rounded-md flex-grow-none p-2 z-90"
        />
      </div>
      {campaignList && timelineOpen ? (
        <TimelinePopup
          campaignList={campaignList}
          onClose={onCloseTimeline}
        />
      ) : null}
      {navOpen ? (
        <NavPopup pageName={pageName} />
      ) : null}
    </div>
  );
};

const NavbarBase: React.FC = (props) => {
  const { children } = props;

  return (
    <div
      className="bg-teal-400 border-b-8 border-green-800 sm:text-2xl h-20 w-screen"
    >
      {children}
    </div>
  );
};

interface NavbarProps {
  pageName: PageNames;
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