# Erva da Mata — DESIGN.md

Direção: **mata noturna + papel de erva**. Marca artesanal do interior gaúcho, premium mas acolhedora.
Escuro (verde-mata) nas seções de imersão; papel claro nas seções de leitura e compra.
*Direção baseada em 5 marcas reais de chá/mate analisadas no navegador (ver Tipografia); UXKIN não conectado.*

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

## Tipografia — fontes próprias em `assets/fonts` (licença OFL, sem depender de conta)
Pesquisa em sites reais do segmento (fontes lidas no navegador): Bellocq (Baskerville URW + Sweet Sans em caixa-alta espaçada), Rishi (Ivy Presto Headline fina + Neue Haas Grotesk), Paper & Tea (Queens + Suisse Intl), Yerba Madre (serifa própria + Cerco), Kusmi (fonte própria + Barlow).
Padrão comum: **uma serifa de alto contraste nos títulos + uma sans neutra na interface**, e etiquetas em caixa-alta com bastante espaçamento.
- Escolha final (entre 7 opções testadas com o conteúdo real): **Schibsted Grotesk** em tudo — títulos 700 com espaçamento -0,04em, h3 600, texto 400/500, botões 600.
- Ênfase: nada de itálico; a palavra de destaque fica em verde-claro só nas seções escuras (abertura, laboratório, contato).
- Etiquetas: Schibsted 600, 11,5px, caixa-alta, espaçamento 0,1em, sem traço antes.
- Fallback: system-ui.

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
