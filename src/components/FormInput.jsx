import { useState, useRef } from "react";
import { inputsData } from "../data/InputsData";
import FormInputItem from "./FormInputItem";
import ModalForm from "./ModalForm";
import "./ModalForm.css";

const inputData = {
  id: "",
  name: "",
  placeholder: "",
  label: "",
  type: "",
};

const FormInput = () => {
  const [inputDataArray, setInputDataArray] = useState(inputsData);
  const [isModalShow, setIsModalShow] = useState(false);

  const formInputValue = (event) => {
    event.preventDefault();
    const newInputsData = [...inputDataArray, inputData];
    setInputDataArray[newInputsData];
    console.info("formInputValue is working");
    setIsModalShow(true);
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
          />
        ))}
        <div className="flex justify-between mt-2">
          <button
            type="submit"
            className="bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50"
          >
            Submit
          </button>
          <button
            onClick={openForm}
            type="button"
            className="bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-50"
          >
            Add Input
          </button>
        </div>
      </form>
      <ModalForm
        isModalShow={isModalShow}
        setIsModalShow={setIsModalShow}
        closeForm={closeForm}
      />
    </div>
  );
};

export default FormInput;
