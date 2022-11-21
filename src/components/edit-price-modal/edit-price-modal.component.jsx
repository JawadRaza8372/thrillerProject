import React, { useState } from "react";
import "./edit-price-modal.styles.scss";

import Modal from "react-bootstrap/Modal";
import { CustomButton } from "../custom-button/custome-button.component";
import { SearchResult } from "../search-result/search-result.component";

export const EditPriceModal = ({ modalStatus, setModalStatus }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };
    return ( <
        >
        <
        Modal show = { modalStatus }
        onHide = {
            () => setModalStatus(false)
        }
        dialogClassName = "modal-80w" >
        <
        Modal.Header className = "modal-title" >
        <
        Modal.Title > Edit Price < /Modal.Title> < /
        Modal.Header > <
        Modal.Body >
        <
        div className = "search-container" >
        <
        input placeholder = "Enter a Price"
        onChange = { handleChange }
        /> < /
        div > <
        /Modal.Body> <
        Modal.Footer >
        <
        CustomButton onClick = {
            () => setModalStatus(false)
        } > Save < /CustomButton> < /
        Modal.Footer > <
        /Modal> < /
        >
    );
};