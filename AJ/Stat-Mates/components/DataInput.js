const DataInput = ({ initialData, onSubmit }) => {
  const [tableData, setTableData] = useState(initialData);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteContent, setPasteContent] = useState('');
  const [error, setError] = useState(null);
  const [editingLabel, setEditingLabel] = useState(null); // { type: 'row'|'col', index: number }

  const handleCellChange = (rowIndex, colIndex, value) => {
    // Accept only numbers
    if (value !== '' && isNaN(Number(value))) {
      return;
    }
    
    const newValues = [...tableData.values];
    newValues[rowIndex][colIndex] = value === '' ? null : Number(value);
    setTableData({ ...tableData, values: newValues });
  };

  const handleLabelChange = (type, index, value) => {
    if (type === 'row') {
      const newLabels = [...tableData.rowLabels];
      newLabels[index] = value;
      setTableData({ ...tableData, rowLabels: newLabels });
    } else {
      const newLabels = [...tableData.colLabels];
      newLabels[index] = value;
      setTableData({ ...tableData, colLabels: newLabels });
    }
  };

  const addRow = () => {
    const newRow = Array(tableData.cols).fill(null);
    const newLabel = `Row ${tableData.rows + 1}`;
    setTableData({
      ...tableData,
      rows: tableData.rows + 1,
      values: [...tableData.values, newRow],
      rowLabels: [...tableData.rowLabels, newLabel]
    });
  };

  const removeRow = () => {
    if (tableData.rows <= 2) return;
    
    const newValues = tableData.values.slice(0, -1);
    const newLabels = tableData.rowLabels.slice(0, -1);
    setTableData({
      ...tableData,
      rows: tableData.rows - 1,
      values: newValues,
      rowLabels: newLabels
    });
  };

  const addColumn = () => {
    const newValues = tableData.values.map(row => [...row, null]);
    const newLabel = `Column ${tableData.cols + 1}`;
    setTableData({
      ...tableData,
      cols: tableData.cols + 1,
      values: newValues,
      colLabels: [...tableData.colLabels, newLabel]
    });
  };

  const removeColumn = () => {
    if (tableData.cols <= 2) return;
    
    const newValues = tableData.values.map(row => row.slice(0, -1));
    const newLabels = tableData.colLabels.slice(0, -1);
    setTableData({
      ...tableData,
      cols: tableData.cols - 1,
      values: newValues,
      colLabels: newLabels
    });
  };

  const handlePasteContent = () => {
    try {
      // Parse pasted content (assume tab or comma separated)
      const rows = pasteContent.trim().split('\n');
      const parsedData = rows.map(row => 
        row.split(/[\t,]/).map(cell => {
          const value = cell.trim();
          return value === '' ? null : Number(value);
        })
      );
      
      // Check if all values are numbers or null
      const hasInvalidData = parsedData.some(row => 
        row.some(cell => cell !== null && isNaN(Number(cell)))
      );
      
      if (hasInvalidData) {
        setError('Please ensure all values are numbers');
        return;
      }
      
      // Get dimensions
      const rowCount = parsedData.length;
      const colCount = Math.max(...parsedData.map(row => row.length));
      
      // Normalize the data to ensure all rows have the same number of columns
      const normalizedData = parsedData.map(row => {
        if (row.length < colCount) {
          return [...row, ...Array(colCount - row.length).fill(null)];
        }
        return row;
      });
      
      // Generate labels for the new dimensions
      const newRowLabels = Array.from({ length: rowCount }, (_, i) => `Row ${i+1}`);
      const newColLabels = Array.from({ length: colCount }, (_, i) => `Column ${i+1}`);
      
      setTableData({
        rows: rowCount,
        cols: colCount,
        values: normalizedData,
        rowLabels: newRowLabels,
        colLabels: newColLabels
      });
      
      setPasteMode(false);
      setError(null);
    } catch (e) {
      setError('Could not parse the pasted data. Please check the format.');
    }
  };

  const handleSubmit = () => {
    // Validate that all cells have values
    const hasEmptyCells = tableData.values.some(row => 
      row.some(cell => cell === null)
    );
    
    if (hasEmptyCells) {
      setError('Please fill in all cells with values');
      return;
    }
    
    setError(null);
    onSubmit(tableData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-slideUp">
      <h2 className="text-2xl font-bold mb-4">Step 1: Enter Your Data</h2>
      <p className="mb-6 text-gray-600">
        Enter the counts for your contingency table or paste data directly from Excel. You can also customize row and column labels by clicking on them.
      </p>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
          </svg>
          {error}
        </div>
      )}
      
      <div className="flex mb-4 space-x-4">
        <button 
          onClick={() => setPasteMode(false)} 
          className={`px-4 py-2 rounded-md transition-colors ${!pasteMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Manual Input
        </button>
        <button 
          onClick={() => setPasteMode(true)} 
          className={`px-4 py-2 rounded-md transition-colors ${pasteMode ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Paste from Excel
        </button>
      </div>
      
      {!pasteMode ? (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between">
            <div className="mb-2 sm:mb-0">
              <button 
                onClick={addRow} 
                className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 mr-2"
                aria-label="Add row"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button 
                onClick={removeRow} 
                className={`px-3 py-1 ${tableData.rows <= 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-md`}
                disabled={tableData.rows <= 2}
                aria-label="Remove row"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
                </svg>
              </button>
              <span className="ml-2 text-sm text-gray-500">Rows: {tableData.rows}</span>
            </div>
            
            <div>
              <button 
                onClick={addColumn} 
                className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 mr-2"
                aria-label="Add column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
              <button 
                onClick={removeColumn} 
                className={`px-3 py-1 ${tableData.cols <= 2 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-md`}
                disabled={tableData.cols <= 2}
                aria-label="Remove column"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
                </svg>
              </button>
              <span className="ml-2 text-sm text-gray-500">Columns: {tableData.cols}</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="contingency-table">
              <thead>
                <tr>
                  <th></th>
                  {Array.from({ length: tableData.cols }, (_, i) => (
                    <th key={i} onClick={() => setEditingLabel({ type: 'col', index: i })}>
                      {editingLabel && editingLabel.type === 'col' && editingLabel.index === i ? (
                        <input
                          type="text"
                          className="w-full p-1 border border-primary rounded"
                          defaultValue={tableData.colLabels[i]}
                          onBlur={(e) => {
                            handleLabelChange('col', i, e.target.value);
                            setEditingLabel(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleLabelChange('col', i, e.target.value);
                              setEditingLabel(null);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center justify-center group">
                          <span>{tableData.colLabels[i]}</span>
                          <svg className="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: tableData.rows }, (_, rowIndex) => (
                  <tr key={rowIndex}>
                    <th onClick={() => setEditingLabel({ type: 'row', index: rowIndex })}>
                      {editingLabel && editingLabel.type === 'row' && editingLabel.index === rowIndex ? (
                        <input
                          type="text"
                          className="w-full p-1 border border-primary rounded"
                          defaultValue={tableData.rowLabels[rowIndex]}
                          onBlur={(e) => {
                            handleLabelChange('row', rowIndex, e.target.value);
                            setEditingLabel(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleLabelChange('row', rowIndex, e.target.value);
                              setEditingLabel(null);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center group">
                          <span>{tableData.rowLabels[rowIndex]}</span>
                          <svg className="w-4 h-4 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </div>
                      )}
                    </th>
                    {Array.from({ length: tableData.cols }, (_, colIndex) => (
                      <td key={colIndex}>
                        <input
                          type="text"
                          className="contingency-cell-input"
                          value={tableData.values[rowIndex][colIndex] === null ? '' : tableData.values[rowIndex][colIndex]}
                          onChange={e => handleCellChange(rowIndex, colIndex, e.target.value)}
                          placeholder="e.g. 12"
                          aria-label={`${tableData.rowLabels[rowIndex]}, ${tableData.colLabels[colIndex]}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-2 text-sm text-gray-600">
            Copy and paste data from Excel or any spreadsheet. Values should be separated by tabs or commas.
          </p>
          <textarea
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            value={pasteContent}
            onChange={e => setPasteContent(e.target.value)}
            placeholder="Paste your data here..."
          ></textarea>
          <button 
            onClick={handlePasteContent} 
            className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700"
          >
            Process Pasted Data
          </button>
        </div>
      )}
      
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSubmit} 
          className="btn-primary flex items-center"
        >
          Continue to Analysis Options
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};