import { useState } from 'react';
import CaseItem from '../../components/CaseItem';
import image1 from '../../assets/images/one.jpg';
import image2 from '../../assets/images/two.jpg';
import image3 from '../../assets/images/three.jpg';
import image4 from '../../assets/images/four.jpg';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BackToTopButton from '../../components/BackToTopButton';
import ChatbotIcon from '../../components/ChatbotIcon';

const FilterPage = () => {


    
  const cases = [
    {
      id: 1,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Karachi',
      funding_needed: 2000,
      urgency_level: 'High',
      verification_status: 'Verified',
      summary:
        'Dreams of becoming a Crickter. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image1,
    },
    {
      id: 2,
      student_name: 'Ali Khan',
      age: 12,
      grade: '6th Grade',
      city: 'Lahore',
      funding_needed: 2000,
      urgency_level: 'High',
      verification_status: 'Verified',
      summary:
        'Dreams of becoming a doctor. He needs monthly support to stay in school.',
    school_name: 'SB Public Model School',
    thumbnail_url: image2,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
    {
      id: 3,
      student_name: 'Ali Khan',
      age: 12,
      grade: '7th Grade',
      city: 'Narowal',
      funding_needed: 5000,
      urgency_level: 'Low',
      verification_status: 'Pending',
      summary:
        'Dreams of becoming a enginner. He needs monthly support to stay in school.',
    school_name: 'ABC High School',
    thumbnail_url: image3,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: [],
    grade: [],
    urgency_level: [],
    verification_status: [],
    funding_range: [0, 5000],
    age_range: [0, 20],
    age_groups: [],
  });
  const [expandedFilters, setExpandedFilters] = useState({
    city: false,
    grade: false,
    urgency_level: false,
    verification_status: false,
    age_groups: false,
    funding_range: false,
  });

  const ageGroupOptions = [
    { label: 'Below 10', range: [0, 9] },
    { label: '10-12', range: [10, 12] },
    { label: '13-15', range: [13, 15] },
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCheckboxChange = (e, filterName) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [filterName]: checked
        ? [...prev[filterName], value]
        : prev[filterName].filter((v) => v !== value),
    }));
  };

  const handleAgeGroupChange = (e) => {
    const { value, checked } = e.target;
    const selectedGroup = ageGroupOptions.find(
      (group) => group.label === value
    );
    setFilters((prev) => ({
      ...prev,
      age_groups: checked
        ? [...prev.age_groups, selectedGroup.range]
        : prev.age_groups.filter((group) => group !== selectedGroup.range),
    }));
  };

  const handleRangeChange = (e, filterName) => {
    const { value, min, max } = e.target;
    const newRange = [parseInt(min, 10), parseInt(value, 10)];
    setFilters((prev) => ({ ...prev, [filterName]: newRange }));
  };

  const toggleFilterExpansion = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleClearFilters = () =>
    setFilters({
      city: [],
      grade: [],
      urgency_level: [],
      verification_status: [],
      funding_range: [0, 5000],
      age_range: [0, 20],
      age_groups: [],
    });

  const filteredCases = cases.filter((caseItem) => {
    const withinFundingRange =
      caseItem.funding_needed >= filters.funding_range[0] &&
      caseItem.funding_needed <= filters.funding_range[1];
    const withinAgeGroups =
      filters.age_groups.length === 0 ||
      filters.age_groups.some(
        ([min, max]) => caseItem.age >= min && caseItem.age <= max
      );

    return (
      (searchTerm === '' ||
        caseItem.student_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (filters.city.length === 0 || filters.city.includes(caseItem.city)) &&
      (filters.grade.length === 0 || filters.grade.includes(caseItem.grade)) &&
      (filters.urgency_level.length === 0 ||
        filters.urgency_level.includes(caseItem.urgency_level)) &&
      (filters.verification_status.length === 0 ||
        filters.verification_status.includes(caseItem.verification_status)) &&
      withinFundingRange &&
      withinAgeGroups
    );
  });

  const handleUrgencyChange = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({
      ...prev,
      urgency_level: value ? [value] : [],
    }));
  };

  return (
    <div className="mt-20">
      <NavBar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Sidebar with Filters */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md mb-4 md:mb-0 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <span className="text-sm text-gray-500">
                {filteredCases.length} Case{filteredCases.length !== 1 && 's'}{' '}
                Found
              </span>
            </div>

            {/* Search and Urgency Filter */}
            <div className="flex flex-col space-y-4 mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 border bg-light text-dark border-gray-300 rounded-lg focus:outline-none"
              />

              <select
                name="urgency_level"
                value={filters.urgency_level[0] || ''}
                onChange={handleUrgencyChange}
                className="p-2 border border-gray-300 rounded-lg bg-light text-dark focus:outline-none w-full"
              >
                <option value="">All Urgency Levels</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">City</h3>
                <button
                  onClick={() => toggleFilterExpansion('city')}
                  className="text-blue-500"
                >
                  {expandedFilters.city ? '-' : '+'}
                </button>
              </div>
              {expandedFilters.city && (
                <div className="mt-2">
                  {['Karachi', 'Lahore', 'Islamabad'].map((city) => (
                    <div key={city}>
                      <input
                        type="checkbox"
                        value={city}
                        checked={filters.city.includes(city)}
                        onChange={(e) => handleCheckboxChange(e, 'city')}
                        id={`city-${city}`}
                      />
                      <label htmlFor={`city-${city}`} className="ml-2">
                        {city}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Age Groups Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Age Groups</h3>
                <button
                  onClick={() => toggleFilterExpansion('age_groups')}
                  className="text-blue-500"
                >
                  {expandedFilters.age_groups ? '-' : '+'}
                </button>
              </div>
              {expandedFilters.age_groups && (
                <div className="mt-2">
                  {ageGroupOptions.map((group) => (
                    <div key={group.label}>
                      <input
                        type="checkbox"
                        value={group.label}
                        onChange={handleAgeGroupChange}
                        id={`age-group-${group.label}`}
                      />
                      <label
                        htmlFor={`age-group-${group.label}`}
                        className="ml-2"
                      >
                        {group.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Status Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Verification Status</h3>
                <button
                  onClick={() => toggleFilterExpansion('verification_status')}
                  className="text-blue-500"
                >
                  {expandedFilters.verification_status ? '-' : '+'}
                </button>
              </div>
              {expandedFilters.verification_status && (
                <div className="mt-2">
                  {['Verified', 'Pending'].map((status) => (
                    <div key={status}>
                      <input
                        type="checkbox"
                        value={status}
                        checked={filters.verification_status.includes(status)}
                        onChange={(e) =>
                          handleCheckboxChange(e, 'verification_status')
                        }
                        id={`verification-status-${status}`}
                      />
                      <label
                        htmlFor={`verification-status-${status}`}
                        className="ml-2"
                      >
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Funding Range Filter */}
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Funding Request</h3>
                <button
                  onClick={() => toggleFilterExpansion('funding_range')}
                  className="text-blue-500"
                >
                  {expandedFilters.funding_range ? '-' : '+'}
                </button>
              </div>
              {expandedFilters.funding_range && (
                <div className="mt-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.funding_range[1]}
                    onChange={(e) => handleRangeChange(e, 'funding_range')}
                    className="w-full"
                  />
                  <p>
                    Selected Range: ${filters.funding_range[0]} - $
                    {filters.funding_range[1]}
                  </p>
                </div>
              )}
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={handleClearFilters}
              className="w-full bg-[#3431BB] text-light py-2 rounded-lg mt-4"
            >
              Clear Filters
            </button>
          </div>

          {/* Cases Display */}
          <div className="w-full md:w-3/4">
            {filteredCases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {filteredCases.map((caseItem) => (
                  <div key={caseItem.id}>
                    <CaseItem caseItem={caseItem} />
                  </div>
                  // <div
                  //   key={caseItem.id}
                  //   className="bg-white p-4 rounded-lg shadow-md"
                  // >
                  //   <h3 className="font-semibold">{caseItem.student_name}</h3>
                  //   <p>Age: {caseItem.age}</p>
                  //   <p>Grade: {caseItem.grade}</p>
                  //   <p>City: {caseItem.city}</p>
                  //   <p>Summary: {caseItem.summary}</p>
                  //   <p>School Name: {caseItem.school_name}</p>
                  //   <p>Funding Needed: ${caseItem.funding_needed}</p>
                  //   <p>Urgency Level: {caseItem.urgency_level}</p>
                  //   <p>Verification Status: {caseItem.verification_status}</p>
                  // </div>
                ))}
              </div>
            ) : (
              <p>No cases match your filters</p>
            )}
          </div>
        </div>
      </div>
      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default FilterPage;
