// Main App page that ties together the components
import React, { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters"; // Component for filtering search results
import ResultsTable from "./ResultsTable"; // Component for displaying filtered results in a table
import SelectedContact from "./SelectedContact"; // Component for showing the selected contact's details
import "./App.css"; // App-specific styles

function App() {
  // State to store the entire dataset
  const [data, setData] = useState([]);
  // State to store filtered search results
  const [filteredResults, setFilteredResults] = useState([]);
  // State to store the currently selected contact
  const [selectedContact, setSelectedContact] = useState(null);
  // Trigger to clear selection in child components
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false);

  // Fetch data from the mock JSON file when the component loads
  useEffect(() => {
    fetch("/mockData.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData)) // Set the fetched data into state
      .catch((error) => console.error("Error fetching data:", error)); // Handle fetch errors
  }, []);

  // Handle search logic by filtering contacts based on criteria
  const handleSearch = (criteria) => {
    const results = data.filter((contact) =>
      Object.keys(criteria).every((key) =>
        criteria[key]
          ? contact[key]?.toString().toLowerCase().includes(criteria[key].toLowerCase())
          : true
      )
    );
    setFilteredResults(results); // Update the filtered results state
  };

  // Handle the event when a contact is selected
  const handleSelect = (contact) => {
    setSelectedContact(contact); // Update the selected contact state
    setClearSelectionTrigger(false); // Reset the clear selection trigger
  };

  // Clear the selected contact
  const clearSelection = () => {
    setSelectedContact(null); // Clear the selected contact
    setClearSelectionTrigger(true); // Trigger child components to clear selection
  };

  return (
    <div className="App container">
      <h1>Choose a Contact</h1>
      <h2>Search for a Contact</h2>
      {/* Search filters to search contacts */}
      <SearchFilters onSearch={handleSearch} />
      {/* Show the results table only if there are results */}
      {filteredResults.length > 0 && (
        <ResultsTable
          results={filteredResults}
          onSelect={handleSelect}
          clearSelectionTrigger={clearSelectionTrigger}
        />
      )}
      {/* Show the selected contact details and a clear button */}
      {selectedContact && (
        <>
          <SelectedContact contact={selectedContact} />
          <button onClick={clearSelection}>Clear Selection</button>
        </>
      )}
    </div>
  );
}

export default App;
