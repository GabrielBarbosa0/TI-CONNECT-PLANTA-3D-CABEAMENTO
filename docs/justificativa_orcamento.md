# Justificativa técnica do orçamento — TI Connect

**Revisão:** 01/10/2026.  
**Orçamento principal:** [orcamento_cabeamento_ti_connect.xlsx](referencias/orcamento_cabeamento_ti_connect.xlsx).

## 1. Dimensionamento

| Grupo | Valor |
| --- | ---: |
| Equipamentos | R$ 126.549,87 |
| Cabeamento | R$ 3.309,08 |
| Materiais de instalação | R$ 7.553,06 |
| **Total de materiais** | **R$ 137.412,01** |

Quatro pavimentos, quatro racks, quatro switches de acesso, quatro de distribuição, cinco APs, dois servidores e 31 estações cabeadas. São 36 pontos de rede para estações e APs; os servidores usam conexões locais. O dispositivo visitante utiliza Wi-Fi e não integra a compra de computadores.

O escopo compreende os materiais listados na planilha. Instalação, fusões, certificação, infraestrutura civil/elétrica, suportes adicionais, licenças, discos adicionais, backup externo e frete não integram o total. Preços e fontes estão registrados por item, com referência de 29/09 a 01/10/2026.

## 2. Equipamentos de rede e servidores

### Computadores de escritório

