# Erva da Mata — DESIGN.md

Direção: **mata noturna + papel de erva**. Marca artesanal do interior gaúcho, premium mas acolhedora.
Escuro (verde-mata) nas seções de imersão; papel claro nas seções de leitura e compra.
*Direção definida sem a base UXKIN (não conectada): baseada na marca atual, no nicho (chás/chimarrão) e nas regras do skill.*

## Cor (CSS variables em `:root`)
| Token | Valor | Papel |
|---|---|---|
| `--mata` | #0d1d15 | fundo das seções escuras, texto de botão sobre ouro |
| `--mata2` / `--mata3` | #13291e / #1d3b2b | superfícies sobre o escuro |
| `--papel` / `--creme` / `--linho` | #faf5ea / #f3ebd8 / #efe6d0 | fundos claros, cards, chips |
| `--ink` | #14211a | texto principal no claro |
| `--muted` | #5f6b62 | texto secundário |
| `--ouro` | #d9a050 | **primária**: botões principais, foco, destaques |
| `--erva` / `--erva2` | #7f9c45 / #b6c878 | acento: eyebrows, itálicos, preço Pix |
| `--terra` | #b0582c | descontos e remover |
| WhatsApp | #25d366 | só nos botões de WhatsApp |

## Tipografia — Adobe Fonts, kit `uhv4vyt`
- Títulos: **Kepler Std Display** (Robert Slimbach, Adobe Originals) — 300 nos títulos grandes, 400 nos médios, itálico 300/400 para a palavra de ênfase.
- Texto e UI: **Acumin Pro** (Robert Slimbach) — 400 corpo, 500/600 UI, 700 botões e labels.
- Escala: 12 (eyebrow, caps 0.18em) · 14 · 16 (corpo) · 19 (lead) · 22–30 (h3) · 30–54 (h-md) · 38–84 (h-lg) · 46–128 (h-xl).
- Fallback: Georgia / system-ui.

## Espaço e forma
- Base 4px; seções `clamp(90px, 11vw, 150px)`; conteúdo até 1240px; `--pad` lateral `clamp(20px, 5vw, 64px)`.
- Raio: 14 (pequeno), 24 (cards), 999 (botões/chips), arco 999/26 nas fotos-moldura.
- Sombras: uma longa e suave para cards (`0 30px 60px -40px`) e uma para elementos flutuantes.

## Componentes
Botões: primário (ouro), fantasma (borda creme), escuro, WhatsApp — hover com preenchimento que sobe, foco com contorno ouro.
Cards de produto com embalagem ilustrada, chips de ingrediente, barras de sabor, drawer de carrinho, modal de produto.

## Imagem
- Fotos de ambiente geradas sob medida (assets/img, WebP): luz baixa, fundo verde-mata, madeira rústica, dourado quente.
- Produtos: sempre as fotos reais da loja (modal) ou a embalagem ilustrada — nunca embalagem inventada em foto.
- Ícones: traço 1.8px, cantos arredondados, desenhados no próprio SVG.
