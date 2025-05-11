const SponsorButton = ({ caseId, studentName }) => {
  return (
    <button className="w-100 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105">
      Sponsor {studentName?.split(' ')[0] || 'This Student'}
    </button>
  );
};


export default SponsorButton;