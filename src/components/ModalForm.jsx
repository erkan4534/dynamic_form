import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./ModalForm.css";

const inputData = {
  id: "",
  name: "",
  placeholder: "",
  label: "",
  type: "",
};

const ModalForm = ({ isModalShow, setIsModalShow }) => {
  let modalRef = useRef();
  const [newInput, setNewInput] = useState(inputData);
  const { name, placeholder, label, type } = newInput;

  if (!isModalShow) {
    return;
  }

  function closeModalOutside(e) {
    if (modalRef.current && modalRef.current == e.target) {
      setIsModalShow(false);
    }
  }

  function closeModal() {
    setIsModalShow(false);
  }

  function modalFormSubmit(event) {
    event.preventDefault();
    console.log(newInput);
    // setNewInput(inputData);
  }

  const handleChange = (name) => {
    return (event) => {
      setNewInput({
        ...newInput,
        [name]: event.target.value,
      });
    };
  };

  return ReactDOM.createPortal(
    <div
      onMouseDown={closeModalOutside}
      ref={modalRef}
      className={`popup ${isModalShow ? "open" : ""}`}
    >
      <div className="popup-content">
        <div className="popup-header">
          <h2>Add New Input</h2>
          <button className="close-btn" onKeyUp={closeModal}>
            X
          </button>
        </div>

        <form onSubmit={modalFormSubmit}>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              id="inputName"
              type="text"
              onChange={handleChange("name")}
              value={name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputPlaceHolder">Placeholder</label>
            <input
              id="inputPlaceHolder"
              type="text"
              onChange={handleChange("placeholder")}
              value={placeholder}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputLabel">Label</label>
            <input
              id="inputLabel"
              type="text"
              onChange={handleChange("label")}
              value={label}
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputType">Type</label>
            <input
              id="inputType"
              type="text"
              onChange={handleChange("type")}
              value={type}
            />
          </div>

          <div className="button-container">
            <button className="submit-btn">Giriş</button>
            <button className="bottom-btn" onClick={closeModal}>
              Kapat
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

ModalForm.propTypes = {
  isModalShow: PropTypes.bool,
  closeForm: PropTypes.func,
  modalShowRef: PropTypes.object,
  setIsModalShow: PropTypes.func,
  inputDataArray: PropTypes.array,
  setInputDataArray: PropTypes.func,
};

export default ModalForm;
