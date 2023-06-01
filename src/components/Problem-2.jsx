import React, { useState } from "react";
import Modal from "./Modal";

const Problem2 = () => {
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleOpenModal1 = () => {
    setOpenModal1(true);
  };

  const handleOpenModal2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal1 = () => {
    setOpenModal1(false);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleOpenModal1}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleOpenModal2}
          >
            US Contacts
          </button>
        </div>
      </div>
      <Modal
        isOpen={openModal1}
        onClose={handleCloseModal1}
        apiCall="https://contact.mediusware.com/api/contacts/"
        title="All Contacts"
        path={"all-contacts"}
      />

      <Modal
        isOpen={openModal2}
        onClose={handleCloseModal2}
        apiCall="https://contact.mediusware.com/api/country-contacts/United%20States/"
        title="US Contacts"
        path={"us-contacts"}
      />
    </div>
  );
};

export default Problem2;
