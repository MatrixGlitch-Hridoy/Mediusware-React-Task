import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

const Modal = ({ title, isOpen, onClose, apiCall }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      console.log("inside fetch data");
      try {
        const response = await axios.get(apiCall, {
          params: {
            search: "",
            page: 1,
            page_index: 10,
          },
        });
        setData(response.data);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, apiCall]);

  const closeModal = () => {
    if (onClose) {
      onClose();
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
                    <Table data={data} />
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
