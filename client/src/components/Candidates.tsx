import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import CandidateItem from './CandidateItem';
import Owner from './layouts/Owner';

import ElectionContract from '../contracts/Election.json';

const Candidates = () => {
  const [state, setState] = useState<any | null>({
    web3: null,
    accounts: null,
    contract: null,
    candidates: null,
    voter: null,
    owner: null,
  });
  const [loading, setLoading] = useState<any | null>(true);

  useEffect(() => {
    (async () => {
      if (typeof (window as any).ethereum !== 'undefined') {
        let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
        let contractJson: any = ElectionContract;

        const networkId = await web3.eth.net.getId();
        const deployedNetwork: any = contractJson.networks[networkId];
        const contract: any = new web3.eth.Contract(
          contractJson.abi,
          deployedNetwork && deployedNetwork.address
        );

        let accounts = await web3.eth.getAccounts();

        if (accounts.length !== 0) {
          let candidateCount = await contract.methods.candidateCount().call();
          let voter = await contract.methods
            .voters(accounts && accounts[0])
            .call();
          let owner = await contract.methods.owner().call();

          let candidates = [];

          for (let i = 1; i <= candidateCount; i++) {
            let candidate = await contract.methods.candidates(i).call();
            candidates.push(candidate);
          }
          setLoading(false);

          setState({ web3, accounts, contract, candidates, voter, owner });

          // Event  Listenters
          contract.once(
            'Vote',
            {
              fromBlock: 0,
              toBlock: 'latest',
            },
            function (error: any, event: any) {
              window.location.reload();
            }
          );
          (window as any).ethereum.on(
            'accountsChanged',
            function (accounts: any) {
              window.location.reload();
            }
          );
        } else {
          console.log('connect site to metamask');
        }
      } else {
        console.log('install MetaMask');
      }
    })();
  }, []);

  return (
    <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden">
      <div className="lg:w-5/6 w-full ">
        <Owner state={state} />
        <div className="overflow-x-auto">
          <div className="">
            <h1 className="mt-8 text-3xl">Candidates</h1>
          </div>
          {loading === false ? (
            <div className="">
              <div className="w-full ">
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
                      <CandidateItem state={state} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="loader">
              <div className="lds-ripple">
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
