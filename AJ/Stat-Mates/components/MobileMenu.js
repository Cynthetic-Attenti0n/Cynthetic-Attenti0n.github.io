const MobileMenu = ({ isOpen, onClose, toggleHelp, onAnalysis, onHome, onThemeToggle, isDarkMode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden md:hidden" onClick={onClose}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="fixed inset-y-0 right-0 max-w-full flex animate-slideInRight" onClick={e => e.stopPropagation()}>
          <div className="w-screen max-w-xs">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div className="flex items-center">
                  <img 
                    src="/StatMatesLogoGif.gif" 
                    alt="StatMates Logo" 
                    className="w-8 h-8 object-cover rounded"
                    style={{ WebkitAnimationPlayState: 'paused', animationPlayState: 'paused' }}
                    onLoad={(e) => {
                      setTimeout(() => {
                        e.target.style.WebkitAnimationPlayState = 'paused';
                        e.target.style.animationPlayState = 'paused';
                      }, e.target.duration * 1000);
                    }}
                  />
                  <h2 className="ml-2 text-xl font-bold text-neutral-text">StatMates</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 py-6 px-4 space-y-6">
                <button 
                  onClick={() => {
                    onHome();
                    onClose();
                  }}
                  className="w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="text-gray-700 font-medium">Home</span>
                </button>
                
                <button 
                  onClick={() => {
                    onAnalysis();
                    onClose();
                  }}
                  className="w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">Analysis</span>
                </button>
                
                <button 
                  onClick={toggleHelp}
                  className="w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">Help Center</span>
                </button>
                
                <button className="w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-100">
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">Profile</span>
                </button>
              </div>

              <div className="border-t border-gray-200 p-4">
                <button className="w-full flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-100 mb-4">
                  <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span className="text-gray-700 font-medium">Sign Out</span>
                </button>

                <div className="flex items-center justify-between px-4 py-2 rounded-md">
                  <span className="text-gray-700 font-medium">Dark Mode</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onThemeToggle();
                    }}
                    className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    style={{ backgroundColor: isDarkMode ? '#6366f1' : '#e2e8f0' }}
                  >
                    <span
                      className={`${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

