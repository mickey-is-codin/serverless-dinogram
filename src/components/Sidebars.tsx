import React from 'react';
import { CurrentTime, CurrentYear } from './TimeReadouts';

// interface CollapsedSidebarProps {
//   onExpand: () => void;
// };
// const CollapsedSidebar: React.FC<CollapsedSidebarProps> = (props) => {
//   const { onExpand } = props;
//   return (
//     <button onClick={onExpand}>
//       Articles List
//     </button>
//   );
// };

// const ArticleSidebar: React.FC = (props) => {
//   const { campaignList } = props;
//   const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true);
//   return (
//     <div className="fixed right-0 text-center px-4 md:mx-12 z-80 text-bone">
//       <div className="bg-green-700 rounded-md px-4 py-2">
//       {isCollapsed 
//         ? <CollapsedSidebar onExpand={() => setIsCollapsed(false)}/> 
//         : <ExpandedSidebar
//             campaignList={campaignList}
//             onCollapse={() => setIsCollapsed(true)}
//           />}
//       </div>
//     </div>
//   );
// };

// const toScrollToView = (campaign: Campaign) => () => campaign.ref.current.scrollIntoView({
//   behavior: "smooth"
// });

// const ArticleListLoading: JSX.Element = <div className="my-4">Loading articles...</div>;

// const toArticleSidebarDisplay = (campaign: Campaign, ix: number) => {
//   return (
//     <div
//       className="my-4"
//       key={`sidebar-list-${campaign.title}-${ix}`}
//     >
//       <button 
//         onClick={toScrollToView(campaign)}
//       >
//         {campaign.title}
//       </button>
//     </div>
//   );
// };

// interface ExpandedSidebarProps {
//   campaignList: Campaign[];
//   onCollapse: () => void;
// };
// const ExpandedSidebar: React.FC<ExpandedSidebarProps> = (props) => {
//   const { campaignList, onCollapse } = props;
//   const orderedList: Campaign[] = campaignList.sort((
//     { end: endA },
//     { end: endB }
//   ) => endA - endB);
//   return (
//     <>
//       <button onClick={onCollapse} className="text-black text-opacity-50">Hide article list</button>
//       {!campaignList.length ? ArticleListLoading : null}
//       {orderedList.map(toArticleSidebarDisplay)}
//       <button onClick={onCollapse} className="text-black text-opacity-50">Hide article list</button>
//     </>
//   );
// };

interface TimeSidebarProps {
};
const TimeSidebar: React.FC<TimeSidebarProps> = () => {
  return (
    <div
      className="fixed right-0 sm:text-xl sm:left-0 sm:w-64 text-center my-16 sm:my-0 mx-4 sm:mx-16 px-4 text-bone z-80 bg-brown-900 rounded-md"
    >
      <CurrentYear />
      <CurrentTime />
    </div>
  )
};

export const Sidebars: React.FC = () => {
  return (
    <>
      {/* <ArticleSidebar /> */}
      <TimeSidebar />
    </>
  )
};
export default Sidebars;