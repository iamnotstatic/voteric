import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Navbar = () => {
  const [accounts, setAccount] = useState<any | null>(null);

  useEffect(() => {
    let web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
    (async () => {
      let resp = await web3.eth.getAccounts();
      setAccount(resp);
    })();
  }, []);

  const enableMataMask = async () => {
    if ((window as any).ethereum) {
      try {
        (window as any).ethereum.enable();
        console.log('Hello');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-gray-50 leading-20 text-2xl">Vote App</h1>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  {accounts && accounts.length > 0 ? (
                    <>
                      <p
                        className="bg-gray-50 hover:bg-gray-200 pr-5 pl-5 pt-1 pb-1 rounded"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        {accounts[0]}
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="bg-gray-50 hover:bg-gray-200 pr-5 pl-5 pt-1 pb-1 rounded"
                        aria-expanded="false"
                        aria-haspopup="true"
                        onClick={enableMataMask}
                      >
                        connect
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
