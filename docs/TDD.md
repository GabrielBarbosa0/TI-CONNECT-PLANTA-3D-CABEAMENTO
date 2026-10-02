# TDD - TI Connect Planta 3D de Cabeamento

## 1. Visao geral

O projeto **TI Connect Planta 3D de Cabeamento** e uma aplicacao web interativa desenvolvida em JavaScript com WebGL, utilizando a biblioteca Three.js, para representar uma planta 3D conceitual de um predio empresarial da TI Connect.

A proposta e apresentar, de forma visual e navegavel, a organizacao dos ambientes, equipamentos de rede, pontos de acesso, computadores, racks, switches, servidores e cabos usados em um projeto de cabeamento estruturado.

O predio modelado possui:

- 1 pavimento terreo.
- 3 pavimentos superiores.
- Banheiros masculino e feminino em todos os andares, incluindo o terreo.
- Areas administrativas, tecnicas, operacionais e de convivencia.
- Representacao visual do backbone vertical entre os andares.
- Switch de distribuicao/backbone em cada pavimento, identificado como `SW-BB-*`, para terminar o backbone antes da distribuicao local.
- Pontos de rede e cabos UTP distribuidos por setor.
- Rede de visitantes separada da rede corporativa na recepcao.
- Fachada principal posicionada na face estreita do lote, voltada para a R. Estela Mota.
- Paredes internas alinhadas em blocos continuos para reduzir vaos entre ambientes.
- Escada retangular interligando o terreo, primeiro, segundo e terceiro andar, com saida aberta para cada pavimento.

## 2. Objetivo do projeto

O objetivo principal e criar uma planta 3D para apoiar a apresentacao de um projeto de cabeamento estruturado, permitindo visualizar a distribuicao fisica dos ambientes e dos recursos de rede.

O sistema deve ajudar a demonstrar:

- Onde ficam os servidores e equipamentos centrais.
- Como os computadores estao distribuidos por setor.
- Onde passam os cabos e barramentos.
- Como o backbone interliga os pavimentos.
- Quais ambientes existem em cada andar.
- Como a infraestrutura de rede atende as necessidades do predio.
- Como a rede de clientes/visitantes fica isolada da rede interna.

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

O pavimento terreo representa a entrada e area de apoio do predio. A fachada principal fica na face estreita do lote, voltada para a R. Estela Mota, conforme a referencia do mapa.

Na distribuicao atual do terreo, a area inferior representa uma entrada fisica de veiculos da R. Estela Mota para o estacionamento. Essa faixa deve permanecer livre, sem parede ou equipamento bloqueando a passagem. A recepcao fica na area frontal junto a fachada e possui uma porta voltada diretamente para a R. Estela Mota. Ao lado da recepcao ficam dois banheiros, um masculino e um feminino, ambos com acesso aberto pela recepcao. A area posterior foi reservada para um estoque retangular maior, quase do mesmo porte da recepcao, avancando um pouco sobre a area do estacionamento sem bloquear o corredor de carros. O estoque possui uma abertura voltada para a entrada de veiculos, facilitando acesso operacional a partir do estacionamento.

Ambientes:

- Estacionamento.
- Estoque.
- Recepcao.
- Entrada de veiculos da R. Estela Mota para o estacionamento.
- Banheiro masculino.
- Banheiro feminino.
- Escada de acesso aos pavimentos superiores.

Elementos de rede:

- Rack do terreo.
- Switch do terreo.
- Switch de distribuicao/backbone do terreo.
- Firewall/roteador principal.
- Ponto de acesso.
- Ponto de acesso exclusivo para visitantes na recepcao.
- Ponto de rede no estoque.
- Cliente de exemplo conectado a rede de visitantes.
- Ligacao com o backbone vertical.

A escada foi posicionada na area posterior do terreo, sem bloquear a entrada de veiculos nem o estacionamento. A parede da escada possui abertura para acesso ao pavimento.

Na recepcao, foi adicionada uma rede de visitantes para clientes que chegam ao predio. Essa rede e identificada como `TI-Connect-Visitantes` e deve ser separada da rede interna da empresa por meio de VLAN e regras de firewall.

Essa separacao evita que dispositivos de visitantes tenham acesso aos servidores, computadores dos funcionarios, impressoras internas e outros recursos administrativos.

### Primeiro andar

O primeiro andar e voltado para a infraestrutura principal e equipe tecnica de nivel 3.

Ambientes:

- Sala de servidores.
- Sala de suporte tecnico N3.
- Area de apoio tecnico.
- Escada.
- Banheiro masculino.
- Banheiro feminino.

No primeiro andar, a sala de servidores foi ampliada ate encostar na parede da escada, evitando uma divisoria inutil dentro da area tecnica. A escada possui saida aberta para o pavimento, sem parede bloqueando a circulacao. A sala de servidores possui uma porta propria voltada para a area do suporte N3. Os pontos N3 foram reposicionados de forma mais centralizada dentro da area de suporte, e uma parede parcial foi adicionada para separar uma area livre que podera ser definida posteriormente.

