import { useState } from "react";
import { inputsData } from "../data/InputsData";
import FormInputItem from "./FormInputItem";
import ModalForm from "./ModalForm";
import "./formInput.css";
import FormInputModal from "./FormInputModal";

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
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isInputModalShow, setIsInputModalShow] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  function closeForm() {
    setIsModalShow(false);
  }

  function openForm() {
    setIsModalShow(true);
    setIsErrorMessage(false);
    setInputData(defaultInputData);
  }

  function clearForm() {
    setIsErrorMessage(false);

    setInputDataArray(
      inputDataArray.map((input) => ({
        ...input,
        value: "",
      }))
    );
  }

  function saveForm() {
    const isFormValid = Object.values(
      inputDataArray.map((input) => input.value)
    ).every((value) => value && value.trim() !== "");

    setIsSuccessMessage(false);
    if (!isFormValid) {
      setIsErrorMessage(true);

      return;
    }
    setIsInputModalShow(true);
  }

  return (
    <div>
      <form>
        {isErrorMessage && (
          <b className="text-sm text-[11px] text-red-500">
            Tüm alanlar dolu ve boş karakter içermemelidir.
          </b>
        )}

        {isSuccessMessage && (
          <b className="text-sm text-[11px] text-red-500">
            Başarılı bir şekilde kaydedildi.
          </b>
        )}

        {inputDataArray.map((input) => (
          <FormInputItem
            key={input.id}
            {...input}
            setInputDataArray={setInputDataArray}
            inputDataArray={inputDataArray}
            setIsModalShow={setIsModalShow}
            inputData={inputData}
            setInputData={setInputData}
            setIsUpdateData={setIsUpdateData}
            setIsErrorMessage={setIsErrorMessage}
            isErrorMessage={isErrorMessage}
          />
        ))}
        <div className="w-60 mt-2 flex justify-between">
          <button
            type="button"
            onClick={saveForm}
            className="btn-submit bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-12"
          >
            Save
          </button>

          <button
            onClick={clearForm}
            type="button"
            className="btn_add bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-12"
          >
            Clear
          </button>
          <button
            onClick={openForm}
            type="button"
            className="btn_add bg-[#365DC0] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded w-12"
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
        setIsUpdateData={setIsUpdateData}
        isUpdateData={isUpdateData}
      />

      <FormInputModal
        isInputModalShow={isInputModalShow}
        setIsInputModalShow={setIsInputModalShow}
        setInputDataArray={setInputDataArray}
        inputDataArray={inputDataArray}
        setIsErrorMessage={setIsErrorMessage}
        setIsSuccessMessage={setIsSuccessMessage}
      />
    </div>
  );
};

export default FormInput;