**31 conjuntos BluePC PRO, modelo CDBP-PRO142:** Core i3-12100F, 8 GB DDR4, SSD de 256 GB, gráficos GeForce, LAN Gigabit, monitor LED de 20 polegadas, teclado USB ABNT2 e mouse. A [cotação de R$ 2.669,00 por conjunto](https://www.kabum.com.br/produto/905602/computador-completo-bluepc-pro-intel-core-i3-12100f-12-geracao-8gb-ddr4-ssd-256gb-graficos-geforce-fonte-500w-windows-11-pro-monitor-led-20-) especifica Windows 11 Pro **trial**; a licença definitiva não integra o preço.

A configuração básica atende à proposta de navegação, documentos, CRM e atendimento com cargas leves. Para muitas aplicações simultâneas, máquinas virtuais ou ferramentas intensivas do suporte N3, dimensionar memória e armazenamento adicionais. O monitor incluído é LED de 20 polegadas com resolução anunciada de 1600 x 900. A divisão é de 1 estação no térreo, 6 no 1º, 14 no 2º e 10 no 3º andar.

### Servidor principal — SRV-01

Escolhido o **Lenovo ThinkSystem ST50 V3, SKU 7DF3S3DG00**, Xeon E-2414 de quatro núcleos, 16 GB de RAM, armazenamento anunciado de 2 TB, torre, sem sistema operacional e garantia anunciada de três anos. A [HD Store anuncia R$ 11.287,48 no Pix](https://www.hdstore.com.br/servidor-lenovo-thinksystem-st50-v3-xeon-e-2414-4c-26ghz-16gb-2tb-300w-3-anos-de-garantia). A plataforma utiliza memória ECC e permite expansão, conforme o [guia do fabricante](https://lenovopress.lenovo.com/lp1907-thinksystem-st50-v3-server); confirmar a configuração efetivamente entregue na cotação.

É uma opção profissional de entrada para serviços leves de arquivos, autenticação e aplicações administrativas. O número de salas orienta a rede, mas não comprova a capacidade do servidor: aplicações, usuários simultâneos e volume de dados precisam ser dimensionados. A configuração de 16 GB e 2 TB é destinada a serviços leves; virtualização intensa ou banco de dados pesado exigem dimensionamento adicional. Permanece na sala de servidores do 1º andar, fora do rack de parede, com ventilação e nobreak dedicado.

### Servidor de backup — BKP-01

Usa a mesma configuração para padronizar manutenção e peças, preservando uma máquina dedicada às cópias. Os 2 TB anunciados são capacidade bruta, e o anúncio não comprova quantidade de discos ou espelhamento. O espaço disponível deve acomodar os dados protegidos **mais a retenção das versões**; um servidor de 2 TB não garante backup completo de outro de 2 TB cheio. A quantidade de dados e a política de retenção não foram fornecidas. Se excederem essa capacidade, ampliar o armazenamento antes da implantação e recotar o total.

Discos adicionais, RAID, recuperação testada e cópia externa precisam de dimensionamento próprio; não estão implicitamente incluídos. Manter as duas máquinas na mesma sala permite backup local, mas não protege contra perda do local.

### Switches de acesso — adequação por piso

| Pavimento / sigla | Ligações no switch de acesso | Modelo | Portas usadas / total | Livres |
| --- | --- | --- | ---: | ---: |
| Térreo — SW-T-01 | 1 PC do estoque + uplink | TL-SG108E | 2 / 8 | 6 |
| 1º — SW-N3-01 | 6 PCs N3 + 2 servidores + uplink | TL-SG116E | 9 / 16 | 7 |
| 2º — SW-TMK-01 | 14 PCs de telemarketing + uplink | ES224G | 15 / 24 | 9 |
| 3º — SW-3-01 | 10 PCs dos setores + uplink | TL-SG116E | 11 / 16 | 5 |

Os APs conectam-se aos switches de distribuição PoE, portanto não consomem portas adicionais nos switches desta tabela. Os links de acesso são RJ45 Gigabit; a fibra continua na distribuição.

- **TL-SG108E:** oito portas Gigabit com VLAN 802.1Q, suficientes no térreo. [Ficha do fabricante](https://www.tp-link.com/us/business-networking/easy-smart-switch/tl-sg108e/v1/); [preço de R$ 332,38](https://www.kabum.com.br/produto/1049615/switch-tp-link-tl-sg108e-8-portas-10-100-1000-unmanaged-gigabit-ethernet-metal-montagem-em-rack-ideal-rede-profissional).
- **TL-SG116E:** dezesseis portas Gigabit, gerenciamento básico e VLAN 802.1Q. Atende 1º e 3º andares com reserva. [Documentação do fabricante](https://static.tp-link.com/2021/202102/20210205/TL-SG116E%28UN%291.2%26TL-SG108E%28UN%296.0%26TL-SG105E%28UN%295.0_Datasheet.pdf); [preço de R$ 412,74](https://www.kabum.com.br/produto/384130/switch-tp-link-16-portas-10-100-1000-mbps-tl-sg116e).
- **ES224G:** vinte e quatro portas Gigabit e VLAN 802.1Q, com nove portas de reserva no telemarketing. [Documentação oficial](https://www.omadanetworks.com/es/business-networking/omada-switch-agile/es224g/); [preço de R$ 999,99 na Waz](https://www.waz.com.br/switch-gerenciavel-24-portas-gigabit-tp-link-es224g-133595-html/p).

Os switches de acesso não têm PoE nem SFP e possuem gerenciamento básico. Os Easy Smart têm administração própria: não pressupor integração completa ao controlador Omada, ACLs avançadas ou VLAN exclusiva de gerenciamento. Manter visitantes fora desses switches de acesso, limitar a administração à rede confiável e aplicar isolamento no gateway e na distribuição. Atualizar firmware compatível com a revisão recebida e testar a separação antes de liberar a rede. O uplink de 1 Gb/s é compartilhado pelos usuários de cada andar; tráfego intenso simultâneo ou requisitos de telefonia IP exigem revisão.

### Gateway — FW-01

Escolhido o **TP-Link ER605, exigindo revisão V2**, a [R$ 459,99 no Pix na Pichau](https://www.pichau.com.br/roteador-tp-link-omada-vpn-multi-wan-gigabit-er605). O anúncio não garante a revisão: solicitar V2 expressamente ao fornecedor e reconfirmar o preço. A [ficha oficial V2](https://www.tp-link.com/br/business-networking/vpn-router/er605/v2/) informa portas Gigabit, VLAN 802.1Q, NAT, VPN e controles de acesso. É um gateway cabeado; o Wi-Fi continua nos EAP610.

Atende ao desenho de escritório com internet de até 1 Gb/s, rede corporativa e visitantes separados, com portas Gigabit e segmentação por VLAN. A taxa real depende de VPN, regras e tráfego; não se promete 1 Gb/s em todas as funções. Configurar bloqueio de visitantes para servidores, usuários e interfaces de administração, preservando somente os serviços necessários. Não foi orçado firewall de próxima geração com inspeção avançada.

## 3. Materiais e aplicação

As quantidades e fontes de preço de todos os materiais constam na planilha principal.

| Materiais | Aplicação técnica |
| --- | --- |
| 4 racks Intelbras MRD 1257, 12U | Um por pavimento; acomodam distribuição, acesso e terminações. As torres não são instaladas nesses gabinetes. |
| 4 SG2210MP de distribuição | Mantêm dois SFP por equipamento, VLAN e PoE+ dos APs; os pisos intermediários usam os dois SFP. Os switches de acesso usam uplink RJ45 Gigabit. |
| 4 APs corporativos + 1 de visitantes EAP610 | Cobrem as posições já propostas com alimentação padronizada PoE+. Cobertura e capacidade ainda exigem avaliação no prédio. |
| 31 BluePC PRO CDBP-PRO142, i3, 8 GB, SSD 256 GB | Conjuntos com monitor, teclado e mouse; estoque (1), N3 (6), telemarketing (14) e 3º andar (10). |
| 3 nobreaks de rede + 2 senoidais para servidores | Mantêm proteção elétrica; carga, tensão e autonomia dependem de conferência local. |
| 2 caixas Cat6 de 305 m + 2 rolos ópticos de 50 m | Preservam categoria e folga para as rotas do modelo; escala e metragem precisam de vistoria. |
| 4 patch panels, 36 keystones, 31 caixas de mesa e 5 caixas de teto | Correspondem às 31 estações e cinco APs. |
| 80 patch cords Cat6 | Mantêm ligações nas duas extremidades, servidores, interswitch, gateway e reserva. |
| 4 PDUs e 4 guias de cabos | Organizam alimentação e cabos por rack. |
| 4 DIOs, 6 SFPs e 6 cordões ópticos | Mantêm três enlaces ópticos duplex entre pavimentos adjacentes. |

## 4. Cabeamento e instalação

### Custos por pavimento

| Pavimento | Equipamentos | Cabeamento | Instalação | Total |
| --- | ---: | ---: | ---: | ---: |
| Térreo | R$ 7.739,22 | R$ 361,08 | R$ 1.453,45 | **R$ 9.553,75** |
| 1º andar | R$ 46.486,02 | R$ 683,68 | R$ 1.888,41 | **R$ 49.058,11** |
| 2º andar | R$ 41.793,94 | R$ 1.423,29 | R$ 2.310,67 | **R$ 45.527,90** |
| 3º andar | R$ 30.530,69 | R$ 841,03 | R$ 1.900,53 | **R$ 33.272,25** |
| **Total geral** | **R$ 126.549,87** | **R$ 3.309,08** | **R$ 7.553,06** | **R$ 137.412,01** |

Os equipamentos são atribuídos ao local de instalação. O Cat6 comprado é rateado em 34 / 116 / 304 / 156 m, aproximadamente conforme a proporção das rotas mínimas, incluindo reserva. A fibra é dividida financeiramente em 25 m por piso; esse rateio não representa comprimentos executivos. SFPs e cordões ópticos seguem as pontas dos enlaces (1 / 2 / 2 / 1 por piso); os patch cords são distribuídos em 8 / 18 / 31 / 23 unidades. O arredondamento do Cat6 é compensado no 3º andar para fechar com a compra geral.

Os nomes, modelos/referências, quantidades e custos de cada item aparecem na planilha e no [PDF de tabelas](referencias/orcamento_ti_connect_por_andar.pdf). Materiais cujo anúncio não publica SKU permanecem identificados por especificação técnica, com código do fabricante a confirmar no fornecimento.

A soma ortogonal mínima da planta é 395,4 unidades gráficas para os 36 pontos. Com escala de 1 unidade = 1 m e acréscimo de 20%, a estimativa é 474,5 m, atendida pelas duas caixas Cat6 de 305 m. Confirmar escala, subidas, descidas e rotas em vistoria. A fibra monomodo 6FO e a topologia linear são premissas do orçamento; os 100 m incluem percursos laterais entre shaft e racks. Validar comprimentos, fusões, perda óptica e necessidade de redundância.

Instalar distribuição, acesso, patch panel e DIO no rack do respectivo piso. Os símbolos de backbone próximos ao shaft indicam sua função; as rotas no modelo 3D são esquemáticas. Separar energia, cobre e fibra, respeitar raios de curvatura e identificar terminações. Conferir fixação, ventilação, aterramento, tensão e autonomia dos nobreaks.

## 5. Adequação técnica dos fornecedores

Conforme o levantamento local informado pelo responsável pelo projeto, **Romeu Eletrônica** e **Erick Info** não dispunham de cabos Cat5 ou superiores, ofereciam switches de até 12 portas e não tinham servidores e racks disponíveis.

A seleção dos fornecedores considera os seguintes requisitos:

- Cabeamento Cat6 com categoria, condutor de cobre e procedência comprovados para instalação fixa. Cat5e pode atender Gigabit, mas não substitui a especificação Cat6 adotada.
- Pelo menos 15 portas no telemarketing: 14 estações e um uplink. Nos demais pisos, a contagem deve ser avaliada junto a Gigabit e VLAN; na distribuição, são necessários SFP e PoE+.
- Servidores com configuração, memória ECC e garantia identificadas, além de racks no padrão 19 polegadas.
- Gateway Gigabit com VLAN, NAT e controle de acesso para separar visitantes da rede interna.

As fontes e os valores dos modelos selecionados constam na planilha. Não há cotação local de roteadores equivalentes para comparação direta de preço.
