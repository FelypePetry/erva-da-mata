/* =========================================================
   Erva da Mata — núcleo da loja (compartilhado pelas páginas)
   Troque aqui a conexão com o Supabase do cliente.
   ========================================================= */
window.LOJA = (() => {
  'use strict';
  const SUPABASE_URL = 'https://geywxzhacucbsslsrocp.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleXd4emhhY3VjYnNzbHNyb2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxODQ4ODgsImV4cCI6MjEwOTc2MDg4OH0._OoBK8gHfTXuUAaeo_0k8lbe0EjGkcXfd6kEtwNa0cQ';
  const CART_KEY = 'edm-cart';

  /* cores das embalagens (mesmas do site) */
  const LOOK = {
    'anis-10': ['#7a3b22', '#e8b46a'], 'anis-moido-12': ['#9a5a2e', '#f0c98a'], 'carqueja-15': ['#3f5a2a', '#c9d98c'],
    'mate-tostado-20': ['#5a3a1f', '#e2a65c'], 'anoitecer-20': ['#33305a', '#c7b8f0'], 'dr-cha': ['#1f4d3a', '#9fd3a8'],
    'laranja-canela': ['#c0642a', '#ffd29a'], 'chia-100': ['#4b4a40', '#e6e1cf'],
  };
  const look = id => LOOK[id] || ['#1d3b2b', '#b6c878'];

  const headers = (extra = {}) => ({ apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, ...extra });

  async function rest(path, opts = {}) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { ...opts, headers: headers(opts.headers) });
    if (!r.ok) throw new Error(`Erro ${r.status}`);
    return r.status === 204 ? null : r.json();
  }
  async function fn(name, body) {
    const r = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      method: 'POST', headers: headers({ 'Content-Type': 'application/json' }), body: JSON.stringify(body),
    });
    let j = {}; try { j = await r.json(); } catch (_) {}
    if (!r.ok || j.error) throw new Error(j.error || 'Não foi possível concluir agora. Tente de novo.');
    return j;
  }

  /* produtos e configurações públicas (com cache de 1 minuto na sessão) */
  async function cached(key, loader) {
    try { const c = JSON.parse(sessionStorage.getItem(key) || 'null'); if (c && Date.now() - c.t < 60000) return c.v; } catch (_) {}
    const v = await loader();
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v })); } catch (_) {}
    return v;
  }
  const products = () => cached('edm-products', () => rest('products?select=id,name,short_name,weight_label,price,compare_at_price,stock,active,sort&active=eq.true&order=sort'));
  const settings = () => cached('edm-settings', async () => Object.fromEntries((await rest('settings?select=key,value')).map(r => [r.key, r.value])));

  /* carrinho em localStorage: { id: quantidade } */
  function getCart() { try { const c = JSON.parse(localStorage.getItem(CART_KEY) || '{}'); return c && typeof c === 'object' ? c : {}; } catch (_) { return {}; } }
  function setCart(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (_) {} }
  const cartItems = () => Object.entries(getCart()).filter(([, q]) => q > 0).map(([id, qty]) => ({ id, qty }));

  const brl = v => Number(v || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const digits = s => String(s || '').replace(/\D/g, '');
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const STATUS = {
    aguardando_configuracao: { label: 'Pedido recebido', tone: 'warn', hint: 'A loja vai confirmar seu pedido e enviar a forma de pagamento.' },
    pendente: { label: 'Aguardando pagamento', tone: 'warn', hint: 'Assim que o pagamento for confirmado, a gente separa seu pedido.' },
    pago: { label: 'Pagamento aprovado', tone: 'ok', hint: 'Recebemos! Seu pedido já entrou na fila de separação.' },
    em_separacao: { label: 'Em separação', tone: 'ok', hint: 'Estamos embalando suas ervas com carinho.' },
    enviado: { label: 'Enviado', tone: 'ok', hint: 'Seu pedido está a caminho.' },
    entregue: { label: 'Entregue', tone: 'ok', hint: 'Bom mate! Conta pra gente o que achou.' },
    recusado: { label: 'Pagamento recusado', tone: 'bad', hint: 'O pagamento não foi aprovado. Você pode tentar de novo pelo botão abaixo.' },
    cancelado: { label: 'Cancelado', tone: 'bad', hint: 'Este pedido foi cancelado. Qualquer dúvida, chame a gente no WhatsApp.' },
  };

  return { SUPABASE_URL, SUPABASE_KEY, headers, rest, fn, products, settings, getCart, setCart, cartItems, brl, digits, esc, look, STATUS };
})();
