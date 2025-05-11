// import { useState } from 'react';
// import Sidebar from '../../components/ParhoPakistanAdmin/Sidebar';
// import Dashboard from '../../components/ParhoPakistanAdmin/Dashboard';
// import Navbar from '../../components/ParhoPakistanAdmin/Navbar';

// import SponsorshipManagement from '../../components/ParhoPakistanAdmin/SponsorshipManagement';
// import TransactionHistory from '../../components/ParhoPakistanAdmin/TransactionHistory';
// import GraphicalInsights from '../../components/ParhoPakistanAdmin/GraphicalInsights';
// import Notifications from '../../components/ParhoPakistanAdmin/Notifications';
// import CommunityEngagement from '../../components/ParhoPakistanAdmin/CommunityEngagement';
// import Settings from '../../components/ParhoPakistanAdmin/Settings';

// export default function ParhoPakistanAdmin() {
//   const [activeTab, setActiveTab] = useState('Dashboard');
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const renderComponent = () => {
//     switch (activeTab) {
//       case 'Dashboard':
//         return <Dashboard />;
//       case 'Sponsorship Management':
//         return <SponsorshipManagement />;
//       case 'Transaction History':
//         return <TransactionHistory />;
//       case 'Graphical Insights':
//         return <GraphicalInsights />;
//       case 'Notifications':
//         return <Notifications />;
//       case 'Community Engagement':
//         return <CommunityEngagement />;
//       case 'Settings':
//         return <Settings />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
//         <Sidebar
//           setActiveTab={setActiveTab}
//           isOpen={isOpen}
//           toggleSidebar={toggleSidebar}
//         />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         <Navbar toggleSidebar={toggleSidebar} />
//         <div className="flex-1 overflow-auto p-5 bg-gray-100">
//           {renderComponent()}
//         </div>
//       </div>
//     </div>
//   );
// }


































import { useState } from 'react';
import Sidebar from '../../components/ParhoPakistanAdmin/Sidebar';
import Dashboard from '../../components/ParhoPakistanAdmin/Dashboard';
import Navbar from '../../components/ParhoPakistanAdmin/Navbar';

import StudentManagement from '../../components/ParhoPakistanAdmin/StudentManagement';
import SchoolManagement from '../../components/ParhoPakistanAdmin/SchoolManagement';
import DonorManagement from '../../components/ParhoPakistanAdmin/DonorManagement';
import SponsershipFundManagement from '../../components/ParhoPakistanAdmin/SponsershipFundManagement';
import ComplaintsFraud from '../../components/ParhoPakistanAdmin/ComplaintsFraud';
import SystemSettings from '../../components/ParhoPakistanAdmin/SystemSettings';

export default function ParhoPakistanAdmin() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Student Management':
        return <StudentManagement />;
      case 'School Management':
        return <SchoolManagement />;
      case 'Donor Management':
        return <DonorManagement />;
      case 'Fund Management':
        return <SponsershipFundManagement />;
      case 'Complaints':
        return <ComplaintsFraud />;
      case 'Settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen font-work">
      {/* Sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar
          setActiveTab={setActiveTab}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto p-5 bg-light text-dark ">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}




