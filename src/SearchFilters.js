import React, { useState } from "react";

function SearchFilters({ onSearch }) {
  // State to manage search filter inputs
  const [filters, setFilters] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the event
    setFilters((prev) => ({ ...prev, [name]: value })); // Update the corresponding filter
  };

  // Trigger the search when the "Search" button is clicked
  const handleSearch = () => {
    onSearch(filters); // Pass the filters to the parent component
  };

  return (
    <div className="search-filters">
      {/* Render search input fields */}
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={filters.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="middleName"
        placeholder="Middle Name"
        value={filters.middleName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={filters.lastName}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dob"
        value={filters.dob}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={filters.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={filters.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={filters.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleChange}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={filters.state}
        onChange={handleChange}
      />
      <input
        type="text"
        name="zip"
        placeholder="Zip Code"
        value={filters.zip}
        onChange={handleChange}
      />
      {/* Search button */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchFilters;
