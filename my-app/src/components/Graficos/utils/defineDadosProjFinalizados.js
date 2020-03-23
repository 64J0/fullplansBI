export default function defineDadosASeremMostrados(opcaoInputRadio, opcaoAnoSelect, opcaoPessoaSelect, dadosFiltrados) {
  let objMostrar = {
          x: [],
          y: []
      },
      dataArquivado,
      indice,
      projetista;
      
  if (opcaoInputRadio === 'mes') {
      // Popular os dados de x com meses e y com 0:
      for(var cont = 0; cont < 12; cont++) {
          objMostrar.x.push(cont + 1);
          objMostrar.y.push(0);
      }
      if (opcaoPessoaSelect === 'Todas as pessoas') { 
          if (opcaoAnoSelect === 'Todos os anos') { // funcionando!!
              dadosFiltrados.map(dado => {
                  dataArquivado = new Date(dado.dataArquivado);
                  indice = dataArquivado.getMonth();
                  objMostrar.y[indice]++; // Incrementa o valor salvo na posição do mês
                  return null;
              })
          } else { // funcionando!!
              dadosFiltrados.map(dado => {
                  dataArquivado = new Date(dado.dataArquivado);
                  if (String(dataArquivado.getFullYear()) === String(opcaoAnoSelect)) {
                      indice = dataArquivado.getMonth();
                      objMostrar.y[indice]++; // Incrementa o valor salvo na posição do mês
                  }
                  return null;
              });
          }
      } else {
          if (opcaoAnoSelect === 'Todos os anos') {
              dadosFiltrados.map(dado => {
                  dado.infoProjetos.map(infoProjeto => {
                      if (String(infoProjeto.projetistaDesenho) === String(opcaoPessoaSelect)) {
                          if (String(projetista) !== String(opcaoPessoaSelect)) {
                              dataArquivado = new Date(dado.dataArquivado)
                              indice = dataArquivado.getMonth();
                              objMostrar.y[indice]++;
                              projetista = opcaoPessoaSelect;
                          }
                      }
                      return null;
                  });
                  projetista = '';
                  return null;
              });
          } else {
              dadosFiltrados.map(dado => {
                  dataArquivado = new Date(dado.dataArquivado);
                  if (String(dataArquivado.getFullYear()) === String(opcaoAnoSelect)) {
                      dado.infoProjetos.map(infoProjeto => {
                          if (String(infoProjeto.projetistaDesenho) === String(opcaoPessoaSelect)) {
                              if (String(projetista) !== String(opcaoPessoaSelect)) {
                                  dataArquivado = new Date(dado.dataArquivado)
                                  indice = dataArquivado.getMonth();
                                  objMostrar.y[indice]++;
                                  projetista = opcaoPessoaSelect;
                              }
                          }
                          return null;
                      });
                  }
                  projetista = '';
                  return null;
              });
          }
      }
  } else if (opcaoInputRadio === 'ano') { // funcionando!!
      let anoAtual = new Date(Date.now()).getFullYear(); // Ano atual
      // Preenche os dados do eixo X que serão mostrados
      for (let cont = 0; cont <= 4; cont++) {
          objMostrar.x.push(anoAtual - cont);
          objMostrar.y.push(0);
      }
      if (opcaoPessoaSelect === 'Todas as pessoas') { // funcionando!!
          dadosFiltrados.map(dado => {
              dataArquivado = new Date(dado.dataArquivado);
              indice = Number(anoAtual - dataArquivado.getFullYear());
              objMostrar.y[indice]++; // Incrementa o valor salvo na posição do ano
              return null;
          });
      } else { // funcionando!!
          dadosFiltrados.map(dado => {
              projetista = '';
              dado.infoProjetos.map(infoProjeto => {
                  if (String(infoProjeto.projetistaDesenho) === String(opcaoPessoaSelect)) {
                      if (String(projetista) !== String(infoProjeto.projetistaDesenho)) {
                          dataArquivado = new Date(dado.dataArquivado);
                          indice = Number(anoAtual - dataArquivado.getFullYear());
                          objMostrar.y[indice]++;
                          projetista = infoProjeto.projetistaDesenho;
                      }
                  }
                  return null;
              });
              return null;
          })
      }

      objMostrar.x = objMostrar.x.reverse();
      objMostrar.y = objMostrar.y.reverse();
  }
  return objMostrar;
  //setDadosParaMostrar(objMostrar);
}