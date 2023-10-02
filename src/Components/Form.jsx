import "../Styles/Form.css";
import React from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import * as Yup from "yup";

const Form = (props) => {
  const [formErrors, setFormErrors] = useState({
    enteredTitle: "",
    enteredPrice: "",
    enteredDate: "",
  });

  const [enteredValues, setEnteredValues] = useState({
    enteredTitle: "",
    enteredPrice: "",
    enteredDate: "",
  });

  const validationSchema = Yup.object().shape({
    enteredTitle: Yup.string().required("O campo Título não pode ser vazio"),
    enteredPrice: Yup.string().required("O campo Preço não pode ser vazio"),
    enteredDate: Yup.string().required("O campo Data não pode ser vazio"),
  });

  const inputChangeHandler = (itendifier, value) => {
    if (itendifier === "title") {
      setEnteredValues((prevValues) => {
        return { ...prevValues, enteredTitle: value };
      });
    } else if (itendifier === "price") {
      setEnteredValues((prevValues) => {
        return { ...prevValues, enteredPrice: value.replace(".", "") };
      });
    } else if (itendifier === "date") {
      setEnteredValues((prevValues) => {
        return { ...prevValues, enteredDate: value };
      });
    } else {
      console.error("Não há uma entrada válida");
    }
  };

  const submiteHandler = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(enteredValues, { abortEarly: false });

      let lastId = localStorage.getItem("lastId") || 0;

      const newId = parseInt(lastId) + 1;

      localStorage.setItem("Id", newId);

      const expenseValues = {
        id: newId,
        title: enteredValues.enteredTitle,
        preço: enteredValues.enteredPrice,
        data: new Date(enteredValues.enteredDate),
      };

      props.onAddExpense(expenseValues);

      setEnteredValues({
        enteredTitle: "",
        enteredPrice: "",
        enteredDate: "",
      });

      setFormErrors({
        enteredTitle: "",
        enteredPrice: "",
        enteredDate: "",
      });
    } catch (errors) {
      const errorMessages = {};
      errors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setFormErrors(errorMessages); // Atualiza o estado com as mensagens de erro
    }
  };

  return (
    <div className="div_form" onSubmit={submiteHandler}>
      <form className="form">
        <div className="div_title_price">
          <div className="div_title">
            <input
              className={`input_title ${
                formErrors.enteredTitle ? "input_title_error" : ""
              }`}
              type="text"
              placeholder="Título"
              value={enteredValues.enteredTitle}
              onChange={(event) => {
                inputChangeHandler("title", event.target.value);
              }}
            ></input>
            {formErrors.enteredTitle && (
              <div className="error_message_title">
                {formErrors.enteredTitle}
              </div>
            )}
          </div>
          <div className="div_price">
            <NumericFormat
              className={`input_price ${
                formErrors.enteredPrice ? "input_price_error" : ""
              }`}
              type="text"
              placeholder="Preço"
              value={enteredValues.enteredPrice}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$"
              decimalScale={2}
              onChange={(event) => {
                inputChangeHandler("price", event.target.value);
              }}
            ></NumericFormat>
          </div>
          {formErrors.enteredPrice && (
            <div className="error_message_price">{formErrors.enteredPrice}</div>
          )}
        </div>
        <div className="div_date_botao">
          <div className="div_date">
            <label className="label_date">Data</label>
            <input
              className={`input_date ${
                formErrors.enteredDate ? "input_date_error" : ""
              }`}
              type="date"
              value={enteredValues.enteredDate}
              onChange={(event) =>
                inputChangeHandler("date", event.target.value)
              }
            ></input>
            {formErrors.enteredDate && (
              <div className="error_message_date">{formErrors.enteredDate}</div>
            )}
          </div>
          <div className="div_botao_enviar">
            <button className="botao_enviar" type="submit">
              Adicionar Despesa
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
