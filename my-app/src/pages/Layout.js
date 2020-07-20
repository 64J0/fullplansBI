import React, { useState, useCallback } from "react";

import "./Layout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Mostrar quantos projetos foram cadastrados por mês ou por ano.
// Já funciona sem a necessidade de mudar nada no valor de props
import ProjCadastrados from "../components/Graficos/ProjCadastrados";

// Mostrar quantos projetos foram finalizados por mês, por ano ou por quem.
import ProjFinalizados from "../components/Graficos/ProjFinalizados";

// Mostrar quantos projetos ficaram atrasados por mês, por ano ou por quem.
// Ainda não finalizado
//import ProjAtrasados from "./Graficos/ProjAtrasados";

// Mostrar quantos projetos ainda não foram finalizados
// Já funciona sem a necessidade de mudar nada no valor de props
import ProjAbertos from "../components/Graficos/ProjAbertos";

import Status from "../components/Graficos/Status";

function Home({ projetos }) {
  const [opcao, setOpcao] = useState("");

  const showGraphics = useCallback(() => {
    switch (opcao) {
      case "Selecione":
        return null;
      case "Cadastrados":
        return <ProjCadastrados props={projetos} />;
      case "Finalizados":
        return <ProjFinalizados props={projetos} />;
      case "Abertos":
        return <ProjAbertos props={projetos} />;
      case "Status":
        return <Status props={projetos} />;
      default:
        return null;
    }
  }, [opcao, projetos]);

  return (
    <div className="showProjetos">
      <div id="background">
        <Header />

        <form action="">
          <fieldset>
            <legend>Parâmetros da Consulta</legend>
            <label htmlFor="tipo">Tipo:</label>
            <select
              name="tipo"
              onChange={(event) => setOpcao(event.target.value)}
            >
              <option value="Selecione">-- Selecione um valor --</option>
              <option value="Cadastrados">Projetos Cadastrados</option>
              <option value="Finalizados">Projetos Finalizados</option>
              <option value="Abertos">Projetos Não finalizados</option>
              <option value="Status">Status</option>
            </select>
          </fieldset>
        </form>

        <div id="divGraphics" style={{ width: "850px" }}>
          {showGraphics()}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
