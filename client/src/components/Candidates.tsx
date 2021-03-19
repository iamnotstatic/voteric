import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CandidateItem from './CandidateItem';

import ElectionContract from '../contracts/Election.json';

const Candidates = () => {
  const [state, setState] = useState<any | null>({
    web3: null,
    accounts: null,
    contract: null,
    candidates: null,
  });

  useEffect(() => {
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    let contractJson: any = ElectionContract;
    (async () => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork: any = contractJson.networks[networkId];
      const contract: any = new web3.eth.Contract(
        contractJson.abi,
        deployedNetwork && deployedNetwork.address
      );
      let accounts = await web3.eth.getAccounts();

      let candidateCount = await contract.methods.candidateCount().call();

      let candidates = [];

      for (let i = 1; i <= candidateCount; i++) {
        let candidate = await contract.methods.candidates(i).call();
        candidates.push(candidate);
      }

      setState({ web3, accounts, contract, candidates });
    })();
  }, []);
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
                  <CandidateItem cands={state.candidates} />
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
