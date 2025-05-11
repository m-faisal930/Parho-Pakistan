import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing the required icons
import image1 from '../../assets/images/three.jpg'; // Update with the right image path
import  ImagesGallery  from '../../components/ImagesGallery';
import DonerComments from '../../components/DonerComments';
import BasicInformation from '../../components/StudentProfile/BasicInformation';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BackToTopButton from '../../components/BackToTopButton';
import AttendanceChart from '../../components/StudentCharts/AttendanceChart';
import AcademicPerformanceChart from '../../components/StudentCharts/AcademicPerformanceChart';
import ScholarshipChart from '../../components/StudentCharts/ScholarshipChart ';
import ExtracurricularChart from '../../components/StudentCharts/ExtracurricularChart';
import { Link } from 'react-router-dom';
import ChatbotIcon from '../../components/ChatbotIcon';

const StudentProfilePage = () => {
  const [activeTab, setActiveTab] = useState('basicInfo');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Default to false to avoid it opening initially

  const tabs = [
    { id: 'basicInfo', label: 'Basic Info' },
    { id: 'academicPerformance', label: 'Academic Performance' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'donorComments', label: 'Donor Comments' },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false); // Close menu when going to desktop size
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on initial load to update state correctly

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let activeId = activeTab;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });
        setActiveTab(activeId);
      },
      { threshold: 0.6 }
    );

    tabs.forEach((tab) => {
      const section = document.getElementById(tab.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [tabs, activeTab]);

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <NavBar />
      <div className="bg-light mt-10">
        <div className="flex flex-wrap justify-between items-center min-h-60 p-10">
          {/* Profile Information */}
          <div className="flex items-center space-x-6">
            <img
              src={image1}
              alt="Student"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-lg text-dark">
              <h2 className="text-3xl font-semibold">John Doe</h2>
              <p className="text-lg font-light">Grade: 10th</p>
              <p className="text-lg font-light">Attendance: 92%</p>
              <p className="text-lg font-light">Score: 85%</p>
            </div>
          </div>
          {/* School Info */}
          <div className="text-lg text-dark">
            <p className="mb-2">
              School:{' '}
              
              <Link to={'/school'} className="text-[#3431BB] hover:underline font-bold">
                Greenwood High
              </Link>
            </p>

            <p className="mb-2">
              City: <span className="text-[#3431BB] font-bold">Lahore</span>
            </p>

            <p className="mb-2">
              Sponsorship Start Date:{' '}
              <span className="text-[#3431BB] font-bold">01 January 2023</span>
            </p>
            <p className="mb-2">
              Total Sponsors:{' '}
              <span className="text-[#3431BB] font-bold">15</span>
            </p>
          </div>
        </div>

        {/* Sticky Profile Section */}
        <div className="sticky top-0 z-50 bg-[#3431BB] text-white p-6 rounded-b-xl shadow-lg">
          {/* Toggle Button for Mobile */}
          {isMobile && (
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white text-xl"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Use icons here */}
              </button>
            </div>
          )}

          {/* Tabs for Desktop */}
          {!isMobile && (
            <div className="mt-4 flex space-x-6 border-b-2 border-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`py-2 px-6 text-xl hover:text-yellow-300 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-yellow-300 text-yellow-300'
                      : 'text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Dropdown for Mobile */}
          {isMenuOpen && isMobile && (
            <div className="mt-4 flex flex-col space-y-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    scrollToSection(tab.id);
                    setIsMenuOpen(false); // Close menu after selection
                  }}
                  className={`py-2 px-6 text-xl text-white hover:text-yellow-300 ${
                    activeTab === tab.id ? 'text-yellow-300' : ''
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sections */}
        <div className="p-8 space-y-16">
          {/* Basic Info Section */}
          <section
            id="basicInfo"
            className="min-h-screen bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#3431BB]">
              Basic Information
            </h3>
            <BasicInformation />
          </section>

          {/* Academic Performance Section */}
          <section
            id="academicPerformance"
            className="min-h-screen bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#3431BB]">
              Academic Performance
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
                <AcademicPerformanceChart />
              </div>
              <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
                <AttendanceChart />
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section
            id="achievements"
            className="min-h-screen bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#3431BB]">
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
                <ExtracurricularChart />
              </div>
              <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">
                <ScholarshipChart />
              </div>
            </div>
          </section>



          {/* Donor Comments Section */}
          <section
            id="donorComments"
            className="min-h-screen bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#3431BB]">
              Donor Comments
            </h3>
            <DonerComments />
          </section>
        </div>
      </div>
      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
    </>
  );
};

export default StudentProfilePage;
