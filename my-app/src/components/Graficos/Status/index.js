import React, { useState, useEffect } from "react";
import Chartjs from "chart.js";

import colorArray from '../../../utils/colorArray';

import "./styles.css";

const Status = ({ props }) => {
  const [plotData, setPlotData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    function defineDoughnutAndPieChartData() {
      /*eslint quote-props: ["error", "always"]*/
      let possibleStatusObject = {
        "EM ANDAMENTO": 0,
        "PARALISADO PELO CLIENTE": 0,
        "AGUARDANDO INÍCIO PELA FULL": 0,
        "AGUARDANDO LEVANTAMENTO DE CAMPO": 0,
        "FINALIZADO": 0,
        "NÚMEROS": 0,
        "MEDIÇÃO": 0,
        "APROVAÇÃO DO PROJETO": 0,
      };

      props.map((projeto) => {
        const status = projeto.status.split('-');
        const formattedStatus = status[0].trim();
        return possibleStatusObject[formattedStatus]++;
      });

      return setPlotData(possibleStatusObject);
    }

    if (props) {
      defineDoughnutAndPieChartData();
    }
  }, [props]);

  useEffect(() => {
    let chartConfig = {
      "type": "doughnut",
      "data": {
        "datasets": [{
          "data": Object.values(plotData),
          "backgroundColor": colorArray
        }],
        "labels": Object.keys(plotData)
      },
      "options": {}
    };

    if (document.getElementById("canvasStatus")) {
      if (chartInstance) chartInstance.destroy();
      const newChartInstance = new Chartjs(
        document.getElementById("canvasStatus").getContext("2d"),
        chartConfig
      );
      setChartInstance(newChartInstance);
    }

    // eslint-disable-next-line
  }, [plotData]);

  // <!-- -->
  // HTML
  // <!-- -->
  return (
    <div id="Status">
      <h3 className="graphTitle">Estatística do status dos projetos</h3>

      <div className="descriptionGraph">
        <p>
          Neste gráfico são mostradas a porcentagem referente a quantidade de
          projetos com determinado status no banco de dados da aplicação.
        </p>
      </div>

      <div className="plotStatus">
        <canvas id="canvasStatus" />
      </div>
    </div>
  );
};

export default Status;
