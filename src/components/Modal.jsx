import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from "./Table";

const Modal = ({ title, isOpen, onClose, apiCall, path }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
        setData((prevData) => [...prevData, ...response.data.results]);
        setIsLoading(false);
        setHasMore(response.data.results > 0);
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
  }, [isOpen, apiCall, searchString, page]);

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
                <h5 className="modal-title">Modal Title</h5>
                <button type="button" className="close" onClick={closeModal}>
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
