import buttonText from '@material-tailwind/react/theme/components/button/buttonText';
import React from 'react'

export default function SecondaryButton({buttonText}) {
  return (
    <div>
      <button
        type="button"
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {buttonText}
      </button>
    </div>
  );
}
