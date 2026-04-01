import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Expand,
  ArrowRight,
  Menu,
} from "lucide-react";

import Logo from "./assets/logo.svg?react";

/**
 * CONTENT SETUP
 * -----------------------------------------------------------------------------
 * Add real screenshots by placing files in your Vite /public folder, for example:
 * /public/screenshots/product-1/overview.png
 * /public/screenshots/product-1/task-flow.png
 *
 * Then update only the `src` values below.
 *
 * You can also use hosted image URLs instead of local files.
 */
const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const PRODUCTS_CONTENT: ProductItem[]  = [
  {
    id: "01",
    name: "Eelvisiit",
    category: "Perearstiabi digiteenindusplatvorm",
    tagline: "Siia üks lause Eelvisiidi toimimisest.",
    description:
      "Uued laused lahenduse kohta, mis on pikemad kui eelmine ja omavad kaalu ja viivad mõtte sinna kuhu vaja. Võib lisada veel miskit.",
    points: [
      "Centralized workflow management",
      "Fast status visibility for key tasks",
      "Actionable insights in one clean view",
    ],
    featureCards: [
      {
        label: "Core flow",
        text: "Show the most important workflow step in a simple visual block.",
      },
      {
        label: "Automation",
        text: "Spotlight one productivity feature or smart action users rely on.",
      },
      {
        label: "Visibility",
        text: "Demonstrate how users quickly understand status, progress, or priorities.",
      },
    ],
    screenshots: [
      {
        title: "Avaleht",
        description:
          "A clean dashboard snapshot for showcasing the core product experience and high-level visibility.",
        src: withBase("screenshots/product-1/overview.png"),
        alt: "Eelvisiidi screenshot",
      },
      {
        title: "Sümptomite valik",
        description:
          "Highlight how users move through the main workflow with speed, structure, and less manual effort.",
        src: withBase("screenshots/product-1/task-flow.png"),
        alt: "Product One task flow screenshot",
      },
      {
        title: "Triaaž",
        description:
          "Use this view to present key metrics or decision-support functionality in a focused way.",
        src: withBase("screenshots/product-1/insights.png"),
        alt: "Product One insights panel screenshot",
      },
    ],
  },
  {
    id: "02",
    name: "EelPohak",
    category: "Analytics platform",
    tagline: "Turn scattered data into confident decisions.",
    description:
      "A modern SaaS solution designed to surface the signals that matter most, so teams can prioritize, act, and improve continuously.",
    points: [
      "Live operational overview",
      "Key functionality modules highlighted clearly",
      "Simple reporting built for busy teams",
    ],
    featureCards: [
      {
        label: "Analytics",
        text: "Use a tight visual frame to explain the value of your reporting features.",
      },
      {
        label: "Prioritization",
        text: "Show how teams identify what matters most without extra complexity.",
      },
      {
        label: "Decision support",
        text: "Feature a crisp product element that reinforces clarity and confidence.",
      },
    ],
    screenshots: [
      {
        title: "Live overview",
        description:
          "Present a high-level command center view for daily monitoring, trends, and quick decisions.",
        src: withBase("screenshots/product-2/live-overview.png"),
        alt: "Product Two live overview screenshot",
      },
      {
        title: "Detailed module",
        description:
          "Open a focused screenshot that explains one important product function in context.",
        src: withBase("screenshots/product-2/detailed-module.png"),
        alt: "Product Two detailed module screenshot",
      },
      {
        title: "Reporting view",
        description:
          "Show how results, summaries, or trends are made easy to understand for busy teams.",
        src: withBase("screenshots/product-2/reporting-view.png"),
        alt: "Product Two reporting view screenshot",
      },
    ],
  },
  {
    id: "03",
    name: "Patsienditeekond",
    category: "Service experience",
    tagline: "Deliver better experiences at every touchpoint.",
    description:
      "A compact but powerful platform that helps organizations streamline service delivery while keeping the user experience intuitive and human.",
    points: [
      "Guided user journeys",
      "Highlighted product features by function",
      "Built to scale without adding complexity",
    ],
    featureCards: [
      {
        label: "Experience",
        text: "Show one UI block that captures the simplicity of the product experience.",
      },
      {
        label: "Guidance",
        text: "Highlight a specific element that helps users move forward with confidence.",
      },
      {
        label: "Scale",
        text: "Demonstrate how the product stays structured and clean as usage grows.",
      },
    ],
    screenshots: [
      {
        title: "User journey",
        description:
          "Show the core service path or interaction flow in a calm, elegant way.",
        src: withBase("screenshots/product-3/user-journey.png"),
        alt: "Product Three user journey screenshot",
      },
      {
        title: "Smart interaction",
        description:
          "Use this slot to explain an experience-enhancing product function with a more detailed screen.",
        src: withBase("screenshots/product-3/smart-interaction.png"),
        alt: "Product Three smart interaction screenshot",
      },
      {
        title: "Management view",
        description:
          "Present the operational side of the platform with a clear supporting visual.",
        src: withBase("screenshots/product-3/management-view.png"),
        alt: "Product Three management view screenshot",
      },
    ],
  },
] as const;



