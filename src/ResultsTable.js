import React, { useState, useEffect } from "react";

function ResultsTable({ results, onSelect, clearSelectionTrigger }) {
  // State to track the selected row (by contact ID)
  const [selectedRow, setSelectedRow] = useState(null);

  // State to manage the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Items per page for pagination
  const itemsPerPage = 3;

  // Clear the selected row when the parent triggers a clear selection
  useEffect(() => {
    if (clearSelectionTrigger) {
      setSelectedRow(null); // Clear the selected row state
      onSelect(null); // Notify the parent component
    }
  }, [clearSelectionTrigger, onSelect]);

  // Handle checkbox selection for a row
  const handleCheckboxChange = (contact) => {
    if (selectedRow === contact.id) {
      // If the row is already selected, deselect it
      setSelectedRow(null);
      onSelect(null); // Notify the parent that the selection is cleared
    } else {
      // Otherwise, select the current row
      setSelectedRow(contact.id);
      onSelect(contact); // Pass the selected contact to the parent
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(results.length / itemsPerPage);

  // Calculate the range of items to show on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = results.slice(startIndex, startIndex + itemsPerPage);

  // Handle the "Next Page" button click
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle the "Previous Page" button click
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="results-table">
      {/* Table displaying contact details */}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((contact) => (
            <tr
              key={contact.id} // Unique key for each row
              className={selectedRow === contact.id ? "selected" : ""} // Highlight the selected row
            >
              <td>
                {/* Checkbox for selecting/deselecting a contact */}
                <input
                  type="checkbox"
                  checked={selectedRow === contact.id}
                  onChange={() => handleCheckboxChange(contact)}
                />
              </td>
              <td>
                {/* Display full name */}
                {`${contact.firstName || ""} ${contact.middleName || ""} ${
                  contact.lastName || ""
                }`.trim()}
              </td>
              <td>{contact.dob}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zip}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        {/* Previous Page Button */}
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1} // Disable if on the first page
          className="pagination-button"
        >
          &lt; {/* Left arrow */}
        </button>
        <span>
          Page {currentPage} of {totalPages} {/* Display current page */}
        </span>
        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages} // Disable if on the last page
          className="pagination-button"
        >
          &gt; {/* Right arrow */}
        </button>
      </div>
    </div>
  );
}

export default ResultsTable;
