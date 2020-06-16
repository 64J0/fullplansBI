import React from "react";

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

      <ProjCadastrados props={projetos} />
      <ProjFinalizados props={projetos} />
      {/*<ProjAtrasados props={projetos} />*/}
      <ProjAbertos props={projetos} />
    </div>
  );
}

export default Home;
