# TDD - TI Connect Planta 3D de Cabeamento

## 1. Visao geral

O projeto **TI Connect Planta 3D de Cabeamento** e uma aplicacao web interativa desenvolvida em JavaScript com WebGL, utilizando a biblioteca Three.js, para representar uma planta 3D conceitual de um predio empresarial da TI Connect.

A proposta e apresentar, de forma visual e navegavel, a organizacao dos ambientes, equipamentos de rede, pontos de acesso, computadores, racks, switches, servidores e cabos usados em um projeto de cabeamento estruturado.

O predio modelado possui:

- 1 pavimento terreo.
- 3 pavimentos superiores.
- Banheiro em todos os andares.
- Areas administrativas, tecnicas, operacionais e de convivencia.
- Representacao visual do backbone vertical entre os andares.
- Pontos de rede e cabos UTP distribuidos por setor.

## 2. Objetivo do projeto

O objetivo principal e criar uma planta 3D para apoiar a apresentacao de um projeto de cabeamento estruturado, permitindo visualizar a distribuicao fisica dos ambientes e dos recursos de rede.

O sistema deve ajudar a demonstrar:

- Onde ficam os servidores e equipamentos centrais.
- Como os computadores estao distribuidos por setor.
- Onde passam os cabos e barramentos.
- Como o backbone interliga os pavimentos.
- Quais ambientes existem em cada andar.
- Como a infraestrutura de rede atende as necessidades do predio.

## 3. Tecnologias utilizadas

### HTML

Define a estrutura da interface, incluindo:

- Painel lateral de controle.
- Botoes de selecao de andar.
- Opcoes de exibicao das camadas.
- Area principal da cena 3D.

### CSS

Responsavel pelo layout visual da aplicacao:

- Organizacao do painel lateral.
- Responsividade para telas menores.
- Estilo dos botoes, legenda e controles.
- Aparencia geral da interface.

### JavaScript

Controla toda a logica da aplicacao:

- Criacao dos andares.
- Insercao de salas, equipamentos e cabos.
- Controle de camera.
- Alternancia entre pavimentos.
- Exibicao e ocultacao de camadas.
- Exportacao da imagem da planta.

### Three.js

Biblioteca JavaScript usada para trabalhar com WebGL de forma mais simples.

No projeto, o Three.js e usado para:

- Criar a cena 3D.
- Renderizar pisos, paredes e salas.
- Posicionar equipamentos e cabos.
- Controlar luzes e camera.
- Permitir navegacao com mouse.

### WebGL

Tecnologia grafica usada pelo navegador para renderizar a cena 3D com aceleracao por hardware.

## 4. Estrutura de arquivos

```text
TI-CONNECT-PLANTA-3D-CABEAMENTO/
  app.js
  index.html
  styles.css
  docs/
    TDD.md
```

### index.html

Arquivo principal da aplicacao. Ele carrega:

- A estrutura da pagina.
- O arquivo CSS.
- O mapa de importacao do Three.js.
- O script principal `app.js`.

### styles.css

Arquivo de estilos responsavel pela identidade visual e organizacao da interface.

### app.js

Arquivo principal do projeto. Contem:

- Dados dos andares.
- Modelagem dos ambientes.
- Criacao dos objetos 3D.
- Criacao dos cabos.
- Criacao das etiquetas.
- Controles de visualizacao.

## 5. Modelagem dos pavimentos

### Terreo

O pavimento terreo representa a entrada e area de apoio do predio.

Ambientes:

- Estacionamento.
- Estoque.
- Recepcao.
- Banheiro.

Elementos de rede:

- Rack do terreo.
- Switch do terreo.
- Ponto de acesso.
- Ponto de rede no estoque.
- Ligacao com o backbone vertical.

### Primeiro andar

O primeiro andar e voltado para a infraestrutura principal e equipe tecnica de nivel 3.

Ambientes:

- Sala de servidores.
- Sala de suporte tecnico N3.
- Banheiro.

Elementos de rede:

- Servidor principal.
- Servidor de backup.
- Rack do CPD.
- Switch do N3.
- Computadores da equipe N3.
- Ponto de acesso.
- Cabos UTP para os pontos de trabalho.
- Ligacao com o backbone.

