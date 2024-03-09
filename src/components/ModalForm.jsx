import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./ModalForm.css";

const defaultInputData = {
  id: "",
  label: "",
  name: "",
  placeholder: "",
  type: "",
};

const ModalForm = ({
  isModalShow,
  setIsModalShow,
  inputDataArray,
  setInputDataArray,
  inputData,
  setInputData,
  isUpdateData,
  setIsUpdateData,
  isErrorMessage,
  setIsErrorMessage,
}) => {
  let modalRef = useRef();

  useEffect(() => {
    if (!isUpdateData) {
      setInputData(defaultInputData);
    }
  }, [inputDataArray, isUpdateData]);

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

  function modalFormSubmit(e) {
    e.preventDefault();

    const { id, ...inputDataWithoutId } = inputData;

    const isFormValid = Object.values(inputDataWithoutId).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      setIsErrorMessage(true);
      return;
    }

    if (!isUpdateData) {
      const newInputData = {
        ...inputData,
        id: inputDataArray.length + 1,
      };

      setInputDataArray((prevState) => {
        return [...prevState, newInputData];
      });
    } else {
      const updatedInputDataArray = inputDataArray.map((item) => {
        if (item.id === inputData.id) {
          return inputData;
        } else {
          return item;
        }
      });

      setInputDataArray(updatedInputDataArray);
      setInputDataArray((data) => {
        return data;
      });

      setIsUpdateData(false);
    }

    setIsModalShow(false);
  }

  const handleChange = (name) => {
    return (event) => {
      setInputData({
        ...inputData,
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
          <h2>New Input</h2>
          <button className="close-btn" onClick={closeModal}>
            X
          </button>
        </div>

        {isErrorMessage && (
          <b className="text-sm text-[11px] text-red-500">
            Tüm alanlar dolu ve boş karakter içermemelidir.
          </b>
        )}

        <form onSubmit={modalFormSubmit}>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              id="inputName"
              type="text"
              onChange={handleChange("name")}
              value={inputData.name}
              className={
                inputData.name.trim() == "" && isErrorMessage
                  ? "border-red-500"
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputPlaceHolder">Placeholder</label>
            <input
              id="inputPlaceHolder"
              type="text"
              onChange={handleChange("placeholder")}
              value={inputData.placeholder}
              className={
                inputData.placeholder.trim() == "" && isErrorMessage
                  ? "border-red-500"
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputLabel">Label</label>
            <input
              id="inputLabel"
              type="text"
              onChange={handleChange("label")}
              value={inputData.label}
              className={
                inputData.label.trim() == "" && isErrorMessage
                  ? "border-red-500"
                  : ""
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputType">Type</label>

            <input
              placeholder="Select Type"
              onChange={handleChange("type")}
              list="inputType"
              className={
                inputData.type.trim() == "" && isErrorMessage
                  ? "border-red-500"
                  : ""
              }
              value={inputData.type}
            />
            <datalist id="inputType">
              <option>text</option>
              <option>password</option>
              <option>email</option>
            </datalist>
          </div>

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

ModalForm.propTypes = {
  isModalShow: PropTypes.bool,
  closeForm: PropTypes.func,
  modalShowRef: PropTypes.object,
  setIsModalShow: PropTypes.func,
  inputDataArray: PropTypes.array,
  setInputDataArray: PropTypes.func,
  inputData: PropTypes.object,
  setInputData: PropTypes.func,
  setIsUpdateData: PropTypes.func,
  isUpdateData: PropTypes.bool,
  isErrorMessage: PropTypes.bool,
  setIsErrorMessage: PropTypes.func,
};

export default ModalForm;
