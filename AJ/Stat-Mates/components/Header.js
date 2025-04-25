const Header = ({ toggleHelp, toggleMenu }) => {
  return (
    <header className="bg-neutral-card border-b border-neutral-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/StatMatesLogoGif.gif" 
              alt="StatMates Logo" 
              className="w-10 h-10 object-cover rounded"
              style={{ WebkitAnimationPlayState: 'paused', animationPlayState: 'paused' }}
              onLoad={(e) => {
                // Pause the GIF after one loop
                setTimeout(() => {
                  e.target.style.WebkitAnimationPlayState = 'paused';
                  e.target.style.animationPlayState = 'paused';
                }, e.target.duration * 1000);
              }}
            />
            <h1 className="ml-3 text-2xl font-bold text-neutral-text">
              StatMates
            </h1>
          </div>
          
          {/* Hamburger menu for mobile */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              New Analysis
            </button>
            
            <button className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
              My Projects
            </button>
            
            <button 
              onClick={toggleHelp}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center"
              aria-label="Toggle help panel"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Help Center
            </button>
            
            <div className="relative">
              <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};