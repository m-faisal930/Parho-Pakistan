import { useState } from 'react';
import Sidebar from '../../components/SchoolAdminProfile/Sidebar';
import Dashboard from '../../components/SchoolAdminProfile/Dashboard';
import Navbar from '../../components/SchoolAdminProfile/Navbar';
import Home from '../../components/SchoolAdminProfile/Home';
import Profile from '../../components/SchoolAdminProfile/Profile';
import SponsorshipsDonors from '../../components/SchoolAdminProfile/SponsorshipsDonors';
import AttendanceManagement from '../../components/SchoolAdminProfile/AttendanceManagement';
import FeeManagement from '../../components/SchoolAdminProfile/FeeManagement';
import StudentsManagement from '../../components/SchoolAdminProfile/StudentsManagement';
import AcademicPerformance from '../../components/SchoolAdminProfile/AcademicPerformance';
import { useParams } from 'react-router-dom';

export default function SchoolAdminProfile() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { id } = useParams();

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Sponserships':
        return <SponsorshipsDonors />;
      case 'Attendance Record':
        return <AttendanceManagement school_id={id} />;
      case 'Fee Management':
        return <FeeManagement />;
      case 'Students Management':
        return <StudentsManagement />;
      case 'Grade Management':
        return <AcademicPerformance school_id={id} />;
      case 'Profile':
        return <Profile id={id} />;
      case 'Home':
        return <Home />;
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
        <div className="flex-1 overflow-auto p-5 bg-light text-dark">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
