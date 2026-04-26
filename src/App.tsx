import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  Menu,
  Heart,
  Users,
  Layers,
  Globe,
  Mail,
  Send,
} from "lucide-react";
import {
  buildSiteTranslations,
  type IconName,
  type Language,
  type ScreenshotPreviewItem,
} from "./translations";

// Logo imported from public folder via withBase()

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
const contactEmail = "al.roslin@gmail.com";
const languagePathByCode: Record<Language, string> = {
  et: "ee",
  en: "en",
};
const languageByPathSegment: Record<string, Language> = {
  ee: "et",
  et: "et",
  en: "en",
};

function getLanguageFromPathname(pathname: string): Language | null {
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1)?.toLowerCase();

  if (!lastSegment) {
    return null;
  }

  return languageByPathSegment[lastSegment] ?? null;
}

function getPathnameForLanguage(pathname: string, language: Language): string {
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments.at(-1)?.toLowerCase();

  if (lastSegment && lastSegment in languageByPathSegment) {
    segments.pop();
  }

  segments.push(languagePathByCode[language]);

  return `/${segments.join("/")}`;
}

function getLanguageFromLocation(): Language {
  if (typeof window === "undefined") {
    return "et";
  }

  // Check if this is a redirect from 404.html (GitHub Pages SPA routing fix)
  let pathname = window.location.pathname;
  if (typeof sessionStorage !== "undefined" && sessionStorage.redirect) {
    pathname = sessionStorage.redirect.split("?")[0].split("#")[0];
    delete sessionStorage.redirect;
  }

  return getLanguageFromPathname(pathname) ?? "et";
}

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

