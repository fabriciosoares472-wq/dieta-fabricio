import { useState } from "react";

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=Barlow:wght@400;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }

  :root {
    --fire: #FF6B1A;
    --amber: #F5A623;
    --green: #3DD68C;
    --dark: #0a0a0a;
    --card: #111111;
    --border: #222222;
    --text: #E8E0D0;
    --muted: #666;
    --red: #E03E3E;
  }

  .app {
    min-height: 100vh;
    background: var(--dark);
    color: var(--text);
    font-family: 'Barlow', sans-serif;
    padding: 0;
  }

  .header {
    background: linear-gradient(135deg, #0a0a0a 0%, #141414 100%);
    border-bottom: 2px solid var(--fire);
    padding: 20px 28px 16px;
    position: relative;
    overflow: hidden;
  }

  .header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 40px,
      rgba(255,107,26,0.03) 40px,
      rgba(255,107,26,0.03) 41px
    );
    pointer-events: none;
  }

  .header-top {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 8px;
  }

  .badge {
    background: var(--fire);
    color: #000;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    padding: 3px 8px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .header h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    color: var(--text);
    letter-spacing: 3px;
    line-height: 1;
  }

  .header h1 span { color: var(--fire); }

  .header-meta {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .meta-item {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 1px;
  }

  .meta-item span { color: var(--amber); font-weight: 600; }

  .tabs {
    display: flex;
    gap: 0;
    padding: 0 28px;
    background: #0d0d0d;
    border-bottom: 1px solid var(--border);
    overflow-x: auto;
  }

  .tab {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 14px 20px;
    cursor: pointer;
    color: var(--muted);
    border: none;
    background: transparent;
    border-bottom: 3px solid transparent;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .tab:hover { color: var(--amber); }
  .tab.active { color: var(--fire); border-bottom-color: var(--fire); }

  .content { padding: 24px 28px; }

  /* ---- SHOPPING LIST ---- */
  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 3px;
    color: var(--text);
  }

  .total-badge {
    margin-left: auto;
    background: #1a1a1a;
    border: 1px solid var(--green);
    color: var(--green);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .category-card {
    background: var(--card);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .category-card-header {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
  }

  .cat-icon { font-size: 18px; }

  .cat-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
  }

  .cat-total {
    margin-left: auto;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--amber);
  }

  .item-row {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #181818;
    gap: 8px;
    transition: background 0.15s;
    cursor: pointer;
  }

  .item-row:last-child { border-bottom: none; }
  .item-row:hover { background: #181818; }
  .item-row.checked { opacity: 0.4; }
  .item-row.checked .item-name { text-decoration: line-through; }

  .check-box {
    width: 14px; height: 14px;
    border: 1px solid var(--border);
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; color: var(--green);
    transition: all 0.15s;
  }

  .item-row.checked .check-box {
    background: rgba(61,214,140,0.15);
    border-color: var(--green);
  }

  .item-name { font-size: 13px; font-weight: 600; flex: 1; }
  .item-qty { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); }
  .item-price { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--amber); min-width: 50px; text-align: right; }

  .note-already-have {
    font-size: 10px;
    color: var(--green);
    font-family: 'IBM Plex Mono', monospace;
    padding: 4px 16px 8px;
    letter-spacing: 1px;
  }

  /* ---- RECIPES ---- */
  .bases-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }

  .base-card {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 16px;
  }

  .base-card h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    letter-spacing: 2px;
    color: var(--fire);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
  }

  .base-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid #181818;
    font-size: 13px;
  }

  .base-item:last-child { border: none; }

  .base-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: var(--fire);
    background: rgba(255,107,26,0.12);
    padding: 1px 5px;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .base-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }

  .recipe-card {
    background: var(--card);
    border: 1px solid var(--border);
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .recipe-card:hover { border-color: var(--fire); }
  .recipe-card.open { border-color: var(--amber); }

  .recipe-header {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--border);
  }

  .recipe-icon { font-size: 20px; }

  .recipe-title {
    font-weight: 700;
    font-size: 14px;
    flex: 1;
  }

  .macro-pills { display: flex; gap: 4px; flex-wrap: wrap; margin-top: 4px; }

  .pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 2px 6px;
    border-radius: 0;
  }

  .pill-p { background: rgba(61,214,140,0.15); color: var(--green); border: 1px solid rgba(61,214,140,0.3); }
  .pill-c { background: rgba(245,166,35,0.15); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
  .pill-k { background: rgba(255,107,26,0.15); color: var(--fire); border: 1px solid rgba(255,107,26,0.3); }
  .pill-t { background: rgba(200,150,255,0.12); color: #b794f4; border: 1px solid rgba(200,150,255,0.2); }

  .recipe-arrow {
    font-size: 12px;
    color: var(--muted);
    transition: transform 0.2s;
  }

  .recipe-card.open .recipe-arrow { transform: rotate(90deg); color: var(--amber); }

  .recipe-body {
    padding: 12px 16px;
    font-size: 12px;
    line-height: 1.7;
    color: #bbb;
    border-top: 1px solid #1a1a1a;
  }

  .recipe-step { display: flex; gap: 8px; margin-bottom: 6px; }
  .step-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    color: var(--fire);
    background: rgba(255,107,26,0.1);
    padding: 2px 5px;
    height: fit-content;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .perms-section { margin-top: 10px; padding-top: 10px; border-top: 1px dashed var(--border); }
  .perms-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .perm-tag {
    display: inline-block;
    background: #1a1a1a;
    border: 1px solid var(--border);
    font-size: 10px;
    padding: 2px 8px;
    margin: 2px;
    color: var(--text);
    font-family: 'IBM Plex Mono', monospace;
  }

  /* ---- PERMUTATION TABLE ---- */
  .matrix-wrap { overflow-x: auto; }

  .matrix-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    font-family: 'IBM Plex Mono', monospace;
    min-width: 500px;
  }

  .matrix-table th {
    background: #111;
    color: var(--fire);
    padding: 8px 10px;
    text-align: left;
    border: 1px solid var(--border);
    font-size: 10px;
    letter-spacing: 1px;
    font-weight: 600;
    white-space: nowrap;
  }

  .matrix-table td {
    padding: 7px 10px;
    border: 1px solid #191919;
    color: #bbb;
    vertical-align: top;
  }

  .matrix-table tr:nth-child(even) td { background: #111; }
  .matrix-table tr:hover td { background: #161616; }

  .dot-yes { color: var(--green); font-size: 14px; }
  .dot-opt { color: var(--amber); font-size: 11px; }
  .dot-no { color: #333; font-size: 14px; }

  .combo-name { color: var(--text); font-weight: 600; font-size: 12px; }
  .combo-cal { color: var(--fire); }

  /* ---- BUDGET BAR ---- */
  .budget-section {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 16px;
    margin-bottom: 20px;
  }

  .budget-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .budget-bar-wrap { background: #1a1a1a; height: 8px; border: 1px solid var(--border); }

  .budget-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--green) 0%, var(--amber) 60%, var(--fire) 100%);
    transition: width 1s ease;
  }

  .budget-numbers {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
  }

  .budget-spent { color: var(--amber); }
  .budget-remain { color: var(--green); }
  .budget-total { color: var(--muted); }

  @media (max-width: 600px) {
    .content { padding: 16px; }
    .categories-grid { grid-template-columns: 1fr; }
    .bases-grid { grid-template-columns: 1fr; }
    .tabs { padding: 0 16px; }
    .header { padding: 16px; }
  }
`;

const shopping = [
  {
    cat: "PROTEÍNAS — CARNE & AVE",
    icon: "🥩",
    color: "#E03E3E",
    items: [
      { name: "Coxa/Sobrecoxa s/ osso congelada", qty: "4 kg", price: 52 },
      { name: "Peito de frango filé", qty: "3 kg", price: 66 },
      { name: "Acém / músculo bovino", qty: "2 kg", price: 42 },
      { name: "Carne moída (patinho)", qty: "2 kg", price: 52 },
    ],
  },
  {
    cat: "PROTEÍNAS — LATA & LATICÍNIOS",
    icon: "🐟",
    color: "#4EA8DE",
    items: [
      { name: "Sardinha em lata (óleo)", qty: "12 un", price: 42 },
      { name: "Atum em lata (água)", qty: "8 un", price: 36 },
      { name: "Ovos brancos", qty: "30 un", price: 27 },
      { name: "Queijo muçarela fatiado", qty: "500 g", price: 20 },
      { name: "Queijo prato fatiado", qty: "500 g", price: 22 },
      { name: "Cottage proteico", qty: "400 g x 2", price: 36 },
      { name: "Requeijão cremoso", qty: "400 g", price: 13 },
    ],
  },
  {
    cat: "SUPLEMENTOS",
    icon: "💪",
    color: "#3DD68C",
    items: [
      { name: "Whey Protein", qty: "2 meses stock", price: 0, skip: true },
      { name: "Creatina", qty: "2 meses stock", price: 0, skip: true },
    ],
  },
  {
    cat: "CARBOIDRATOS & ENERGIA",
    icon: "⚡",
    color: "#F5A623",
    items: [
      { name: "Arroz branco tipo 1", qty: "5 kg", price: 22 },
      { name: "Flocão de milho (cuscuz)", qty: "2 kg", price: 18 },
      { name: "Aveia em flocos grossos", qty: "1 kg", price: 14 },
      { name: "Pão de forma integral", qty: "2 pac", price: 17 },
      { name: "Batata doce", qty: "3 kg", price: 21 },
      { name: "Macarrão espaguete", qty: "2 kg", price: 14 },
      { name: "Farinha de mandioca torrada", qty: "1 kg", price: 9 },
    ],
  },
  {
    cat: "GORDURAS & HIPERCALÓRICOS",
    icon: "🔥",
    color: "#FF6B1A",
    items: [
      { name: "Azeite de oliva extra-virgem", qty: "500 ml", price: 28 },
      { name: "Manteiga com sal", qty: "200 g", price: 12 },
      { name: "Pasta de amendoim integral", qty: "500 g", price: 22 },
      { name: "Amendoim torrado s/ sal", qty: "500 g", price: 11 },
      { name: "Mel puro", qty: "500 g", price: 22 },
      { name: "Coco ralado sem açúcar", qty: "200 g", price: 8 },
    ],
  },
  {
    cat: "LATICÍNIOS LÍQUIDOS",
    icon: "🥛",
    color: "#E8E0D0",
    items: [
      { name: "Leite integral (caixa)", qty: "6 L", price: 36 },
      { name: "Iogurte grego integral", qty: "4 un", price: 28 },
    ],
  },
  {
    cat: "VEGETAIS & AROMÁTICOS",
    icon: "🧄",
    color: "#3DD68C",
    items: [
      { name: "Alho descascado", qty: "500 g", price: 15 },
      { name: "Cebola", qty: "2 kg", price: 10 },
      { name: "Tomate", qty: "2 kg", price: 13 },
      { name: "Banana prata", qty: "~8 kg (mês)", price: 24 },
      { name: "Cheiro verde (maços)", qty: "3 un", price: 9 },
    ],
  },
  {
    cat: "TEMPEROS & CALDOS",
    icon: "🧂",
    color: "#b794f4",
    items: [
      { name: "Sal grosso + sal refinado", qty: "2 kg", price: 7 },
      { name: "Pimenta do reino moída", qty: "100 g", price: 8 },
      { name: "Páprica defumada + cominho", qty: "kit", price: 12 },
      { name: "Caldo Knorr carne + frango", qty: "2 cxs", price: 12 },
      { name: "Shoyu / molho inglês", qty: "300 ml", price: 8 },
    ],
  },
];

const totalSpend = shopping.reduce(
  (acc, cat) => acc + cat.items.reduce((a, i) => a + (i.skip ? 0 : i.price), 0),
  0
);

const recipes = [
  {
    icon: "🍗",
    title: "Frango Desfiado Tático",
    cat: "BASE MASTER",
    macros: { P: "42g", C: "0g", kcal: "260" },
    testo: true,
    steps: [
      "Frango (coxa/peito) + alho + sal + pimenta na panela de pressão — 25 min.",
      "Desfiar com garfo enquanto quente. Guardar até 5 dias na geladeira.",
      "Rendimento: ~1,5kg de proteína pronta para qualquer base.",
    ],
    perms: [
      "Sanduíche quente",
      "Cuscuz recheado",
      "Farofa de frango",
      "Arroz de frango",
      "Omelete de frango",
    ],
  },
  {
    icon: "🥩",
    title: "Músculo/Acém Desfiado",
    cat: "BASE MASTER",
    macros: { P: "38g", C: "0g", kcal: "280" },
    testo: true,
    steps: [
      "Acém + alho + cebola + caldo na pressão — 40 min.",
      "Desfiar e guardar no próprio caldo para não ressecar.",
      "Rico em zinco e ferro — direto no eixo testosterona.",
    ],
    perms: [
      "Farofa de carne",
      "Macarrão ao sugo de carne",
      "Sanduíche de carne",
      "Arroz carreteiro",
    ],
  },
  {
    icon: "🐟",
    title: "Pasta Proteica de Sardinha",
    cat: "RÁPIDO",
    macros: { P: "28g", C: "2g", kcal: "220" },
    testo: true,
    steps: [
      "1 lata sardinha + 2 col cottage + alho picado + limão + pimenta.",
      "Misturar e usar como spread no pão ou base para cuscuz.",
      "Omega-3 alto — suporte hormonal direto.",
    ],
    perms: [
      "Sanduíche de sardinha",
      "Cuscuz de sardinha",
      "Torrada proteica",
      "Omelete de sardinha",
    ],
  },
  {
    icon: "⚡",
    title: "Cuscuz Hipercalórico",
    cat: "HIPERCAL",
    macros: { P: "35g", C: "55g", kcal: "520" },
    testo: false,
    steps: [
      "1 xíc flocão + água quente fervente (proporção 1:1,2) + pitada sal. Tampa 3 min.",
      "Abrir e soltar com garfo. Adicionar proteína base (frango/carne/sardinha).",
      "Finalizar com queijo derretido + azeite + cheiro verde.",
    ],
    perms: [
      "Cuscuz de frango",
      "Cuscuz de carne moída",
      "Cuscuz de sardinha",
      "Cuscuz de ovo caipira",
      "Cuscuz shake (whey+leite+mel)",
    ],
  },
  {
    icon: "🥚",
    title: "Farofa Proteica com Ovos",
    cat: "CLÁSSICO",
    macros: { P: "24g", C: "28g", kcal: "380" },
    testo: true,
    steps: [
      "Frigideira quente + manteiga + alho. Fritar 2min.",
      "Adicionar proteína base desfiada (frango/carne/sardinha). 3 min.",
      "Quebrar 2 ovos direto, mexer rápido. Adicionar farinha aos poucos até firmar.",
    ],
    perms: [
      "Farofa de frango + ovo",
      "Farofa de carne + queijo",
      "Farofa de sardinha",
      "Farofa de atum + coco",
    ],
  },
  {
    icon: "🥪",
    title: "Sanduíche Grelhado Duplo Queijo",
    cat: "SANDUÍCHE",
    macros: { P: "38g", C: "32g", kcal: "480" },
    testo: false,
    steps: [
      "Pão de forma + proteína base + fatia de queijo muçarela + queijo prato.",
      "Sanduicheira/grill com manteiga nas bordas — 4 min até dourar.",
      "Opcional: requeijão dentro, ovo mexido por cima.",
    ],
    perms: [
      "Grelhado de frango + 2 queijos",
      "Grelhado de atum + cottage",
      "Grelhado de carne + muçarela",
      "Grelhado de sardinha + prato",
    ],
  },
  {
    icon: "💥",
    title: "Shake Massa Extremo",
    cat: "SHAKE",
    macros: { P: "52g", C: "70g", kcal: "760" },
    testo: false,
    steps: [
      "Liquidificador: 400ml leite integral + 2 doses Whey + 1 banana.",
      "Adicionar 3 col aveia + 2 col pasta amendoim + 1 col mel.",
      "Bater 30s. Tomar imediatamente — janela anabólica.",
    ],
    perms: [
      "Shake pré-treino (sem aveia)",
      "Shake cuscuz (flocão + leite + whey)",
      "Shake cottage (cottage + mel + whey)",
      "Shake noturno (leite + whey + pasta amendoim)",
    ],
  },
  {
    icon: "🍳",
    title: "Omelete Proteico no Grill",
    cat: "RÁPIDO",
    macros: { P: "32g", C: "4g", kcal: "340" },
    testo: true,
    steps: [
      "3 ovos batidos + sal + pimenta. Fritar na frigideira antiaderente com azeite.",
      "Recheio: frango desfiado + queijo ou sardinha + tomate.",
      "Dobrar e finalizar com requeijão por cima.",
    ],
    perms: [
      "Omelete de frango + queijo",
      "Omelete de sardinha + tomate",
      "Omelete de atum + cottage",
      "Omelete de carne moída",
    ],
  },
  {
    icon: "🍚",
    title: "Arroz Carreteiro Tático",
    cat: "PRATO COMPLETO",
    macros: { P: "44g", C: "60g", kcal: "620" },
    testo: true,
    steps: [
      "Frigideira: alho + cebola + carne desfiada. Refogar 4 min com shoyu.",
      "Adicionar 2 xícaras arroz cozido. Misturar em fogo alto.",
      "Ovo mexido por cima + cheiro verde + pimenta do reino.",
    ],
    perms: [
      "Carreteiro de músculo",
      "Carreteiro de frango",
      "Carreteiro de atum",
      "Versão com batata doce",
    ],
  },
  {
    icon: "🥔",
    title: "Batata Doce + Proteína",
    cat: "PRÉ/PÓS TREINO",
    macros: { P: "36g", C: "48g", kcal: "480" },
    testo: true,
    steps: [
      "Batata doce na pressão por 10 min (inteira com casca).",
      "Servir com 200g de frango grelhado ou 2 ovos cozidos.",
      "Azeite + sal grosso por cima. Simples. Eficiente.",
    ],
    perms: [
      "Batata doce + frango grelhado",
      "Batata doce + ovo cozido",
      "Batata doce + atum + azeite",
      "Batata doce amassada + cottage",
    ],
  },
];

const permMatrix = [
  {
    combo: "Frango + Cuscuz + Queijo",
    P: true,
    C: true,
    carb: true,
    grill: false,
    press: true,
    kcal: "~540",
  },
  {
    combo: "Carne Moída + Arroz + Farofa",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~620",
  },
  {
    combo: "Sardinha + Pão + Cottage",
    P: true,
    C: false,
    carb: true,
    grill: true,
    press: false,
    kcal: "~440",
  },
  {
    combo: "Atum + Macarrão + Azeite",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~560",
  },
  {
    combo: "Ovo + Farofa + Frango",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~480",
  },
  {
    combo: "Whey + Aveia + Banana + Pasta Amend",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~760",
  },
  {
    combo: "Músculo + Batata Doce + Azeite",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: true,
    kcal: "~580",
  },
  {
    combo: "Queijo + Ovo + Pão Grelhado",
    P: true,
    C: false,
    carb: true,
    grill: true,
    press: false,
    kcal: "~420",
  },
  {
    combo: "Frango + Cuscuz Shake (Whey+Leite)",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~820",
  },
  {
    combo: "Sardinha + Arroz + Ovo Cozido",
    P: true,
    C: false,
    carb: true,
    grill: false,
    press: false,
    kcal: "~510",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("shopping");
  const [openRecipe, setOpenRecipe] = useState(null);
  const [checked, setChecked] = useState({});

  const toggleCheck = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const spendPct = Math.min((totalSpend / 960) * 100, 100);

  return (
    <>
      <style>{fontStyle}</style>
      <div className="app">
        <div className="header">
          <div className="header-top">
            <div className="badge">J.A.R.V.I.S. PROTOCOL</div>
          </div>
          <h1>
            OPERATION: <span>MASS & TESTOSTERONE</span>
          </h1>
          <div className="header-meta">
            <div className="meta-item">
              BUDGET <span>R$960/MÊS</span>
            </div>
            <div className="meta-item">
              LOCAL <span>ASSAÍ ATACADISTA</span>
            </div>
            <div className="meta-item">
              SUPLEMENTOS <span>STOCK 2 MESES ✓</span>
            </div>
            <div className="meta-item">
              EQUIPAMENTOS{" "}
              <span>LIQUIDIFICADOR · GRILL · PRESSÃO · FRIGIDEIRA</span>
            </div>
          </div>
        </div>

        <div className="tabs">
          {[
            { id: "shopping", label: "LISTA DE COMPRAS" },
            { id: "recipes", label: "RECEITAS" },
            { id: "matrix", label: "TABELA DE PERMUTAÇÕES" },
          ].map((t) => (
            <button
              key={t.id}
              className={`tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="content">
          {activeTab === "shopping" && (
            <>
              <div className="budget-section">
                <div className="budget-label">STATUS DO ORÇAMENTO</div>
                <div className="budget-bar-wrap">
                  <div
                    className="budget-bar"
                    style={{ width: `${spendPct}%` }}
                  />
                </div>
                <div className="budget-numbers">
                  <span className="budget-spent">
                    Estimado: R${totalSpend.toFixed(0)}
                  </span>
                  <span className="budget-remain">
                    Saldo: R${(960 - totalSpend).toFixed(0)} livre
                  </span>
                  <span className="budget-total">Limite: R$960</span>
                </div>
              </div>

              <div className="section-header">
                <div className="section-title">LISTA DE COMPRAS — MENSAL</div>
                <div className="total-badge">
                  R$ {totalSpend.toFixed(0)} EST.
                </div>
              </div>

              <div className="categories-grid">
                {shopping.map((cat, ci) => {
                  const catTotal = cat.items.reduce(
                    (a, i) => a + (i.skip ? 0 : i.price),
                    0
                  );
                  return (
                    <div className="category-card" key={ci}>
                      <div
                        className="category-card-header"
                        style={{ borderLeft: `3px solid ${cat.color}` }}
                      >
                        <span className="cat-icon">{cat.icon}</span>
                        <span className="cat-name" style={{ color: cat.color }}>
                          {cat.cat}
                        </span>
                        {catTotal > 0 && (
                          <span className="cat-total">R${catTotal}</span>
                        )}
                      </div>
                      {cat.items.map((item, ii) => {
                        const key = `${ci}-${ii}`;
                        const done = !!checked[key];
                        if (item.skip)
                          return (
                            <div className="note-already-have" key={ii}>
                              ✓ {item.name} — JÁ NO ESTOQUE
                            </div>
                          );
                        return (
                          <div
                            key={ii}
                            className={`item-row ${done ? "checked" : ""}`}
                            onClick={() => toggleCheck(ci, ii)}
                          >
                            <div className="check-box">{done ? "✓" : ""}</div>
                            <div>
                              <div className="item-name">{item.name}</div>
                            </div>
                            <div className="item-qty">{item.qty}</div>
                            <div className="item-price">R${item.price}</div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === "recipes" && (
            <>
              <div className="bases-grid">
                <div className="base-card">
                  <h3>⚙️ PROTEÍNAS BASE</h3>
                  {[
                    ["P1", "Frango Desfiado", "pressão 25min — base universal"],
                    [
                      "P2",
                      "Músculo/Acém Desfiado",
                      "pressão 40min — ferro+zinco",
                    ],
                    [
                      "P3",
                      "Carne Moída Temperada",
                      "frigideira 8min — versátil",
                    ],
                    ["P4", "Sardinha/Atum Pasta", "3min — omega-3 hormonal"],
                    [
                      "P5",
                      "Ovos (mexido/cozido)",
                      "5min — testosterona direta",
                    ],
                  ].map(([n, t, d]) => (
                    <div className="base-item" key={n}>
                      <div className="base-num">{n}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div>
                        <div className="base-desc">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="base-card">
                  <h3>⚡ CARBOIDRATOS BASE</h3>
                  {[
                    ["C1", "Cuscuz Hidratado", "água fervente 3min — hipercal"],
                    ["C2", "Arroz Branco", "panela de arroz — 30min"],
                    [
                      "C3",
                      "Batata Doce Cozida",
                      "pressão 10min — índice glicêmico baixo",
                    ],
                    [
                      "C4",
                      "Aveia Instantânea",
                      "liquidificador — shake hipercal",
                    ],
                    ["C5", "Pão de Forma Integral", "sanduicheira — 4min"],
                  ].map(([n, t, d]) => (
                    <div className="base-item" key={n}>
                      <div
                        className="base-num"
                        style={{
                          background: "rgba(245,166,35,0.12)",
                          color: "#F5A623",
                        }}
                      >
                        {n}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{t}</div>
                        <div className="base-desc">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-header">
                <div className="section-title">RECEITAS & PERMUTAÇÕES</div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "var(--muted)",
                  }}
                >
                  CLIQUE PARA EXPANDIR
                </div>
              </div>

              <div className="recipe-grid">
                {recipes.map((r, i) => (
                  <div
                    key={i}
                    className={`recipe-card ${openRecipe === i ? "open" : ""}`}
                    onClick={() => setOpenRecipe(openRecipe === i ? null : i)}
                  >
                    <div className="recipe-header">
                      <span className="recipe-icon">{r.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div className="recipe-title">{r.title}</div>
                        <div className="macro-pills">
                          <span className="pill pill-p">P {r.macros.P}</span>
                          <span className="pill pill-c">C {r.macros.C}</span>
                          <span className="pill pill-k">
                            ⚡ {r.macros.kcal}kcal
                          </span>
                          {r.testo && (
                            <span className="pill pill-t">🧪 TESTO+</span>
                          )}
                        </div>
                      </div>
                      <span className="recipe-arrow">▶</span>
                    </div>
                    {openRecipe === i && (
                      <div className="recipe-body">
                        {r.steps.map((s, si) => (
                          <div className="recipe-step" key={si}>
                            <span className="step-num">0{si + 1}</span>
                            <span>{s}</span>
                          </div>
                        ))}
                        <div className="perms-section">
                          <div className="perms-label">
                            PERMUTAÇÕES DESTA BASE
                          </div>
                          {r.perms.map((p, pi) => (
                            <span key={pi} className="perm-tag">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "matrix" && (
            <>
              <div className="section-header">
                <div className="section-title">
                  TABELA MESTRA DE COMBINAÇÕES
                </div>
              </div>
              <div className="matrix-wrap">
                <table className="matrix-table">
                  <thead>
                    <tr>
                      <th>COMBINAÇÃO</th>
                      <th>PROTEÍNA</th>
                      <th>CARB</th>
                      <th>VEGETAL</th>
                      <th>GRILL</th>
                      <th>PRESSÃO</th>
                      <th>KCAL EST.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permMatrix.map((r, i) => (
                      <tr key={i}>
                        <td>
                          <span className="combo-name">{r.combo}</span>
                        </td>
                        <td>
                          {r.P ? (
                            <span className="dot-yes">●</span>
                          ) : (
                            <span className="dot-no">○</span>
                          )}
                        </td>
                        <td>
                          {r.carb ? (
                            <span className="dot-yes">●</span>
                          ) : (
                            <span className="dot-no">○</span>
                          )}
                        </td>
                        <td>
                          {r.C ? (
                            <span className="dot-yes">●</span>
                          ) : (
                            <span className="dot-opt">◑</span>
                          )}
                        </td>
                        <td>
                          {r.grill ? (
                            <span className="dot-yes">●</span>
                          ) : (
                            <span className="dot-no">○</span>
                          )}
                        </td>
                        <td>
                          {r.press ? (
                            <span className="dot-yes">●</span>
                          ) : (
                            <span className="dot-no">○</span>
                          )}
                        </td>
                        <td>
                          <span className="combo-cal">{r.kcal}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  marginTop: 24,
                  background: "#111",
                  border: "1px solid #222",
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 16,
                    letterSpacing: 2,
                    marginBottom: 12,
                    color: "#F5A623",
                  }}
                >
                  LÓGICA DE PERMUTAÇÃO — COMO USAR O SISTEMA
                </div>
                {[
                  [
                    "REGRA 1 — BATCH COOKING",
                    "Cozinhe 2x na pressão por semana: 2kg frango + 1kg músculo. Você terá proteína base para 5+ combinações diferentes sem cozinhar todo dia.",
                  ],
                  [
                    "REGRA 2 — ROTAÇÃO DE CARBS",
                    "Alterne: Cuscuz → Arroz → Batata Doce → Macarrão. Nunca o mesmo carb 2 dias seguidos. Evita saturação e mantém adesão.",
                  ],
                  [
                    "REGRA 3 — HIPERCALÓRICO DE EMERGÊNCIA",
                    "Faltou tempo? Shake de 760kcal em 3 minutos: leite + whey + banana + aveia + pasta amendoim. Sem desculpas.",
                  ],
                  [
                    "REGRA 4 — OMEGA-3 DIÁRIO",
                    "Sardinha ou atum mínimo 1x/dia. Suporte direto à produção hormonal. Pasta de sardinha no café ou cuscuz.",
                  ],
                  [
                    "REGRA 5 — OVOS TODO DIA",
                    "2-3 ovos/dia mínimo. Gema inclusa. Colesterol dietético = precursor de testosterona. Não descarte a gema.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    style={{
                      marginBottom: 10,
                      paddingBottom: 10,
                      borderBottom: "1px solid #191919",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: 10,
                        color: "#FF6B1A",
                        letterSpacing: 2,
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#bbb", lineHeight: 1.6 }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
