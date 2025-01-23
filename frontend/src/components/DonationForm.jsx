import React, { useState } from 'react';
import { FaDonate } from 'react-icons/fa';

const DonationForm = () => {
  const [donationType, setDonationType] = useState('once');
  const [amount, setAmount] = useState(50);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-center mb-4">
        We need your support to expand financial access. Give today.
      </h2>
      <p className="text-center mb-6">
        Your donations enable us to cover the costs of expanding access to
        life-changing Academic Opportunities and reaching more Students across
        the globe.
      </p>

      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            donationType === 'once' ? 'bg-green-700 text-white' : 'bg-gray-200'
          } rounded-l-md`}
          onClick={() => setDonationType('once')}
        >
          Give once
        </button>
        <button
          className={`px-4 py-2 ${
            donationType === 'monthly'
              ? 'bg-green-700 text-white'
              : 'bg-gray-200'
          } rounded-r-md`}
          onClick={() => setDonationType('monthly')}
        >
          Give monthly
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[35, 50, 75, 125].map((amt) => (
          <button
            key={amt}
            className={`px-4 py-2 ${
              amount === amt
                ? 'border-2 border-green-700'
                : 'border border-gray-300'
            } rounded-md`}
            onClick={() => setAmount(amt)}
          >
            ${amt}
          </button>
        ))}
        <button
          className={`col-span-3 px-4 py-2 border border-gray-300 rounded-md`}
          onClick={() => setAmount('other')}
        >
          Other amount
        </button>
      </div>

      <button className="w-full bg-[#3431BB] text-white py-2 rounded-md flex items-center justify-center mb-4">
        <FaDonate className="mr-2" />{' '}
        {donationType === 'once' ? 'Give Now' : 'Give Monthly'}
      </button>
    </div>
  );
};

export default DonationForm;
