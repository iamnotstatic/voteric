import React, { Fragment } from 'react';

const CandidateItem = ({
  state: { candidates, contract, accounts, voter },
}: any) => {
  const onVote = async (id: any) => {
    await contract.methods.vote(id).send({ from: accounts[0] });
  };

  return (
    <Fragment>
      {candidates && candidates.length > 0
        ? candidates.map((candidate: any) => (
            <tr
              className="border-b border-gray-200 hover:bg-gray-100"
              key={candidate.id}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="font-medium">{candidate.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <span>{candidate.name}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="shadow w-full bg-grey-light mt-2">
                  <div
                    className="bg-green-300 text-xs leading-none py-1 text-center text-black"
                    style={{ width: `${candidate.voteCount}%` }}
                  >
                    {candidate.voteCount}
                  </div>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  className='bg-gray-800 text-gray-50 py-2 px-5 rounded-full text-xs hover:bg-gray-600'
                  onClick={() => onVote(candidate.id)}
                  disabled={ voter.voted ? true : false }
                >
                  {voter.voted ? 'Voted' : 'Vote'}
                </button>
              </td>
            </tr>
          ))
        : null}
    </Fragment>
  );
};

export default CandidateItem;
