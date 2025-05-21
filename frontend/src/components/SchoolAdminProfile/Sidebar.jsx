import {
  LayoutDashboard,
  Handshake,
  User,
  Menu,
  BookOpenCheck,
  CheckSquare,
  Wallet,
  Users,
} from 'lucide-react';


const Sidebar = ({ setActiveTab, isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed lg:relative bg-gray-800 h-full p-5 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-18'
      }`}
    >
      {/* Toggle Button */}
      <button className="text-white mb-4" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-4">
        {[
          { name: 'Dashboard', icon: LayoutDashboard },
          { name: 'Profile', icon: User },
          { name: 'Attendance Record', icon: CheckSquare }, // Represents checking attendance
          { name: 'Students Management', icon: Users }, // Represents managing multiple students
          { name: 'Grade Management', icon: BookOpenCheck }, // Represents grading and academic records
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className="flex items-center space-x-3 text-white p-2 rounded-lg hover:bg-gray-700"
          >
            <tab.icon size={24} />
            {/* Hide text when collapsed, but only on lg screens */}
            <span className={`${isOpen ? 'block' : 'hidden lg:hidden'}`}>
              {tab.name}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
