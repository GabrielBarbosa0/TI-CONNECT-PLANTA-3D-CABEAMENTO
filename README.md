# TI Connect - Planta 3D de Cabeamento Estruturado

Aplicacao web interativa para representar, em 3D, uma proposta de cabeamento estruturado para o predio da TI Connect, localizado na R. Estela Mota, Sao Sebastiao, Surubim-PE.

O projeto foi desenvolvido para a disciplina de Redes de Computadores II, com foco em demonstrar a distribuicao fisica dos ambientes, equipamentos de rede, pontos de acesso, computadores, cabos, barramentos e backbone vertical entre pavimentos.

## Objetivo

Criar uma planta 3D navegavel que ajude a visualizar:

- a organizacao dos ambientes por pavimento;
- a posicao dos racks, switches, servidores, firewall/roteador e pontos de acesso;
- a distribuicao dos computadores e pontos de rede;
- o caminho dos cabos UTP e dos barramentos por andar;
- o backbone vertical responsavel pela interligacao entre pavimentos;
- a rede de visitantes separada da rede corporativa.

## Tecnologias

- HTML
- CSS
- JavaScript
- Three.js
- WebGL

## Estrutura do projeto

```text
TI-CONNECT-PLANTA-3D-CABEAMENTO/
  app.js
  index.html
  styles.css
  docs/
    TDD.md
```

## Pavimentos representados

O predio modelado possui quatro pavimentos:

- Terreo
- 1º andar
- 2º andar
- 3º andar

Cada pavimento possui banheiro masculino e feminino, alem de ambientes especificos de acordo com a funcao do andar.

### Terreo

Ambientes principais:

- Recepcao
- Rede de visitantes
- Entrada de veiculos
- Estacionamento
- Estoque
- Banheiro masculino
- Banheiro feminino
- Escada

Elementos de rede:

- `RACK-T`
- `SW-T-01`
- `SW-BB-T`
- `FW-01`
- `AP-CORP-T`
- `AP-VIS-01`
- `CLI-01`
- `PT-EST-01`

### 1º andar

Ambientes principais:

- Sala de servidores
- Suporte tecnico N3
- Apoio tecnico N3
- Banheiro masculino
- Banheiro feminino
- Escada

Elementos de rede:

- `SRV-01`
- `BKP-01`
- `RACK-CPD`
- `SW-N3-01`
- `SW-BB-1`
- `AP-1-01`
- Pontos `N3-*`

### 2º andar

Ambientes principais:

- Telemarketing
- Bancadas Telemarketing
- Banheiro masculino
- Banheiro feminino
- Escada

Elementos de rede:

- `RACK-2`
- `SW-TMK-01`
- `SW-BB-2`
- `AP-2-01`
- Pontos `TMK-*`

### 3º andar

Ambientes principais:

- Setores administrativos
- Sala do chefe
- Sala de reuniao
- Copa
- Descompressao
- Arquivo RH
- Banheiro masculino
- Banheiro feminino
- Escada

Setores representados:

- Suporte N2
- Infraestrutura
- Financeiro
- RH
- Administrativo

Elementos de rede:

- `RACK-3`
- `SW-3-01`
- `SW-BB-3`
- `AP-3-01`
- Pontos `N2-*`, `INF-*`, `FIN-*`, `RH-*`, `ADM-*`
- Pontos da sala de reuniao, sala do chefe e descompressao

## Backbone e distribuicao por andar

O backbone vertical representa a ligacao principal entre os pavimentos. Na planta, ele nao liga diretamente os computadores ou pontos finais.

Cada andar possui um switch de distribuicao/backbone identificado como `SW-BB-*`:

- `SW-BB-T`: terreo
- `SW-BB-1`: 1º andar
- `SW-BB-2`: 2º andar
- `SW-BB-3`: 3º andar

Fluxo logico representado:

```text
Firewall/roteador principal
  -> switch local/core do terreo
  -> SW-BB-T
  -> backbone vertical/shaft
  -> SW-BB-1 / SW-BB-2 / SW-BB-3
  -> switches de acesso dos pavimentos
  -> computadores, APs, servidores e pontos de rede
```

## Segmentacao de rede

O projeto considera uma divisao logica por VLANs:

- `VLAN 10 - Corporativa`: computadores dos funcionarios e setores internos.
- `VLAN 20 - Servidores`: servidor principal, servidor de backup e recursos do CPD.
- `VLAN 30 - Visitantes`: clientes e convidados conectados na recepcao.
- `VLAN 40 - Gerencia`: gerenciamento de switches, APs, firewall e demais equipamentos.

A rede de visitantes e representada na recepcao com o ponto de acesso `AP-VIS-01`, o cliente `CLI-01` e a indicacao de SSID Visitantes/VLAN 30.

## Funcionalidades da interface

- Visualizacao 3D da planta.
- Rotacao e zoom com mouse.
- Visualizacao de todos os andares juntos.
- Visualizacao individual por pavimento.
- Camadas ativaveis:
  - cabos e barramentos;
  - equipamentos e pontos;
  - nomenclatura.
- Exportacao de imagem PNG da planta.
- Opcoes independentes para escolher quais camadas saem na imagem exportada.

## Como executar

Por usar imports ES Modules do Three.js, o projeto deve ser aberto por um servidor local.

Uma forma simples e usar Python:

```bash
python -m http.server 5180
```

Depois, acesse:

```text
http://127.0.0.1:5180/
```

Se estiver usando VS Code, tambem pode utilizar uma extensao como Live Server.

## Como usar

1. Abra a aplicacao no navegador.
2. Use os botoes de andar para alternar entre `Todos`, `Terreo`, `1º`, `2º` e `3º`.
3. Use as opcoes em `Camadas` para mostrar ou ocultar cabos, equipamentos e nomenclatura na visualizacao.
4. Use as opcoes em `Na imagem` para escolher o que deve aparecer no PNG exportado.
5. Clique em `Baixar imagem da planta` para gerar a imagem.

## Estimativa para orcamento

A planta permite levantar os principais itens para cotacao:

- racks;
- switches;
- switches de backbone/distribuicao;
- firewall/roteador;
- pontos de acesso;
- servidores;
- computadores/pontos finais;
- metragem aproximada de cabo UTP;
- metragem aproximada de backbone.

Como a planta e conceitual, recomenda-se adicionar uma margem de sobra de 20% a 30% na metragem de cabos para considerar curvas, folgas tecnicas, subida/descida, patch cords e organizacao em rack.

## Documentacao tecnica

A documentacao mais detalhada esta em:

```text
docs/TDD.md
```

Esse arquivo descreve a modelagem dos pavimentos, padrao de nomenclatura, backbone, VLANs, camadas de visualizacao e criterios de aceitacao do projeto.

## Status

Projeto pronto para uso como apoio visual na primeira entrega da atividade:

- local escolhido;
- planta do cabeamento;
- ambientes identificados;
- equipamentos representados;
- cabos e barramentos exibidos;
- backbone vertical corrigido com switch de distribuicao por pavimento;
- exportacao de imagens para documento ou apresentacao.
