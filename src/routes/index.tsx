import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import {
  categorias as catalogoCategorias,
  waLinkFor,
  formatBRL,
} from "@/data/produtos";
import type { Produto } from "@/data/produtos";
import heroFlowers from "@/assets/hero-flowers.jpg";
import rosaEterna from "@/assets/rosa-eterna.jpg";
import catBuques from "@/assets/cat-buques.jpg";
import catRosas from "@/assets/cat-buques.jpg";
import catCaixas from "@/assets/cat-kits.jpg";
import catMensageiro from "@/assets/cat-mensageiro.jpg";
import catOrquideas from "@/assets/cat-orquideas.jpg";
import catGirassois from "@/assets/cat-mensageiro.jpg";
import catChocolates from "@/assets/cat-cestas.jpg";
import catPelucias from "@/assets/cat-cestas.jpg";
import catRosaEterna from "@/assets/cat-rosa-eterna.jpg";
import catRamalhetes from "@/assets/cat-buques.jpg";
import sobre1 from "@/assets/sobre-1.jpg";
import sobre2 from "@/assets/sobre-2.jpg";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import gal4 from "@/assets/gal-4.jpg";
import gal5 from "@/assets/gal-5.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Floricultura e Viveiro Palmas — Flores que falam" },
      {
        name: "description",
        content:
          "Há 26 anos entregando flores, arranjos e presentes em Palmas/TO. Entrega no mesmo dia. Buquês, Rosa Eterna, orquídeas e mais.",
      },
      { property: "og:title", content: "Floricultura e Viveiro Palmas" },
      {
        property: "og:description",
        content:
          "Flores que falam o que as palavras não conseguem. Entrega no mesmo dia em Palmas/TO.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroFlowers },
      { name: "theme-color", content: "#2D3B2E" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;500;600&family=Playfair+Display:ital@1&family=Lato:wght@300;400;700&family=Montserrat:wght@500;600&display=swap",
      },
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Index,
});

const WA_FLORES =
  "https://api.whatsapp.com/send?phone=5563992509145&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20fazer%20um%20pedido.";
