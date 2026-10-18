# Justificativa técnica do orçamento — TI Connect

**Revisão:** 09/10/2026.

**Orçamento principal:** [orcamento_cabeamento_ti_connect.xlsx](referencias/orcamento_cabeamento_ti_connect.xlsx).

## 1. Dimensionamento

| Grupo | Valor |
| --- | ---: |
| Equipamentos | R$ 43.810,87 |
| Cabeamento | R$ 3.309,08 |
| Terminações | R$ 7.553,06 |
| Montagem | R$ 5.300,02 |
| **Total de materiais** | **R$ 59.973,03** |

Quatro pavimentos, quatro racks, quatro switches de acesso, quatro de distribuição, cinco APs, dois servidores e 31 pontos cabeados de terminais. São 36 pontos de rede incluindo os APs; os servidores usam conexões locais. A compra de computadores, monitores, teclados e mouses foi excluída. O visitante utiliza Wi-Fi.

O total inclui cabeamento, terminações e materiais estimados de montagem, com R$ 440,00 de provisões a cotar. Mão de obra, fusões, certificação, obras civis/elétricas, licenças, discos adicionais, backup externo e frete não integram o total. Os itens mantidos preservam preços de 29/09 a 01/10/2026; os novos materiais têm fontes consultadas em 07/10/2026. Loja e URL constam por item na planilha e loja também nas tabelas dos PDFs.

## 2. Equipamentos de rede e servidores

### Pontos de terminais

São mantidos **31 pontos cabeados**, distribuídos em 1 / 6 / 14 / 10 por piso. O orçamento inclui suas terminações RJ45, caixas, cabos e patch cords. Os cinco APs permanecem orçados e têm pontos próprios, totalizando 36 enlaces de área. Não se soma um valor genérico de ponto além desses componentes, para evitar duplicidade.

### Servidor principal — SRV-01

