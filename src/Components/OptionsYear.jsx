import Card from "./Card";
import { useEffect, useState } from "react";

export default function OptionsYear(props) {
  const [selectedYear, setSelectedYear] = useState("");

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filterExpensesByYear = () => {
    if (!selectedYear) {
      return props.listChumbs;
    }

    return props.listChumbs.filter(
      (expense) => expense.data.getFullYear() === parseInt(selectedYear)
    );
  };

  const getUniqueYears = () => {
    if (props.listChumbs !== null && props.listChumbs.length > 0) {
      return [
        ...new Set(
          props.listChumbs.map((expense) => expense.data.getFullYear())
        ),
      ];
    } else {
      return []; // Retorna um array vazio quando listChumbs está vazio ou nulo
    }
  };

  const filteredExpenses = filterExpensesByYear();

  useEffect(() => {
    props.onFilterChange(filteredExpenses);
  }, [selectedYear]);

  let cardContent = (
    <Card verificar>
      <div>Não há despesas.</div>
    </Card>
  );
  if (filteredExpenses.length !== 0) {
    cardContent = filteredExpenses.map((item, index) => (
      <Card
        key={item.id != null ? item.id : index}
        title={item.title}
        data={item.data}
        preço={item.preço}
      />
    ));
  }

  return (
    <>
      <select onChange={handleYearChange} className="select_year">
        <option value="">Selecione o ano</option>
        {getUniqueYears().map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      {cardContent}
    </>
  );
}
