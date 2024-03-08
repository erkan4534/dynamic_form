import PropTypes from "prop-types";

const FormInputItem = ({
  id,
  name,
  placeholder,
  label,
  type,
  inputDataArray,
  setInputDataArray,
}) => {
  function deleteItem(itemId) {
    const newInputDataArray = inputDataArray.filter(({ id }) => id !== itemId);
    setInputDataArray(newInputDataArray);
  }

  return (
    <div className="flex flex-col gap-1 formInput">
      <label className="font-semibold text-lg">{label}:</label>

      <div>
        <input
          className="leading-8 border-black rounded-sm placeholder:translate-x-1 w-80 my-3"
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
        />

        <button
          key={id}
          type="button"
          onClick={() => deleteItem(id)}
          className="ml-5 bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-50"
        >
          Delete
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
};

export default FormInputItem;
