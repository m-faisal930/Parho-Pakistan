


import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { FaRegWindowClose } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosFunnel } from 'react-icons/io';
import { IoMdRemove } from 'react-icons/io';
import { IoMdAdd } from 'react-icons/io';
import { FaThLarge } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BackToTopButton from '../../components/BackToTopButton';
import ChatbotIcon from '../../components/ChatbotIcon';

const sortOptions = [
  { name: 'Highest Rating', href: '#', current: false },
  { name: 'Lowest Rating', href: '#', current: false },
  { name: 'Largest Enrollment', href: '#', current: false },
  { name: 'Smallest Enrollment', href: '#', current: false },
  { name: 'Alphabetical A to Z', href: '#', current: true },
  { name: 'Alphabetical Z to A', href: '#', current: false },
];

const subCategories = [{ name: 'Total Schools', href: '#' }];

const filters = [
  {
    id: 'city',
    name: 'City',
    options: [
      { value: 'Karachi', label: 'Karachi', checked: false },
      { value: 'Lahore', label: 'Lahore', checked: false },
      { value: 'Islamabad', label: 'Islamabad', checked: false },
    ],
  },
  {
    id: 'schoolType',
    name: 'School Type',
    options: [
      { value: 'private', label: 'Private', checked: false },
      { value: 'public', label: 'Public', checked: false },
    ],
  },
  {
    id: 'enrollment',
    name: 'Enrollment Size',
    options: [
      { value: 'under1000', label: 'Under 1000 students', checked: false },
      { value: '1000to1500', label: '1000-1500 students', checked: false },
      { value: '1500to2000', label: '1500-2000 students', checked: false },
      { value: 'over2000', label: 'Over 2000 students', checked: false },
    ],
  },
  {
    id: 'facilities',
    name: 'Facilities',
    options: [
      { value: 'sports', label: 'Sports Complex', checked: false },
      { value: 'playground', label: 'Playground', checked: false },
      { value: 'transport', label: 'Transport Available', checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Schools() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    city: [],
    schoolType: [],
    enrollment: [],
    facilities: [],
  });

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/list`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data.schools);
        setFilteredSchools(data.schools);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    // Apply filters whenever activeFilters or schools change
    let result = [...schools];

    // City filter
    if (activeFilters.city.length > 0) {
      result = result.filter((school) => {
        const city = school.address.split(',')[0].trim(); // Assuming city is first part of address
        return activeFilters.city.includes(city);
      });
    }

    // School type filter
    if (activeFilters.schoolType.length > 0) {
      result = result.filter((school) =>
        activeFilters.schoolType.includes(school.schoolType)
      );
    }

    // Enrollment filter
    if (activeFilters.enrollment.length > 0) {
      result = result.filter((school) => {
        const noOfStudents = school.noOfStudents;
        return activeFilters.enrollment.some((range) => {
          if (range === 'under1000') return noOfStudents < 1000;
          if (range === '1000to1500')
            return noOfStudents >= 1000 && noOfStudents <= 1500;
          if (range === '1500to2000')
            return noOfStudents > 1500 && noOfStudents <= 2000;
          if (range === 'over2000') return noOfStudents > 2000;
          return false;
        });
      });
    }

    // Facilities filter
    if (activeFilters.facilities.length > 0) {
      result = result.filter((school) => {
        const facilities = school.additionalFacilities.toLowerCase();
        return activeFilters.facilities.every((facility) => {
          if (facility === 'sports') return facilities.includes('sports');
          if (facility === 'playground')
            return facilities.includes('playground');
          if (facility === 'transport')
            return school.transportAvailability !== 'No';
          return false;
        });
      });
    }

    setFilteredSchools(result);
  }, [activeFilters, schools]);

  const handleFilterChange = (filterType, value, isChecked) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (isChecked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      }
      return newFilters;
    });
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading schools...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <NavBar />
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <FaRegWindowClose aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name} ({schools.length})
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <IoMdAdd
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <IoMdRemove
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={activeFilters[section.id].includes(
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      section.id,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Available Schools On Parho Pakistan
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <MdArrowDropDown
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none'
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <FaThLarge aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <IoIosFunnel aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Schools
            </h2>

            <div className="flex flex-col lg:flex-row lg:space-x-6">
              {/* Filters */}
              <form className="hidden lg:block mr-10 w-1/4">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>
                        {category.name} ({schools.length})
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <IoMdAdd
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <IoMdRemove
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  checked={activeFilters[section.id].includes(
                                    option.value
                                  )}
                                  onChange={(e) =>
                                    handleFilterChange(
                                      section.id,
                                      option.value,
                                      e.target.checked
                                    )
                                  }
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* School grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-3/4">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <div
                      key={school._id}
                      className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <Link to={`/school/${school._id}`} className="block">
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {school.schoolName}
                          </h3>
                          <p className="text-gray-600 mb-1">
                            <span className="font-medium">Type:</span>{' '}
                            {school.schoolType.charAt(0).toUpperCase() +
                              school.schoolType.slice(1)}
                          </p>
                          <p className="text-gray-600 mb-1">
                            <span className="font-medium">Location:</span>{' '}
                            {school.address}
                          </p>
                          <p className="text-gray-600 mb-1">
                            <span className="font-medium">Students:</span>{' '}
                            {school.noOfStudents}
                          </p>
                          <p className="text-gray-600 mb-3">
                            <span className="font-medium">Contact:</span>{' '}
                            {school.contactNo}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {school.courses.map((course, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              Established:{' '}
                              {new Date(school.createdAt).getFullYear()}
                            </span>
                            <span className="text-sm font-medium text-indigo-600">
                              View Details →
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-lg text-gray-500">
                      No schools match your filters. Try adjusting your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
    </div>
  );
}