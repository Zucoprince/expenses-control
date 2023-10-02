import Header from "./Components/Header";
import List from "./Components/List";
import Forms from "./Components/Form";
import BarChart from "./Components/Graphic";
import { formatoBrasileiro } from "./Components/Card";
import { useState, useEffect } from "react";
import "./Styles/App.css";
import OptionsYear from "./Components/OptionsYear";

function App() {
  const { soma, somaHandler, listChumbs, listChumbHandler } = List();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    somaHandler(listChumbs);
  }, [listChumbs]);

  const filterHandler = (event) => {
    setFilter(event);
  };

  const onSubmitForm = (event) => {
    listChumbHandler(event);
  };

  useEffect(() => {
    somaHandler(filter);
  }, [filter]);

  return (
    <div className="App">
      <Header />
      <Forms onAddExpense={onSubmitForm} />
      <div className="div_cards">
        <OptionsYear listChumbs={listChumbs} onFilterChange={filterHandler} />
      </div>
      <div className="App_soma">
        Total: R${soma.toLocaleString("pt-BR", formatoBrasileiro)}
      </div>
      <BarChart listChumbs={listChumbs} />
    </div>
  );
}

export default App;
