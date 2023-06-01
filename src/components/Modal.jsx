import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

const Modal = ({ title, isOpen, onClose, apiCall, path }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const handleSearch = (searchString) => {
    setSearchString(searchString);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCall, {
          params: {
            search: searchString,
            page: 1,
            page_index: 10,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
      window.history.pushState(null, "", `/modal/${path}`);
    }
  }, [isOpen, apiCall, searchString]);

  const closeModal = () => {
    if (onClose) {
      onClose();
      window.history.pushState(null, "", "/problem-2");
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <Table data={data} handleSearch={handleSearch} />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
