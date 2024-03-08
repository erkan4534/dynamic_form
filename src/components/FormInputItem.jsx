import PropTypes from "prop-types";
import "./formInputItem.css";

const FormInputItem = ({
  id,
  name,
  placeholder,
  label,
  type,
  inputDataArray,
  setInputDataArray,
  setIsModalShow,
}) => {
  function deleteItem(itemId) {
    const newInputDataArray = inputDataArray.filter(({ id }) => id !== itemId);
    setInputDataArray(newInputDataArray);
  }

  function updateItem(itemId) {
    const inputData = inputDataArray.find(({ id }) => id !== itemId);
    setIsModalShow(true);
    console.log(inputData);
  }

  return (
    <div className="flex flex-col formInput">
      <label className="font-semibold text-[13px]">{label}</label>

      <div>
        <input
          className="leading-6 border-black rounded-sm placeholder:translate-x-1 w-60"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
        />

        <button
          key={id}
          type="button"
          onClick={() => deleteItem(id)}
          className="btn-delete ml-5 bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-25"
        >
          Delete
        </button>

        <button
          key={id}
          type="button"
          onClick={() => updateItem(id)}
          className="btn-update ml-5 bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-25"
        >
          Update
        </button>
      </div>
    </div>
  );
};

FormInputItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  inputDataArray: PropTypes.array,
  setInputDataArray: PropTypes.func,
  setIsModalShow: PropTypes.func,
};

export default FormInputItem;
