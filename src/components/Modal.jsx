import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "./Table";

const Modal = ({ title, isOpen, onClose, apiCall, path }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showEvenNumbers, setShowEvenNumbers] = useState(false);
  const containerRef = useRef(null);
  const handleSearch = (searchString) => {
    setSearchString(searchString);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiCall, {
          params: {
            search: searchString,
            page: page,
            page_index: page,
          },
        });

        const newData = response.data.results;
        let filteredData = newData;
        if (showEvenNumbers) {
          filteredData = newData.filter((item) => {
            const numberOnly = item.phone.replace(/\D/g, "");
            const parsedNumber = parseInt(numberOnly, 12);
            return parsedNumber % 2 === 0;
          });
        }

        setData((prevData) => [...prevData, ...filteredData]);
        setIsLoading(false);
        setHasMore(filteredData.length > 0);

        // setData((prevData) => [...prevData, ...response.data.results]);
        // setIsLoading(false);
        // setHasMore(response.data.results > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setHasMore(false);
      }
    };

    if (isOpen) {
      fetchData();
      window.history.pushState(null, "", `/modal/${path}`);
    }
  }, [isOpen, apiCall, searchString, page, showEvenNumbers]);

  const closeModal = () => {
    if (onClose) {
      onClose();
      window.history.pushState(null, "", "/problem-2");
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container &&
      container.scrollTop + container.clientHeight >= container.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleCheckboxChange = (event) => {
    setShowEvenNumbers(event.target.checked);
  };

  return (
    <div>
      {isOpen && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="close " onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>

              <div
                className="modal-body"
                onScroll={handleScroll}
                ref={containerRef}
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <Table
                    data={data}
                    handleSearch={handleSearch}
                    loadMoreData={handleScroll}
                  />
                )}
                {!isLoading && !hasMore && <p>No more data to load.</p>}
              </div>
              <div className="modal-footer">
                <div className="">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#46139f", color: "white" }}
                  >
                    ALL Contacts
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#ff7f50", color: "white" }}
                  >
                    US Contacts
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#ffffff", border: "46139f" }}
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={showEvenNumbers}
                        onChange={handleCheckboxChange}
                      />
                      Only Even
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
