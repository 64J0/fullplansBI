export default function definePessoasEncontradas(dadosEncontrados) {
  let pessoas = [],
  pessoaRepetida = false;
  
  dadosEncontrados.map(dado => {
    dado.infoProjetos.map(infoProjeto => {
      pessoas.map(pessoa => {
        if (String(pessoa) === String(infoProjeto.projetistaDesenho)) {
          pessoaRepetida = true;
        }
        return null;
      });

      if (!pessoaRepetida) {
        pessoas.push(infoProjeto.projetistaDesenho);
      }
      pessoaRepetida = false;
      return null;
    });
    return null;
  });

  return (pessoas);
}