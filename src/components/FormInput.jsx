import { useState } from "react";
import { inputsData } from "../data/InputsData";
import FormInputItem from "./FormInputItem";
import ModalForm from "./ModalForm";
import "./ModalForm.css";
import "./formInput.css";

const FormInput = () => {
  const [inputDataArray, setInputDataArray] = useState(inputsData);
  const [isModalShow, setIsModalShow] = useState(false);

  const formInputValue = (event) => {
    event.preventDefault();
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
            inputDataArray={inputDataArray}
          />
        ))}
        <div className="w-60 mt-2 flex justify-between">
          <button
            type="submit"
            className="btn-submit bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-50"
          >
            Submit
          </button>
          <button
            onClick={openForm}
            type="button"
            className="btn_add bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-50"
          >
            Add Input
          </button>
        </div>
      </form>
      <ModalForm
        isModalShow={isModalShow}
        inputDataArray={inputDataArray}
        setInputDataArray={setInputDataArray}
        setIsModalShow={setIsModalShow}
        closeForm={closeForm}
      />
    </div>
  );
};

export default FormInput;
