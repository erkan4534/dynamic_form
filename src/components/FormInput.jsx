import { useState } from "react";
import { inputsData } from "../data/InputsData";
import FormInputItem from "./FormInputItem";
import ModalForm from "./ModalForm";
import "./formInput.css";

const defaultInputData = {
  id: "",
  label: "",
  name: "",
  placeholder: "",
  type: "",
};

const FormInput = () => {
  const [inputDataArray, setInputDataArray] = useState(inputsData);
  const [isModalShow, setIsModalShow] = useState(false);
  const [inputData, setInputData] = useState(defaultInputData);

  const formInputValue = (event) => {
    event.preventDefault();
  };

  function closeForm() {
    setIsModalShow(false);
  }

  function openForm() {
    setIsModalShow(true);
  }

  return (
    <div>
      <form onSubmit={formInputValue}>
        {inputDataArray.map((input) => (
          <FormInputItem
            key={input.id}
            {...input}
            setInputDataArray={setInputDataArray}
            inputDataArray={inputDataArray}
            setIsModalShow={setIsModalShow}
            inputData={inputData}
            setInputData={setInputData}
          />
        ))}
        <div className="w-60 mt-2 flex justify-between">
          <button
            type="submit"
            className="btn-submit bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-50"
          >
            Save
          </button>
          <button
            onClick={openForm}
            type="button"
            className="btn_add bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-50"
          >
            Add
          </button>
        </div>
      </form>
      <ModalForm
        isModalShow={isModalShow}
        inputDataArray={inputDataArray}
        setInputDataArray={setInputDataArray}
        setIsModalShow={setIsModalShow}
        closeForm={closeForm}
        inputData={inputData}
        setInputData={setInputData}
      />
    </div>
  );
};

export default FormInput;
