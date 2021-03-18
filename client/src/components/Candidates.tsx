import React from 'react';
import CandidateItem from './CandidateItem';

const Candidates = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="lg:ml-20">
          <h1 className="mt-8 lg:ml-20 text-3xl">Candidates</h1>
        </div>
        <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">#</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-center">Vote Progress</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  <CandidateItem />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidates;
