const { useState, useEffect } = React;

const AnalysisOptions = ({ initialOptions, onSubmit, onBack, tableData }) => {
  const [options, setOptions] = useState(initialOptions);

  const handleCheckboxChange = (option) => {
    setOptions({
      ...options,
      [option]: !options[option]
    });
  };

  const isFisherDisabled = tableData.rows > 2 || tableData.cols > 2;

  useEffect(() => {
    if (isFisherDisabled && options.fishersExact) {
      setOptions(prev => ({...prev, fishersExact: false}));
    }
  }, [isFisherDisabled]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slideUp">
      <h2 className="text-2xl font-bold mb-4">Step 2: Choose Analysis Options</h2>
      <p className="mb-6 text-gray-600">
        Select the statistical tests and outputs you'd like to include in your analysis.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="chiSquare"
              type="checkbox"
              checked={options.chiSquare}
              onChange={() => handleCheckboxChange('chiSquare')}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="chiSquare" className="font-medium text-gray-700">Chi-Square Test</label>
            <div className="tooltip">
              <span className="text-gray-500 text-sm ml-1 cursor-help">
                <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <div className="tooltip-content">
                Tests whether there is a significant association between two categorical variables. Works best with larger sample sizes.
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Determines if there's a significant association between your variables.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="fishersExact"
              type="checkbox"
              checked={options.fishersExact}
              onChange={() => handleCheckboxChange('fishersExact')}
              disabled={isFisherDisabled}
              className={`h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary ${
                isFisherDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="ml-3">
            <label htmlFor="fishersExact" className={`font-medium ${isFisherDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
              Fisher's Exact Test
              {isFisherDisabled && <span className="ml-2 text-xs text-red-500">(2x2 tables only)</span>}
            </label>
            <div className="tooltip">
              <span className="text-gray-500 text-sm ml-1 cursor-help">
                <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <div className="tooltip-content">
                A more accurate alternative to Chi-Square for small sample sizes or when expected cell counts are low.
                Only available for 2x2 contingency tables.
              </div>
            </div>
            <p className={`text-gray-500 text-sm ${isFisherDisabled ? 'opacity-50' : ''}`}>
              Recommended for smaller sample sizes or when cells have low counts.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="percentages"
              type="checkbox"
              checked={options.percentages}
              onChange={() => handleCheckboxChange('percentages')}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="percentages" className="font-medium text-gray-700">Row & Column Percentages</label>
            <div className="tooltip">
              <span className="text-gray-500 text-sm ml-1 cursor-help">
                <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <div className="tooltip-content">
                Shows how each cell contributes to its row or column total, helping identify patterns in your data.
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Displays each cell's percentage within its row and column.
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="expectedCounts"
              type="checkbox"
              checked={options.expectedCounts}
              onChange={() => handleCheckboxChange('expectedCounts')}
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
          </div>
          <div className="ml-3">
            <label htmlFor="expectedCounts" className="font-medium text-gray-700">Expected Counts</label>
            <div className="tooltip">
              <span className="text-gray-500 text-sm ml-1 cursor-help">
                <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </span>
              <div className="tooltip-content">
                Shows what counts would be expected if there was no association between variables.
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Shows theoretical values if no association existed between variables.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button 
          onClick={onBack} 
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center"
        >
          <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Data Input
        </button>
        
        <button 
          onClick={() => onSubmit(options)} 
          className="btn-primary flex items-center"
        >
          Calculate Results
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};