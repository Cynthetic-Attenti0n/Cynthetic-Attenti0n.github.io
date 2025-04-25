const Sidebar = ({ currentStep, steps, onThemeToggle, isDarkMode }) => {
  return (
    <aside className="w-64 bg-neutral-card border-r border-neutral-border hidden md:block">
      <div className="p-6 h-full flex flex-col">
        <div className="flex-grow">
          <h2 className="text-lg font-semibold mb-6">Your Progress</h2>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index < currentStep ? 'bg-primary text-white' : 
                  index === currentStep ? 'bg-primary-light border-2 border-primary text-primary' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${index === currentStep ? 'text-primary' : 'text-gray-700'}`}>
                    {step}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {index === 0 && "Upload or enter your data"}
                    {index === 1 && "Choose your analysis settings"}
                    {index === 2 && "View and interpret results"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-border">
          <button className="w-full flex items-center px-4 py-2 text-left rounded-md hover:bg-gray-100">
            <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            <span>Sign Out</span>
          </button>
          
          <div className="mt-4 pt-4 border-t border-neutral-border flex items-center justify-between px-4 py-2">
            <span className="text-neutral-text">Dark Mode</span>
            <button 
              onClick={onThemeToggle}
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
    </aside>
  );
};