import PropTypes from "prop-types";
import "./formInputItem.css";

const FormInputItem = ({
  id,
  name,
  placeholder,
  label,
  type,
  value,
  inputDataArray,
  setInputDataArray,
  setIsModalShow,
  setInputData,
  setIsUpdateData,
  setIsErrorMessage,
  isErrorMessage,
}) => {
  function deleteItem(itemId) {
    const newInputDataArray = inputDataArray.filter(({ id }) => id !== itemId);
    setInputDataArray(newInputDataArray);
  }

  function updateItem(itemId) {
    const inputData = inputDataArray.find(({ id }) => id === itemId);
    setInputData(inputData);
    setIsUpdateData(true);
    setIsModalShow(true);
    setIsErrorMessage(false);
  }

  function handleChange(event, itemId) {
    const updatedInputDataArray = inputDataArray.map((item) => {
      if (item.id === itemId) {
        // Eğer öğe bulunursa, değerini güncelle
        return { ...item, value: event.target.value };
      }

      return item;
    });

    setInputDataArray(updatedInputDataArray);
  }

  return (
    <div className="flex flex-col formInput">
      <label className="font-semibold text-[13px]">{label}</label>

      <div>
        <input
          className={
            value.trim() == "" && isErrorMessage
              ? "border-red-500 leading-6  rounded-sm placeholder:translate-x-1 w-60"
              : "leading-6 border-black rounded-sm placeholder:translate-x-1 w-60"
          }
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(e) => handleChange(e, id)}
          value={value}
        />

        <button
          type="button"
          onClick={() => deleteItem(id)}
          className="btn-delete ml-5 bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-25"
        >
          Delete
        </button>

        <button
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
  value: PropTypes.string,
  inputDataArray: PropTypes.array,
  setInputDataArray: PropTypes.func,
  setIsModalShow: PropTypes.func,
  inputData: PropTypes.object,
  setInputData: PropTypes.func,
  setIsUpdateData: PropTypes.func,
  setIsErrorMessage: PropTypes.func,
  isErrorMessage: PropTypes.bool,
};

export default FormInputItem;
