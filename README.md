# Full Plans BI :bar_chart:

*Descrição de um caso de exemplo desejado:* O usuário filtra pelo funcionário Matheus. Os gráficos mostrados devem informar as seguintes informações: Quantos projetos ele foi escolhido para atuar (projetos cadastrados), quantos projetos ele finalizou, quantos ainda estão pendentes.

Este projeto consiste em criar uma interface com informações dispostas em formato gráfico com respeito aos dados mantidos no banco de dados do projeto Full Plans. As features básicas serão:

* Mostrar quantos projetos foram <i>cadastrados</i> por <strong>mês</strong> ou por <strong>ano</strong>; :+1:
  * Parte funcional finalizada;
  * Parte de estilo finalizada;
  
 ![Imagem mostrando o componente <ProjCadastrados />](https://github.com/64J0/fullplansBI/raw/master/img-github/projCadastradosLayout.JPG)
 
* Mostrar quantos projetos foram <i>finalizados</i>(<i>arquivados</i>) por <strong>mês</strong>, por <strong>ano</strong> ou por <strong>quem</strong>; :+1:
  * Parte funcional finalizada;
  * Parte de estilo finalizada.
  
 ![Imagem mostrando o componente <ProjFinalizados />](https://github.com/64J0/fullplansBI/raw/master/img-github/projFinalizadosLayout.JPG)
  
* Mostrar quantos projetos ficaram <i>atrasados</i> por <strong>mês</strong>, por <strong>ano</strong> ou quem foi o ~<b>responsável</b>~ (com base na implementação atual não é possível dizer quem foi o responsável pelo atraso do projeto);
  * Parte funcional não finalizada;
  * Parte de estilo ainda não finalizada.
  
* Mostrar quantos projetos foram finalizados <i>sem atrasos</i>, por <strong>mês</strong>, por <strong>ano</strong> ou quem foi o <strong>responsável</strong>.
  * Parte funcional não finalizada;
  * Parte de estilo ainda não finalizada.
  
* Mostrar quantos projetos ainda estão abertos (não foram <i>arquivados</i>).
  
<i>Nas imagens estão sendo usados dados falsos para testar o funcionamento do sistema.</i>

**Inicialmente está sendo usada a biblioteca ChartJS para plotar os gráficos.**
