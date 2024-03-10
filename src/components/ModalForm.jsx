import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./ModalForm.css";

const defaultInputData = {
  id: "",
  label: "",
  name: "",
  placeholder: "",
  type: "",
};

const typeArray = ["text", "password", "email"];

const ModalForm = ({
  isModalShow,
  setIsModalShow,
  inputDataArray,
  setInputDataArray,
  inputData,
  setInputData,
  isUpdateData,
  setIsUpdateData,
}) => {
  let modalRef = useRef();
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isErrorMessageType, setIsErrorMessageType] = useState(false);

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
    setIsErrorMessage(false);
    setIsErrorMessageType(false);
  }

  function modalFormSubmit(e) {
    e.preventDefault();

    const { id, value, ...inputDataWithoutId } = inputData;

    const isFormValid = Object.values(inputDataWithoutId).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      setIsErrorMessage(true);
      setIsErrorMessageType(false);
      return;
    }

    if (!typeArray.find((inputType) => inputType === inputData["type"])) {
      setIsErrorMessageType(true);
      setIsErrorMessage(false);
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
          <b className="text-sm text-[10px] text-red-500">
            Tüm alanlar dolu ve boş karakter içermemelidir.
          </b>
        )}

        {isErrorMessageType && (
          <b className="text-sm text-[10px] text-red-500">
            Girmiş olduğunuz type uygun bit type değildir.
          </b>
        )}

        <form onSubmit={modalFormSubmit}>
          <div className="form-group">
            <label htmlFor="inputName" className="text-[11px] font-bold">
              Name
            </label>
            <input
              id="inputName"
              type="text"
              onChange={handleChange("name")}
              value={inputData.name}
              className={
                inputData.name.trim() == "" && isErrorMessage
                  ? "border-red-500 pl-2"
                  : "pl-2"
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputPlaceHolder" className="text-[11px] font-bold">
              Placeholder
            </label>
            <input
              id="inputPlaceHolder"
              type="text"
              onChange={handleChange("placeholder")}
              value={inputData.placeholder}
              className={
                inputData.placeholder.trim() == "" && isErrorMessage
                  ? "border-red-500 pl-2"
                  : "pl-2"
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputLabel" className="text-[11px] font-bold">
              Label
            </label>
            <input
              id="inputLabel"
              type="text"
              onChange={handleChange("label")}
              value={inputData.label}
              className={
                inputData.label.trim() == "" && isErrorMessage
                  ? "border-red-500 pl-2"
                  : "pl-2"
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="inputType" className="text-[11px] font-bold">
              Type
            </label>

            <input
              placeholder="Select Type"
              onChange={handleChange("type")}
              list="inputType"
              className={
                (isErrorMessage && inputData.type.trim() === "") ||
                (isErrorMessageType && inputData.type.trim() !== "")
                  ? "border-red-500 pl-2"
                  : "pl-2"
              }
              value={inputData.type}
            />
            <datalist id="inputType">
              {typeArray.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </datalist>
          </div>

          <div className="button-container">
            <button className="submit-btn bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-12">
              Save
            </button>
            <button
              className="bottom-btn bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-12"
              onClick={closeModal}
            >
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
};

export default ModalForm;
