import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useRef } from "react";
import "./ModalForm.css";

const FormInputModal = ({
  isInputModalShow,
  setIsInputModalShow,
  inputDataArray,
  setInputDataArray,
  setIsErrorMessage,
}) => {
  let modalRef = useRef();

  if (!isInputModalShow) {
    return <></>;
  }

  function closeModalOutside(e) {
    if (modalRef.current && modalRef.current == e.target) {
      setIsInputModalShow(false);
    }
  }

  function closeModal() {
    setIsInputModalShow(false);
  }

  function modalFormSubmit(e) {
    e.preventDefault();

    const updatedInputDataArray = inputDataArray.map((item) => {
      return { ...item, value: "" };
    });

    setInputDataArray(updatedInputDataArray);
    setIsErrorMessage(false);
    setIsInputModalShow(false);
  }

  return ReactDOM.createPortal(
    <div onMouseDown={closeModalOutside} ref={modalRef} className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>Approve</h2>
          <button className="close-btn" onClick={closeModal}>
            X
          </button>
        </div>

        <form onSubmit={modalFormSubmit}>
          {inputDataArray.map((input) => (
            <div key={input.id}>
              <div className="form-group-inline">
                <span className="font-semibold mt-16">{input.name}:</span>
                <span>{input.value}</span>
              </div>
            </div>
          ))}

          <div className="button-container">
            <button className="submit-btn">Save</button>
            <button className="bottom-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

FormInputModal.propTypes = {
  isInputModalShow: PropTypes.bool,
  setIsInputModalShow: PropTypes.func,
  inputDataArray: PropTypes.array,
  setInputDataArray: PropTypes.func,
  setIsErrorMessage: PropTypes.func,
};

export default FormInputModal;