Os pontos N3 usam um tronco de barramento visivel na planta, com derivacoes curtas para cada computador. Assim, os cabos nao convergem para um ponto solto sem equipamento representado.

Elementos de rede:

- Servidor principal.
- Servidor de backup.
- Rack do CPD.
- Switch do N3.
- Switch de distribuicao/backbone do primeiro andar.
- Computadores da equipe N3.
- Ponto de acesso.
- Cabos UTP para os pontos de trabalho.
- Ligacao com o backbone.

### Segundo andar

O segundo andar e dedicado ao telemarketing.

Ambientes:

- Sala de telemarketing.
- Sala de bancadas do telemarketing.
- Escada.
- Banheiro masculino.
- Banheiro feminino.

Elementos de rede:

- Rack do segundo andar.
- Switch do telemarketing.
- Switch de distribuicao/backbone do segundo andar.
- Computadores organizados em barramento.
- Ponto de acesso.
- Cabos UTP conectando os computadores.
- Ligacao com o backbone.

No telemarketing, os computadores sao ligados por derivacoes curtas a um tronco de barramento visivel na planta. Esse tronco retorna para o switch do andar, evitando cabos convergindo para um ponto sem equipamento representado.

### Terceiro andar

O terceiro andar concentra areas administrativas, setores internos e convivencia.

Ambientes:

- Sala de descompressao.
- Copa para almoco.
- Sala de reuniao.
- Area de setores.
- Sala do chefe.
- Arquivo RH.
- Escada.
- Banheiro masculino.
- Banheiro feminino.

No terceiro andar, a sala de reuniao foi posicionada em uma das pontas do pavimento e a sala do chefe ficou na ponta oposta, ambas como ambientes fechados e com porta voltada para a area de circulacao/setores. A sala do chefe foi reduzida para liberar um corredor de acesso aos banheiros masculino e feminino. A area vazia entre a escada e os banheiros foi aproveitada como Arquivo RH, destinado ao armazenamento de documentacao e papeis administrativos.

A copa possui uma porta voltada para os setores, facilitando o acesso a partir da area administrativa. A sala de reuniao tambem possui uma porta propria, permitindo acesso pelos setores ou pela circulacao proxima a descompressao.

Os pontos dos setores, incluindo suporte N2, infraestrutura, financeiro, RH e administrativo, foram centralizados na area de setores. A divisoria entre a area lateral e os setores foi aberta para melhorar a circulacao. A fiacao dos setores tambem usa um tronco de barramento visivel, com derivacoes para cada ponto.

Setores representados:

- Suporte N2.
- Infraestrutura.
- Financeiro.
- Recursos humanos.
- Administrativo.

Elementos de rede:

- Rack do terceiro andar.
- Switch do terceiro andar.
- Switch de distribuicao/backbone do terceiro andar.
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
- `SW-BB-T`: switch de distribuicao/backbone do terreo.
- `SW-BB-1`: switch de distribuicao/backbone do primeiro andar.
- `SW-BB-2`: switch de distribuicao/backbone do segundo andar.
- `SW-BB-3`: switch de distribuicao/backbone do terceiro andar.
- `RACK-CPD`: rack da sala de servidores.
- `SRV-01`: servidor principal.
- `BKP-01`: servidor de backup.
- `SW-N3-01`: switch do suporte N3.
- `TMK-01`: computador do telemarketing.
- `AP-2-01`: ponto de acesso do segundo andar.
- `FIN-01`: computador do financeiro.
- `RH-01`: computador do RH.

Esse padrao facilita a identificacao dos equipamentos na planta e pode ser expandido no futuro para incluir portas de switch, patch panels e pontos de telecomunicacao.

## 7. Backbone e distribuicao por andar

O backbone vertical representa a ligacao principal entre os pavimentos. Por ser parte fixa da infraestrutura de cabeamento estruturado, ele nao e representado como um cabo ligado diretamente aos computadores ou aos pontos finais.

Em cada pavimento, o backbone chega a um switch de distribuicao identificado como `SW-BB-*`. A partir desse switch, a rede e encaminhada para o switch de acesso local do andar, que entao atende computadores, pontos de acesso, servidores ou demais pontos de rede.

Fluxo representado na planta:

```text
Firewall/roteador principal
  -> switch local/core do terreo
  -> SW-BB-T
  -> backbone vertical/shaft
  -> SW-BB-1 / SW-BB-2 / SW-BB-3
  -> switches de acesso dos pavimentos
  -> computadores, APs, servidores e pontos de rede
```

## 8. Segmentacao de rede

O projeto considera a separacao logica da rede por VLANs. Essa organizacao melhora a seguranca, facilita o gerenciamento e permite controlar o acesso de cada grupo de dispositivos.

Proposta inicial de VLANs:

- `VLAN 10 - Corporativa`: computadores dos funcionarios e setores internos.
- `VLAN 20 - Servidores`: servidor principal, servidor de backup e recursos do CPD.
- `VLAN 30 - Visitantes`: clientes e convidados conectados na recepcao.
- `VLAN 40 - Gerencia`: gerenciamento de switches, APs, firewall e demais equipamentos.

