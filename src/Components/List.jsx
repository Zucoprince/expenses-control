import { useEffect, useState } from "react";
import App from "../App";

// const listVar = [
//   {
//     title: "Seguro do carro",
//     data: new Date("2023-09-03"),
//     preço: "R$319,99",
//   },
// {
//   title: "Mercado",
//   data: new Date("2023-09-06"),
//   preço: "R$815,25",
// },
// {
//   title: "Contas Casa",
//   data: new Date("2023-09-10"),
//   preço: "1250.32",
// },
// {
//   title: "Lazer",
//   data: new Date("2023-09-14"),
//   preço: "200.0",
// },
// {
//   title: "Teste de 2022",
//   data: new Date("2022-09-14"),
//   preço: "200.0",
// },
// {
//   title: "Teste de 2021",
//   data: new Date("2021-09-14"),
//   preço: "200.0",
// },
// {
//   title: "Teste de 2020",
//   data: new Date("2020-09-14"),
//   preço: "200.0",
// },
// ];

export default function List() {
  const [listChumbs, setListChumbs] = useState([]);

  const listChumbHandler = (event) => {
    setListChumbs((prevList) => {
      return [...prevList, event];
    });
  };
  const [soma, setSoma] = useState(0.0);

  const somaHandler = (filteredExpenses) => {
    if (filteredExpenses.length > 0) {
      setSoma(
        filteredExpenses.reduce(
          (total, item) =>
            total + parseFloat(item.preço.replace("R$", "").replace(",", ".")),
          0
        )
      );
    }
  };

  return {
    soma,
    listChumbs,
    listChumbHandler,
    somaHandler,
  };
}
