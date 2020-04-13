import React, { useState } from "react";

import "./Login.css";

function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  let btnLogin = document.getElementById("btn-login");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (!email || !senha)
        throw new Error("Campos de e-mail ou senha vazios.");
      if (!/@fullengenharia.com/.test(email))
        throw new Error("E-mail inválido");

      await onSubmit({
        email,
        senha,
      });
    } catch (err) {
      btnLogin.setAttribute("style", "");
      return alert(err);
    }
  }

  // Essa função é responsável por mudar a aparência do botão que faz submit do formulário
  // de login, evitando que o usuário tente clicar mais que uma vez neste componente.
  function disableButton() {
    btnLogin.setAttribute(
      "style",
      `
            background-color: #ccc;
            cursor: not-allowed;`
    );
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin} name="form-login">
        <fieldset>
          <legend>Login</legend>
          <hr />
          <div className="form-group">
            <label htmlFor="email" className="email">
              E-mail:
            </label>
            <input
              type="email"
              autoFocus
              name="email"
              value={email}
              placeholder="email@email.com"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha" className="senha">
              Senha:
            </label>
            <input
              type="password"
              name="password"
              value={senha}
              className="form-control"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="button-css">
            <button type="submit" id="btn-login" onClick={disableButton}>
              Logar
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
