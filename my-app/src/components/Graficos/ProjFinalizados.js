import React, { useState, useEffect } from "react";
import Chartjs from "chart.js";

import "./ProjFinalizados.css";
import defineDadosASeremMostrados from "../../utils/defineDadosProjFinalizados";

// Dados que serão usados para simular o funcionamento da aplicação com uma boa quantidade
// de informações. O banco de dados atualmente não apresenta muitos dados, por isso optou-se
// por essa alternativa.
//import exemploDados from "./exemploDados.json";

// MOSTRAR QUANTOS PROJETOS FORAM FINALIZADOS POR MÊS, POR ANO OU POR QUEM.
// props = projetos
function ProjFinalizados({ props }) {
  // Descrição de funcionamento desse componente:
  //
  // Projeto finalizado tem a propriedade arquivado com esse valor:
  //      arquivado = true
  // Filtrar pelos campos: mês, ano, pessoa
  // Se for escolhido o mês: {
  //      o usuário escolhe o ano, com base nos anos encontrados nos dados.
  //      o usuário escolhe a pessoa com base nas pessoas encontradas nos dados.
  // }
  // Se for escolhido o ano: {
  //      o usuário pode escolher a pessoa
  //      são mostrados os dados de 5 anos a partir do ano atual.
  // }
  const [pessoasEncontradas, setPessoasEncontradas] = useState([]);
  const [opcaoInputRadio, setOpcaoInputRadio] = useState("");
  const [opcaoAnoSelect, setOpcaoAnoSelect] = useState("Todos os anos");
  const [opcaoPessoaSelect, setOpcaoPessoaSelect] = useState(
    "Todas as pessoas"
  );
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [dadosParaMostrar, setDadosParaMostrar] = useState({});

  let dadosExemplo = props;

  // Dados filtrados
  // Salva em uma variável de estado os projetos que foram finalizados (arquivados)
  useEffect(() => {
    function filtrarDados() {
      let dadosFiltrados = [];
      // Na hora de implementar o sistema real -> Substituir dadosExemplo por props.
      dadosExemplo.map((dado) => {
        if (dado.arquivado) {
          // arquivado = true = finalizado
          dadosFiltrados.push(dado);
        }
        return null;
      });
      setDadosFiltrados(dadosFiltrados);
    }

    filtrarDados();
    // Esse Hook deve ser executado sempre que props mudar, pois isso significa
    // que os dados do banco de dados foram alterados também.
  }, [dadosExemplo, props]);

  // As próximas operações devem ser efetuadas usando o conteúdo armazenado no estado
  // de dadosFiltrados.

  // defineDadosASeremMostrados()
  //
  // Essa função é responsável por salvar em uma variável de estado os valores que
  // serão usados para plotar o gráfico.
  useEffect(() => {
    const response = defineDadosASeremMostrados(
      opcaoInputRadio,
      opcaoAnoSelect,
      opcaoPessoaSelect,
      dadosFiltrados
    );
    console.log(response);
    setDadosParaMostrar(response);
  }, [opcaoInputRadio, opcaoAnoSelect, opcaoPessoaSelect, dadosFiltrados]);

  // Hook usado para plotar os dados com base nas informações pertinentes obtidas do
  // banco de dados.
  const [chartInstance2, setChartInstance2] = useState("");
  useEffect(() => {
    let textTitle, labelStringValueX;
    if (opcaoInputRadio === "mes") {
      textTitle = `Filtro: Mês. Ano: ${opcaoAnoSelect}. Pessoa: ${opcaoPessoaSelect}`;
      labelStringValueX = "Mês";
    } else if (opcaoInputRadio === "ano") {
      textTitle = `Filtro: Ano. Pessoa: ${opcaoPessoaSelect}`;
      labelStringValueX = "Ano";
    } else {
      textTitle = "";
      labelStringValueX = "";
    }

    let chartConfig = {
      type: "bar",
      data: {
        labels: dadosParaMostrar.x,
        datasets: [
          {
            label: "Quantidade de projetos finalizados",
            backgroundColor: "rgb(51, 134, 23)",
            data: dadosParaMostrar.y,
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

    if (document.getElementById("ProjFinalizadosCanvas")) {
      if (chartInstance2) chartInstance2.destroy();
      const newChartInstance2 = new Chartjs(
        document.getElementById("ProjFinalizadosCanvas").getContext("2d"),
        chartConfig
      );
      setChartInstance2(newChartInstance2);
    }
    // eslint-disable-next-line
  }, [opcaoAnoSelect, opcaoPessoaSelect, opcaoInputRadio, dadosParaMostrar]);

  // setOpcaoDeAnos()
  //
  // Esse hook determina quais possibilidades de anos que serão mostradas para o usuário
  // com base no conjunto de dados do banco de dados.
  useEffect(() => {
    function setOpcaoDeAnos() {
      let tagSelect = document.getElementById(
          "anoQueSeraMostradoProjFinalizados2"
        ),
        anoEncontrado = [],
        anoAtual,
        anoRepetido = false;

      tagSelect.innerHTML =
        '<option value="Todos os anos">Todos os anos</option>';
      dadosFiltrados.map((data) => {
        anoAtual = new Date(data.dataArquivado);
        anoAtual = anoAtual.getFullYear();
        anoRepetido = false;
        for (let aux = 0, len = anoEncontrado.length; aux < len; aux++) {
          if (anoAtual === anoEncontrado[aux]) {
            anoRepetido = true;
          }
        }
        if (!anoRepetido) {
          anoEncontrado.push(anoAtual);
          anoEncontrado = anoEncontrado.sort();
        }
        return null;
      });
      anoEncontrado.reverse().map((ano) => {
        tagSelect.innerHTML += `<option value=${ano}>${ano}</option>`;
        return null;
      });
    }

    setOpcaoDeAnos();
    // eslint-disable-next-line
  }, [dadosFiltrados]);

  // pessoasEncontradas()
  //
  // Essa função é responsável por preencher um array com informações dos nomes
  // das pessoas que são salvas no banco de dados.
  useEffect(() => {
    function pessoasEncontradasFuncao() {
      let arrayPessoa = [],
        pessoaRepetida = false,
        aux;
      dadosFiltrados.map((dado) => {
        dado.infoProjetos.map((pessoa) => {
          for (aux = 0; aux < arrayPessoa.length; aux++) {
            if (String(pessoa.projetistaDesenho) === String(arrayPessoa[aux])) {
              pessoaRepetida = true;
            }
          }
          if (!pessoaRepetida) {
            arrayPessoa.push(String(pessoa.projetistaDesenho));
          }
          pessoaRepetida = false;
          return null;
        });
        return null;
      });
      return arrayPessoa;
    }

    if (props.length > 0) {
      setPessoasEncontradas(pessoasEncontradasFuncao());
    }
    // eslint-disable-next-line
  }, [props]);

  // setOpcaoDePessoas()
  //
  // Esse hook determina quais possibilidades de pessoas que serão mostradas para o usuário
  // com base no conjunto de dados do banco de dados.
  useEffect(() => {
    function setOpcaoDePessoas() {
      let tagSelect;
      if (String(opcaoInputRadio) === "mes") {
        document
          .getElementsByClassName("selectTagGroup")[0]
          .setAttribute("style", "visibility: visible");
        document
          .getElementsByClassName("selectTagGroup")[1]
          .setAttribute("style", "visibility: hidden");
        tagSelect = document.querySelector("#selectPessoaMes");
      } else if (String(opcaoInputRadio) === "ano") {
        document
          .getElementsByClassName("selectTagGroup")[0]
          .setAttribute("style", "visibility: hidden");
        document
          .getElementsByClassName("selectTagGroup")[1]
          .setAttribute("style", "visibility: visible");
        tagSelect = document.querySelector("#selectPessoaAno");
      }

      if (tagSelect) {
        tagSelect.innerHTML =
          '<option value="Todas as pessoas">Todas as pessoas</option>';
        pessoasEncontradas.map((pessoa) => {
          tagSelect.innerHTML += `<option value=${pessoa}>${pessoa}</option>`;
          return null;
        });
      }
    }

    if (pessoasEncontradas.length > 0) {
      setOpcaoDePessoas();
    }
    // eslint-disable-next-line
  }, [pessoasEncontradas, opcaoInputRadio]);

  // Essas funções lidam com a opção que foi escolhida na tag <select> pelo usuário.
  function handleAnoSelectOption(e) {
    let id = e.target.selectedIndex;
    setOpcaoAnoSelect(e.target[id].text);
  }

  function handlePessoaSelectOption(e) {
    let id = e.target.selectedIndex;
    setOpcaoPessoaSelect(e.target[id].text);
  }

  return (
    <div id="ProjFinalizados">
      <h3 className="ProjFinalizados">Projetos finalizados / arquivados</h3>

      <div className="description">
        <p>
          Neste gráfico são mostrados dados referentes a projetos que foram
          finalizados e portanto arquivados no sistema Full Plans. Analisando os
          dados desse gráfico é possível ter uma estimativa de quantos projetos
          são completados na empresa em determinado período de tempo.
        </p>
      </div>

      <div className="grid-container">
        <div className="menu">
          <h4 className="nav-title">Menu</h4>

          <input
            type="radio"
            id="mes2"
            name="ProjFinalizados"
            value="mes2"
            onClick={() => {
              setOpcaoInputRadio("mes");
            }}
          />
          <label htmlFor="mes2">Mês</label>
          <div className="selectTagGroup" style={{ visibility: "hidden" }}>
            <div className="selectTagAno">
              <select
                id="anoQueSeraMostradoProjFinalizados2"
                onChange={handleAnoSelectOption}
              >
                <option value="Todos os anos">Todos os anos</option>
              </select>
            </div>
            <div className="selectTagPessoa">
              <select id="selectPessoaMes" onChange={handlePessoaSelectOption}>
                <option value="Todas as pessoas">Todas as pessoas</option>
              </select>
            </div>
          </div>

          <input
            type="radio"
            id="ano2"
            name="ProjFinalizados"
            value="ano2"
            onClick={() => {
              setOpcaoInputRadio("ano");
            }}
          />
          <label htmlFor="ano2">Ano</label>
          <div className="selectTagGroup" style={{ visibility: "hidden" }}>
            <div className="selectTagPessoa">
              <select id="selectPessoaAno" onChange={handlePessoaSelectOption}>
                <option value="Todas as pessoas">Todas as pessoas</option>
              </select>
            </div>
          </div>
        </div>

        <div className="plot1">
          <canvas id="ProjFinalizadosCanvas" />
        </div>
      </div>
    </div>
  );
}

export default ProjFinalizados;
