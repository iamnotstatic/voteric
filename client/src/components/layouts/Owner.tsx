import React, { useState } from 'react';

const Owner = ({ state: { contract, accounts, owner } }: any) => {
  const [address, setAddress] = useState<any | null>(null);

  const onAuthorize = async (e: any) => {
    e.preventDefault();
    await contract.methods.authorize(address).send({ from: accounts[0] });
  };

  return (
    <div>
      {accounts && accounts[0] === owner ? (
        <form className="mt-5" onSubmit={onAuthorize}>
          <div className="flex flex-col md:flex-row border-b border-gray-200 pb-4 mb-4">
            <div className="flex-1 flex flex-col md:flex-row">
              <div className="w-full flex-1 mx-2">
                <div className="my-2 p-1 bg-white flex border border-gray-200 rounded">
                  <input
                    type="text"
                    placeholder="address"
                    required
                    maxLength={42}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
                  />{' '}
                </div>
              </div>
              <div className="w-full flex-1 mx-2">
                <div className="my-2 p-1 bg-gray-800 flex border border-gray-200 rounded">
                  <input
                    type="submit"
                    value="Authorize"
                    className="p-1 px-2  bg-gray-800 outline-none w-full text-gray-50 cursor-pointer"
                  />{' '}
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Owner;
