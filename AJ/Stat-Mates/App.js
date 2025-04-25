const { useState, useEffect } = React;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentView, setCurrentView] = useState('landing'); 
  const [tableData, setTableData] = useState({
    rows: 2,
    cols: 2,
    values: [
      [null, null],
      [null, null]
    ],
    rowLabels: ["Row 1", "Row 2"],
    colLabels: ["Column 1", "Column 2"]
  });
  const [analysisOptions, setAnalysisOptions] = useState({
    chiSquare: true,
    fishersExact: true,
    percentages: true,
    expectedCounts: true
  });
  const [results, setResults] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const steps = [
    "Data Input",
    "Analysis Options",
    "Results & Interpretation"
  ];

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleDataSubmit = (data) => {
    setTableData(data);
    setCurrentStep(1);
  };

  const handleOptionsSubmit = (options) => {
    setAnalysisOptions(options);
    const calculatedResults = calculateStatistics(tableData, options);
    setResults(calculatedResults);
    setCurrentStep(2);
  };

  const handleReset = () => {
    setTableData({
      rows: 2,
      cols: 2,
      values: [
        [null, null],
        [null, null]
      ],
      rowLabels: ["Row 1", "Row 2"],
      colLabels: ["Column 1", "Column 2"]
    });
    setResults(null);
    setCurrentStep(0);
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleAnalysis = () => {
    setShowLandingPage(false);
    setCurrentView('analysis-select');
    setCurrentStep(0);
  };

  const goHome = () => {
    setShowLandingPage(true);
    setCurrentStep(0);
    handleReset();
  };

  const handleAnalysisSelect = (analysisType) => {
    if (analysisType === 'independence') {
      setCurrentView('independence-test');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleHelp={toggleHelp} toggleMenu={toggleMenu} />
      <MobileMenu 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)} 
        toggleHelp={toggleHelp}
        onAnalysis={handleAnalysis}
        onHome={goHome}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <div className="flex flex-1">
        <Sidebar 
          currentStep={currentStep} 
          steps={steps} 
          onThemeToggle={toggleTheme}
          isDarkMode={isDarkMode}
        />
        
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            {showLandingPage ? (
              <div className="animate-fadeIn max-w-4xl mx-auto text-center py-12">
                <img 
                  src="./PlainLogo.png" 
                  alt="StatMates Logo" 
                  className="w-24 h-24 mx-auto mb-8 rounded"
                />
                
                <h1 className="text-5xl font-bold mb-6 text-gray-800">
                  Welcome to StatMates
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  When your flatmates just cant seem to get their stats in on time... try StatMates!
                </p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold mb-2">Easy Data Input</h3>
                      <p className="text-gray-600">
                        Paste directly from Excel or enter your data manually. No formatting required!
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
                      <p className="text-gray-600">
                        We'll automatically choose the right statistical tests for your data.
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <svg className="w-12 h-12 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold mb-2">Clear Results</h3>
                      <p className="text-gray-600">
                        Get plain-English interpretations and beautiful visualizations of your data.
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAnalysis} 
                    className="btn-primary text-lg px-8 py-3"
                  >
                    Start Your Analysis
                  </button>
                  
                  <p className="text-sm text-gray-500 mt-8">
                    Need help? Check out our <button onClick={toggleHelp} className="text-primary hover:underline">tutorial</button> or <a href="#" className="text-primary hover:underline">contact support</a>.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {currentView === 'analysis-select' && (
                  <div className="animate-fadeIn max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                      Choose Your Analysis
                    </h1>
                    <p className="text-center text-lg mb-8 text-gray-600">
                      Select the type of analysis that best fits your data and research questions.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div 
                        onClick={() => handleAnalysisSelect('independence')}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform"
                      >
                        <div className="h-12 w-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z" stroke="currentColor" strokeWidth="2" />
                            <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" />
                            <circle cx="8" cy="8" r="2" fill="currentColor" />
                            <circle cx="16" cy="16" r="2" fill="currentColor" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Independence Test</h3>
                        <p className="text-gray-600 mb-4">
                          Analyze relationships between categorical variables using contingency tables.
                        </p>
                        <div className="flex items-center text-primary">
                          <span>Get Started</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg shadow-md relative">
                        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
                          Coming Soon
                        </div>
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Correlation Analysis</h3>
                        <p className="text-gray-500 mb-4">
                          Explore relationships between continuous variables.
                        </p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg shadow-md relative">
                        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
                          Coming Soon
                        </div>
                        <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">T-Test</h3>
                        <p className="text-gray-500 mb-4">
                          Compare means between two groups.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentView === 'independence-test' && (
                  <div>
                    {currentStep === 0 && (
                      <div className="animate-fadeIn">
                        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                          Independence Test
                        </h1>
                        <p className="text-center text-lg mb-8">
                          Let's analyze the relationship between your categorical variables.
                        </p>
                        <DataInput 
                          initialData={tableData} 
                          onSubmit={handleDataSubmit} 
                        />
                      </div>
                    )}
                    
                    {currentStep === 1 && (
                      <div className="animate-fadeIn">
                        <AnalysisOptions 
                          initialOptions={analysisOptions} 
                          onSubmit={handleOptionsSubmit}
                          onBack={() => setCurrentStep(0)}
                          tableData={tableData}  
                        />
                      </div>
                    )}
                    
                    {currentStep === 2 && results && (
                      <div className="animate-fadeIn">
                        <Results 
                          data={tableData} 
                          options={analysisOptions} 
                          results={results} 
                          onReset={handleReset}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
        
        {showHelp && <Help onClose={toggleHelp} />}
      </div>
      
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
          <p> 2025 Cynthetic-Attenti0n </p>
          <div className="mt-2">
            <a href="#" className="text-primary hover:underline mx-2">Tutorials</a>
            <a href="#" className="text-primary hover:underline mx-2">Contact Support</a>
            <a href="#" className="text-primary hover:underline mx-2">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
