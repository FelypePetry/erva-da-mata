# Loja virtual — Erva da Mata

Estrutura pronta: o cliente escolhe os produtos, calcula o frete pelo CEP, paga no Pix (10% off) ou no cartão, e acompanha o pedido. A loja gerencia tudo num painel.

## Páginas

| Página | O que faz |
|---|---|
| `index.html` | Site. Preços, promoções e estoque vêm do banco (o painel altera na hora). Carrinho → "Finalizar compra". WhatsApp continua como opção. |
| `checkout.html` | Dados + CPF (validado), CEP com endereço automático, opções de frete, Pix/cartão, resumo. |
| `pedido.html?id=…&t=…` | Acompanhamento do pedido (status, linha do tempo, rastreio, botão de pagar de novo). Link secreto por pedido. |
| `admin.html` | Painel: pedidos (filtros, busca, faturamento do mês, status, rastreio, WhatsApp do cliente), produtos (preço, preço "de", estoque, ativo) e configurações (desconto Pix, parcelas, frete grátis, tabela de frete, retirada, WhatsApp). |

## Back-end (Supabase · projeto `geywxzhacucbsslsrocp`)

- Tabelas: `products`, `orders`, `order_items`, `settings`, `categories`, `admins` — todas com RLS.
- Funções: `frete` (cotação), `checkout` (cria o pedido com preços do banco e gera o pagamento), `mp-webhook` (recebe a confirmação do Mercado Pago, confere o valor e baixa o estoque).
- Sem as chaves abaixo, a loja funciona em **modo demonstração**: o pedido é registrado com status "Pedido recebido" e o frete usa a tabela por estado do painel.

## Para ligar de verdade (dados do cliente)

No Supabase: **Edge Functions → Secrets**.

**Mercado Pago** (conta do cliente → Suas integrações → Credenciais de produção)
- `MP_ACCESS_TOKEN` = Access Token de produção (`APP_USR-…`)
- `MP_WEBHOOK_SECRET` = assinatura secreta do webhook (Suas integrações → Webhooks). URL do webhook: `https://geywxzhacucbsslsrocp.supabase.co/functions/v1/mp-webhook`, evento **Pagamentos**
- Teste: use as credenciais de teste e `MP_SANDBOX=true`

**Melhor Envio** (melhorenvio.com.br → Integrações → Permissões de acesso → Gerar token com escopo `shipping-calculate`)
- `ME_TOKEN` = token gerado
- `ME_USER_AGENT` = `Erva da Mata (email-tecnico@dominio)`
- Teste: `ME_SANDBOX=true` com token do sandbox

**Site**
- `SITE_URL` = endereço final da loja (ex.: `https://ervadamata.com.br`). Sem ele, usa o link do GitHub Pages.

## Painel administrativo

1. Abra `admin.html` → **Criar acesso** com `digmayer81@gmail.com` (está na lista de administradores). Confirme o e-mail se pedido.
2. Para dar acesso ao cliente: inclua o e-mail dele em `settings.admin_emails` **antes** de ele criar a conta.

## Antes de entregar

- Trocar o WhatsApp (`555533160098` é fixo) no painel → Configurações e em `index.html` (`const WHATSAPP`).
- Trocar `noindex` por `index, follow` no `index.html` quando estiver no domínio do cliente.
- Revisar a tabela de frete reserva e o peso dos produtos (`weight_grams`).
- Apagar o pedido de teste #1001 ("Teste Kodda").