### Rede de visitantes

A rede de visitantes deve ser disponibilizada principalmente na recepcao e, futuramente, tambem pode ser ativada na sala de reuniao.

Caracteristicas esperadas:

- SSID sugerido: `TI-Connect-Visitantes`.
- Acesso liberado apenas para internet.
- Bloqueio de acesso a rede corporativa.
- Bloqueio de acesso a servidores e dispositivos internos.
- Possibilidade de limitar velocidade por usuario.
- Senha separada da rede dos funcionarios.

Na planta 3D, essa rede e representada por:

- `FW-01`: firewall/roteador responsavel pelo controle de acesso.
- `AP-VIS-01`: ponto de acesso da recepcao para visitantes.
- `CLI-01`: dispositivo de exemplo de um cliente conectado.
- Cabo em cor especifica para diferenciar a rede de visitantes.

## 9. Camadas de visualizacao

A interface permite ligar ou desligar camadas da planta.

Camadas disponiveis:

- **Cabos e barramentos**: mostra as conexoes entre switches, computadores, servidores e backbone.
- **Equipamentos e pontos**: mostra racks, switches, servidores, computadores e pontos de acesso.
- **Nomenclatura**: mostra as etiquetas dos ambientes e equipamentos.

Essa separacao ajuda na apresentacao, pois permite explicar a planta por partes.

Na vista de todos os andares, a nomenclatura prioriza os pavimentos e equipamentos de rede. Ao selecionar um andar, os nomes de ambientes e pontos finais aparecem com menor destaque. Etiquetas proximas sao reposicionadas ou ocultadas para evitar sobreposicao; aproximar a camera facilita a leitura dos pontos densos.

Racks, switches, firewall/roteador, servidores, pontos de acesso e estacoes possuem formas 3D distintas. Os cabos sao desenhados em segmentos ortogonais, com barramentos mais espessos. Esses trajetos sao esquematicos e nao definem eletrodutos, alturas de instalacao ou metragem executiva.

O painel inclui a descricao das siglas usadas nos nomes dos aparelhos e setores.

## 10. Funcionamento da navegacao

O usuario pode:

- Girar a camera com o mouse.
- Aproximar ou afastar usando o scroll.
- Selecionar um andar especifico.
- Visualizar todos os andares ao mesmo tempo.
- Exportar uma imagem da planta para usar em slides ou relatorios.
- Escolher, no momento da exportacao, se a imagem deve conter cabos e barramentos, equipamentos e pontos, e/ou nomenclatura.

## 11. Criterios de aceitacao

O projeto deve ser considerado funcional quando:

- A pagina abrir corretamente no navegador.
- A cena 3D for renderizada sem ficar em branco.
- Todos os quatro pavimentos forem exibidos.
- O usuario conseguir alternar entre os andares.
- Os ambientes principais estiverem identificados.
- Todos os andares possuirem banheiro masculino e feminino.
- As paredes internas estiverem coladas/alinhadas sem vaos visuais desnecessarios.
- Os equipamentos de rede estiverem visiveis.
- Os cabos e backbone forem exibidos.
- O backbone estiver terminado em switches de distribuicao por pavimento antes da distribuicao local.
- A rede de visitantes estiver representada na recepcao.
- A documentacao indicar que a rede de visitantes deve ser isolada por VLAN e firewall.
- A planta puder ser usada como apoio visual em apresentacao.

## 12. Possiveis melhorias futuras

Algumas melhorias que podem ser implementadas futuramente:

- Adicionar medidas reais de cada ambiente.
- Separar os dados da planta em um arquivo JSON.
- Criar relatorio automatico de pontos de rede.
- Adicionar tabela de materiais e orcamento.
- Representar patch panels e tomadas RJ45.
- Adicionar legenda tecnica com normas de cabeamento.
- Adicionar regras detalhadas de firewall entre VLANs.
- Adicionar portal cativo para visitantes.
- Permitir edicao visual da planta.
- Gerar PDF com imagens e resumo tecnico.
- Criar modo de apresentacao por andar.
- Adicionar texturas e modelos 3D mais detalhados.

## 13. Conclusao

O projeto apresenta uma maquete 3D interativa para demonstrar a infraestrutura de rede planejada para o predio da TI Connect.

Mesmo sendo uma representacao conceitual, a planta permite visualizar de forma clara a divisao dos ambientes, a localizacao dos equipamentos, a distribuicao dos computadores e o caminho geral do cabeamento estruturado entre os pavimentos.

## 14. Referencias anexadas

- `docs/referencias/Projeto de Cabeamento Estruturado - Entrega 1 (1).pdf`: distribuicao original e quantitativos de equipamentos e cabos.
- `docs/referencias/orcamento_cabeamento_ti_connect.xlsx`: estimativa de materiais. O proprio arquivo identifica a fibra optica, a topologia dos enlaces e alguns componentes como hipoteses de orcamento, sujeitas a verificacao antes da compra.
