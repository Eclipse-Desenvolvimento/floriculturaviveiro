export type ProdutoVariant = {
  label: string;
  price: number;
};

export type Produto = {
  name: string;
  desc: string;
  note?: string;
  images?: string[];
  variants: ProdutoVariant[];
};

export type Categoria = {
  slug: string;
  name: string;
  tagline: string;
  products: Produto[];
};

const WA_PHONE = "5563992509145";
const FOTO_ILUSTRATIVA =
  "Foto meramente ilustrativa; a cor dos complementos pode variar conforme disponibilidade.";

const img = (slug: string, index: number) =>
  `/produtos/${slug}/${String(index).padStart(2, "0")}.jpeg`;

const imgs = (slug: string, count: number, start = 1) =>
  Array.from({ length: count }, (_, i) => img(slug, start + i));

export const categorias: Categoria[] = [
  {
    slug: "caixas",
    name: "Caixas",
    tagline:
      "Caixas florais marcantes, com rosas vermelhas e acabamentos pensados para presentear com presença.",
    products: [
      {
        name: "Caixa P com Rosas Vermelhas",
        desc: "Caixa pequena com rosas vermelhas, ideal para um gesto elegante e direto.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "Sem personalizar", price: 266 },
          { label: "Personalizada", price: 281 },
        ],
      },
      {
        name: "Caixa M com Rosas Vermelhas",
        desc: "Caixa média com rosas vermelhas, uma escolha generosa para datas especiais.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "Sem personalizar", price: 482 },
          { label: "Personalizada", price: 517 },
        ],
      },
      {
        name: "Caixa G com Rosas Vermelhas",
        desc: "Caixa grande com rosas vermelhas para uma surpresa de impacto e muito carinho.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "Sem personalizar", price: 670 },
          { label: "Personalizada", price: 710 },
        ],
      },
      {
        name: "Caixa M com Rosas e Letra em Acrílico",
        desc: "Caixa média personalizada com rosas vermelhas e inicial em acrílico.",
        variants: [{ label: "Valor", price: 532 }],
      },
      {
        name: "Caixa M com Rosas, Letra e Coração em Acrílico",
        desc: "Caixa média personalizada com rosas, inicial e coração em acrílico.",
        variants: [{ label: "Valor", price: 547 }],
      },
    ],
  },
  {
    slug: "rosa-eterna",
    name: "Rosa Eterna",
    tagline:
      "Rosas preservadas em cúpula para simbolizar carinho, memória e sentimentos que permanecem.",
    products: [
      {
        name: "Rosa Eterna na Cúpula",
        desc: "Rosa eterna em cúpula, tamanho P, delicada e pronta para presentear.",
        images: imgs("rosa-eterna-cupula", 10),
        variants: [{ label: "Tamanho P", price: 285 }],
      },
      {
        name: "Rosa Eterna",
        desc: "Rosa eterna em cúpula grande, disponível em diversas cores.",
        images: imgs("rosa-eterna", 10),
        variants: [{ label: "Cúpula grande", price: 320 }],
      },
    ],
  },
  {
    slug: "rosas",
    name: "Rosas",
    tagline:
      "Rosas para declarar amor, admiração ou presença com a força de um clássico.",
    products: [
      {
        name: "Rosa Decorada Simples",
        desc: "Rosa decorada de forma simples e charmosa, perfeita para um gesto espontâneo.",
        images: imgs("rosa-decorada-simples", 2),
        variants: [{ label: "Valor", price: 35 }],
      },
      {
        name: "Rosa Decorada Simples com Pelúcia",
        desc: "Rosa decorada simples acompanhada de pelúcia para um presente mais afetivo.",
        images: imgs("rosa-decorada-simples-pelucia", 2),
        variants: [{ label: "Com pelúcia", price: 65 }],
      },
      {
        name: "Cone “Eu vejo flores em você”",
        desc: "Cone com rosa em apresentação afetiva, pensado para mensagens leves e bonitas.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("cone-eu-vejo-flores", 3),
        variants: [{ label: "Valor", price: 50 }],
      },
      {
        name: "Ramalhete de Rosas",
        desc: "Ramalhete com rosas, acabamento delicado e presença clássica.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "3 rosas", price: 125 },
          { label: "4 rosas", price: 150 },
          { label: "5 rosas", price: 178 },
          { label: "6 rosas", price: 205 },
        ],
      },
      {
        name: "Rosa Decorada",
        desc: "Rosa decorada com acabamento especial para presentear com elegância.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("rosa-decorada", 1),
        variants: [
          { label: "Valor unitário", price: 60 },
          { label: "Com 2 unidades", price: 100 },
        ],
      },
      {
        name: "Buquê Clássico com 12 Rosas",
        desc: "Buquê clássico com 12 rosas, uma escolha tradicional e marcante.",
        images: imgs("buque-classico-12-rosas", 6),
        variants: [{ label: "Valor", price: 330 }],
      },
      {
        name: "Buquê Clássico de Rosas",
        desc: "Buquê de rosas em composição clássica, com opções para ajustar o tamanho do gesto.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("buque-classico-rosas", 3),
        variants: [
          { label: "7 rosas", price: 200 },
          { label: "8 rosas", price: 220 },
          { label: "9 rosas", price: 240 },
          { label: "10 rosas", price: 265 },
          { label: "11 rosas", price: 285 },
        ],
      },
    ],
  },
  {
    slug: "buques",
    name: "Buquês",
    tagline:
      "Buquês para celebrar, agradecer, encantar e transformar o dia de alguém.",
    products: [
      {
        name: "Buquê Doçura",
        desc: "Buquê delicado para um presente leve, carinhoso e cheio de simpatia.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("buque-docura", 2),
        variants: [{ label: "Valor", price: 50 }],
      },
      {
        name: "Buquê Primavera",
        desc: "Buquê colorido e alegre, inspirado na beleza viva das flores da estação.",
        images: imgs("buque-primavera", 3),
        variants: [{ label: "Valor", price: 305 }],
      },
      {
        name: "Buquê Flores do Campo",
        desc: "Buquê amplo com flores do campo, visual natural e presença encantadora.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("buque-flores-campo", 2),
        variants: [{ label: "Valor", price: 605 }],
      },
      {
        name: "Buquê de Lírios",
        desc: "Buquê com lírios, elegante e expressivo para ocasiões especiais.",
        images: imgs("buque-lirios", 1),
        variants: [{ label: "Valor", price: 525 }],
      },
      {
        name: "Buquê de Rosa e Girassol",
        desc: "Combinação de rosa e girassol para unir romantismo, luz e alegria.",
        images: imgs("buque-rosa-girassol", 2),
        variants: [{ label: "Valor", price: 425 }],
      },
      {
        name: "Buquê de Girassóis",
        desc: "Buquê com girassóis, vibrante e cheio de energia.",
        images: imgs("buque-girassois", 3),
        variants: [{ label: "Valor", price: 360 }],
      },
      {
        name: "Buquê de Gérberas",
        desc: "Buquê de gérberas com visual alegre e cores de destaque.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("buque-gerberas", 2),
        variants: [
          { label: "2 gérberas", price: 120 },
          { label: "3 gérberas", price: 180 },
          { label: "4 gérberas", price: 240 },
          { label: "5 gérberas", price: 300 },
          { label: "6 gérberas", price: 360 },
        ],
      },
      {
        name: "Buquê Mini Flores do Campo",
        desc: "Composto por 7 rosas, astromélias e gipsofila em tons claros, brancos e rosa, com embalagem especial.",
        images: imgs("buque-mini-flores-campo", 4),
        variants: [{ label: "Valor", price: 285 }],
      },
      {
        name: "Buquê de Rosas e Ferrero Rocher",
        desc: "Buquê com rosas e chocolates Ferrero Rocher para um presente romântico e doce.",
        images: imgs("buque-rosas-ferrero", 1),
        variants: [
          { label: "5 rosas + 8 chocolates", price: 308 },
          { label: "5 rosas + 12 chocolates", price: 385 },
          { label: "7 rosas + 8 chocolates", price: 338 },
          { label: "7 rosas + 12 chocolates", price: 385 },
        ],
      },
    ],
  },
  {
    slug: "girassois",
    name: "Girassóis",
    tagline:
      "Girassóis para levar luz, alegria e uma energia bonita para o presente.",
    products: [
      {
        name: "Buquê de Rosa e Girassol",
        desc: "Buquê que mistura a delicadeza da rosa com a vibração solar do girassol.",
        images: imgs("buque-rosa-girassol", 2),
        variants: [{ label: "Valor", price: 425 }],
      },
      {
        name: "Buquê de Girassóis",
        desc: "Buquê vibrante com girassóis, ideal para surpreender com alegria.",
        images: imgs("buque-girassois", 3),
        variants: [{ label: "Valor", price: 360 }],
      },
      {
        name: "Girassol Embalado",
        desc: "Girassol embalado individualmente, simples, bonito e cheio de significado.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("girassol-embalado", 2),
        variants: [{ label: "Valor", price: 60 }],
      },
      {
        name: "Ramalhete de Girassóis",
        desc: "Ramalhete com girassóis, acabamento delicado e visual iluminado.",
        images: imgs("ramalhete-girassois", 1),
        variants: [
          { label: "2 girassóis", price: 115 },
          { label: "3 girassóis", price: 180 },
          { label: "4 girassóis", price: 240 },
          { label: "5 girassóis", price: 300 },
        ],
      },
      {
        name: "Mensageiro Luz",
        desc: "Arranjo com girassol para levar uma mensagem clara de carinho e alegria.",
        images: imgs("mensageiro-luz", 2),
        variants: [{ label: "Valor", price: 165 }],
      },
    ],
  },
  {
    slug: "orquideas",
    name: "Orquídeas",
    tagline:
      "Orquídeas Phalaenopsis para presentear com sofisticação natural e duradoura.",
    products: [
      {
        name: "Mini Orquídeas Phalaenopsis",
        desc: "Mini orquídeas Phalaenopsis, delicadas e elegantes para ambientes e presentes.",
        images: imgs("mini-orquidea-phalaenopsis", 2),
        variants: [
          { label: "Opção 1", price: 170 },
          { label: "Opção 2", price: 200 },
        ],
      },
      {
        name: "Orquídeas Phalaenopsis Maiores",
        desc: "Orquídeas Phalaenopsis maiores, com presença sofisticada para presentear ou decorar.",
        images: imgs("orquidea-phalaenopsis-maior", 5),
        variants: [
          { label: "Opção 1", price: 185 },
          { label: "Opção 2", price: 215 },
          { label: "Opção 3", price: 260 },
          { label: "Opção 4", price: 262 },
          { label: "Opção 5", price: 290 },
        ],
      },
    ],
  },
  {
    slug: "chocolates",
    name: "Chocolates",
    tagline:
      "Chocolates para complementar flores, caixas e presentes com um toque doce.",
    products: [
      {
        name: "Ferrero Rocher 3 Chocolates",
        desc: "Caixa com 3 chocolates Ferrero Rocher para complementar o presente.",
        images: [img("chocolates", 3)],
        variants: [{ label: "Valor", price: 16.5 }],
      },
      {
        name: "Ferrero Rocher Tablete",
        desc: "Tablete Ferrero Rocher nas opções ao leite, Dark 55% e branco.",
        images: [img("chocolates", 2)],
        variants: [{ label: "Valor", price: 60 }],
      },
      {
        name: "Ferrero Rocher Collection 77g",
        desc: "Ferrero Rocher Collection 77g para um complemento sofisticado.",
        images: [img("chocolates", 7)],
        variants: [{ label: "Valor", price: 54 }],
      },
      {
        name: "Ferrero Rocher 8 Chocolates 100g",
        desc: "Caixa Ferrero Rocher com 8 chocolates, 100g.",
        images: [img("chocolates", 4)],
        variants: [{ label: "Valor", price: 53 }],
      },
      {
        name: "Ferrero Rocher 12 Chocolates",
        desc: "Caixa Ferrero Rocher com 12 chocolates para deixar o presente mais especial.",
        images: [img("chocolates", 5)],
        variants: [{ label: "Valor", price: 78 }],
      },
      {
        name: "Ferrero Rocher 25 Chocolates",
        desc: "Caixa Ferrero Rocher com 25 chocolates, ideal para presentes maiores.",
        images: [img("chocolates", 6)],
        variants: [{ label: "Valor", price: 172 }],
      },
      {
        name: "Ferrero Rocher 4 Chocolates 50g",
        desc: "Caixa Ferrero Rocher com 4 chocolates, 50g.",
        images: [img("chocolates", 1)],
        variants: [{ label: "Valor", price: 34 }],
      },
    ],
  },
  {
    slug: "pelucias",
    name: "Pelúcias",
    tagline:
      "Pelúcias e almofadas para acompanhar flores com afeto, ternura e presença.",
    products: [
      {
        name: "Pelúcia Chaveirinho",
        desc: "Pelúcia chaveirinho de 11 cm, pequena e charmosa para complementar o presente.",
        images: imgs("pelucia-chaveirinho", 9),
        variants: [{ label: "11 cm", price: 30 }],
      },
      {
        name: "Pelúcias Beijinho",
        desc: "Pelúcia Beijinho de 40 cm, fofa e expressiva para um presente carinhoso.",
        images: imgs("pelucia-beijinho", 3),
        variants: [{ label: "40 cm", price: 173 }],
      },
      {
        name: "Almofada Coração",
        desc: "Almofada em formato de coração, tamanho 36 cm.",
        images: imgs("almofada-coracao", 1),
        variants: [{ label: "36 cm", price: 39.9 }],
      },
      {
        name: "Pelúcia Coração com Mãos",
        desc: "Pelúcia coração com mãos, tamanho 80 cm.",
        images: imgs("pelucia-coracao-maos", 2),
        variants: [{ label: "80 cm", price: 156 }],
      },
      {
        name: "Pelúcia",
        desc: "Pelúcia de 30 cm para acompanhar flores e kits especiais.",
        images: imgs("pelucia-30cm", 5),
        variants: [{ label: "30 cm", price: 116 }],
      },
      {
        name: "Pelúcia com Coração",
        desc: "Pelúcia de 30 cm com coração, uma opção afetiva para presentes românticos.",
        images: imgs("pelucia-com-coracao", 2),
        variants: [{ label: "30 cm", price: 116 }],
      },
      {
        name: "Pelúcias Beijinho",
        desc: "Pelúcia Beijinho de 60 cm, maior e com bastante presença.",
        images: [img("pelucia-beijinho", 4)],
        variants: [{ label: "60 cm", price: 242 }],
      },
      {
        name: "Kit Especial “Namorados”",
        desc: "Caixa M com rosas personalizada e pelúcia inclusa.",
        images: imgs("kit-namorados", 1),
        variants: [{ label: "Valor total", price: 637 }],
      },
      {
        name: "Pelúcias Diversas",
        desc: "Pelúcias diversas para montar presentes personalizados.",
        images: imgs("pelucias-diversas", 6),
        variants: [{ label: "Valor unitário", price: 65 }],
      },
      {
        name: "Pelúcias Pequenas com Coração",
        desc: "Pelúcias pequenas com coração, tamanho médio de 20 cm.",
        images: imgs("pelucias-pequenas-coracao", 5),
        variants: [{ label: "20 cm", price: 55 }],
      },
      {
        name: "Pelúcias Maternidade",
        desc: "Pelúcias maternidade de 30 cm, delicadas para boas-vindas especiais.",
        images: imgs("pelucias-maternidade", 1),
        variants: [{ label: "30 cm", price: 116 }],
      },
      {
        name: "Almofadas Religiosas",
        desc: "Almofadas religiosas de 31 cm para presentes de fé e carinho.",
        images: imgs("almofadas-religiosas", 9),
        variants: [{ label: "31 cm", price: 59 }],
      },
      {
        name: "Pelúcia Coração com Mãos",
        desc: "Pelúcia coração com mãos, tamanho 19 cm.",
        images: imgs("pelucia-coracao-maos", 2, 3),
        variants: [{ label: "19 cm", price: 64 }],
      },
      {
        name: "Pelúcias Diversos",
        desc: "Pelúcias diversas de 35 cm para compor presentes maiores.",
        images: imgs("pelucias-diversas", 4, 7),
        variants: [{ label: "35 cm", price: 130 }],
      },
      {
        name: "Pelúcia 15 cm com Coração “Amor”",
        desc: "Pelúcia de 15 cm com coração escrito “Amor”.",
        images: imgs("pelucia-15cm-coracao-amor", 1),
        variants: [{ label: "Valor unitário", price: 48 }],
      },
      {
        name: "Urso",
        desc: "Urso de pelúcia de 20 cm, clássico e carinhoso.",
        images: imgs("urso-20cm", 1),
        variants: [{ label: "20 cm", price: 80 }],
      },
      {
        name: "Pelúcia Coração Gigante com Mãos",
        desc: "Pelúcia coração gigante com mãos, tamanho 1 metro.",
        images: imgs("pelucia-coracao-gigante-maos", 1),
        variants: [{ label: "1 metro", price: 270 }],
      },
      {
        name: "Pelúcia Coração com Mãos",
        desc: "Pelúcia coração com mãos, tamanho 60 cm.",
        variants: [{ label: "60 cm", price: 90 }],
      },
      {
        name: "Pelúcias Pequenas com Flor",
        desc: "Pelúcias pequenas com flor, tamanho médio de 20 cm.",
        images: imgs("pelucias-pequenas-flor", 2),
        variants: [
          { label: "Opção 1", price: 70 },
          { label: "Opção 2", price: 90 },
        ],
      },
      {
        name: "Pelúcia 15 cm",
        desc: "Pelúcia de 15 cm para complementar presentes com delicadeza.",
        images: imgs("pelucia-15cm", 1),
        variants: [{ label: "Valor unitário", price: 40 }],
      },
      {
        name: "Pelúcia Fofuxo Média",
        desc: "Pelúcia Fofuxo média, tamanho 47 cm.",
        images: imgs("pelucia-fofuxo-media", 1),
        variants: [{ label: "47 cm", price: 196 }],
      },
      {
        name: "Animais de Pelúcia",
        desc: "Animais de pelúcia variados para presentes afetivos.",
        images: imgs("animais-de-pelucia", 3),
        variants: [{ label: "Valor unitário", price: 120 }],
      },
    ],
  },
  {
    slug: "ramalhetes",
    name: "Ramalhetes",
    tagline:
      "Ramalhetes delicados para presentear com beleza, leveza e intenção.",
    products: [
      {
        name: "Ramalhete de Girassóis",
        desc: "Ramalhete com girassóis, visual alegre e acabamento delicado.",
        images: imgs("ramalhete-girassois", 1),
        variants: [
          { label: "2 girassóis", price: 115 },
          { label: "3 girassóis", price: 180 },
          { label: "4 girassóis", price: 240 },
          { label: "5 girassóis", price: 300 },
        ],
      },
      {
        name: "Ramalhete de Lírio",
        desc: "Ramalhete de lírio com apresentação elegante e delicada.",
        note: FOTO_ILUSTRATIVA,
        images: imgs("ramalhete-lirio", 2),
        variants: [{ label: "Valor", price: 175 }],
      },
      {
        name: "Ramalhete de Rosas",
        desc: "Ramalhete com rosas, clássico e afetivo para diferentes ocasiões.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "3 rosas", price: 125 },
          { label: "4 rosas", price: 150 },
          { label: "5 rosas", price: 178 },
          { label: "6 rosas", price: 205 },
        ],
      },
      {
        name: "Ramalhete de Gérberas",
        desc: "Ramalhete de gérberas com visual alegre e cores marcantes.",
        note: FOTO_ILUSTRATIVA,
        variants: [
          { label: "2 gérberas", price: 120 },
          { label: "3 gérberas", price: 180 },
          { label: "4 gérberas", price: 240 },
          { label: "5 gérberas", price: 300 },
        ],
      },
    ],
  },
];

export function formatBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function waLinkFor(product: Produto, variant: ProdutoVariant) {
  const lines = [
    "Olá! Vim pelo site e gostaria de fazer um pedido.",
    `Produto: ${product.name}`,
    `Descrição: ${product.desc}`,
    `Opção: ${variant.label}`,
    `Valor exato: ${formatBRL(variant.price)}`,
  ];

  if (product.note) {
    lines.push(`Observação: ${product.note}`);
  }

  return `https://api.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(lines.join("\n"))}`;
}
