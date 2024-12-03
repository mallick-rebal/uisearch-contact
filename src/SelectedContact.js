import React from "react";

function SelectedContact({ contact }) {
  return (
    <div className="selected-contact">
      <h2>Selected Contact</h2>
      {/* Display the selected contact's details */}
      <p><strong>Name:</strong> {`${contact.firstName || ""} ${contact.middleName || ""} ${contact.lastName || ""}`.trim()}</p>
      <p><strong>Date Of Birth:</strong> {contact.dob}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Address:</strong> {contact.address}, {contact.city}, {contact.state}, {contact.zip}</p>
      <p><strong>Additional Note:</strong> {contact.note}</p>
    </div>
  );
}

export default SelectedContact;
