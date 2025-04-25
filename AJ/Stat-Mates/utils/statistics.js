// Utility functions for statistical calculations

const calculateStatistics = (data, options) => {
  // This is a mock-up of the statistical calculations
  // In a real app, you'd implement proper statistical functions
  
  const results = {};
  
  // Calculate row and column totals
  const rowTotals = data.values.map(row => 
    row.reduce((sum, cell) => sum + (cell || 0), 0)
  );
  
  const colTotals = Array(data.cols).fill(0);
  for (let i = 0; i < data.rows; i++) {
    for (let j = 0; j < data.cols; j++) {
      colTotals[j] += data.values[i][j] || 0;
    }
  }
  
  const totalSum = rowTotals.reduce((sum, val) => sum + val, 0);
  
  // Calculate expected values
  const expected = [];
  for (let i = 0; i < data.rows; i++) {
    expected[i] = [];
    for (let j = 0; j < data.cols; j++) {
      expected[i][j] = (rowTotals[i] * colTotals[j]) / totalSum;
    }
  }
  
  results.expected = expected;
  
  // Calculate chi-square
  if (options.chiSquare) {
    let chiSquare = 0;
    for (let i = 0; i < data.rows; i++) {
      for (let j = 0; j < data.cols; j++) {
        const observed = data.values[i][j];
        const exp = expected[i][j];
        chiSquare += Math.pow(observed - exp, 2) / exp;
      }
    }
    
    // Degrees of freedom
    const df = (data.rows - 1) * (data.cols - 1);
    
    // p-value (using jStat library)
    const pValue = 1 - jStat.chisquare.cdf(chiSquare, df);
    
    results.chiSquare = {
      value: chiSquare,
      df: df,
      p: pValue
    };
  }
  
  // Fisher's exact test (simplified - for 2x2 tables only)
  if (options.fishersExact && data.rows === 2 && data.cols === 2) {
    // This is a simplification for demo purposes
    // In a real app, you'd use a proper Fisher's exact test implementation
    
    const a = data.values[0][0];
    const b = data.values[0][1];
    const c = data.values[1][0];
    const d = data.values[1][1];
    
    // Simplified p-value calculation for 2x2 table
    // In a real app, you'd calculate the proper Fisher's exact p-value
    const fisher_p = 0.043; // Simulated value
    
    results.fishersExact = {
      p: fisher_p
    };
  }
  
  // Calculate percentages
  if (options.percentages) {
    const rowPercentages = [];
    const colPercentages = [];
    const overallPercentages = [];
    const totalSum = data.values.reduce((sum, row) => 
      sum + row.reduce((rowSum, cell) => rowSum + (cell || 0), 0), 0
    );
    
    for (let i = 0; i < data.rows; i++) {
      rowPercentages[i] = [];
      colPercentages[i] = [];
      overallPercentages[i] = [];
      for (let j = 0; j < data.cols; j++) {
        // Row percentages (% of row total)
        rowPercentages[i][j] = (data.values[i][j] / rowTotals[i]) * 100;
        
        // Column percentages (% of column total)
        colPercentages[i][j] = (data.values[i][j] / colTotals[j]) * 100;
        
        // Overall percentages (% of grand total)
        overallPercentages[i][j] = (data.values[i][j] / totalSum) * 100;
      }
    }
    
    results.percentages = {
      row: rowPercentages,
      column: colPercentages,
      overall: overallPercentages
    };
  }
  
  // Add warnings
  const warnings = [];
  
  // Check for expected counts < 5
  let lowExpectedCells = 0;
  for (let i = 0; i < data.rows; i++) {
    for (let j = 0; j < data.cols; j++) {
      if (expected[i][j] < 5) {
        lowExpectedCells++;
      }
    }
  }
  
  if (lowExpectedCells > 0) {
    const percent = Math.round((lowExpectedCells / (data.rows * data.cols)) * 100);
    warnings.push(`${lowExpectedCells} cells (${percent}%) have expected counts less than 5. Fisher's exact test is recommended.`);
  }
  
  results.warnings = warnings;
  
  return results;
};