function ScreenshotFrame({
  item,
  className = "h-full w-full",
}: {
  item?: ScreenshotPreviewItem;
  className?: string;
}) {
  const [failedSources, setFailedSources] = useState<Record<string, true>>({});
  const imageSrc = item?.src;
  const hasImage = Boolean(imageSrc) && !failedSources[imageSrc ?? ""];

  if (hasImage && item) {
    return (
      <div className={`relative overflow-hidden bg-[#f7f8f7] ${className}`}>
        <img
          src={item.src}
          alt={item.alt || item.title || "Screenshot"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => {
            if (!imageSrc) return;
            setFailedSources((previous) => ({
              ...previous,
              [imageSrc]: true,
            }));
          }}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#f6f8f8] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(53,103,121,0.08)_0%,rgba(114,185,186,0.10)_34%,rgba(102,173,228,0.08)_68%,rgba(235,209,152,0.16)_100%)]" />
      <div className="absolute inset-x-[12%] top-[10%] h-[64%] bg-[rgba(255,255,255,0.62)] [clip-path:polygon(0_0,100%_0,100%_82%,0_54%)]" />
      <div className="absolute bottom-[12%] left-[8%] h-[30%] w-[54%] bg-[rgba(255,255,255,0.82)] [clip-path:polygon(0_35%,100%_0,100%_78%,0_100%)]" />
      <div className="absolute bottom-[14%] right-[10%] h-[24%] w-[24%] rounded-full border border-white/80 bg-white/60" />
    </div>
  );
}

export default function SaaSOnePager() {
  const [language, setLanguage] = useState<Language>(getLanguageFromLocation);
  const siteTranslations = useMemo(() => buildSiteTranslations(withBase), []);
  const content = siteTranslations[language];
  // Temporary visibility toggle by product id; keep product content editable in translations.
  const hiddenProductIds = new Set(["03"]);
  const products = content.products.filter((product) => !hiddenProductIds.has(product.id));
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const activeGallery =
    activeGalleryId === null
      ? null
      : products.find((product) => product.id === activeGalleryId) ?? null;
  const languageOptions: Language[] = ["et", "en"];

  const openGallery = (productId: string, index = 0) => {
    setActiveGalleryId(productId);
    setActiveIndex(index);
  };

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    if (typeof window === "undefined") {
      return;
    }

    const nextPathname = getPathnameForLanguage(
      window.location.pathname,
      nextLanguage,
    );
    const nextUrl = `${nextPathname}${window.location.search}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.pushState(window.history.state, "", nextUrl);
    }
  };

  const closeGallery = () => {
    setActiveGalleryId(null);
    setActiveIndex(0);
  };

  const closeContactModal = () => {
    setContactModalOpen(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmissionStatus("idle");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "8f53b0ee-68e7-4059-a1e8-f84986ef50b5",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: "Idona Contact Form",
          to_email: contactEmail,
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          closeContactModal();
        }, 2000);
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!activeGallery) return;
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) =>
          prev === 0 ? activeGallery.screenshots.length - 1 : prev - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) =>
          prev === activeGallery.screenshots.length - 1 ? 0 : prev + 1,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeGallery]);

  useEffect(() => {
    document.body.style.overflow = activeGallery || mobileMenuOpen || contactModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeGallery, mobileMenuOpen, contactModalOpen]);

  useEffect(() => {
    const onPopState = () => {
      setLanguage(getLanguageFromLocation());
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // After 404.html redirect, the URL shows /index.html but we want it to show /en or /ee
    // This effect normalizes the URL on first load
    if (typeof window === "undefined") {
      return;
    }

    const currentPathname = window.location.pathname;
    const expectedPathname = getPathnameForLanguage(currentPathname, language);

    if (
      currentPathname.endsWith("/index.html") &&
      expectedPathname !== currentPathname
    ) {
      window.history.replaceState(window.history.state, "", expectedPathname);
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main className="min-h-screen bg-white text-[#17322d]" style={typography.body}>
      <header className="sticky top-0 z-50 border-y border-[rgba(23,50,45,0.08)] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-4 sm:px-5 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                  <img src={withBase("Idona_Lahendsued_Logo.svg")} alt="Idona logo" className="h-8 w-auto" />
                </div>
            </div>

            <nav
              className="hidden items-center gap-8 text-[14px] tracking-[-0.02em] text-[#26423d] lg:flex"
              style={typography.body}
            >
              {products.map((product, index) => (
                <a
                  key={product.id}
                  href={`#product-${index + 1}`}
                  className="transition hover:opacity-65"
                >
                  {product.name}
                </a>
              ))}
              <a href="#meist" className="transition hover:opacity-65">
                {content.aboutLabel}
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <div
                className="hidden items-center overflow-hidden border border-[rgba(23,50,45,0.12)] bg-white sm:inline-flex"
                aria-label={content.languageSelectorLabel}
                role="group"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectLanguage(option)}
                    aria-pressed={language === option}
                    className={`px-3 py-2 text-[12px] font-medium tracking-[0.08em] transition ${
                      language === option
                        ? "bg-[#17322d] text-white"
                        : "text-[#26423d] hover:bg-[#f4f8f8]"
                    }`}
                  >
                    {siteTranslations[option].shortLabel}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setContactModalOpen(true)}
                className="hidden bg-[#17322d] px-5 py-3 text-[14px] font-medium tracking-[-0.02em] text-white transition hover:bg-[#0f2521] sm:inline-flex lg:px-6"
                style={typography.body}
                aria-label={content.contactLabel}
              >
                {content.contactLabel}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 text-[14px] text-[#26423d] lg:hidden"
                aria-label={content.openMenuLabel}
              >
                <Menu className="h-5 w-5" />
                {content.menuLabel}
              </button>
            </div>
          </div>
        </header>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(circle_at_top_left,rgba(114,185,186,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(102,173,228,0.14),transparent_34%),linear-gradient(180deg,rgba(235,209,152,0.16)_0%,rgba(79,136,154,0.07)_34%,rgba(255,255,255,1)_78%)]" />
          <div className="absolute inset-x-0 top-[76px] h-[1px] bg-[linear-gradient(90deg,rgba(53,103,121,0.08),rgba(114,185,186,0.14),rgba(102,173,228,0.12),rgba(235,209,152,0.16))]" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 pb-14 pt-3 sm:px-6 md:px-8 lg:px-10">
          <section className="relative px-1 pt-10 sm:pt-14 lg:pt-16">
            <div className="mx-auto max-w-[1320px] flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <div>
              <div
                className="inline-flex bg-[#c2dce3] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#17322d]"
                style={typography.body}
              >
                {content.hero.eyebrow}
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
                {content.hero.titleLines.map((line) => (
                  <span key={line} className="block whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>

              <div className="mt-8 sm:mt-10">
                <p
                  className="max-w-[560px] text-[18px] leading-[1.24] tracking-[-0.035em] text-[#26423d] sm:text-[21px]"
                  style={typography.display}
                >
                  {content.hero.description}
                </p>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 lg:mt-0 flex justify-center">
              <img src={withBase("Idona_Hero_SVG.svg")} alt="Idona hero visual" className="w-full max-w-[280px]" />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-[1360px] space-y-0 border-t border-[rgba(23,50,45,0.08)] sm:mt-16">
          {products.map((product, productIndex) => {
            const previewShot = product.mainPreview ?? product.featureCards?.[1]?.screenshot;

            return (
              <motion.article
                id={`product-${productIndex + 1}`}
                key={product.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="scroll-mt-24 grid gap-8 border-b border-[rgba(23,50,45,0.08)] py-8 sm:scroll-mt-28 sm:gap-10 sm:py-10 lg:scroll-mt-32 lg:grid-cols-[0.92fr_1.08fr] lg:py-12"
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
                    onClick={() => openGallery(product.id, 0)}
                    className="group block w-full text-left"
                  >
                    <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white shadow-[0_14px_40px_rgba(23,50,45,0.07)] transition duration-300 hover:-translate-y-1">
                      <div className="bg-[linear-gradient(135deg,rgba(79,136,154,0.06)_0%,rgba(114,185,186,0.08)_38%,rgba(102,173,228,0.08)_72%,rgba(235,209,152,0.12)_100%)] p-3 sm:p-4">
                        <div className="overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white">
                          <ScreenshotFrame
                            item={previewShot}
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
                        onClick={() => openGallery(product.id, index)}
                        className="group border border-[rgba(23,50,45,0.10)] bg-white p-4 text-left transition hover:border-[rgba(23,50,45,0.18)] hover:shadow-[0_8px_24px_rgba(23,50,45,0.05)]"
                      >
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#53706a]">
                          {card.label}
                        </div>
                        <div className="mt-3 overflow-hidden border border-[rgba(23,50,45,0.10)] bg-white">
                          <ScreenshotFrame
                            item={card.screenshot}
                            className="h-[108px] w-full"
                          />
                        </div>
                        <p className="mt-4 text-[14px] leading-[1.45] text-[#53706a]">
                          {card.text}
                        </p>
                      </button>
                    ))}
                  </div>

                </div>
              </motion.article>
            );
          })}
        </section>

        <motion.section
          id="meist"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative left-1/2 right-1/2 mt-12 w-screen -translate-x-1/2 scroll-mt-24 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(114,185,186,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(102,173,228,0.12),transparent_36%),linear-gradient(180deg,rgba(235,209,152,0.14)_0%,rgba(79,136,154,0.08)_34%,rgba(247,251,251,0.92)_100%)] py-8 sm:mt-16 sm:scroll-mt-28 sm:py-10 lg:scroll-mt-32 lg:py-12"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0)_100%)]" />
          <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
            <h2
              className="mx-auto max-w-[1080px] pt-3 pb-3 text-center text-[clamp(1.45rem,3.3vw,2.7rem)] font-normal leading-[1.05] tracking-[-0.045em] text-[#17322d] sm:pt-4 sm:pb-4 lg:pt-5 lg:pb-5"
              style={typography.display}
            >
              {content.companyIntro.title}
            </h2>

            <div className="mt-7 space-y-5 sm:mt-9 sm:space-y-6">
            {content.companyIntro.items.map((item, index) => {
              const imageFirst = index % 2 === 1;
              const iconMap: Record<IconName, React.ReactNode> = {
                Heart: <Heart className="h-12 w-12 text-[#4a8a7f]" />,
                Users: <Users className="h-12 w-12 text-[#4a8a7f]" />,
                Layers: <Layers className="h-12 w-12 text-[#4a8a7f]" />,
                Globe: <Globe className="h-12 w-12 text-[#4a8a7f]" />,
              };

              return (
                <article
                  key={item.text}
                  className="grid gap-4 border border-[rgba(23,50,45,0.16)] bg-white/95 p-4 shadow-[0_14px_34px_rgba(23,50,45,0.08)] sm:gap-5 sm:p-5 lg:grid-cols-2 lg:items-center lg:gap-7 lg:p-6"
                >
                  <div className={imageFirst ? "order-last lg:order-2" : "order-last lg:order-none"}>
                    <p className="text-[15px] leading-[1.6] text-[#53706a] sm:text-[17px]">
                      {item.text}
                    </p>
                  </div>

                  <div className={imageFirst ? "order-first lg:order-1" : "order-first lg:order-none"}>
                    <div className="flex items-center justify-center">
                      <div className="inline-flex items-center justify-center h-20 w-20 rounded-lg bg-[linear-gradient(135deg,rgba(79,136,154,0.08)_0%,rgba(114,185,186,0.10)_38%,rgba(102,173,228,0.09)_72%,rgba(235,209,152,0.14)_100%)] border border-[rgba(23,50,45,0.12)]">
                        {iconMap[item.icon]}
                      </div>
                    </div>
                  </div>
                </article>
              );
              })}
            </div>
          </div>
        </motion.section>
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
                {content.menuLabel}
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(23,50,45,0.10)]"
                aria-label={content.closeMenuLabel}
              >
                <X className="h-5 w-5 text-[#17322d]" />
              </button>
            </div>
            <div className="flex flex-col px-4 py-6 sm:px-6">
              {products.map((product, index) => (
                <a
                  key={product.id}
                  href={`#product-${index + 1}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-[rgba(23,50,45,0.08)] py-4 text-[28px] tracking-[-0.065em] text-[#17322d]"
                  style={typography.display}
                >
                  {product.name}
                </a>
              ))}
              <a
                href="#meist"
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-[rgba(23,50,45,0.08)] py-4 text-[28px] tracking-[-0.065em] text-[#17322d]"
                style={typography.display}
              >
                {content.aboutLabel}
              </a>
              <div
                className="mt-6 inline-flex w-fit items-center overflow-hidden border border-[rgba(23,50,45,0.12)] bg-white"
                aria-label={content.languageSelectorLabel}
                role="group"
              >
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectLanguage(option)}
                    aria-pressed={language === option}
                    className={`px-4 py-2 text-[12px] font-medium tracking-[0.08em] transition ${
                      language === option
                        ? "bg-[#17322d] text-white"
                        : "text-[#26423d] hover:bg-[#f4f8f8]"
                    }`}
                  >
                    {siteTranslations[option].shortLabel}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setContactModalOpen(true)}
                className="mt-6 inline-flex w-fit bg-[#17322d] px-5 py-3 text-[14px] font-medium tracking-[-0.02em] text-white"
                style={typography.body}
                aria-label={content.contactLabel}
              >
                {content.contactLabel}
              </button>
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
                      aria-label={content.closeGalleryLabel}
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
                            className="h-[280px] w-full sm:h-[380px] lg:h-[560px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(247,251,251,0.72)_100%)] p-4 sm:p-6 lg:p-8">
                    <div>
                      <p
                        className="max-w-[560px] text-[18px] leading-[1.26] tracking-[-0.03em] text-[#26423d] sm:text-[22px]"
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


                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactModalOpen && (
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
                className="mx-auto min-h-screen w-full max-w-[600px] bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-center"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h2
                    className="text-[clamp(2rem,5vw,3rem)] font-normal leading-[0.9] tracking-[-0.075em] text-[#17322d]"
                    style={typography.display}
                  >
                    {content.contact.modalTitle}
                  </h2>
                  <button
                    type="button"
                    onClick={closeContactModal}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[rgba(23,50,45,0.10)] bg-white transition hover:bg-[#f7fbfb]"
                    aria-label={content.contact.closeLabel}
                  >
                    <X className="h-5 w-5 text-[#17322d]" />
                  </button>
                </div>

                <div className="mb-6 flex items-center gap-3 p-4 bg-[rgba(79,136,154,0.05)] border border-[rgba(23,50,45,0.10)]">
                  <Mail className="h-5 w-5 text-[#4a8a7f] shrink-0" />
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.12em] text-[#53706a]">
                      {content.contact.emailLabel}
                    </p>
                    <p className="text-[16px] font-medium text-[#17322d]">
                      {content.contact.email}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[14px] font-medium tracking-[-0.02em] text-[#17322d] mb-2"
                      style={typography.body}
                    >
                      {content.contact.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder={content.contact.namePlaceholder}
                      required
                      className="w-full border border-[rgba(23,50,45,0.10)] bg-white px-4 py-3 text-[14px] placeholder-[#a0b2af] focus:outline-none focus:border-[rgba(23,50,45,0.20)] focus:ring-1 focus:ring-[rgba(79,136,154,0.20)]"
                      style={typography.body}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[14px] font-medium tracking-[-0.02em] text-[#17322d] mb-2"
                      style={typography.body}
                    >
                      {content.contact.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      required
                      className="w-full border border-[rgba(23,50,45,0.10)] bg-white px-4 py-3 text-[14px] placeholder-[#a0b2af] focus:outline-none focus:border-[rgba(23,50,45,0.20)] focus:ring-1 focus:ring-[rgba(79,136,154,0.20)]"
                      style={typography.body}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-[14px] font-medium tracking-[-0.02em] text-[#17322d] mb-2"
                      style={typography.body}
                    >
                      {content.contact.subjectLabel}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      placeholder={content.contact.subjectPlaceholder}
                      required
                      className="w-full border border-[rgba(23,50,45,0.10)] bg-white px-4 py-3 text-[14px] placeholder-[#a0b2af] focus:outline-none focus:border-[rgba(23,50,45,0.20)] focus:ring-1 focus:ring-[rgba(79,136,154,0.20)]"
                      style={typography.body}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[14px] font-medium tracking-[-0.02em] text-[#17322d] mb-2"
                      style={typography.body}
                    >
                      {content.contact.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder={content.contact.messagePlaceholder}
                      required
                      rows={5}
                      className="w-full border border-[rgba(23,50,45,0.10)] bg-white px-4 py-3 text-[14px] placeholder-[#a0b2af] focus:outline-none focus:border-[rgba(23,50,45,0.20)] focus:ring-1 focus:ring-[rgba(79,136,154,0.20)]"
                      style={typography.body}
                    />
                  </div>

                  {submissionStatus === "success" && (
                    <div className="p-4 bg-[rgba(74,138,127,0.08)] border border-[rgba(74,138,127,0.20)] text-[14px] text-[#4a8a7f]">
                      {content.contact.successMessage}
                    </div>
                  )}

                  {submissionStatus === "error" && (
                    <div className="p-4 bg-[rgba(220,97,97,0.08)] border border-[rgba(220,97,97,0.20)] text-[14px] text-[#dc6161]">
                      {content.contact.errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submissionStatus === "loading"}
                    className="w-full bg-[#17322d] px-5 py-3 text-[14px] font-medium tracking-[-0.02em] text-white transition hover:bg-[#0f2521] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={typography.body}
                  >
                    <Send className="h-4 w-4" />
                    {submissionStatus === "loading"
                      ? language === "et"
                        ? "Saatmine..."
                        : "Sending..."
                      : content.contact.sendButton}
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
