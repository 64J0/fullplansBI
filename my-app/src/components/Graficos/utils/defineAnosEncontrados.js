export default function defineAnosEncontrados(dadosEncontrados){
  let anosEncontrados = [],
    anoRepetido = false;
  
  dadosEncontrados.map(dado => {
    anosEncontrados.map(ano => {
      if (String(ano) === String(dado.dataArquivado)){
        anoRepetido = true;
      }
      return null;
    });
    if (!anoRepetido) {
      anosEncontrados.push(dado.dataArquivado);
    }
    anoRepetido = false;
    return null;
  });

  return(anosEncontrados.sort().reverse());
}