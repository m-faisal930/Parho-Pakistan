
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Bounce } from 'react-toastify';
      
import axios from 'axios';

// Step titles
const steps = ['Personal', 'Educational', 'Financial', 'Documents'];

// Validation schema
const schema = yup.object().shape({
  // Personal
  name: yup.string().required('Full name is required'),
  dob: yup
    .date()
    .required('Date of birth is required')
    .typeError('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  contactNumber: yup
    .string()
    .matches(/^\d{11}$/, 'Format: 03009876543')
    .required("Guardian's contact is required"),


  cnicOrBForm: yup.string().required('CNIC/B-Form is required'),
  guardianName: yup.string().required("Guardian's name is required"),
  guardianContact: yup
    .string()
    .matches(/^\d{11}$/, 'Format: 03009876543')
    .required("Guardian's contact is required"),

  // Educational
  schoolName: yup.string().required('School name is required'),
  grade: yup.string().required('Grade is required'),
  schoolAddress: yup.string().required('School address is required'),
  city: yup.string().required('City is required'),
  areaOfInterest: yup.string().required('Area of interest is required'),
  careerAspirations: yup.string().required('Career aspiration is required'),
  // Financial
  monthIncome: yup.string().required('Monthly income is required'),
  noOfDependents: yup
    .number()
    .typeError('Number of dependents is required')
    .min(0, 'Cannot be negative')
    .required('Number of dependents is required'),
  existingScholarship: yup.string().required('Select scholarship status'),
  amountNeeded: yup
    .number()
    .typeError('Amount needed is required')
    .min(1, 'Must be positive')
    .required('Amount needed is required'),
  purposeOfFunding: yup.string().required('Purpose of funding is required'),
});

export default function AddStudentForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  // const accessToken = localStorage.getItem('authorization');
  // const refreshToken = localStorage.getItem('refresh-token');

  // Form state
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

const CLOUD_NAME   = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  // File state
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  // const [academicFileObjs, setAcademicFileObjs] = useState([]);
  // const [academicFiles, setAcademicFiles] = useState([]);
  const [supportFileObjs, setSupportFileObjs] = useState({});
  const [supportFiles, setSupportFiles] = useState({});

const cities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Hyderabad',
  'Peshawar',
  'Quetta',
  'Gujranwala',
  'Sialkot',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Rahim Yar Khan',
  'Jhang',
  'Gujrat',
  'Mardan',
];

  // Cleanup preview URL
  useEffect(() => () => {
    profilePreview && URL.revokeObjectURL(profilePreview);
  }, [profilePreview]);

  // File handlers
  const handleProfileChange = e => {
    const file = e.target.files[0];
    setProfileFile(file);
    setProfilePreview(file ? URL.createObjectURL(file) : null);
  };

  // const handleAcademicChange = e => {
  //   const files = Array.from(e.target.files);
  //   setAcademicFileObjs(files);
  //   setAcademicFiles(files.map(f => f.name));
  // };

  const handleSupportChange = (e, key) => {
    const file = e.target.files[0];
    setSupportFileObjs(prev => ({ ...prev, [key]: file }));
    setSupportFiles(prev => ({ ...prev, [key]: file?.name }));
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async file => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      formData
    );
    return res.data.secure_url;
  };

  // Fields per step for validation
  const stepFields = {
    1: ['name','dob','gender','email','contactNumber','cnicOrBForm','guardianName','guardianContact'],
    2: ['schoolName','grade','schoolAddress', 'city','areaOfInterest','careerAspirations'],
    3: ['monthIncome','noOfDependents','existingScholarship','amountNeeded','purposeOfFunding'],
    4: [],
  };

  // Submit handler
  const onSubmit = async (data,e) => {
    e.preventDefault();
    
    try {
      // Upload files
      const profileUrl = profileFile ? await uploadToCloudinary(profileFile) : null;
      const supportUrls = {};
      for (const key in supportFileObjs) {
        if (supportFileObjs[key]) {
          supportUrls[key] = await uploadToCloudinary(supportFileObjs[key]);
        }
      }

      // Prepare payload
      const payload = {
        ...data,
        profilePic: profileUrl,
        // previousPerformance: academicUrls,
        studentId: supportUrls.studentId,
        passportPhoto: supportUrls.passportPhoto,
        incomeProof: supportUrls.incomeProof,
        recommendation: supportUrls.recommendation,
      };
      console.log('payload', payload);
      // console.log('token', accessToken, refreshToken);

      // Post to backend
      const res = await axios.post(
        'http://localhost:3000/student',
        payload,
        {
  }
      );
      // if (res.status === 200) {
            toast.success(' Student Added Successfully!', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                        transition: Bounce,
                      });
      
      navigate('/dashboard');
                    // }
      
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  const handleNext = async (e) => {
    e?.preventDefault(); // Prevent default form submission
    const valid = await trigger(stepFields[step]);
    if (valid && step < steps.length) setStep((s) => s + 1);
  };
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg relative"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
      >
        <FaArrowLeft size={24} />
      </button>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          {steps[step - 1]} ({step}/{steps.length})
        </p>
      </div>

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1 omitted for brevity */}
          {step === 1 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Personal Information
              </h2>

              {/* Full Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  className={`mt-1 w-full p-3 rounded-lg bg-gray-50 text-gray-800 border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* DOB & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register('dob')}
                    className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                      errors.dob ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.dob && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.dob.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    {...register('gender')}
                    className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Pic */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setProfilePreview(file ? URL.createObjectURL(file) : null);
                  }}
                  {...register('profilePic')}
                  className="mt-1"
                />
                {profilePreview && (
                  <img
                    src={profilePreview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 rounded-full object-cover"
                  />
                )}
              </div>

              {/* Contact Info */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="example@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  {...register('contactNumber')}
                  className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="e.g. 03001234567"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CNIC/B-Form
                  </label>
                  <input
                    type="text"
                    {...register('cnicOrBForm')}
                    className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                      errors.cnicOrBForm ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    placeholder="12345-6789012-3"
                  />
                  {errors.cnicOrBForm && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.cnicOrBForm.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Guardian Name
                  </label>
                  <input
                    type="text"
                    {...register('guardianName')}
                    className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                      errors.guardianName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    placeholder="Enter guardian's name"
                  />
                  {errors.guardianName && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.guardianName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Guardian Contact
                  </label>
                  <input
                    type="text"
                    {...register('guardianContact')}
                    className={`bg-gray-50 text-gray-800 mt-1 w-full p-3 rounded-lg border ${
                      errors.guardianContact
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    placeholder="e.g. 03009876543"
                  />
                  {errors.guardianContact && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.guardianContact.message}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Educational Information
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Current School Name
                </label>
                <input
                  type="text"
                  {...register('schoolName')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.schoolName ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter school name"
                />
                {errors.schoolName && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.schoolName.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Grade/Class
                  </label>
                  <select
                    {...register('grade')}
                    className={`mt-1 w-full p-3 rounded-lg border ${
                      errors.grade ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  >
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                  </select>
                  {errors.grade && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.grade.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School Address
                  </label>
                  <input
                    type="text"
                    {...register('schoolAddress')}
                    className={`mt-1 w-full p-3 rounded-lg border ${
                      errors.schoolAddress
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                    placeholder="Enter school address"
                  />
                  {errors.schoolAddress && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.schoolAddress.message}
                    </p>
                  )}
                </div>
              </div>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Previous Academic Records
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  multiple
                  onChange={handleAcademicChange}
                  className="mt-1"
                />
                {academicFiles.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-gray-600">
                    {academicFiles.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div> */}




              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City you belongs to
                </label>
                <select
                  {...register('city')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>

                  ))}
                  

                </select>
                {errors.city && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>






              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Areas of Interest
                </label>
                <input
                  type="text"
                  {...register('areaOfInterest')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.areaOfInterest ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="e.g. Science, Arts, Sports"
                />
                {errors.areaOfInterest && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.areaOfInterest.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Career Aspiration
                </label>
                <input
                  type="text"
                  {...register('careerAspirations')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.careerAspirations
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="e.g. Doctor, Engineer, Artist"
                />
                {errors.careerAspirations && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.careerAspirations.message}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Financial Information
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Family Income
                </label>
                <select
                  {...register('monthIncome')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.monthIncome ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ringblue-400`}
                >
                  <option value="Less than 20,000">Less than 20,000</option>
                  <option value="20,000-50,000">20,000-50,000</option>
                  <option value="Above 50,000">Above 50,000</option>
                </select>
                {errors.monthIncome && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.monthIncome.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Dependents
                </label>
                <input
                  type="number"
                  {...register('noOfDependents')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.noOfDependents ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter number of dependents"
                />
                {errors.noOfDependents && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.noOfDependents.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Existing Scholarship
                </label>
                <select
                  {...register('existingScholarship')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.existingScholarship
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.existingScholarship && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.existingScholarship.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Amount Needed
                </label>
                <input
                  type="number"
                  {...register('amountNeeded')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.amountNeeded ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Enter amount needed"
                />
                {errors.amountNeeded && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.amountNeeded.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Purpose of Funding
                </label>
                <input
                  type="text"
                  {...register('purposeOfFunding')}
                  className={`mt-1 w-full p-3 rounded-lg border ${
                    errors.purposeOfFunding
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="Describe the purpose"
                />
                {errors.purposeOfFunding && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.purposeOfFunding.message}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Supporting Documents
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Student ID Card / B-Form
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleSupportChange(e, 'studentId')}
                  className="mt-1"
                />
                {supportFiles.studentId && (
                  <p className="mt-1 text-gray-600 text-sm">
                    {supportFiles.studentId}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Passport-Sized Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSupportChange(e, 'passportPhoto')}
                  className="mt-1"
                />
                {supportFiles.passportPhoto && (
                  <p className="mt-1 text-gray-600 text-sm">
                    {supportFiles.passportPhoto}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Income Proof
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => handleSupportChange(e, 'incomeProof')}
                  className="mt-1"
                />
                {supportFiles.incomeProof && (
                  <p className="mt-1 text-gray-600 text-sm">
                    {supportFiles.incomeProof}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Recommendation Letter
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleSupportChange(e, 'recommendation')}
                  className="mt-1"
                />
                {supportFiles.recommendation && (
                  <p className="mt-1 text-gray-600 text-sm">
                    {supportFiles.recommendation}
                  </p>
                )}
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {step < steps.length ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || step !== steps.length}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </form>
  );
}