### Segundo andar

O segundo andar e dedicado ao telemarketing.

Ambientes:

- Sala de telemarketing.
- Banheiro.

Elementos de rede:

- Rack do segundo andar.
- Switch do telemarketing.
- Computadores organizados em barramento.
- Ponto de acesso.
- Cabos UTP conectando os computadores.
- Ligacao com o backbone.

### Terceiro andar

O terceiro andar concentra areas administrativas, setores internos e convivencia.

Ambientes:

- Sala de descompressao.
- Copa para almoco.
- Sala de reuniao.
- Area de setores.
- Sala do chefe.
- Banheiro.

Setores representados:

- Suporte N2.
- Infraestrutura.
- Financeiro.
- Recursos humanos.
- Administrativo.

Elementos de rede:

- Rack do terceiro andar.
- Switch do terceiro andar.
- Computadores dos setores.
- Ponto de acesso.
- Ponto de rede na sala de reuniao.
- Ponto de rede na sala do chefe.
- Ponto para equipamento de lazer.
- Cabos UTP e barramento.
- Ligacao com o backbone.

## 6. Padrao de nomenclatura

O projeto utiliza uma nomenclatura simples para identificar os elementos.

Exemplos:

- `RACK-T`: rack do terreo.
- `SW-T-01`: switch do terreo.
- `RACK-CPD`: rack da sala de servidores.
- `SRV-01`: servidor principal.
- `BKP-01`: servidor de backup.
- `SW-N3-01`: switch do suporte N3.
- `TMK-01`: computador do telemarketing.
- `AP-2-01`: ponto de acesso do segundo andar.
- `FIN-01`: computador do financeiro.
- `RH-01`: computador do RH.

Esse padrao facilita a identificacao dos equipamentos na planta e pode ser expandido no futuro para incluir portas de switch, patch panels e pontos de telecomunicacao.

## 7. Camadas de visualizacao

A interface permite ligar ou desligar camadas da planta.

Camadas disponiveis:

- **Cabos e barramentos**: mostra as conexoes entre switches, computadores, servidores e backbone.
- **Equipamentos e pontos**: mostra racks, switches, servidores, computadores e pontos de acesso.
- **Nomenclatura**: mostra as etiquetas dos ambientes e equipamentos.

Essa separacao ajuda na apresentacao, pois permite explicar a planta por partes.

## 8. Funcionamento da navegacao

O usuario pode:

- Girar a camera com o mouse.
- Aproximar ou afastar usando o scroll.
- Selecionar um andar especifico.
- Visualizar todos os andares ao mesmo tempo.
- Exportar uma imagem da planta para usar em slides ou relatorios.

## 9. Criterios de aceitacao

O projeto deve ser considerado funcional quando:

- A pagina abrir corretamente no navegador.
- A cena 3D for renderizada sem ficar em branco.
- Todos os quatro pavimentos forem exibidos.
- O usuario conseguir alternar entre os andares.
- Os ambientes principais estiverem identificados.
- Os equipamentos de rede estiverem visiveis.
- Os cabos e backbone forem exibidos.
- A planta puder ser usada como apoio visual em apresentacao.

## 10. Possiveis melhorias futuras

Algumas melhorias que podem ser implementadas futuramente:

- Adicionar medidas reais de cada ambiente.
- Separar os dados da planta em um arquivo JSON.
- Criar relatorio automatico de pontos de rede.
- Adicionar tabela de materiais e orcamento.
- Representar patch panels e tomadas RJ45.
- Adicionar legenda tecnica com normas de cabeamento.
- Permitir edicao visual da planta.
- Gerar PDF com imagens e resumo tecnico.
- Criar modo de apresentacao por andar.
- Adicionar texturas e modelos 3D mais detalhados.

## 11. Conclusao

O projeto apresenta uma maquete 3D interativa para demonstrar a infraestrutura de rede planejada para o predio da TI Connect.

Mesmo sendo uma representacao conceitual, a planta permite visualizar de forma clara a divisao dos ambientes, a localizacao dos equipamentos, a distribuicao dos computadores e o caminho geral do cabeamento estruturado entre os pavimentos.
