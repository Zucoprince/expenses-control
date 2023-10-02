import { useState } from "react";
import "../Styles/Card.css";

export const formatoBrasileiro = {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
};

export default function Card(props) {
  const [title, setTitle] = useState(props.title);
  if (!props.verificar) {
    return (
      <>
        <div className="card_div">
          <div className="card_div_data">
            <div className="card_div_div_red" />
            <div className="card_data_day">{props.data.getDate()}</div>
            <div className="card_data_month">
              {monthNames[props.data.getMonth()]}
            </div>
            <div className="card_data_year">{props.data.getFullYear()}</div>
          </div>
          <div className="card_div_title">
            <p className="card_title">{title}</p>
          </div>
          <div className="card_div_preço">
            <h2 className="card_preço">
              {parseFloat(
                props.preço.replace("R$", "").replace(",", ".")
              ).toLocaleString("pt-BR", formatoBrasileiro)}
            </h2>
          </div>
          {/* <button onClick={titleHandler}>Mudar título</button> */}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="card_div"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <b>Não há despesas.</b>
        </div>
      </>
    );
  }
}

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
