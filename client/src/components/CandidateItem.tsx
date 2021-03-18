import React from 'react';

const CandidateItem = () => {
  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">1</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>Eshal Rosas</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="shadow w-full bg-grey-light mt-2">
            <div
              className="bg-green-300 text-xs leading-none py-1 text-center text-white"
              style={{ width: '100%' }}
            >
              100%
            </div>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <button className="bg-gray-800 text-gray-50 py-2 px-5 rounded-full text-xs hover:bg-gray-600">
            Vote
          </button>
        </td>
      </tr>
    </>
  );
};

export default CandidateItem;
