import React, { useState, useEffect } from "react";
import Chartjs from "chart.js";

import "./ProjAbertos.css";

// Neste componente serão mostrados os projetos que ainda estão abertos
// ou seja, ainda não foram finalizados -> arquivados.
//
// O usuário poderá escolher a visualização por mês ou por ano.
//
// A informação do projeto que será levada em consideração para definir
// quando um projeto está aberto ou não é o valor de arquivado:boolen.
//
// Outra informação importante é o valor de createdAt, que informa por
// padrão quando o projeto foi criado no banco de dados.

function ProjAbertos({ props }) {
  const [optionInputRadio, setOptionInputRadio] = useState("");
  const [unarchivedData, setUnarchivedData] = useState([]);
  const [plotData, setPlotData] = useState({});

  let DBData = props;

  // defineUnarchivedData()
  //
  // Esse hook é responsável por varrer os dados enviados pelo banco
  // de dados e separar apenas os que apresentam arquivado:false.
  useEffect(() => {
    function defineUnarchivedData() {
      const filteredData = DBData.filter((project) => {
        return !project.arquivado ? project : null;
      });
      setUnarchivedData(filteredData);
    }

    if (props) {
      defineUnarchivedData();
    }
  }, [DBData, props]);

  // defineGraphicData()
  //
  // Esse hook será utilizado para definir os dados que serão posteriormente
  // mostrados no gráfico, com base na seleção do usuário no input radio.
  useEffect(() => {
    function defineGraphicData() {
      let obj = {
        x: [],
        y: [],
      };
      if (optionInputRadio === "mes") {
        for (let cont = 0; cont < 12; cont++) {
          obj.x.push(cont + 1); // Define o valor dos meses
          obj.y.push(0); // Inicia o array .y com valor zerado
        }
        unarchivedData.map((project) => {
          const month = new Date(project.createdAt).getMonth();
          return (obj.y[month] = obj.y[month] + 1);
        });
      } else if (optionInputRadio === "ano") {
        const actualYear = new Date().getFullYear();
        for (let cont = 0; cont < 5; cont++) {
          obj.x.push(actualYear - cont);
          obj.y.push(0);
        }
        unarchivedData.map((project) => {
          const year = new Date(project.createdAt).getFullYear();
          const indexOfTheVector = new Date().getFullYear() - year;
          return (obj.y[indexOfTheVector] += 1);
        });
        obj.x = obj.x.reverse();
        obj.y = obj.y.reverse();
      }

      return obj;
    }

    if (unarchivedData) {
      setPlotData(defineGraphicData());
      // Plotar os gráficos com os dados...
    }
  }, [optionInputRadio, unarchivedData]);

  // Plota os gráficos
  //
  // Esse trecho de código é utilizado para plotar os dados encontrados na função
  // escrita acima.
  const [chartInstance, setChartInstance] = useState(null);
  // Define a configuração do gráfico que irá mostrar os dados e plota-o no canvas.
  useEffect(() => {
    let textTitle, labelStringValueX;
    if (optionInputRadio.length > 1) {
      textTitle = `Filtro: ${optionInputRadio}.`;
      labelStringValueX = `${optionInputRadio}`;
    } else {
      textTitle = "";
      labelStringValueX = "";
    }

    let chartConfig = {
      type: "bar",
      data: {
        labels: plotData.x,
        datasets: [
          {
            label: "Quantidade de projetos abertos",
            backgroundColor: "rgb(190, 57, 190)",
            data: plotData.y,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: textTitle,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: labelStringValueX,
              },
            },
          ],
        },
      },
    };

    if (document.getElementById("ProjAbertosCanvas")) {
      if (chartInstance) chartInstance.destroy();
      const newChartInstance = new Chartjs(
        document.getElementById("ProjAbertosCanvas").getContext("2d"),
        chartConfig
      );
      setChartInstance(newChartInstance);
    }
    // Essa função será re-renderizada sempre que o conjunto de dados encontrado mudar.
    // eslint-disable-next-line
  }, [plotData]);

  // <!-- -->
  // HTML
  // <!-- -->
  return (
    <div id="ProjAbertos">
      <h3 className="ProjAbertos">Projetos abertos (não arquivados)</h3>

      <div className="description">
        <p>
          Neste gráfico são mostrados dados referentes a projetos que foram
          cadastrados no sistema Full Plans e ainda não foram finalizados (
          <i>arquivados</i>). Para definir a data em que um projeto não
          finalizado foi cadastrado, é considerada a data em que esse projeto
          foi cadastrado no banco de dados.
        </p>
      </div>

      <div className="grid-container">
        <div className="menu">
          <h4 className="nav-title">Menu</h4>

          <input
            type="radio"
            id="mes4"
            name="ProjAbertos"
            value="mes4"
            onClick={() => {
              setOptionInputRadio("mes");
            }}
          />
          <label htmlFor="mes4">Mês</label>

          <input
            type="radio"
            id="ano4"
            name="ProjAbertos"
            value="ano4"
            onClick={() => {
              setOptionInputRadio("ano");
            }}
          />
          <label htmlFor="ano4">Ano</label>
        </div>

        <div className="plot4">
          <canvas id="ProjAbertosCanvas" />
        </div>
      </div>
    </div>
  );
}

export default ProjAbertos;
