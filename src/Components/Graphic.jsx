import React, { Component, useEffect } from "react";
import Chart from "chart.js/auto";

class BarChart extends Component {
  chartRef = React.createRef();
  chartInstance = null;

  state = {
    dataReady: false,
  };
  componentDidMount() {
    // Simule algum tempo para carregar os dados (substitua por sua lógica de carregamento real)
    setTimeout(() => {
      this.setState({ dataReady: true }, () => {
        this.buildChart();
      });
    }, 1000); // Tempo simulado de 1 segundo
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listChumbs !== this.props.listChumbs) {
      this.buildChart();
    }
  }

  componentWillUnmount() {
    this.destroyChart();
  }
  buildChart() {
    const { listChumbs } = this.props;

    if (listChumbs.length > 0) {
      const yearArray = listChumbs.reduce((counts, item) => {
        const year = item.data.getFullYear();
      }, {});
      const counts = {};

      const yearCounts = listChumbs.reduce((counts, item) => {
        const year = item.data.getFullYear();
        counts[year] = (counts[year] || 0) + 1;
        return counts;
      }, {});

      if (this.chartInstance) {
        this.destroyChart();
      }

      const myChartRef = this.chartRef.current.getContext("2d");

      this.chartInstance = new Chart(myChartRef, {
        type: "bar",
        data: {
          labels: yearArray,
          datasets: [
            {
              data: yearCounts,
              backgroundColor: [
                "rgb(0, 212, 115)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 205, 86, 0.6)",
                "rgba(54, 162, 235, 0.6)",
              ],
              barThickness: 20,
              categoryPercentage: 0.2,
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            x: {
              title: {
                display: true,
                text: "Anos",
              },
              beginAtZero: true,
            },
            y: {
              title: {
                display: true,
                text: "Quantidade",
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Oculte a legenda para melhorar a visualização
            },
            title: {
              display: true,
              text: "Despesas por Ano",
            },
          },
        },
      });
    }
  }

  destroyChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  render() {
    const { listChumbs } = this.props;
    if (listChumbs.length > 0) {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "70vw",
                backgroundColor: "rgb(177, 177, 177)",
                borderRadius: "1vw",
                marginTop: "60px",
                opacity: "0",
                animation: "opacity 1s ease-in-out forwards",
                animationDelay: "2s",
                transformStyle: "preserve-3d",
              }}
            >
              {this.state.dataReady && <canvas ref={this.chartRef} />}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70vw",
                height: "70px",
                backgroundColor: "rgb(177, 177, 177)",
                borderRadius: "1vw",
                marginTop: "60px",
                opacity: "0",
                animation: "opacity 1s ease-in-out forwards",
                animationDelay: "2s",
                transformStyle: "preserve-3d",
              }}
            >
              <b>Adicione despesas para gerar o gráfico de barras.</b>
            </div>
          </div>
        </>
      );
    }
  }
}

export default BarChart;
