import React, { useState, useEffect } from "react";

import api from "./services/api";
import Rodape from "./components/Rodape";
import Login from "./components/Login";
import Home from "./components/Home";

import verifyLocalStorage from "./components/Graficos/utils/verifyLocalStorage";

function App() {
  const [projetos, setProjetos] = useState([]);
  const [login, setLogin] = useState({});

  // configAuth
  //
  // Objeto com os dados da configuração de autorização que deve ser passado
  // nas rotas da API.
  const configAuth = {
    headers: {
      Authorization: "Bearer " + String(login.token),
    },
  };

  // verifyLocalStorage()
  //
  // Esse useEffect é responsável por executar o código da função verifyLocalStorage
  // que por sua vez verifica se tem um token armazenado no localStorage e se ele ainda não
  // expirou. Com base nessa informação é verificada a necessidade de mostrar a tela de login
  // ou não.
  // Essa função se repete uma vez no carregamento da página.
  useEffect(() => {
    if (verifyLocalStorage()) {
      let token = localStorage.getItem("authJWT");
      let objLoginTrue = {
        auth: true,
        token: token,
      };
      setLogin(objLoginTrue);
    }
  }, []);

  // loadProjetos()
  //
  // Carrega os projetos do banco de dados na primeira inicialização da plataforma.
  useEffect(() => {
    async function loadProjetos() {
      const response = await api.get("/projetos", configAuth);
      setProjetos(response.data);
    }

    if (login.auth === true) {
      loadProjetos();
      setStringPagina("Home");
    }
    // eslint-disable-next-line
  }, [login.auth]);

  // submitLogin()
  //
  // Faz o submit do formulário de login e salva as informações na variável login.
  async function submitLogin(data) {
    await api
      .post("/login", data)
      .then((response) => {
        if (!response.data.auth) {
          throw new Error();
        } else {
          setLogin(response.data);
          localStorage.setItem("authJWT", response.data.token.toString());
          let expirationDate = Date.now() + 1000 * 60 * 60; // Uma hora
          localStorage.setItem("expiresIn", expirationDate.toString());
        }
      })
      .catch(() => {
        // Esse erro é enviado para a função que fez a chamada do método assíncrono
        // para que esta possa lidar com o erro também.
        throw new Error("Credenciais inválidas");
      });
  }

  // decideWhatToDisplay()
  //
  // Função que determina qual component será renderizado, baseado no estado
  // de stringPagina.
  const [stringPagina, setStringPagina] = useState("");
  function decideWhatToDisplay() {
    switch (stringPagina) {
      case "Home":
        return <Home projetos={projetos} />;
      default:
        return (
          <Login setStringPagina={setStringPagina} onSubmit={submitLogin} />
        );
    }
  }

  return (
    <div className="App">
      {decideWhatToDisplay()}
      <Rodape />
    </div>
  );
}

export default App;
