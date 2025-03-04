import { useState } from 'react';
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

import { FaRegWindowClose } from 'react-icons/fa'; // FaRegWindowClose
import { MdArrowDropDown } from 'react-icons/md'; // MdArrowDropDown
import { IoIosFunnel } from 'react-icons/io'; // IoIosFunnel
import { IoMdRemove } from 'react-icons/io'; // IoMdRemove
import { IoMdAdd } from 'react-icons/io'; // IoMdAdd
import { FaThLarge } from 'react-icons/fa'; // FaThLarge
import SchoolCard from '../../components/SchoolCard';
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

const subCategories = [
  { name: 'Total Schools', href: '#' },

];
const filters = [
  {
    id: 'city',
    name: 'City',
    options: [
      { value: 'Karachi', label: 'Karachi', checked: false },
      { value: 'Lahore', label: 'Lahore', checked: false },
      { value: 'Islamabad', label: 'Islamabad', checked: true },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '4+', label: '4 stars or higher', checked: true },
      { value: '4.5+', label: '4.5 stars or higher', checked: false },
      { value: '5', label: '5 stars only', checked: false },
    ],
  },
  {
    id: 'enrollment',
    name: 'Enrollment Size',
    options: [
      { value: 'under1000', label: 'Under 1000 students', checked: false },
      { value: '1000to1500', label: '1000-1500 students', checked: true },
      { value: '1500to2000', label: '1500-2000 students', checked: false },
      { value: 'over2000', label: 'Over 2000 students', checked: false },
    ],
  },
  {
    id: 'description',
    name: 'Description Keywords',
    options: [
      {
        value: 'academic-excellence',
        label: 'Academic Excellence',
        checked: false,
      },
      {
        value: 'sustainability',
        label: 'Environmental Sustainability',
        checked: false,
      },
      { value: 'leadership', label: 'Leadership Development', checked: true },
      {
        value: 'innovation',
        label: 'Innovation and Creativity',
        checked: false,
      },
    ],
  },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Schools() {

    const schools = [
      {
        name: 'Green Valley High School',
        enrollment: 1500,
        email: 'info@greenvalleyhigh.edu',
        rating: '⭐⭐⭐⭐☆ (4.5/5)',
        image:
          'https://cdn.pixabay.com/photo/2015/09/18/18/42/school-943843_960_720.jpg',
        description:
          'Join the Green Valley community and experience excellent education!',
        since: '2005',
      },
      {
        name: 'Blue Ridge Academy',
        enrollment: 1200,
        email: 'info@greelleyhigh.edu',
        rating: '⭐⭐⭐⭐⭐ (5/5)',
        image:
          'https://cdn.pixabay.com/photo/2016/11/29/01/21/school-1869919_960_720.jpg',
        description:
          'A top-rated school known for its innovative teaching methods.',
        since: '2005',
      },
      {
        name: 'Sunshine International School',
        enrollment: 2000,
        email: 'info@greeeyhigh.edu',
        rating: '⭐⭐⭐⭐ (4/5)',
        image:
          'https://cdn.pixabay.com/photo/2017/08/30/03/01/school-2690565_960_720.jpg',
        description:
          'Sunshine School focuses on global education and cultural diversity.',
        since: '2005',
      },
      {
        name: 'Riverdale Public School',
        enrollment: 800,
        email: 'info@greeigh.edu',
        rating: '⭐⭐⭐⭐☆ (4.2/5)',
        image:
          'https://cdn.pixabay.com/photo/2016/12/02/17/35/school-1873205_960_720.jpg',
        description:
          'Riverdale offers a personalized learning experience with small class sizes.',
        since: '2005',
      },
      {
        name: 'Maple Grove High',
        enrollment: 1800,
        email: 'info@grehigh.edu',
        rating: '⭐⭐⭐⭐⭐ (4.8/5)',
        image:
          'https://cdn.pixabay.com/photo/2017/08/30/02/47/school-2690574_960_720.jpg',
        description:
          'A well-established institution known for academic excellence and athletics.',
        since: '2005',
      },
      {
        name: 'Ocean Breeze Academy',
        enrollment: 1000,
        email: 'contact@ocze.edu',
        rating: '⭐⭐⭐⭐ (4.3/5)',
        image:
          'https://cdn.pixabay.com/photo/2016/11/18/13/47/school-1835773_960_720.jpg',
        description:
          'A school that focuses on environmental sustainability and science education.',
        since: '2005',
      },
      {
        name: 'Mountain Peak High School',
        enrollment: 2200,
        email: 'support@peak.edu',
        rating: '⭐⭐⭐⭐☆ (4.4/5)',
        image:
          'https://cdn.pixabay.com/photo/2016/11/23/15/59/school-1854026_960_720.jpg',
        description:
          'A school that promotes leadership development and community involvement.',
        since: '2005',
      },
      {
        name: 'Lakeview School for Excellence',
        enrollment: 950,
        email: 'ads@lakeool.edu',
        rating: '⭐⭐⭐⭐⭐ (5/5)',
        image:
          'https://cdn.pixabay.com/photo/2017/07/24/19/10/school-2536797_960_720.jpg',
        description:
          'Excellence in academics and extracurricular activities is our hallmark.',
        since: '2005',
      },
      {
        name: 'Parkside Academy',
        enrollment: 1300,
        email: 'contact@pamy.edu',
        rating: '⭐⭐⭐⭐☆ (4.6/5)',
        image:
          'https://cdn.pixabay.com/photo/2015/09/18/18/42/school-943843_960_720.jpg',
        description:
          'A school that nurtures students’ creativity, critical thinking, and innovation.',
        since: '2005',
      },
      {
        name: 'Woodland Heights High School',
        enrollment: 1100,
        email: 'info@wohts.edu',
        rating: '⭐⭐⭐⭐☆ (4.3/5)',
        image:
          'https://cdn.pixabay.com/photo/2017/08/30/02/47/school-2690574_960_720.jpg',
        description:
          'Woodland Heights is dedicated to fostering a strong sense of community.',
        since: '2005',
      },
    ];





  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
                        {category.name}
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
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
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
              Products
            </h2>

            {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4"> */}
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
                      <a href={category.href}>{category.name}</a>
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
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
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

              {/* Product grid */}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Your content */}
                {schools.map((schoolInfo) => (
                  <SchoolCard key={schoolInfo.id} schoolInfo={schoolInfo} />
                ))}
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
