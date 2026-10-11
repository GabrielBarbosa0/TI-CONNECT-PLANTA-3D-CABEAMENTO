# TI-CONNECT-PLANTA-3D-CABEAMENTO

Abra `index.html` por um servidor HTTP local para visualizar a planta 3D. Por exemplo: `python3 -m http.server 8765` e acesse `http://localhost:8765`.

## Documentos de referência

- [Projeto completo com orçamento (PDF)](docs/referencias/Projeto%20de%20Cabeamento%20Estruturado%20-%20Entrega%201%20-%20com%20orcamento.pdf): descrição e plantas originais, tabelas gerais e orçamento por pavimento em 23 páginas, com tabelas no formato do documento original.
- [Projeto de Cabeamento Estruturado - Entrega 1 (PDF)](docs/referencias/Projeto%20de%20Cabeamento%20Estruturado%20-%20Entrega%201%20%281%29.pdf): ambientes, distribuição dos equipamentos e quantidades da proposta original.
- [Orçamento principal (XLSX)](docs/referencias/orcamento_cabeamento_ti_connect.xlsx): orçamento geral, resumo e tabelas por pavimento, total de R$ 59.973,03, sem compra de computadores, incluindo materiais estimados de montagem.
- [Orçamento em tabelas (PDF)](docs/referencias/orcamento_ti_connect_por_andar.pdf): resumo, orçamento geral e detalhamento de cada andar, com lojas por item e decisões técnicas.
- [Justificativa técnica](docs/justificativa_orcamento.md): dimensionamento, portas, cabeamento, instalação e adequação dos fornecedores.
- [Orçamento anterior — histórico (XLSX)](docs/referencias/historico/orcamento_anterior_ti_connect.xlsx).

As rotas no modelo são esquemáticas. O orçamento trata o tipo e a topologia do backbone óptico como hipóteses; a planta não deve ser usada como desenho executivo de instalação ou lista final de compras.

## Correspondência da planta com o orçamento

O modelo usa o orçamento principal: 31 tomadas RJ45 Cat6 (1 / 6 / 14 / 10 por pavimento), cinco EAP610, quatro racks MRD 1257, quatro switches de acesso (TL-SG108E / TL-SG116E / ES224G / TL-SG116E), quatro TL-SG2210MP de distribuição, um ER605 V2, dois servidores Lenovo ST50 V3 e cinco nobreaks. Os switches e gateway ficam nos racks; os servidores e nobreaks ficam fora. Cada terminal tem seu enlace ao switch de acesso; os APs ligam-se à distribuição PoE. Não há computadores comprados ou enlace cabeado de visitante na planta.

Patch panel, DIO, guia, PDU e bandeja são representados dentro dos racks. Os SFP seguem 1 / 2 / 2 / 1 por piso. Canaletas indicam caminhos compartilhados; dimensões e percursos são esquemáticos e não comprovam as metragens estimadas. Fixadores, velcro, etiquetas e demais materiais aparecem no detalhamento do painel, sem desenhar cada unidade.

Após atualizar a planilha e salvar os valores calculados, execute `python3 scripts/sync-model-budget.py` (requer openpyxl) para atualizar o catálogo e os valores por andar em `budget-data.mjs`. Alterações de quantidade, topologia ou posição também precisam ser refletidas em `model-data.mjs`; a conferência de equipamentos e enlaces pode ser executada com `node --test tests/*.test.mjs`.
