const Help = ({ onClose }) => {
  return (
    <div className="fixed inset-0 overflow-hidden z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Help Center
                    </h2>
                    <button
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 px-4 sm:px-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                    <p className="text-gray-600 mb-4">
                      StatMates helps you analyze relationships between categorical variables 
                      using contingency tables. No statistics degree required!
                    </p>
                    <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                      <li>Enter your data manually or paste from Excel</li>
                      <li>Choose which statistical tests to run</li>
                      <li>Get results with plain-language interpretations</li>
                    </ol>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Contingency Table Basics</h3>
                    <p className="text-gray-600 mb-2">
                      Contingency tables (also called crosstabs) show how two categorical variables relate. For example:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md mb-3">
                      <p className="font-medium mb-1">Example: Treatment vs. Recovery</p>
                      <div className="flex space-x-4 text-sm">
                        <div>
                          <div className="p-1 bg-primary-light text-primary-dark font-medium mb-1 text-center">Recovered</div>
                          <div className="p-1 border border-gray-200 mb-1 text-center">45</div>
                          <div className="p-1 border border-gray-200 text-center">30</div>
                        </div>
                        <div>
                          <div className="p-1 bg-primary-light text-primary-dark font-medium mb-1 text-center">Not Recovered</div>
                          <div className="p-1 border border-gray-200 mb-1 text-center">15</div>
                          <div className="p-1 border border-gray-200 text-center">25</div>
                        </div>
                        <div className="flex flex-col">
                          <div className="p-1 opacity-0 mb-1">X</div>
                          <div className="p-1 bg-primary-light text-primary-dark font-medium mb-1">Treatment A</div>
                          <div className="p-1 bg-primary-light text-primary-dark font-medium">Treatment B</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Our tests help you determine if there's a statistically significant relationship between variables.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Statistical Test Guide</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-medium">Chi-Square Test</h4>
                      <p className="text-gray-600 text-sm">
                        Compares observed counts to what would be expected if variables are independent.
                        Generally reliable when expected counts in each cell are at least 5.
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium">Fisher's Exact Test</h4>
                      <p className="text-gray-600 text-sm">
                        A more accurate alternative when sample sizes are small or expected counts are low.
                        Particularly useful for 2×2 tables.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Interpreting p-values</h4>
                      <p className="text-gray-600 text-sm">
                        A p-value less than 0.05 typically indicates a statistically significant relationship 
                        between your variables. Remember: statistical significance doesn't necessarily mean 
                        practical importance!
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Glossary</h3>
                    
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium">Contingency Table</h4>
                        <p className="text-gray-600 text-sm">
                          A table showing the distribution of one variable in rows and another in columns.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Expected Counts</h4>
                        <p className="text-gray-600 text-sm">
                          The number of observations you would expect in each cell if the variables were independent.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">p-value</h4>
                        <p className="text-gray-600 text-sm">
                          The probability of observing your results (or more extreme) if the null hypothesis is true.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onClose}
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

