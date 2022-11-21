import React, { useState, useEffect } from "react";
import "./favourites-modal.styles.scss";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { SearchResult } from "../../components/search-result/search-result.component";

export const FavouriteModal = ({
  refreshComponent,
  modalStatus,
  setModalStatus,
  setRefreshCompenent,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchCollection, setSearchCollection] = useState([]);

  useEffect(() => {
    getData();
  }, [searchValue]);
  const getData = async () => {
    const { data } = await axios.get(
      `https://api.thrillerme.com/shoes/getByName/${searchValue}`
    );
    setSearchCollection(data);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  //console.log(refreshComponent);
  return (
    <>
      <Modal
        className="favModalComponentMain"
        show={modalStatus}
        onHide={() => setModalStatus(!modalStatus)}
        dialogClassName="modal-80w"
      >
        <Modal.Header className="modal-title">
          <Modal.Title>Favourite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-container">
            <input
              name="search"
              value={searchValue}
              onChange={handleChange}
              placeholder="Search name, order no."
            />
            <i className="fas fa-search"></i>
            {searchValue.length > 0 ? (
              <SearchResult
                className="result"
                refreshComponent={refreshComponent}
                setRefreshCompenent={setRefreshCompenent}
                SearchResult={searchCollection}
              />
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