const WA_PLANTAS =
  "https://api.whatsapp.com/send?phone=556384602825&text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20tenho%20interesse%20em%20plantas%20e%20jardim.";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    const observeRevealEls = () => {
      document
        .querySelectorAll(".reveal:not(.in)")
        .forEach((el) => io.observe(el));
    };

    observeRevealEls();
    const mo = new MutationObserver(observeRevealEls);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const start = performance.now();
            const dur = 1800;
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(to * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const Petal = ({ d, fill }: { d: string; fill: string }) => (
  <svg viewBox="0 0 60 60" width="60" height="60">
    <path d={d} fill={fill} />
  </svg>
);
const petalPath = "M30 5 C 45 15, 55 30, 30 55 C 5 30, 15 15, 30 5 Z";

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fechar menu ao clicar fora
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Bloquear scroll quando menu aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    ["#inicio", "Inicio"],
    ["#sobre", "Nossa Historia"],
    ["#produtos", "Produtos"],
    ["#rosa-eterna", "Rosa Eterna"],
    ["#como-pedir", "Como Pedir"],
    ["#contato", "Contato"],
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/90 shadow-[0_2px_30px_-15px_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#inicio"
          className="flex items-center gap-2 md:gap-3"
          aria-label="Viveiro Palmas"
        >
          <img
            src={logo}
            alt="Logo Viveiro Palmas"
            width={48}
            height={48}
            className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover shadow-md"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span
              className="text-base md:text-xl tracking-wide"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Viveiro Palmas
            </span>
            <span className="label-eyebrow text-[8px] md:text-[9px] text-muted-foreground mt-0.5 md:mt-1">
              Floricultura · Est. 1998
            </span>
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="link-underline text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={WA_FLORES}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-5 py-2.5 text-sm hover:opacity-90 transition pulse-wa"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 -mr-2"
        >
          <span
            className={`block w-5 h-[2px] bg-foreground rounded-full transition-all duration-300 ease-out ${
              open ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-foreground rounded-full my-[4px] transition-all duration-300 ease-out ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[2px] bg-foreground rounded-full transition-all duration-300 ease-out ${
              open ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          />
        </button>
      </div>
      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-out ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: 0 }}
      >
        <div
          className={`absolute inset-0 bg-dark/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <aside
          ref={menuRef}
          className={`absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-background shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full overflow-y-auto overscroll-contain">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <span
                className="text-lg"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Menu
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                aria-label="Fechar menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 p-6 flex flex-col gap-1">
              {links.map(([href, label], i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-3 px-4 text-lg rounded-lg hover:bg-muted transition-colors"
                  style={{
                    fontFamily: "var(--font-display)",
                    animationDelay: open ? `${i * 50}ms` : "0ms",
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="p-6 pt-0 border-t border-border/50 mt-auto">
              <a
                href={WA_FLORES}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full rounded-full bg-secondary text-secondary-foreground px-5 py-4 text-sm font-medium hover:opacity-90 transition"
              >
                <WhatsAppIcon className="w-5 h-5" /> Fazer pedido
              </a>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  );
}

function Index() {
  useReveal();

  // Catálogo carregado de src/data/produtos.ts

  return (
    <main className="overflow-x-hidden">
      <Nav />

      {/* HERO */}
      <section
        id="inicio"
        className="relative min-h-[100svh] flex items-center justify-center hero-mesh overflow-hidden"
      >
        <img
          src={heroFlowers}
          alt="Buquê elegante de rosas e lírios em fundo verde"
          width={1600}
          height={1200}
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

        {/* Petals — varied sizes, opacities, durations for an organic drift */}
        {[
          {
            top: "10%",
            left: "6%",
            size: 48,
            dur: 14,
            delay: 0,
            fill: "#E8C4B8",
            rot: 12,
          },
          {
            top: "18%",
            right: "8%",
            size: 36,
            dur: 18,
            delay: -3,
            fill: "#C8A882",
            rot: -8,
          },
          {
            top: "35%",
            left: "12%",
            size: 28,
            dur: 16,
            delay: -6,
            fill: "#E8C4B8",
            rot: 20,
          },
          {
            top: "62%",
            left: "18%",
            size: 52,
            dur: 20,
            delay: -2,
            fill: "#C8A882",
            rot: -15,
          },
          {
            top: "72%",
            right: "14%",
            size: 40,
            dur: 17,
            delay: -5,
            fill: "#8B5E52",
            rot: 8,
          },
          {
            top: "45%",
            right: "22%",
            size: 32,
            dur: 19,
            delay: -9,
            fill: "#E8C4B8",
            rot: -22,
          },
          {
            top: "28%",
            left: "42%",
            size: 24,
            dur: 22,
            delay: -4,
            fill: "#C8A882",
            rot: 35,
          },
          {
            top: "82%",
            left: "38%",
            size: 30,
            dur: 15,
            delay: -8,
            fill: "#8B5E52",
            rot: -5,
          },
          {
            top: "55%",
            right: "5%",
            size: 44,
            dur: 21,
            delay: -11,
            fill: "#E8C4B8",
            rot: 18,
          },
        ].map((p, i) => (
          <div
            key={i}
            className="petal"
            style={{
              top: p.top,
              left: p.left as string | undefined,
              right: p.right as string | undefined,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0.55,
              transform: `rotate(${p.rot}deg)`,
            }}
          >
            <svg viewBox="0 0 60 60" width={p.size} height={p.size}>
              <path d={petalPath} fill={p.fill} />
            </svg>
          </div>
        ))}

        <div className="relative z-10 text-center max-w-4xl px-6">
          <p
            className="label-eyebrow text-accent-2 hero-fade"
            style={{ animationDelay: "0.1s" }}
          >
            — Floricultura & Viveiro —
          </p>
          <h1
            className="mt-6 text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6rem] leading-[1] hero-bloom"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              animationDelay: "0.3s",
            }}
          >
            <span className="hero-word">Flores</span>{" "}
            <span className="hero-word">que</span>{" "}
            <span className="hero-word italic font-italic-serif text-accent-2">
              falam
            </span>
          </h1>
          <p
            className="mt-5 text-xl sm:text-2xl md:text-3xl font-italic-serif text-foreground/70 hero-fade"
            style={{ animationDelay: "1.1s" }}
          >
            o que as palavras não conseguem dizer
          </p>
          <p
            className="mt-7 max-w-lg mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed hero-fade"
            style={{ animationDelay: "1.4s" }}
          >
            Entrega no mesmo dia em Palmas e região. Há 26 anos transformando
            momentos em memórias.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center hero-fade"
            style={{ animationDelay: "1.7s" }}
          >
            <a
              href={WA_FLORES}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-4 text-sm tracking-wide hover:opacity-90 transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Fazer Pedido
            </a>
            <a
              href="#produtos"
              className="inline-flex items-center justify-center rounded-full border border-foreground/30 px-7 py-4 text-sm tracking-wide hover:bg-foreground hover:text-background transition"
            >
              Ver Produtos
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-foreground/40">
          <svg width="18" height="28" viewBox="0 0 20 32" fill="none">
            <path
              d="M10 0v28M2 22l8 8 8-8"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </section>

      {/* CREDENCIAIS */}
      <section className="bg-secondary text-secondary-foreground py-12">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            {
              num: 26,
              suf: "",
              label: "Anos de tradição em Palmas",
              icon: <FlowerIcon />,
            },
            {
              num: 1,
              suf: "",
              label: "Entrega no mesmo dia",
              icon: <TruckIcon />,
            },
            {
              num: 500,
              suf: "+",
              label: "Tipos de flores e presentes",
              icon: <BouquetIcon />,
            },
            {
              num: 100,
              suf: "%",
              label: "Atendimento personalizado",
              icon: <StarIcon />,
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-primary opacity-80">{c.icon}</div>
              <div
                className="text-4xl md:text-5xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Counter to={c.num} suffix={c.suf} />
              </div>
              <p className="text-xs uppercase tracking-widest opacity-70 max-w-[180px]">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative py-16 md:py-32 px-5 md:px-10">
        <div className="noise" />
        <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal pl-6 border-l border-primary">
            <p className="label-eyebrow text-accent-2">Nossa História</p>
            <h2 className="mt-4 text-4xl md:text-6xl">
              Cultivando amor em Palmas há 26 anos
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground leading-[1.85]">
              <p>
                Há 26 anos, a Floricultura e Viveiro Palmas transforma
                sentimentos em flores. O que começou como uma paixão por plantas
                e pelo ato de presentear, cresceu e se tornou referência em
                Palmas/TO.
              </p>
              <p>
                Cada buquê montado, cada arranjo entregue, carrega um pedaço da
                nossa história — e da sua. Porque acreditamos que flores não são
                apenas presentes: são mensagens que o coração envia quando as
                palavras não bastam.
              </p>
            </div>
          </div>
          <div className="relative reveal min-h-[520px]">
            <img
              src={sobre2}
              alt="Interior da floricultura com plantas e flores"
              width={900}
              height={1100}
              loading="lazy"
              className="absolute top-0 right-0 w-[75%] h-[420px] object-cover rounded-sm shadow-2xl"
            />
            <img
              src={sobre1}
              alt="Florista compondo arranjo de rosas"
              width={900}
              height={1100}
              loading="lazy"
              className="absolute bottom-0 left-0 w-[65%] h-[380px] object-cover rounded-sm shadow-2xl rotate-[-3deg]"
            />
            <div className="absolute bottom-8 right-8 bg-background px-6 py-3 rounded-full shadow-xl border border-primary/30">
              <span className="font-italic-serif text-xl text-accent-2">
                Est. 1998
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS — Catálogo completo */}
      <ProdutosCatalogo />

      {/* ROSA ETERNA */}
      <section id="rosa-eterna" className="grid md:grid-cols-2 min-h-[80vh]">
        <div
          className="relative bg-black overflow-hidden flex items-center justify-center py-20"
          style={{
            boxShadow: "inset 0 0 200px 50px rgba(200,168,130,0.15)",
          }}
        >
          <img
            src={rosaEterna}
            alt="Rosa eterna sob cúpula de vidro"
            width={1200}
            height={1400}
            loading="lazy"
            className="max-h-[600px] w-auto object-contain"
          />
          <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-primary/40 blur-sm" />
          <div className="absolute bottom-20 left-12 w-2 h-2 rounded-full bg-primary/60 blur-sm" />
        </div>
        <div className="bg-background flex items-center px-8 md:px-16 py-20 reveal">
          <div className="max-w-md">
            <p className="label-eyebrow text-primary">— Produto Exclusivo —</p>
            <h2 className="mt-4 text-5xl md:text-7xl">Rosa Eterna</h2>
            <p className="mt-3 font-italic-serif text-2xl text-accent-2">
              Um amor que não murcha
            </p>
            <p className="mt-6 text-muted-foreground leading-[1.85]">
              Rosas naturais preservadas com técnica artesanal, abrigadas sob
              uma cúpula de vidro. Duram anos com a mesma beleza do primeiro dia
              — porque alguns sentimentos merecem eternidade.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Duração de até 3 anos",
                "Personalização com mensagem",
                "Embalagem premium para presente",
              ].map((a) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
            <p
              className="mt-8 text-2xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A partir de <span className="text-accent-2">R$ 200,00</span>
            </p>
            <a
              href={WA_FLORES}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-8 py-4 hover:opacity-90 transition"
            >
              <WhatsAppIcon className="w-4 h-4" /> Quero a minha
            </a>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="py-16 md:py-32 px-5 md:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center reveal">
            <p className="label-eyebrow text-accent-2">— Galeria —</p>
            <h2 className="mt-4 text-4xl md:text-6xl">
              Cada arranjo é uma história
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <img
              src={gal1}
              alt="Buquê de noiva"
              width={900}
              height={1200}
              loading="lazy"
              className="row-span-2 w-full h-full object-cover rounded-sm hover:saturate-150 transition duration-700 reveal"
            />
            <img
              src={gal2}
              alt="Peônias em vaso de vidro"
              width={900}
              height={900}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-sm hover:saturate-150 transition duration-700 reveal"
            />
            <img
              src={gal3}
              alt="Buquê de girassóis"
              width={900}
              height={1200}
              loading="lazy"
              className="row-span-2 w-full h-full object-cover rounded-sm hover:saturate-150 transition duration-700 reveal"
            />
            <img
              src={gal4}
              alt="Arranjo seco com pampas"
              width={900}
              height={900}
              loading="lazy"
              className="w-full aspect-square object-cover rounded-sm hover:saturate-150 transition duration-700 reveal"
            />
            <img
              src={gal5}
              alt="Centro de mesa floral"
              width={900}
              height={1100}
              loading="lazy"
              className="col-span-2 w-full aspect-[2/1] object-cover rounded-sm hover:saturate-150 transition duration-700 reveal"
            />
          </div>
        </div>
      </section>

      {/* COMO PEDIR */}
      <section
        id="como-pedir"
        className="py-16 md:py-32 px-5 md:px-10 bg-background"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center reveal">
            <p className="label-eyebrow text-accent-2">— Processo —</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Simples assim</h2>
          </div>
          <div className="mt-20 grid md:grid-cols-3 gap-12 md:gap-6 relative">
            <svg
              className="hidden md:block absolute top-12 left-[16%] right-[16%] h-2 draw-line reveal"
              viewBox="0 0 600 4"
              preserveAspectRatio="none"
            >
              <path
                d="M0 2 L600 2"
                stroke="#C8A882"
                strokeWidth="1"
                strokeDasharray="4 6"
                fill="none"
                style={{ strokeDasharray: "600" }}
              />
            </svg>
            {[
              {
                n: "01",
                t: "Escolha o que enviar",
                d: "Buquês, kits, rosa eterna, plantas — temos opções para cada ocasião.",
              },
              {
                n: "02",
                t: "Fale conosco no WhatsApp",
                d: "Nossa equipe te orienta, monta o pedido e confirma a entrega.",
              },
              {
                n: "03",
                t: "Receba no mesmo dia",
                d: "Entregamos em Palmas e região com todo o cuidado que o presente merece.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="relative bg-background flex flex-col items-center text-center reveal"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div
                  className="w-24 h-24 rounded-full bg-background border border-primary/40 flex items-center justify-center text-3xl text-accent-2 mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.n}
                </div>
                <h3 className="text-2xl mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contato"
        className="relative bg-secondary text-secondary-foreground py-16 md:py-32 px-5 md:px-10 overflow-hidden"
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 400 400"
        >
          <defs>
            <pattern
              id="flowers"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d={petalPath}
                fill="#C8A882"
                transform="translate(10 10) scale(0.7)"
              />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#flowers)" />
        </svg>
        <div className="relative mx-auto max-w-3xl text-center reveal">
          <p className="label-eyebrow text-primary">— Vamos lá —</p>
          <h2 className="mt-4 text-5xl md:text-7xl">
            Pronto para surpreender alguém?
          </h2>
          <p className="mt-6 font-italic-serif text-2xl text-primary/90">
            Entregamos flores e amor no mesmo dia em Palmas
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_FLORES}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-primary text-foreground px-8 py-5 hover:opacity-90 transition"
            >
              <span>🌸</span> Flores & Presentes
            </a>
            <a
              href={WA_PLANTAS}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-primary/50 px-8 py-5 hover:bg-primary/10 transition"
            >
              <span>🌿</span> Plantas & Jardim
            </a>
          </div>
          <div className="mt-14 text-sm text-secondary-foreground/70 space-y-1">
            <p>Q. 712 Sul, Av. LO 15, Lote 33 — Plano Diretor Sul, Palmas/TO</p>
            <p>Seg a Sáb · 08h às 18h</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-background/80 px-5 md:px-10 py-16">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p
              className="text-2xl text-background"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Viveiro Palmas
            </p>
            <p className="mt-3 text-sm text-background/60 max-w-xs">
              Há 26 anos transformando momentos em memórias florais.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/floriculturaviveiropalmas/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:text-dark hover:rotate-12 transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.34 2.69.93 3.36.62 4.14.32 4.9.12 5.78.06 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13C21.31 1.34 20.64.93 19.86.62 19.1.32 18.22.12 16.95.06 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:text-dark hover:rotate-12 transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="label-eyebrow text-primary mb-4">Navegue</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="link-underline">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="link-underline">
                  Nossa História
                </a>
              </li>
              <li>
                <a href="#produtos" className="link-underline">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#rosa-eterna" className="link-underline">
                  Rosa Eterna
                </a>
              </li>
              <li>
                <a href="#como-pedir" className="link-underline">
                  Como Pedir
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="label-eyebrow text-primary mb-4">Contato</p>
            <ul className="space-y-2 text-sm text-background/70">
              <li>Q. 712 Sul, Av. LO 15, Lote 33</li>
              <li>Plano Diretor Sul, Palmas/TO</li>
              <li>
                <a href="tel:+5563992509145" className="link-underline">
                  (63) 99250-9145
                </a>
              </li>
              <li>
                <a
                  href="mailto:viveirodeplantas@gmail.com"
                  className="link-underline"
                >
                  viveirodeplantas@gmail.com
                </a>
              </li>
              <li>Seg a Sáb · 08h–18h</li>
            </ul>
          </div>
          <div>
            <p className="label-eyebrow text-primary mb-4">Pagamento</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["PIX", "Visa", "Master", "Elo", "Dinheiro"].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 border border-background/20 rounded text-background/60"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] mt-12 pt-6 border-t border-primary/20 text-xs text-background/40 flex flex-col md:flex-row justify-between gap-2">
          <p>
            © {new Date().getFullYear()} Floricultura e Viveiro Palmas. Todos os
            direitos reservados.
          </p>
          <p>Feito com 🌸 em Palmas/TO</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_FLORES}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-2xl pulse-wa hover:scale-110 transition"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </main>
  );
}

function FlowerIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="16" cy="10" r="4" />
      <circle cx="10" cy="16" r="4" />
      <circle cx="22" cy="16" r="4" />
      <circle cx="16" cy="22" r="4" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="2" y="10" width="16" height="12" />
      <path d="M18 14h6l4 4v4h-10" />
      <circle cx="9" cy="24" r="2.5" />
      <circle cx="23" cy="24" r="2.5" />
    </svg>
  );
}
function BouquetIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="16" cy="8" r="3" />
      <circle cx="10" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <path d="M16 14v14M12 20l4 4M20 20l-4 4" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M16 4l3.5 8 8.5 1-6.5 6 1.5 8.5L16 23l-7 4.5 1.5-8.5L4 13l8.5-1z" />
    </svg>
  );
}

const CAT_IMG: Record<string, string> = {
  caixas: catCaixas,
  "rosa-eterna": catRosaEterna,
  rosas: catRosas,
  buques: catBuques,
  girassois: catGirassois,
  orquideas: catOrquideas,
  chocolates: catChocolates,
  pelucias: catPelucias,
  ramalhetes: catRamalhetes,
  mensageiro: catMensageiro,
};

// Versao compacta do carrossel para mobile - cards menores
function ProductCarouselCompact({ product }: { product: Produto }) {
  const images = product.images ?? [];
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setCurrent(0);
  }, [images.join("|")]);

  const goTo = (index: number) => {
    if (!hasImages) return;
    setCurrent((index + images.length) % images.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null || !hasMultiple) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const delta = touch.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 30) return;
    goTo(current + (delta < 0 ? 1 : -1));
  };

  return (
    <div
      className="mb-2 sm:mb-4 relative aspect-square sm:aspect-[4/3] overflow-hidden rounded-md border border-background/10 bg-gradient-to-br from-background/[0.08] via-background/[0.04] to-primary/[0.08] shadow-[0_8px_30px_-20px_rgba(0,0,0,0.5)]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {hasImages ? (
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={src} className="min-w-full h-full p-1.5 sm:p-3">
              <img
                src={src}
                alt={`${product.name} - foto ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,168,130,0.22),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(200,168,130,0.04))]">
          <div className="absolute inset-x-3 bottom-3 h-px bg-primary/25" />
          <div className="absolute left-3 bottom-3 h-8 w-px bg-primary/20" />
          <div className="absolute right-3 top-3 h-5 w-5 rounded-full border border-primary/20" />
        </div>
      )}

      {hasMultiple && (
        <div className="absolute inset-x-0 bottom-1.5 sm:bottom-2 flex justify-center gap-1">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Ver imagem ${index + 1} de ${product.name}`}
              onClick={() => goTo(index)}
              className={`h-1 sm:h-1.5 rounded-full transition-all ${
                index === current
                  ? "w-3 sm:w-4 bg-primary"
                  : "w-1 sm:w-1.5 bg-background/40 hover:bg-background/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCarousel({ product }: { product: Produto }) {
  const images = product.images ?? [];
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setCurrent(0);
  }, [images.join("|")]);

  const goTo = (index: number) => {
    if (!hasImages) return;
    setCurrent((index + images.length) % images.length);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null || !hasMultiple) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const delta = touch.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goTo(current + (delta < 0 ? 1 : -1));
  };

  return (
    <div
      className="mb-5 relative aspect-[4/3] overflow-hidden rounded-md border border-background/10 bg-gradient-to-br from-background/[0.08] via-background/[0.04] to-primary/[0.08] shadow-[0_18px_50px_-38px_rgba(0,0,0,0.65)]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {hasImages ? (
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={src} className="min-w-full h-full p-3 sm:p-4">
              <img
                src={src}
                alt={`${product.name} - foto ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.015]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,168,130,0.22),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(200,168,130,0.04))]">
          <div className="absolute inset-x-6 bottom-6 h-px bg-primary/25" />
          <div className="absolute left-6 bottom-6 h-16 w-px bg-primary/20" />
          <div className="absolute right-6 top-6 h-10 w-10 rounded-full border border-primary/20" />
          <div className="absolute left-5 top-5">
            <span className="label-eyebrow text-[9px] text-background/35">
              Foto em breve
            </span>
          </div>
        </div>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label={`Imagem anterior de ${product.name}`}
            onClick={() => goTo(current - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full border border-background/15 bg-dark/55 text-background/85 backdrop-blur-md transition hover:border-primary/60 hover:text-primary"
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            aria-label={`Próxima imagem de ${product.name}`}
            onClick={() => goTo(current + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full border border-background/15 bg-dark/55 text-background/85 backdrop-blur-md transition hover:border-primary/60 hover:text-primary"
          >
            <span aria-hidden>›</span>
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === current
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-background/45 hover:bg-background/75"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProdutosCatalogo() {
  const [active, setActive] = useState<string>(catalogoCategorias[0]?.slug ?? "");
  const visiveis = useMemo(() => {
    return catalogoCategorias.filter((c) => c.slug === active);
  }, [active]);

  return (
    <section
      id="produtos"
      className="relative bg-dark text-background py-12 md:py-32 px-3 sm:px-5 md:px-10 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C8A882 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-[1280px]">
        <div className="text-center max-w-2xl mx-auto reveal px-2">
          <p className="label-eyebrow text-primary">— Colecao —</p>
          <h2 className="mt-4 text-3xl sm:text-5xl md:text-7xl">Nossos Produtos</h2>
          <p className="mt-4 md:mt-6 text-sm md:text-base text-background/70">
            Composicoes unicas para cada momento — montadas a mao, entregues com
            amor. Toque em{" "}
            <span className="text-primary">&quot;Quero este produto&quot;</span> e fale
            direto com a loja no WhatsApp.
          </p>
        </div>

        {/* Filtro de categorias */}
        <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 px-1">
          {catalogoCategorias.map((c) => {
            const isActive = active === c.slug;
            return (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs md:text-sm border transition-all ${
                  isActive
                    ? "bg-primary text-dark border-primary"
                    : "border-background/20 text-background/70 hover:border-primary hover:text-primary"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-14 space-y-12 md:space-y-20">
          {visiveis.map((cat) => (
            <div key={cat.slug} className="reveal">
              {/* Cabecalho de categoria */}
              <div className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-end mb-6 md:mb-10">
                <div className="relative aspect-[2/1] sm:aspect-[16/9] md:aspect-[3/4] overflow-hidden rounded-lg">
                  <img
                    src={CAT_IMG[cat.slug] ?? catBuques}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5">
                    <p className="label-eyebrow text-primary text-[9px] md:text-[10px]">
                      Categoria
                    </p>
                    <h3
                      className="mt-1 md:mt-2 text-xl sm:text-2xl md:text-4xl text-background"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-italic-serif text-base sm:text-lg md:text-3xl text-background/85 leading-snug break-words hyphens-auto">
                    {cat.tagline}
                  </p>
                  <div className="mt-3 md:mt-4 h-px w-16 md:w-24 bg-primary/40" />
                </div>
              </div>

              {/* Grid de produtos - 3 colunas no mobile */}
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-5 items-stretch">
                {cat.products.map((p, productIndex) => (
                  <article
                    key={`${cat.slug}-${p.name}-${productIndex}`}
                    className="group flex h-full min-w-0 flex-col justify-between rounded-md sm:rounded-lg border border-background/10 bg-background/[0.035] p-2 sm:p-3 md:p-5 shadow-[0_18px_60px_-48px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background/[0.06] hover:shadow-[0_28px_80px_-52px_rgba(0,0,0,0.9)]"
                  >
                    <div className="min-w-0">
                      <ProductCarouselCompact product={p} />
                      <h4
                        className="text-[11px] sm:text-sm md:text-lg text-background leading-tight break-words line-clamp-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {p.name}
                      </h4>
                      <p className="hidden sm:block mt-2 text-xs md:text-sm text-background/65 leading-relaxed break-words line-clamp-2">
                        {p.desc}
                      </p>
                      {p.note && (
                        <p className="hidden md:block mt-2 text-[10px] italic text-background/40 leading-relaxed break-words line-clamp-2">
                          {p.note}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
                      {p.variants.map((v, vIndex) => (
                        <a
                          key={v.label}
                          href={waLinkFor(p, v)}
                          target="_blank"
                          rel="noopener"
                          className={`flex min-h-[36px] sm:min-h-[48px] md:min-h-[58px] items-center justify-between gap-1 sm:gap-3 rounded-md border border-background/10 px-1.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 transition-all hover:border-primary hover:bg-primary/10 ${
                            vIndex > 0 ? "hidden sm:flex" : ""
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-wider text-background/50 truncate">
                              {v.label}
                            </p>
                            <p
                              className="text-[11px] sm:text-sm md:text-base text-primary"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {formatBRL(v.price)}
                            </p>
                          </div>
                          <span className="shrink-0 text-[8px] sm:text-[10px] label-eyebrow text-background/60 group-hover:text-primary flex items-center gap-0.5">
                            <span className="hidden md:inline">Quero</span>
                            <span aria-hidden>→</span>
                          </span>
                        </a>
                      ))}
                      {/* Mobile: mostrar mais opcoes */}
                      {p.variants.length > 1 && (
                        <a
                          href={waLinkFor(p, p.variants[0])}
                          target="_blank"
                          rel="noopener"
                          className="sm:hidden flex items-center justify-center text-[9px] text-primary/70 py-1"
                        >
                          +{p.variants.length - 1} opcoes
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
