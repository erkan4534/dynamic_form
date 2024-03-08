import PropTypes from "prop-types";
import { useRef } from "react";
import ReactDOM from "react-dom";
import "./ModalForm.css";

const ModalForm = ({ isModalShow, setIsModalShow }) => {
  let modalRef = useRef();

  if (!isModalShow) {
    return;
  }

  function closeModalOutside(e) {
    if (modalRef.current && modalRef.current == e.target) {
      setIsModalShow(false);
    }
  }

  return ReactDOM.createPortal(
    <div
      onMouseDown={closeModalOutside}
      ref={modalRef}
      className={`popup ${isModalShow ? "open" : ""}`}
    >
      <div className="popup-content">
        <div className="popup-header">
          <h2>Add New Input</h2>
          <button className="close-btn" onClick={() => setIsModalShow(false)}>
            X
          </button>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input type="text" name="inputName" id="inputName" />
          </div>

          <div className="form-group">
            <label htmlFor="inputType">Type</label>
            <input type="text" name="inputType" id="inputType" />
          </div>

          <div className="form-group">
            <label htmlFor="inputLabel">Label</label>
            <input type="text" name="inputLabel" id="inputLabel" />
          </div>

          <div className="form-group">
            <label htmlFor="inputPlaceHolder">Placeholder</label>
            <input type="text" name="inputPlaceHolder" id="inputPlaceHolder" />
          </div>

          <div className="button-container">
            <button className="submit-btn">Giriş</button>
            <button
              className="bottom-btn"
              onClick={() => setIsModalShow(false)}
            >
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
};

export default ModalForm;
