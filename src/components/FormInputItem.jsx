import PropTypes from "prop-types";

const FormInputItem = (props) => {
  const { id, name, placeholder, label, type } = props;

  return (
    <div className="flex flex-col gap-1 formInput">
      <label className="font-semibold text-lg">{label}:</label>
      <input
        className="leading-8 border-black rounded-sm placeholder:translate-x-1 w-80 my-3"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

FormInputItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default FormInputItem;
