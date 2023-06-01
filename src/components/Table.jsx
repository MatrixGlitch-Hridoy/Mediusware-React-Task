import React from "react";

export default function Table({ data, handleSearch }) {
  return (
    <div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by country name"
          //   value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {data?.results?.map((result, index) => (
            <tr key={index}>
              <td>{result.country.name}</td>
              <td>{result.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
