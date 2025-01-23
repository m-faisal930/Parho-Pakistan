export default function PrimaryButton({ buttonText }) {
  return (
    <div>
      <button
        type="button"
        className="bg-blue-700 text-white hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {buttonText}
      </button>
    </div>
  );
}