const contactEmail = "info@idona.ee";

/**
 * TYPOGRAPHY SETUP
 * -----------------------------------------------------------------------------
 * When you add your custom font later, place the font files in /public/fonts
 * and load them in your global CSS, for example:
 *
 * @font-face {
 *   font-family: "Idona Sans";
 *   src: url("/fonts/IdonaSans-Regular.woff2") format("woff2");
 *   font-weight: 400;
 *   font-style: normal;
 *   font-display: swap;
 * }
 *
 * Then set --font-display and --font-body to that family.
 */
const typography = {
  display: {
    fontFamily:
      'var(--font-display, "Inter Tight", "Inter", "Helvetica Neue", Arial, sans-serif)',
  },
  body: {
    fontFamily:
      'var(--font-body, "Inter", "Helvetica Neue", Arial, sans-serif)',
  },
} as const;

type ScreenshotItem = {
  title: string;
  description: string;
  src?: string;
  alt?: string;
};

type ProductItem = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  points: string[];
  featureCards: { label: string; text: string }[];
  screenshots: ScreenshotItem[];
};

function ScreenshotFrame({
  item,
  label = "Screenshot",
  className = "h-full w-full",
}: {
  item?: ScreenshotItem;
  label?: string;
  className?: string;
}) {
  const hasImage = Boolean(item?.src);

  if (hasImage && item) {
    return (
      <div className={`relative overflow-hidden bg-[#f7f8f7] ${className}`}>
        <img
          src={item.src}
          alt={item.alt || item.title || "Screenshot"}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#17322d] shadow-sm sm:left-4 sm:top-4">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#f6f8f8] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(53,103,121,0.08)_0%,rgba(114,185,186,0.10)_34%,rgba(102,173,228,0.08)_68%,rgba(235,209,152,0.16)_100%)]" />
      <div className="absolute inset-x-[12%] top-[10%] h-[64%] bg-[rgba(255,255,255,0.62)] [clip-path:polygon(0_0,100%_0,100%_82%,0_54%)]" />
      <div className="absolute bottom-[12%] left-[8%] h-[30%] w-[54%] bg-[rgba(255,255,255,0.82)] [clip-path:polygon(0_35%,100%_0,100%_78%,0_100%)]" />
      <div className="absolute bottom-[14%] right-[10%] h-[24%] w-[24%] rounded-full border border-white/80 bg-white/60" />
      <div className="absolute left-3 top-3 bg-white/94 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#17322d] shadow-sm sm:left-4 sm:top-4">
        {label}
      </div>
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
        <div className="text-[13px] font-medium text-[#17322d]">
          Add product screenshot
        </div>
        <div className="mt-1 text-[12px] leading-[1.4] text-[#53706a]">
          Replace the placeholder by setting the screenshot <code>src</code> in the content object.
        </div>
      </div>
    </div>
  );
}

export default function SaaSOnePager() {
  const products = useMemo<ProductItem[]>(() => [...PRODUCTS_CONTENT], []);
  const [activeGallery, setActiveGallery] = useState<ProductItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openGallery = (product: ProductItem, index = 0) => {
    setActiveGallery(product);
    setActiveIndex(index);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setActiveIndex(0);
  };

  const goPrev = () => {
    if (!activeGallery) return;
    setActiveIndex((prev) =>
      prev === 0 ? activeGallery.screenshots.length - 1 : prev - 1,
    );
  };

  const goNext = () => {
    if (!activeGallery) return;
    setActiveIndex((prev) =>
      prev === activeGallery.screenshots.length - 1 ? 0 : prev + 1,
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!activeGallery) return;
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGallery]);

  useEffect(() => {
    document.body.style.overflow = activeGallery || mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGallery, mobileMenuOpen]);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#17322d]" style={typography.body}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top_left,rgba(114,185,186,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(102,173,228,0.14),transparent_34%),linear-gradient(180deg,rgba(235,209,152,0.16)_0%,rgba(79,136,154,0.07)_34%,rgba(255,255,255,1)_78%)]" />
        <div className="absolute inset-x-0 top-[76px] h-[1px] bg-[linear-gradient(90deg,rgba(53,103,121,0.08),rgba(114,185,186,0.14),rgba(102,173,228,0.12),rgba(235,209,152,0.16))]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 pb-14 pt-3 sm:px-6 md:px-8 lg:px-10">
        <header className="border-y border-[rgba(23,50,45,0.08)] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-4 sm:px-5 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                  <Logo className="h-8 w-auto text-[#17322d]" />
                </div>
            </div>

            <nav
              className="hidden items-center gap-8 text-[14px] tracking-[-0.02em] text-[#26423d] lg:flex"
              style={typography.body}
            >
              <a href="#product-1" className="transition hover:opacity-65">
                EelVisiit
              </a>
              <a href="#product-2" className="transition hover:opacity-65">
                EelPohak
              </a>
              <a href="#product-3" className="transition hover:opacity-65">
                Patsienditeekond
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="hidden bg-[#17322d] px-5 py-3 text-[14px] font-medium tracking-[-0.02em] text-white transition hover:bg-[#0f2521] sm:inline-flex lg:px-6"
                style={typography.body}
              >
                Võta ühendust
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 text-[14px] text-[#26423d] lg:hidden"
              >
                <Menu className="h-5 w-5" />
                Menu
              </button>
            </div>
          </div>
        </header>

        <section className="relative px-1 pt-10 sm:pt-14 lg:pt-16">
          <div className="mx-auto max-w-[1320px]">
            <div
              className="inline-flex bg-[#c2dce3] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#17322d]"
              style={typography.body}
            >
              Idona lahendused
            </div>
            <h1
              className="
                mt-6
                max-w-none
                text-[clamp(2.4rem,9vw,6rem)]
                leading-[0.9]
                tracking-[-0.055em]
                text-[#17322d]
              "
              style={typography.display}
            >
              <span className="block whitespace-nowrap">Loome lahendusi</span>
              <span className="block whitespace-nowrap">meedikutele,</span>
              <span className="block whitespace-nowrap">patsientide heaks</span>
            </h1>

            <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_0.52fr] xl:items-end">
              <p
                className="max-w-[560px] text-[18px] leading-[1.24] tracking-[-0.035em] text-[#26423d] sm:text-[21px]"
                style={typography.display}
              >
                Aitame vähendada töökoormust, parandada patsiendiohutust ja tuua fookuse sinna, kus see loeb, parematele otsustele ja ravitulemustele.
              </p>
              <p className="max-w-[420px] text-[15px] leading-[1.5] text-[#356779] sm:text-[16px]">
                -
              </p>
              <div className="border-t border-[rgba(23,50,45,0.10)] pt-4 xl:justify-self-end xl:border-t-0 xl:pt-0">
                <div className="text-[24px] tracking-[-0.065em] text-[#17322d]" style={typography.display}>
                  i
                </div>
                <div className="text-[14px] text-[#53706a]">pilt lisada!</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-[1360px] space-y-0 border-t border-[rgba(23,50,45,0.08)] sm:mt-16">
          {products.map((product, productIndex) => {
            const previewShot = product.screenshots?.[0];

            return (
              <motion.article
                id={`product-${productIndex + 1}`}
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-8 border-b border-[rgba(23,50,45,0.08)] py-8 sm:gap-10 sm:py-10 lg:grid-cols-[0.92fr_1.08fr] lg:py-12"
              >
                <div className="pr-0 lg:pr-10">
                  <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#53706a] sm:text-[12px]">
                    <span>{product.id}</span>
                    <span className="h-px w-10 bg-[rgba(23,50,45,0.10)]" />
                    <span>{product.category}</span>
                  </div>
                  <h2
                    className="max-w-[640px] text-[clamp(2rem,5.6vw,4rem)] font-normal leading-[0.92] tracking-[-0.072em] text-[#17322d]"
                    style={typography.display}
                  >
                    {product.name}
                  </h2>
                  <p
                    className="mt-3 max-w-[620px] text-[clamp(1.05rem,2.3vw,1.45rem)] leading-[1.12] tracking-[-0.035em] text-[#26423d]"
                    style={typography.display}
                  >
                    {product.tagline}
                  </p>
                  <p className="mt-5 max-w-[620px] text-[15px] leading-[1.6] text-[#53706a] sm:text-[17px]">
                    {product.description}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {product.points.map((point) => (
                      <div key={point} className="border-t border-[rgba(23,50,45,0.08)] pt-4">
                        <div className="mb-3 h-[2px] w-12 bg-[#17322d] opacity-80" />
                        <p className="text-[14px] leading-[1.45] text-[#35504b] sm:text-[15px]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  <button
                    type="button"
                    onClick={() => openGallery(product, 0)}
                    className="group block w-full text-left"
                  >
                    <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white shadow-[0_14px_40px_rgba(23,50,45,0.07)] transition duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between border-b border-[rgba(23,50,45,0.08)] px-4 py-3 sm:px-5 sm:py-4">
                        <div
                          className="text-[11px] uppercase tracking-[0.16em] text-[#356779] sm:text-[12px]"
                          style={typography.body}
                        >
                          {product.category}
                        </div>
                        <div className="inline-flex items-center gap-2 text-[12px] text-[#26423d] sm:text-[13px]">
                          <span>Vaata lähemalt</span>
                          <Expand className="h-3.5 w-3.5" />
                        </div>
                      </div>

                      <div className="bg-[linear-gradient(135deg,rgba(79,136,154,0.06)_0%,rgba(114,185,186,0.08)_38%,rgba(102,173,228,0.08)_72%,rgba(235,209,152,0.12)_100%)] p-3 sm:p-4">
                        <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white">
                          <ScreenshotFrame
                            item={previewShot}
                            label="Eelvaade"
                            className="h-[240px] w-full sm:h-[320px] lg:h-[360px]"
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {product.featureCards.map((card, index) => (
                      <button
                        key={card.label}
                        type="button"
                        onClick={() => openGallery(product, index)}
                        className="group border border-[rgba(23,50,45,0.10)] bg-white p-4 text-left transition hover:border-[rgba(23,50,45,0.18)] hover:shadow-[0_8px_24px_rgba(23,50,45,0.05)]"
                      >
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#53706a]">
                          {card.label}
                        </div>
                        <div className="mt-3 h-[88px] overflow-hidden bg-[linear-gradient(90deg,rgba(53,103,121,0.12)_0%,rgba(79,136,154,0.10)_25%,rgba(114,185,186,0.12)_50%,rgba(102,173,228,0.12)_75%,rgba(235,209,152,0.16)_100%)]">
                          <div className="h-full w-full bg-[linear-gradient(160deg,transparent_0%,transparent_40%,rgba(255,255,255,0.68)_40%,rgba(255,255,255,0.68)_68%,transparent_68%)]" />
                        </div>
                        <p className="mt-4 text-[14px] leading-[1.45] text-[#53706a]">
                          {card.text}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.screenshots.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => openGallery(product, index)}
                        className="border border-[rgba(23,50,45,0.10)] bg-white px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#26423d] transition hover:bg-[#f7fbfb] sm:px-4 sm:text-[12px]"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </section>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-[rgba(23,50,45,0.08)] px-4 py-4 sm:px-6">
              <div
                className="text-[14px] font-medium uppercase tracking-[0.12em] text-[#17322d]"
                style={typography.body}
              >
                Menu
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(23,50,45,0.10)]"
              >
                <X className="h-5 w-5 text-[#17322d]" />
              </button>
            </div>
            <div className="flex flex-col px-4 py-6 sm:px-6">
              <a
                href="#product-1"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[rgba(23,50,45,0.08)] py-4 text-[28px] tracking-[-0.065em] text-[#17322d]"
                style={typography.display}
              >
                Eelvisiit
              </a>
              <a
                href="#product-2"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[rgba(23,50,45,0.08)] py-4 text-[28px] tracking-[-0.065em] text-[#17322d]"
                style={typography.display}
              >
                EelPohak
              </a>
              <a
                href="#product-3"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[rgba(23,50,45,0.08)] py-4 text-[28px] tracking-[-0.065em] text-[#17322d]"
                style={typography.display}
              >
                Patsienditeekond
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-6 inline-flex w-fit bg-[#17322d] px-5 py-3 text-[14px] font-medium tracking-[-0.02em] text-white"
                style={typography.body}
              >
                Võta ühendust
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[rgba(255,255,255,0.92)] backdrop-blur-sm"
          >
            <div className="absolute inset-0 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.99 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="mx-auto min-h-screen w-full max-w-[1440px] bg-white"
              >
                <div className="border-b border-[rgba(23,50,45,0.08)] bg-white px-4 py-4 sm:px-6 md:px-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-[#53706a] sm:text-[12px]">
                        {activeGallery.category}
                      </div>
                      <h3
                        className="mt-2 max-w-[760px] text-[clamp(2rem,6vw,4.2rem)] font-normal leading-[0.9] tracking-[-0.075em] text-[#17322d]"
                        style={typography.display}
                      >
                        {activeGallery.screenshots[activeIndex].title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={closeGallery}
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[rgba(23,50,45,0.10)] bg-white transition hover:bg-[#f7fbfb]"
                    >
                      <X className="h-5 w-5 text-[#17322d]" />
                    </button>
                  </div>
                </div>

                <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="border-b border-[rgba(23,50,45,0.08)] p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                    <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white shadow-[0_16px_44px_rgba(23,50,45,0.08)]">
                      <div className="bg-[linear-gradient(135deg,rgba(79,136,154,0.05)_0%,rgba(114,185,186,0.06)_40%,rgba(102,173,228,0.06)_74%,rgba(235,209,152,0.10)_100%)] p-3 sm:p-4">
                        <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white">
                          <ScreenshotFrame
                            item={activeGallery.screenshots[activeIndex]}
                            label="Functionality view"
                            className="h-[280px] w-full sm:h-[380px] lg:h-[560px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(247,251,251,0.72)_100%)] p-4 sm:p-6 lg:p-8">
                    <div>
                      <div className="inline-flex bg-[#d9f245] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#17322d]">
                        Functionality description
                      </div>
                      <p
                        className="mt-5 max-w-[560px] text-[18px] leading-[1.26] tracking-[-0.03em] text-[#26423d] sm:text-[22px]"
                        style={typography.display}
                      >
                        {activeGallery.screenshots[activeIndex].description}
                      </p>

                      <div className="mt-7 space-y-3">
                        {activeGallery.screenshots.map((item, index) => (
                          <button
                            key={item.title}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`w-full border p-3 text-left transition sm:p-4 ${
                              index === activeIndex
                                ? "border-[rgba(23,50,45,0.18)] bg-[#f7fbfb]"
                                : "border-[rgba(23,50,45,0.08)] bg-white hover:bg-[#f8fbfb]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="min-w-0">
                                <p
                                  className="text-[15px] font-medium tracking-[-0.03em] text-[#17322d]"
                                  style={typography.display}
                                >
                                  {item.title}
                                </p>
                                <p className="mt-1.5 line-clamp-2 text-[13px] leading-[1.45] text-[#53706a] sm:text-[14px]">
                                  {item.description}
                                </p>
                              </div>
                              <div className="shrink-0 text-[#356779]">
                                <ArrowRight className="h-4 w-4" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(23,50,45,0.08)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={goPrev}
                        className="inline-flex items-center justify-center gap-2 border border-[rgba(23,50,45,0.10)] bg-white px-4 py-3 text-[14px] font-medium text-[#26423d] transition hover:bg-[#f7fbfb]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex items-center justify-center gap-2 bg-[#17322d] px-4 py-3 text-[14px] font-medium text-white transition hover:bg-[#0f2521]"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
