import React, { useState, useCallback } from "react";

import "./GraphicsHome.css";
import fullIcon from '../assets/fullE_icon.png';

// Mostrar quantos projetos foram cadastrados por mês ou por ano.
// Já funciona sem a necessidade de mudar nada no valor de props
import ProjCadastrados from "./Graficos/ProjCadastrados";

// Mostrar quantos projetos foram finalizados por mês, por ano ou por quem.
import ProjFinalizados from "./Graficos/ProjFinalizados";

// Mostrar quantos projetos ficaram atrasados por mês, por ano ou por quem.
// Ainda não finalizado
//import ProjAtrasados from "./Graficos/ProjAtrasados";

// Mostrar quantos projetos ainda não foram finalizados
// Já funciona sem a necessidade de mudar nada no valor de props
import ProjAbertos from "./Graficos/ProjAbertos";

// Mostrar quantos projetos foram finalizados por mês, por ano ou por quem.

function Home({ projetos }) {
  const [opcao, setOpcao] = useState("");

  const showGraphics = useCallback(() => {
      switch(opcao) {
          case "Selecione":
              return null;
          case "Cadastrados":
              return <ProjCadastrados props={projetos} />;
          case "Finalizados":
              return <ProjFinalizados props={projetos} />;
          case "Abertos":
              return <ProjAbertos props={projetos} />;
          default:
              return null;
      }
  }, [opcao, projetos]);

  return (
    <div className="showProjetos">
      <header>
        <div className="logo-name">
            <img 
                src={fullIcon} 
                alt="Ícone da Full Engenharia" 
                style={{width: "50px"}}
            />
            <p><strong>GRUPO FULL</strong></p>
        </div>
            
        <h1>FULL PLANS BI</h1>
      </header>

      <form action="">
          <fieldset>
              <legend>Parâmetros da Consulta</legend>
              <label htmlFor="tipo">Tipo:</label>
              <select 
                name="tipo"
                onChange={(event) => setOpcao(event.target.value)}
              >
                  <option value="Selecione">Selecione um valor</option>
                  <option value="Cadastrados">Projetos Cadastrados</option>
                  <option value="Finalizados">Projetos Finalizados</option>
                  <option value="Abertos">Projetos Não finalizados</option>
              </select>
          </fieldset>
      </form>

      <div id="divGraphics" style={{width: "850px"}}>
        {
            showGraphics()
        }
      </div>
    </div>
  );
}

export default Home;