Escolhido o **Lenovo ThinkSystem ST50 V3, SKU 7DF3S3DG00**, Xeon E-2414 de quatro núcleos, 16 GB de RAM, armazenamento anunciado de 2 TB, torre, sem sistema operacional e garantia anunciada de três anos. A [HD Store anuncia R$ 11.287,48 no Pix](https://www.hdstore.com.br/servidor-lenovo-thinksystem-st50-v3-xeon-e-2414-4c-26ghz-16gb-2tb-300w-3-anos-de-garantia). A plataforma utiliza memória ECC e permite expansão, conforme o [guia do fabricante](https://lenovopress.lenovo.com/lp1907-thinksystem-st50-v3-server); confirmar a configuração efetivamente entregue na cotação.

É uma opção profissional de entrada para serviços leves de arquivos, autenticação e aplicações administrativas. O número de salas orienta a rede, mas não comprova a capacidade do servidor: aplicações, usuários simultâneos e volume de dados precisam ser dimensionados. A configuração de 16 GB e 2 TB é destinada a serviços leves; virtualização intensa ou banco de dados pesado exigem dimensionamento adicional. Permanece na sala de servidores do 1º andar, fora do rack de parede, com ventilação e nobreak dedicado.

### Servidor de backup — BKP-01

Usa a mesma configuração para padronizar manutenção e peças, preservando uma máquina dedicada às cópias. Os 2 TB anunciados são capacidade bruta, e o anúncio não comprova quantidade de discos ou espelhamento. O espaço disponível deve acomodar os dados protegidos **mais a retenção das versões**; um servidor de 2 TB não garante backup completo de outro de 2 TB cheio. A quantidade de dados e a política de retenção não foram fornecidas. Se excederem essa capacidade, ampliar o armazenamento antes da implantação e recotar o total.

Discos adicionais, RAID, recuperação testada e cópia externa precisam de dimensionamento próprio; não estão implicitamente incluídos. Manter as duas máquinas na mesma sala permite backup local, mas não protege contra perda do local.

### Switches de acesso — adequação por piso

| Pavimento / sigla | Ligações no switch de acesso | Modelo | Portas usadas / total | Livres |
| --- | --- | --- | ---: | ---: |
| Térreo — SW-T-01 | 1 terminal do estoque + uplink | TL-SG108E | 2 / 8 | 6 |
| 1º — SW-N3-01 | 6 terminais N3 + 2 servidores + uplink | TL-SG116E | 9 / 16 | 7 |
| 2º — SW-TMK-01 | 14 terminais de telemarketing + uplink | ES224G | 15 / 24 | 9 |
| 3º — SW-3-01 | 10 terminais dos setores + uplink | TL-SG116E | 11 / 16 | 5 |

Os APs conectam-se aos switches de distribuição PoE, portanto não consomem portas adicionais nos switches desta tabela. Os links de acesso são RJ45 Gigabit; a fibra continua na distribuição.

- **TL-SG108E:** oito portas Gigabit com VLAN 802.1Q, suficientes no térreo. [Ficha do fabricante](https://www.tp-link.com/us/business-networking/easy-smart-switch/tl-sg108e/v1/); [preço de R$ 332,38](https://www.kabum.com.br/produto/1049615/switch-tp-link-tl-sg108e-8-portas-10-100-1000-unmanaged-gigabit-ethernet-metal-montagem-em-rack-ideal-rede-profissional).
- **TL-SG116E:** dezesseis portas Gigabit, gerenciamento básico e VLAN 802.1Q. Atende 1º e 3º andares com reserva. [Documentação do fabricante](https://static.tp-link.com/2021/202102/20210205/TL-SG116E%28UN%291.2%26TL-SG108E%28UN%296.0%26TL-SG105E%28UN%295.0_Datasheet.pdf); [preço de R$ 412,74](https://www.kabum.com.br/produto/384130/switch-tp-link-16-portas-10-100-1000-mbps-tl-sg116e).
- **ES224G:** vinte e quatro portas Gigabit e VLAN 802.1Q, com nove portas de reserva no telemarketing. [Documentação oficial](https://www.omadanetworks.com/es/business-networking/omada-switch-agile/es224g/); [preço de R$ 999,99 na Waz](https://www.waz.com.br/switch-gerenciavel-24-portas-gigabit-tp-link-es224g-133595-html/p).

Os switches de acesso não têm PoE nem SFP e possuem gerenciamento básico. Os Easy Smart têm administração própria: não pressupor integração completa ao controlador Omada, ACLs avançadas ou VLAN exclusiva de gerenciamento. Manter visitantes fora desses switches de acesso, limitar a administração à rede confiável e aplicar isolamento no gateway e na distribuição. Atualizar firmware compatível com a revisão recebida e testar a separação antes de liberar a rede. O uplink de 1 Gb/s é compartilhado pelos usuários de cada andar; tráfego intenso simultâneo ou requisitos de telefonia IP exigem revisão.

### Gateway — FW-01

Escolhido o **TP-Link ER605, exigindo revisão V2**, a [R$ 459,99 no Pix na Pichau](https://www.pichau.com.br/roteador-tp-link-omada-vpn-multi-wan-gigabit-er605). O anúncio não garante a revisão: solicitar V2 expressamente ao fornecedor e reconfirmar o preço. A [ficha oficial V2](https://www.tp-link.com/br/business-networking/vpn-router/er605/v2/) informa portas Gigabit, VLAN 802.1Q, NAT, VPN e controles de acesso. É um gateway cabeado; o Wi-Fi continua nos EAP610.

Atende ao desenho de escritório com internet de até 1 Gb/s, rede corporativa e visitantes separados, com portas Gigabit e segmentação por VLAN. A taxa real depende de VPN, regras e tráfego; não se promete 1 Gb/s em todas as funções. Configurar bloqueio de visitantes para servidores, usuários e interfaces de administração, preservando somente os serviços necessários. Não foi orçado firewall de próxima geração com inspeção avançada.


### Nobreaks — autonomia estimada durante falta de energia

**Fontes de autonomia consultadas:** 09/10/2026.

A previsão considera os **cinco nobreaks do orçamento**, com baterias internas novas, totalmente carregadas, ambiente ventilado próximo de 20–25 °C e apenas as cargas indicadas abaixo. Os tempos são **estimativas preliminares do projeto**, sem medição no prédio; não são autonomias garantidas pelos fabricantes. Computadores dos usuários, monitores, impressoras e climatização não integram essas cargas. As tomadas RJ45 são passivas e não consomem energia; os APs são alimentados pelo switch PoE.

| Local / identificação | Modelo e quantidade | Equipamentos alimentados | Carga adotada para estimativa | Autonomia aproximada |
| --- | --- | --- | ---: | ---: |
| Térreo — UPS-T | 1 Intelbras ATTIV 700 VA / 220 V | SW-BB-T, SW-T-01, gateway ER605 V2 e dois EAP610 | 70 W | **25–35 minutos** |
| 1º andar — UPS-SRV-01 | 1 SMS Gamer 1500 VA / 1050 W, ref. 29600 | Servidor principal SRV-01 | 150 W | **20–35 minutos** |
| 1º andar — UPS-BKP-01 | 1 SMS Gamer 1500 VA / 1050 W, ref. 29600 | Servidor BKP-01 e rede do 1º andar: SW-BB-1, SW-N3-01 e um EAP610 | 210 W (150 W do servidor + cerca de 55 W de rede, arredondados com margem) | **15–25 minutos** |
| 2º andar — UPS-2 | 1 Intelbras ATTIV 700 VA / 220 V | SW-BB-2, ES224G e um EAP610 | 55 W | **30–45 minutos** |
| 3º andar — UPS-3 | 1 Intelbras ATTIV 700 VA / 220 V | SW-BB-3, TL-SG116E e um EAP610 | 50 W | **35–50 minutos** |

**Premissas de consumo.** Para a rede, foram reservados aproximadamente 25 W por switch de distribuição, 14 W por EAP610, 8 W para o gateway, 3 W para o TL-SG108E, 10 W para o TL-SG116E e 12 W para o ES224G, com pequena folga para os SFPs e arredondamento. São valores de planejamento apoiados nas fichas técnicas, sujeitos à revisão de hardware recebida: o [TL-SG2210MP](https://www.tp-link.com/ph/business-networking/omada-switch-smart/tl-sg2210mp/v1/) publica 12,2 W sem dispositivos PoE na V1 e valores totais próximos de 170–175 W com 150 W de carga PoE; o [EAP610](https://www.omadanetworks.com/br/business-networking/omada-wifi-ceiling-mount/eap610/) informa até 13,9 W via PoE; as referências de acesso são [TL-SG108E](https://www.tp-link.com/us/business-networking/easy-smart-switch/tl-sg108e/v6/), [TL-SG116E](https://www.tp-link.com/us/business-networking/easy-smart-switch/tl-sg116e/) e [ES224G](https://static.tp-link.com/upload/product-overview/2025/202512/20251223/Datasheet_ES224G%28UN%291.20.pdf); o [ER605 V2](https://www.tp-link.com/us/business-networking/vpn-router/er605/v2/) publica consumo máximo de 7,94 W. O limite PoE de 150 W é capacidade disponível, não consumo constante: os APs são contabilizados uma única vez.

Os **150 W por servidor são uma hipótese de uso administrativo moderado**, não um consumo medido ou declarado para o SKU Lenovo. A potência nominal de 300 W da fonte não representa o consumo contínuo do servidor. CPU, discos, memória e atividade de backup podem alterar bastante a carga; medir cada torre em operação para confirmar esta hipótese. A divisão elétrica proposta mantém SRV-01 em um nobreak e BKP-01 mais a rede do 1º andar no outro, sem interligar as saídas dos nobreaks.

**Método de estimativa.** A [ficha técnica Intelbras ATTIV 700 VA](https://backend.intelbras.com/sites/default/files/2022-03/ATTIV%20700%20VA%20-%20Datasheet.pdf) especifica 350 W de saída e uma bateria de 12 V / 7 Ah: energia nominal de 84 Wh. O [manual SMS Gamer, seção 15, página 44](https://dicomp.com.br/downloads/materiais_apoio/datasheet/28924-2.pdf) especifica, para o modelo 1500 VA, duas baterias de 12 V / 7 Ah: 168 Wh por nobreak, sem módulo externo.

Para uma aproximação de planejamento, adotou-se `tempo (min) ≈ 60 × energia nominal (Wh) × k ÷ carga (W)`, com **k entre 0,35 e 0,50**. Esse fator é uma premissa do projeto para descontar perdas, consumo interno, redução de capacidade na descarga e corte por baixa tensão; não é rendimento certificado nem curva oficial dos aparelhos. Exemplo: ATTIV com 70 W resulta em cerca de 25–36 minutos; os intervalos da tabela foram arredondados. O cálculo não substitui a curva de descarga ou o ensaio com a carga real e não deve ser extrapolado para cargas muito maiores.

Como referência independente, a [tabela oficial SMS Gamer 1500 VA](https://sms.com.br/produtos/detalhe/nobreaks-ups-1/line-interactive-senoidal/nobreak-sms-gamer-1500-va/) informa 10 minutos para PC de até 350 W com monitor de 20 polegadas e 6 minutos para PC de até 500 W com monitor de 25 polegadas, usando somente baterias internas. Esses cenários não são os servidores deste projeto. O anúncio de até 18 horas depende de módulo externo e carga específica, portanto não foi adotado neste orçamento.

**Aplicação e validação.** A autonomia serve para atravessar interrupções curtas e permitir desligamento ordenado dos servidores. Medir potência ativa e aparente, confirmar tensão e compatibilidade das fontes e testar a transferência para bateria e o desligamento antes da implantação; usar o menor tempo confirmado para configurar a reserva de desligamento. O [manual Intelbras](https://backend.intelbras.com/sites/default/files/2026-01/Manual_ATTIV_600VA_700VA_01-26_site.pdf) informa que o ATTIV fornece onda retangular e não é indicado para fontes com PFC: conferir especificamente as fontes dos switches e, se incompatíveis, revisar a seleção para modelo senoidal antes da compra. Os servidores permanecem nos SMS senoidais.

Baterias envelhecidas, carga maior, temperatura e tensão de saída podem reduzir os tempos. As autonomias dos cinco nobreaks **não se somam**; a comunicação entre andares depende de todos os switches do caminho continuarem alimentados. O acesso à internet também depende do equipamento da operadora, cuja alimentação não foi informada nem incluída nesta estimativa.

## 3. Materiais e aplicação

As quantidades e fontes de preço de todos os materiais constam na planilha principal.

| Materiais | Aplicação técnica |
| --- | --- |
| 4 racks Intelbras MRD 1257, 12U | Um por pavimento; acomodam distribuição, acesso e terminações. As torres não são instaladas nesses gabinetes. |
| 4 SG2210MP de distribuição | Mantêm dois SFP por equipamento, VLAN e PoE+ dos APs; os pisos intermediários usam os dois SFP. Os switches de acesso usam uplink RJ45 Gigabit. |
| 4 APs corporativos + 1 de visitantes EAP610 | Cobrem as posições já propostas com alimentação padronizada PoE+. Cobertura e capacidade ainda exigem avaliação no prédio. |
| 31 pontos RJ45 de terminais | Estoque (1), N3 (6), telemarketing (14) e 3º andar (10); somente infraestrutura, sem computadores. |
| 3 nobreaks de rede + 2 senoidais para servidores | Proteção elétrica; autonomia preliminar de 25–50 min nos ATTIV e 15–35 min nos SMS, incluindo a rede do 1º andar no nobreak de backup, conforme a seção de nobreaks. Validar carga, fontes, tensão e tempo em ensaio. |
| 2 caixas Cat6 de 305 m + 2 rolos ópticos de 50 m | Preservam categoria e folga para as rotas do modelo; escala e metragem precisam de vistoria. |
| 4 patch panels, 36 keystones, 31 caixas de mesa e 5 caixas de teto | Correspondem às 31 estações e cinco APs. |
| 80 patch cords Cat6 | Mantêm ligações nas duas extremidades, servidores, interswitch, gateway e reserva. |
| 4 PDUs e 4 guias de cabos | Organizam alimentação e cabos por rack. |
| 4 DIOs, 6 SFPs e 6 cordões ópticos | Mantêm três enlaces ópticos duplex entre pavimentos adjacentes. |

## 4. Cabeamento e instalação

### Custos por pavimento

| Pavimento | Equipamentos | Cabeamento | Terminações | Montagem | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Térreo | R$ 5.070,22 | R$ 361,08 | R$ 1.453,45 | R$ 993,73 | **R$ 7.878,48** |
| 1º andar | R$ 30.472,02 | R$ 683,68 | R$ 1.888,41 | R$ 1.325,01 | **R$ 34.369,12** |
| 2º andar | R$ 4.427,94 | R$ 1.423,29 | R$ 2.310,67 | R$ 1.490,65 | **R$ 9.652,55** |
| 3º andar | R$ 3.840,69 | R$ 841,03 | R$ 1.900,53 | R$ 1.490,63 | **R$ 8.072,88** |
| **Total geral** | R$ 43.810,87 | R$ 3.309,08 | R$ 7.553,06 | R$ 5.300,02 | **R$ 59.973,03** |

Os equipamentos são atribuídos ao local de instalação. O Cat6 comprado é rateado em 34 / 116 / 304 / 156 m, aproximadamente conforme a proporção das rotas mínimas, incluindo reserva. A fibra é dividida financeiramente em 25 m por piso; esse rateio não representa comprimentos executivos. SFPs e cordões ópticos seguem as pontas dos enlaces (1 / 2 / 2 / 1 por piso); os patch cords são distribuídos em 8 / 18 / 31 / 23 unidades. O arredondamento do Cat6 é compensado no 3º andar para fechar com a compra geral.

Os nomes, modelos/referências, quantidades e custos de cada item aparecem na planilha e no [PDF de tabelas](referencias/orcamento_ti_connect_por_andar.pdf). Materiais cujo anúncio não publica SKU permanecem identificados por especificação técnica, com código do fabricante a confirmar no fornecimento.

A soma ortogonal mínima da planta é 395,4 unidades gráficas para os 36 pontos. Com escala de 1 unidade = 1 m e acréscimo de 20%, a estimativa é 474,5 m, atendida pelas duas caixas Cat6 de 305 m. Confirmar escala, subidas, descidas e rotas em vistoria. A fibra monomodo 6FO e a topologia linear são premissas do orçamento; os 100 m incluem percursos laterais entre shaft e racks. Validar comprimentos, fusões, perda óptica e necessidade de redundância.

Instalar distribuição, acesso, patch panel e DIO no rack do respectivo piso. Os símbolos de backbone próximos ao shaft indicam sua função; as rotas no modelo 3D são esquemáticas. Separar energia, cobre e fibra, respeitar raios de curvatura e identificar terminações. Conferir fixação, ventilação, aterramento, tensão e autonomia dos nobreaks.

### Materiais de montagem - estimativa

A previsão considera **96 m de canaleta fechada 50 x 50 mm** (16 / 24 / 28 / 28 m) e **24 m de eletroduto de 32 mm** (rateio financeiro de 6 m por piso). Esses caminhos são compartilhados por vários cabos; a metragem não é a soma dos enlaces. As quantidades são premissas preliminares com reserva e precisam de medição local, validação da seção útil, derivações e ocupação.

| Material / referência | Quantidade geral | Loja / fonte | Unitário | Total |
| --- | ---: | --- | ---: | ---: |
| Canaleta fechada PVC com tampa 50 x 50 mm, barra 2 m - Enerbras 5050-E | 48 barra | [Eletriza](https://eletriza.com.br/materiais-eletricos/canaletas) | R$ 82,82 | R$ 3.975,36 |
| Eletroduto rígido soldável PVC 32 mm, barra 3 m - Tigre 32 mm / loja ref. 92495 | 8 barra | [Roque](https://loja.roquebr.com/eletroduto-rigido-sold-32mm-3m---tigre/p) | R$ 27,00 | R$ 216,00 |
| Bandeja fixa rack 19 polegadas, 1U x 250 mm - Nilko NK030160-C250 | 4 un | [Nilko](https://loja.nilko.com.br/informatica/acessorios/bandeja-fixa-para-rack-19-x-1u-250mm) | R$ 60,16 | R$ 240,64 |
| Conjunto porca gaiola e parafuso para rack 19 polegadas - Central Cabos ref. 5528 | 96 conj. | [Central Cabos](https://www.centralcabos.com.br/kit-porca-gaiola-com-parafuso/p) | R$ 0,86 | R$ 82,56 |
| Fita de velcro reutilizável, rolo 5 m - Costa Brava IDORGCABOSVELCROPRETO | 4 rolo | [Costa Brava Home](https://www.costabravahome.com.br/produtos/fita-velcro-organizadora-de-cabos-5m-p-usb-carregador-e-fios-em-geral/) | R$ 24,99 | R$ 99,96 |
| Kit de buchas e parafusos, pacote 100 conjuntos - Rio Reveste kit c/100 (dimensão a confirmar) | 4 pac. | [Rio Reveste](https://www.r2rioreveste.com.br/product-page/kit-parafuso-e-bucha-c-100) | R$ 40,00 | R$ 160,00 |
| Etiquetas adesivas de identificação, números 1 a 100 - Micro Oficina vinil / 1 a 100 | 2 pac. | [Magazine Luiza](https://www.magazineluiza.com.br/adesivo-etiqueta-identificador-fios-e-cabos-numerado-1-a-100-micro-oficina/p/ed3a2a8gg3/pa/etpi/) | R$ 42,75 | R$ 85,50 |
| Provisão: conexões, suportes de eletroduto e ancoragens dos racks - Lote técnico por piso; especificação após vistoria | 4 lote | A cotar | R$ 110,00 | R$ 440,00 |

A provisão de R$ 110,00 por piso é composta por R$ 60,00 para conexões, suportes, curvas, luvas e terminais, mais R$ 50,00 para ancoragens dos racks; é uma estimativa técnica sem cotação de loja. O pacote de buchas/parafusos é para fixações leves e não substitui a ancoragem dimensionada do rack. Confirmar medidas dos fixadores, carga, substrato e rosca das porcas gaiola. O anúncio do velcro indica esgotado e o da bandeja informa prazo de fabricação; reconfirmar fornecimento e preço de equivalente. As 200 etiquetas são rateadas em 50 por piso, com identificação complementar do andar.

### Tomadas de decisão sobre os tipos de equipamentos

**Terminais e pontos de acesso.** O orçamento compra a infraestrutura de 31 terminais cabeados, distribuídos em 1 / 6 / 14 / 10 por piso, e mantém cinco APs. Não inclui computadores, monitores, teclados ou mouses. Os 36 pontos estão contemplados nos cabos, 36 keystones, 31 caixas de mesa, cinco caixas de teto, patch panels e patch cords; não se soma outro item genérico de ponto de rede.

**Switches de acesso.** Foram mantidos modelos Gigabit com VLAN: TL-SG108E (8 portas) no térreo, TL-SG116E (16 portas) no 1º e 3º andares e ES224G (24 portas) no 2º. Ocupação prevista: 2/8, 9/16, 15/24 e 11/16, incluindo uplinks e os dois servidores do 1º andar. Os APs utilizam a distribuição PoE. O gerenciamento básico atende à segmentação proposta; uplinks de 1 Gb/s são compartilhados.

**Distribuição e Wi-Fi.** Um TL-SG2210MP por piso mantém VLAN, PoE+ e dois SFP para o backbone. Os cinco EAP610 Wi-Fi 6 recebem alimentação PoE+; o AP de visitantes permanece isolado por SSID/VLAN e regras no gateway. Os pisos intermediários usam dois SFP. Validar cobertura e posição dos APs no prédio; o EAP610 é destinado a instalação interna protegida.

**Gateway e servidores.** O ER605, exigindo revisão V2 na compra, fornece portas Gigabit, NAT, VLAN e controle de acesso. Dois Lenovo ST50 V3 de entrada profissional mantêm servidor e backup separados, em torre na sala do 1º andar, fora dos racks de parede. Memória ECC, garantia e possibilidade de expansão orientam a seleção; carga das aplicações e retenção do backup precisam ser dimensionadas.

**Cabeamento e terminações.** Cat6 de cobre e componentes da mesma categoria atendem aos pontos Gigabit e facilitam manutenção. Duas caixas de 305 m incluem reserva conforme a estimativa revisada das rotas. Fibra monomodo 6FO, DIOs LC/UPC e seis SFPs mantêm três enlaces entre pisos adjacentes. Escala, comprimentos e perda óptica devem ser confirmados; o backbone linear não fornece redundância de caminho.

**Montagem e proteção.** A previsão acrescenta 96 m de canaleta fechada com tampa e 24 m de eletroduto, bandejas, fixações, velcro e etiquetas. Os caminhos são compartilhados pelos cabos; sua metragem não equivale à soma dos enlaces. São quantidades preliminares com reserva, sem levantamento executivo. Validar seção útil, ocupação, curvas, fixação, ventilação e ancoragem pela carga do rack; energia deve ter caminho separado. Nobreaks permanecem dimensionados por aplicação, com tensão, carga e autonomia a conferir.

**Fornecedores.** As lojas nas tabelas identificam as fontes consultadas, podendo incluir marketplace. Segundo o levantamento local informado pelo responsável, Romeu Eletrônica e Erick Info não tinham cabos Cat5 ou superiores, switches acima de 12 portas, servidores e racks disponíveis. Os modelos selecionados exigem Cat6, Gigabit/VLAN, PoE/SFP na distribuição e equipamentos profissionais identificados. Não há cotação local equivalente que permita afirmar vantagem de preço. Materiais de montagem comuns podem ser cotados localmente se atenderem à especificação.

## 5. Adequação técnica dos fornecedores

Conforme o levantamento local informado pelo responsável pelo projeto, **Romeu Eletrônica** e **Erick Info** não dispunham de cabos Cat5 ou superiores, ofereciam switches de até 12 portas e não tinham servidores e racks disponíveis.

A seleção dos fornecedores considera os seguintes requisitos:

- Cabeamento Cat6 com categoria, condutor de cobre e procedência comprovados para instalação fixa. Cat5e pode atender Gigabit, mas não substitui a especificação Cat6 adotada.
- Pelo menos 15 portas no telemarketing: 14 estações e um uplink. Nos demais pisos, a contagem deve ser avaliada junto a Gigabit e VLAN; na distribuição, são necessários SFP e PoE+.
- Servidores com configuração, memória ECC e garantia identificadas, além de racks no padrão 19 polegadas.
- Gateway Gigabit com VLAN, NAT e controle de acesso para separar visitantes da rede interna.

As fontes e os valores dos modelos selecionados constam na planilha. Não há cotação local de roteadores equivalentes para comparação direta de preço.
