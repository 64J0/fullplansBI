import React, { useState, useEffect } from 'react';
import Chartjs from 'chart.js';
import exemploDados from './exemploDados.json';

import './ProjAtrasados.css';
import definePessoasEncontradas from './utils/definePessoasEncontradas';
import defineAnosEncontrados from './utils/defineAnosEncontrados';

function ProjAtrasados({ props }) {

  const [opcaoInputRadio, setOpcaoInputRadio] = useState(null);
  const [opcaoAnoSelect, setOpcaoAnoSelect] = useState("Todos os anos");
  const [opcaoPessoaSelect, setOpcaoPessoaSelect] = useState("Todas as pessoas");
  const [pessoasEncotradas, setPessoasEncontradas] = useState([]);
  const [anosEncontrados, setAnosEncontrados] = useState([]);
  const [dadosParaMostrar, setDadosParaMostrar] = useState({});


  // Quando for colocar em produção => alterar para props
  const dadosEncontrados = exemploDados;


  // definePessoasEncontradas()
  //
  // Esse hook é responsável por armazenar e filtrar os dados referentes às pessoas 
  // encontradas no conjunto de dados do banco de dados.
  useEffect(() => {
    if (dadosEncontrados) {
      const response = definePessoasEncontradas(dadosEncontrados);
      setPessoasEncontradas(response);
      let selectTagPessoas = document.getElementById("pessoaQueSeraMostradaProjAtrasados");
      selectTagPessoas.innerHTML = `<option value="Todas as pessoas">Todas as pessoas</option>`;
      pessoasEncotradas.map(pessoa => {
        selectTagPessoas.innerHTML += `<option value=${String(pessoa)}>${String(pessoa)}</option>`;
        return null;
      });
    }
  // eslint-disable-next-line
  }, [props]);


  // defineAnosEncontrados()
  //
  // Esse hook é responsável por armazenar e filtrar os dados referentes aos anos
  // encontrados no conjunto de dados do banco de dados.
  useEffect(() => {
    if (dadosEncontrados) {
      const response = defineAnosEncontrados(dadosEncontrados);
      setAnosEncontrados(response);
      let selectTagAnos = document.getElementById("anoQueSeraMostradoProjAtrasados"),
        d1;
      selectTagAnos.innerHTML = `<option value="Todos os anos">Todos os anos</option>`;
      anosEncontrados.map(ano => {
        d1 = new Date(ano).getFullYear();
        selectTagAnos.innerHTML += `<option value=${String(d1)}>${String(d1)}</option>`;
        return null;
      });
    }
  // eslint-disable-next-line
  }, [props]);


  // defineDadosDoGrafico()
  //
  // Esse hook é responsável por aplicar as regras de negócio ao conjunto de dados
  //filtrados e salvos nos estados anteriores.
  useEffect(() => {
    function defineDadosDoGrafico(dadosEncontrados) {
      let obj = {
          x: [],
          y: []
        },
        aux;
      if (opcaoInputRadio === 'mes') {
        // Popular os dados de obj:
        for (aux = 0; aux < 12; aux++) {
          obj.x.push(aux+1);
          obj.y.push(0);
        }
        //====================================
        if (String(opcaoAnoSelect) === "Todos os anos") {
          if (String(opcaoPessoaSelect) === "Todas as pessoas") {

          }
        }

      } else if (opcaoInputRadio === 'ano') {
        // Popular os dados de obj:
        let d1 = new Date(Date.now());
        for (aux = 0; aux < 5; aux++) {
          obj.x.push(d1.getFullYear() - aux);
          obj.y.push(0);
        }
        obj.x.reverse();
        //====================================
      }

      setDadosParaMostrar(obj);
    }

    if (dadosEncontrados) {
      defineDadosDoGrafico(dadosEncontrados);
    }
  // eslint-disable-next-line
  }, [opcaoAnoSelect, opcaoPessoaSelect, opcaoInputRadio, props]);


  // Hook usado para plotar os dados com base nas informações pertinentes obtidas do
  // banco de dados.
  const [chartInstance3, setChartInstance3] = useState('');
  useEffect(() => {
      let textTitle,
          labelStringValueX;
      if (opcaoInputRadio === 'mes') {
          textTitle = `Filtro: Mês. Ano: ${opcaoAnoSelect}. Pessoa: ${opcaoPessoaSelect}`;
          labelStringValueX = 'Mês';
      } else if((opcaoInputRadio === 'ano')) {
          textTitle = `Filtro: Ano. Pessoa: ${opcaoPessoaSelect}`;
          labelStringValueX = 'Ano';
      } else {
          textTitle = '';
          labelStringValueX = '';
      }

      let chartConfig = {
          type: 'bar',
          data: {
              labels: dadosParaMostrar.x,
              datasets: [{
                  label: 'Quantidade de projetos atrasados',
                  backgroundColor: 'rgb(156, 94, 43)',
                  data: dadosParaMostrar.y
              }]
          },
          options: {
              title: {
                  display: true,
                  text: textTitle
              },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }],
                  xAxes: [{
                      display: true,
                      scaleLabel: {
                          display: true,
                          labelString: labelStringValueX
                      }
                  }]
              }
          }
      }

      if (document.getElementById("ProjAtrasadosCanvas")) {
          if (chartInstance3) chartInstance3.destroy();
          const newChartInstance3 = new Chartjs(document.getElementById("ProjAtrasadosCanvas").getContext("2d"), chartConfig);
          setChartInstance3(newChartInstance3);
      }
  // eslint-disable-next-line
  }, [opcaoAnoSelect, opcaoPessoaSelect, opcaoInputRadio, dadosParaMostrar]);


  // Essas funções lidam com a opção que foi escolhida na tag <select> pelo usuário.
  function handleAnoSelectOption(e) {
    let id = e.target.selectedIndex;
    setOpcaoAnoSelect(e.target[id].text);
  }

  function handlePessoaSelectOption(e) {
    let id = e.target.selectedIndex;
    setOpcaoPessoaSelect(e.target[id].text);
  }

  return(
    <div id="ProjAtrasados">
      <h3 className="ProjAtrasados">Projetos atrasados</h3>

      <div className="grid-container">
        <input 
            type="radio" 
            id="mes3"
            name="ProjAtrasados" 
            value="mes3"
            onClick={() => {setOpcaoInputRadio('mes')}} />
        <label htmlFor="mes3">Mês</label>

        <div className="selectTagAno">
            <select id="anoQueSeraMostradoProjAtrasados" onChange={handleAnoSelectOption}>
                <option value="Todos os anos">Todos os anos</option>
            </select>
        </div>

        <input 
            type="radio" 
            id="ano3"
            name="ProjAtrasados" 
            value="ano3"
            onClick={() => {setOpcaoInputRadio('ano')}} />
        <label htmlFor="ano3">Ano</label>

        <div className="selectTagPessoa">
            <select id="pessoaQueSeraMostradaProjAtrasados" onChange={handlePessoaSelectOption}>
                <option value="Todas as pessoas">Todas as pessoas</option>
            </select>
        </div>

        <div className="plotProjAtrasados">
            <canvas id="ProjAtrasadosCanvas" />
        </div>
      </div>
    </div>
  )
}

export default ProjAtrasados;