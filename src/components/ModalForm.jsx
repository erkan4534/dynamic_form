import PropTypes from "prop-types";
import { useRef } from "react";
import ReactDOM from "react-dom";

const ModalForm = (props) => {
  let modalRef = useRef();

  if (!props.isModalShow) {
    return;
  }

  function checkClickOutside(e) {
    if (modalRef.current && modalRef.current == e.target) {
      props.setIsModalShow(false);
    }
  }

  return ReactDOM.createPortal(
    <div
      className="modal"
      id="modal_1"
      onMouseDown={checkClickOutside}
      ref={modalRef}
    >
      <div className="modal-content">
        <div className="modal-header">New Input Add</div>
        <div className="modal-body">
          <div className="form-input">
            <label>Name</label>
            <input
              type="text"
              name="inputName"
              id="inputName"
              placeholder="Enter input name"
            />
          </div>

          <div className="form-input">
            <label>Type</label>
            <input
              type="text"
              name="inputType"
              id="inputType"
              placeholder="Enter input type"
            />
          </div>
          <div className="form-input">
            <label>Label</label>
            <input
              type="text"
              name="inputLabel"
              id="inputLabel"
              placeholder="Enter input label"
            />
          </div>
          <div className="form-input">
            <label>Placeholder</label>
            <input
              type="text"
              name="inputPlaceHolder"
              id="inputPlaceHolder"
              placeholder="Enter input palceholder"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="bg-[#365DC0] hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded w-50 ml-10"
            onClick={props.closeForm}
          >
            Close
          </button>

          <button
            className="bg-[#365DC0] hover:bg-blue-700 
            text-white font-bold py-2 px-4 rounded w-50 mr-10"
            onClick={props.closeForm}
          >
            Add
          </button>
        </div>
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
