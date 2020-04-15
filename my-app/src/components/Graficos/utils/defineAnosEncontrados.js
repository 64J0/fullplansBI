// Essa função leva em consideração para montar o vetor de anosEncontrados
// a informação da data em que o arquivo foi criado no banco de dados, ou seja
// createdAt.

export default function defineAnosEncontrados(dadosEncontrados) {
  let anosEncontrados = [],
    anoRepetido = false;

  dadosEncontrados.map((dado) => {
    let anoCriado = new Date(dado.createdAt).getFullYear();
    anoRepetido = false;
    if (anosEncontrados.length === 0) {
      anosEncontrados.push(dado.createdAt);
    }
    anosEncontrados.map((ano) => {
      if (String(anoCriado) === String(new Date(ano).getFullYear())) {
        anoRepetido = true;
      }
      return null;
    });
    if (!anoRepetido) {
      anosEncontrados.push(dado.createdAt);
    }
    return null;
  });

  return anosEncontrados.sort().reverse();
}
