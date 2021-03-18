import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex">
              <div className="flex-shrink-0 flex items-center">
                <h1  className="text-gray-50 leading-20 text-2xl">Vote App</h1>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-50 hover:bg-gray-200 pr-5 pl-5 pt-1 pb-1 rounded"
                   
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                      connect
                  </button>
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
