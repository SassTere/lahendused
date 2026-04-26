export type Language = "et" | "en";

export type IconName = "Heart" | "Users" | "Layers" | "Globe";

export type ScreenshotItem = {
  title: string;
  description: string;
  src?: string;
  alt?: string;
};

export type ScreenshotPreviewItem = {
  src?: string;
  alt?: string;
  title?: string;
};

export type ProductItem = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  points: string[];
  mainPreview?: ScreenshotPreviewItem;
  featureCards: {
    label: string;
    text: string;
    screenshot: ScreenshotPreviewItem;
  }[];
  screenshots: ScreenshotItem[];
};

export type CompanyIntroItem = {
  text: string;
  icon: IconName;
};

export type SiteTranslation = {
  shortLabel: string;
  languageSelectorLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  closeGalleryLabel: string;
  menuLabel: string;
  aboutLabel: string;
  contactLabel: string;
  hero: {
    eyebrow: string;
    titleLines: string[];
    description: string;
  };
  companyIntro: {
    title: string;
    items: CompanyIntroItem[];
  };
  products: ProductItem[];
};

const productAssets = {
  product1: {
    featureCards: [
      "screenshots/product-1/fc_p1_1.png",
      "screenshots/product-1/fc_p1_2.png",
      "screenshots/product-1/fc_p1_3.png",
    ],
    mainPreview: "screenshots/product-1/main_preview_product_1.png",
    gallery: [
      "screenshots/product-1/g_p1_1.png",
      "screenshots/product-1/g_p1_2.png",
      "screenshots/product-1/g_p1_3.png",
    ],
  },
  product2: {
    featureCards: [
      "screenshots/product-2/fc_p2_1.png",
      "screenshots/product-2/fc_p2_2.png",
      "screenshots/product-2/fc_p2_3.png",
    ],
    mainPreview: "screenshots/product-2/main_preview_product_2.png",
    gallery: [
      "screenshots/product-2/g_p2_1.png",
      "screenshots/product-2/g_p2_2.png",
      "screenshots/product-2/g_p2_3.png",
    ],
  },
  product3: {
    featureCards: [
      "screenshots/product-3/fc_p3_1.png",
      "screenshots/product-3/fc_p3_2.png",
      "screenshots/product-3/fc_p3_3.png",
    ],
    mainPreview: "screenshots/product-3/main_preview_product_3.png",
    gallery: [
      "screenshots/product-3/g_p3_1.png",
      "screenshots/product-3/g_p3_2.png",
      "screenshots/product-3/g_p3_3.png",
    ],
  },
} as const;

export function buildSiteTranslations(
  withBase: (path: string) => string,
): Record<Language, SiteTranslation> {
  return {
    et: {
      shortLabel: "EE",
      languageSelectorLabel: "Vali keel",
      openMenuLabel: "Ava menüü",
      closeMenuLabel: "Sulge menüü",
      closeGalleryLabel: "Sulge galerii",
      menuLabel: "Menüü",
      aboutLabel: "Meist",
      contactLabel: "Võta ühendust",
      hero: {
        eyebrow: "Idona lahendused",
        titleLines: ["Loome lahendusi", "meedikutele,", "patsientide heaks"],
        description:
          "Aitame vähendada töökoormust, parandada patsiendiohutust ja tuua fookuse sinna, kus see loeb, parematele otsustele ja ravitulemustele.",
      },
      companyIntro: {
        title:
          "Idona on kaasaegne esmatasandi tervishoiu teenusepakkuja, mis ühendab perearstiabi, digitaalsed lahendused ja andmepõhise juhtimise ühtseks tervikuks.",
        items: [
          {
            text: "Meie eesmärk on pakkuda kvaliteetset, kättesaadavat ja jätkusuutlikku arstiabi, toetades samal ajal tervishoiutöötajate tööd ning parandades patsientide kogemust. Selle saavutamiseks arendame ja rakendame lahendusi, mis suunavad patsiendid õigel ajal õigesse teenusesse, optimeerivad töövooge ning võimaldavad järjepidevat kvaliteedi mõõtmist ja parendamist.",
            icon: "Heart",
          },
          {
            text: "Oleme partneriks Sotsiaalministeeriumile, Tervisekassale, Terviseametile ja erialaorganisatsioonidele, et leida ja katsetada lahendusi, mis toimivad üle Eesti. Meie roll on olla julge testija ning töötada koostöös partneritega välja mudelid, mis on rakendatavad kogu tervishoiusüsteemis.",
            icon: "Users",
          },
          {
            text: "Terviseagentuur tegutseb ühtse organisatsioonina, sõltumata keskuse asukohast ja suurusest, kus kliiniline töö, digitaalsed tööriistad ja juhtimissüsteemid on omavahel integreeritud. See loob eeldused tõhusaks meeskonnatööks, paremateks ravitulemusteks ning teenuse skaleeritavuseks erinevates piirkondades. Samuti võimaldab see kiiret reageerimist piirkondlikele vajadustele ja tervishoiukriisidele.",
            icon: "Layers",
          },
          {
            text: "Meil on võimekus lahendusi kiiresti juurutada ja katsetada kaheksas keskuses üle Eesti, hõlmates ligikaudu 25 000 patsienti. See annab meile reaalsel kasutusel põhineva teadmise, millele tuginedes teha sisulisi ja mõjusaid ettepanekuid kogu tervishoiusüsteemi arendamiseks.",
            icon: "Globe",
          },
        ],
      },
      products: [
        {
          id: "01",
          name: "Eelvisiit",
          category: "Perearstiabi digiteenindusplatvorm",
          tagline:
            "Eelvisiit on 24/7 digilahendus, mis võimaldab patsiendil edastada oma tervisemure ja jõuda kiiresti õige spetsialistini.",
          description:
            "Patsient kirjeldab oma muret iseteeninduses, läbib vajadusel sümptomiküsimustiku ning saab esmase tagasiside juba enne kontaktvisiiti. Pöördumine suunatakse automaatselt sobivaima spetsialisti töölauale, mis kiirendab abi saamist, vähendab ülekoormust ja muudab töö sujuvamaks.",
          points: [
            "Kõik patsiendi pöördumised kogutakse ühte süsteemi ja suunatakse automaatselt sobiva spetsialisti töölauale",
            "Patsient saab kohe ülevaate oma pöördumise tulemusest ning järgmised sammud on selgelt mõistetavad",
            "Struktureeritud eelinfo ja sümptomite kaardistus võimaldavad teha kiiremaid ja täpsemaid raviotsuseid",
          ],
          featureCards: [
            {
              label: "Sümptomite valik",
              text: "Patsient valib oma sümptomid ja saab suuniseid edasiseks tegevuseks.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[0]),
                alt: "Eelvisiidi põhiline töövoog",
              },
            },
            {
              label: "Adaptiivne digiküsimustik",
              text: "Patsiendi vastustel põhinev triaaž, mis suunab patsiendi õigesse teenusesse.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[1]),
                alt: "Eelvisiidi automatiseerimise vaade",
              },
            },
            {
              label: "Töölaud",
              text: "Töölaud ja pöördumise ülevaade toetavad tõhusat tööd ja kiiret reageerimist.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[2]),
                alt: "Eelvisiidi töölaua vaade",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product1.mainPreview),
            alt: "Eelvisiidi põhivaade",
          },
          screenshots: [
            {
              title: "Sümptomite valik",
              description:
                "Veebipõhine visiidieelne teenus, mis võimaldab patsientidel valida oma sümptomid ja saada suuniseid enne arsti poole pöördumist.",
              src: withBase(productAssets.product1.gallery[0]),
              alt: "Eelvisiidi ekraanikuva",
            },
            {
              title: "Sümptomküsimustikud",
              description:
                "Reaalajas riskiskoor, mis põhineb patsiendi vastustel ja aitab suunata neid õigesse teenusesse.",
              src: withBase(productAssets.product1.gallery[1]),
              alt: "Eelvisiidi sümptomküsimustike ekraanikuva",
            },
            {
              title: "Töölaud",
              description: "Integreerub perekeskuse infosüsteemidega HL7 ja FHIR kaudu.",
              src: withBase(productAssets.product1.gallery[2]),
              alt: "Eelvisiidi töölaua ekraanikuva",
            },
          ],
        },
        {
          id: "02",
          name: "EelPohak",
          category: "Analüütikaplatvorm",
          tagline: "Muudab hajusa andmestiku kindlateks otsusteks.",
          description:
            "Kaasaegne SaaS-lahendus, mis toob esile kõige olulisemad signaalid, et meeskonnad saaksid seada prioriteete, tegutseda ja pidevalt parendada.",
          points: [
            "Reaalajas ülevaade toimimisest",
            "Olulised funktsionaalsusmoodulid selgelt esile toodud",
            "Lihtne aruandlus kiire tempoga meeskondadele",
          ],
          featureCards: [
            {
              label: "Analüütika",
              text: "Näita selges visuaalses raamistikus, kuidas aruandlus toetab paremaid otsuseid.",
              screenshot: {
                src: withBase(productAssets.product2.featureCards[0]),
                alt: "EelPohaku analüütika funktsioon",
              },
            },
            {
              label: "Prioriseerimine",
              text: "Too esile, kuidas meeskonnad leiavad kõige olulisema ilma liigse keerukuseta.",
              screenshot: {
                src: withBase(productAssets.product2.featureCards[1]),
                alt: "EelPohaku prioriseerimise funktsioon",
              },
            },
            {
              label: "Otsustustugi",
              text: "Esitle selget tootekomponenti, mis tugevdab selgust ja kindlustunnet.",
              screenshot: {
                src: withBase(productAssets.product2.featureCards[2]),
                alt: "EelPohaku otsustustoe funktsioon",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product2.mainPreview),
            alt: "EelPohaku põhivaade",
          },
          screenshots: [
            {
              title: "Reaalajas ülevaade",
              description:
                "Kõrgtaseme juhtvaade igapäevaseks monitoorimiseks, trendide jälgimiseks ja kiireteks otsusteks.",
              src: withBase(productAssets.product2.gallery[0]),
              alt: "EelPohaku reaalajas ülevaate ekraanikuva",
            },
            {
              title: "Detailne moodul",
              description:
                "Fookustatud ekraan, mis selgitab ühe olulise funktsiooni väärtust kontekstis.",
              src: withBase(productAssets.product2.gallery[1]),
              alt: "EelPohaku detailse mooduli ekraanikuva",
            },
            {
              title: "Aruandluse vaade",
              description:
                "Tulemused, kokkuvõtted ja trendid on kiire tempoga meeskondade jaoks lihtsalt mõistetavad.",
              src: withBase(productAssets.product2.gallery[2]),
              alt: "EelPohaku aruandluse ekraanikuva",
            },
          ],
        },
        {
          id: "03",
          name: "Patsienditeekond",
          category: "Teenusekogemus",
          tagline: "Parem kogemus igas kokkupuutepunktis.",
          description:
            "Kompaktne, kuid võimekas platvorm, mis aitab organisatsioonidel teenuseid sujuvamalt korraldada, hoides kasutajakogemuse lihtsa ja inimliku.",
          points: [
            "Juhitud kasutajateekonnad",
            "Toote funktsioonid on rollide järgi esile toodud",
            "Skaleerub ilma liigset keerukust lisamata",
          ],
          featureCards: [
            {
              label: "Kogemus",
              text: "Näita üht kasutajaliidese plokki, mis toob esile tootekogemuse lihtsuse.",
              screenshot: {
                src: withBase(productAssets.product3.featureCards[0]),
                alt: "Patsienditeekonna kogemuse funktsioon",
              },
            },
            {
              label: "Juhendamine",
              text: "Tõsta esile element, mis aitab kasutajal enesekindlalt edasi liikuda.",
              screenshot: {
                src: withBase(productAssets.product3.featureCards[1]),
                alt: "Patsienditeekonna juhendamise funktsioon",
              },
            },
            {
              label: "Skaleeritavus",
              text: "Näita, kuidas toode püsib korrastatud ja selge ka kasutuse kasvades.",
              screenshot: {
                src: withBase(productAssets.product3.featureCards[2]),
                alt: "Patsienditeekonna skaleeritavuse funktsioon",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product3.mainPreview),
            alt: "Patsienditeekonna põhivaade",
          },
          screenshots: [
            {
              title: "Kasutajateekond",
              description:
                "Teenuse põhitee või suhtlusvoog on esitatud rahulikus ja selges vormis.",
              src: withBase(productAssets.product3.gallery[0]),
              alt: "Patsienditeekonna kasutajateekonna ekraanikuva",
            },
            {
              title: "Nutikas suhtlus",
              description:
                "See vaade selgitab detailsemalt funktsiooni, mis parandab kogu kasutuskogemust.",
              src: withBase(productAssets.product3.gallery[1]),
              alt: "Patsienditeekonna nutika suhtluse ekraanikuva",
            },
            {
              title: "Juhtimisvaade",
              description:
                "Platvormi operatiivne pool on esitatud selge ja toetava visuaaliga.",
              src: withBase(productAssets.product3.gallery[2]),
              alt: "Patsienditeekonna juhtimisvaate ekraanikuva",
            },
          ],
        },
      ],
    },
    en: {
      shortLabel: "EN",
      languageSelectorLabel: "Choose language",
      openMenuLabel: "Open menu",
      closeMenuLabel: "Close menu",
      closeGalleryLabel: "Close gallery",
      menuLabel: "Menu",
      aboutLabel: "About",
      contactLabel: "Contact us",
      hero: {
        eyebrow: "Idona solutions",
        titleLines: ["We build solutions", "for clinicians,", "for better patient care"],
        description:
          "We help reduce workload, improve patient safety, and bring focus back to what matters most: better decisions and better outcomes.",
      },
      companyIntro: {
        title:
          "Idona is a modern primary healthcare provider that brings family medicine, digital solutions, and data-driven management into one connected model.",
        items: [
          {
            text: "Our goal is to provide high-quality, accessible, and sustainable care while supporting healthcare professionals in their daily work and improving the patient experience. To achieve that, we design and implement solutions that guide patients to the right service at the right time, optimize workflows, and enable continuous quality measurement and improvement.",
            icon: "Heart",
          },
          {
            text: "We work in partnership with the Ministry of Social Affairs, the Health Insurance Fund, the Health Board, and professional organizations to identify and test solutions that can work across Estonia. Our role is to be a bold testing ground and to co-create models with partners that can be applied across the healthcare system.",
            icon: "Users",
          },
          {
            text: "The health agency operates as one integrated organization regardless of center size or location, where clinical work, digital tools, and management systems are closely connected. This creates the conditions for stronger teamwork, better clinical outcomes, and service scalability across different regions. It also enables a fast response to local needs and healthcare crises.",
            icon: "Layers",
          },
          {
            text: "We are able to implement and test solutions quickly across eight centers in Estonia, covering approximately 25,000 patients. That gives us practical insight based on real-world use, helping us make meaningful and credible proposals for improving the healthcare system as a whole.",
            icon: "Globe",
          },
        ],
      },
      products: [
        {
          id: "01",
          name: "Eelvisiit",
          category: "Digital primary care platform",
          tagline:
            "Eelvisiit is a 24/7 digital solution that lets patients describe their concern and reach the right specialist faster.",
          description:
            "Patients describe their concern through self-service, complete a symptom questionnaire when needed, and receive initial guidance before the contact visit. Each case is automatically routed to the most suitable specialist workspace, which speeds up access to care, reduces overload, and makes daily work more efficient.",
          points: [
            "All patient requests are gathered in one system and automatically routed to the right specialist workspace",
            "Patients immediately see the outcome of their request and understand the next steps clearly",
            "Structured pre-visit information and symptom mapping support faster and more accurate treatment decisions",
          ],
          featureCards: [
            {
              label: "Symptom selection",
              text: "Patients select their symptoms and receive guidance for the next step.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[0]),
                alt: "Eelvisiit core flow view",
              },
            },
            {
              label: "Adaptive digital questionnaire",
              text: "Triage based on patient responses directs the patient to the right service.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[1]),
                alt: "Eelvisiit automation view",
              },
            },
            {
              label: "Workspace",
              text: "The workspace and case overview support efficient work and faster response times.",
              screenshot: {
                src: withBase(productAssets.product1.featureCards[2]),
                alt: "Eelvisiit workspace view",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product1.mainPreview),
            alt: "Eelvisiit main preview",
          },
          screenshots: [
            {
              title: "Symptom selection",
              description:
                "A web-based pre-visit service that lets patients select symptoms and receive guidance before contacting a clinician.",
              src: withBase(productAssets.product1.gallery[0]),
              alt: "Eelvisiit screenshot",
            },
            {
              title: "Symptom questionnaires",
              description:
                "A real-time risk score based on patient responses helps direct them to the right service.",
              src: withBase(productAssets.product1.gallery[1]),
              alt: "Eelvisiit symptom questionnaire screenshot",
            },
            {
              title: "Workspace",
              description: "Integrates with primary care information systems through HL7 and FHIR.",
              src: withBase(productAssets.product1.gallery[2]),
              alt: "Eelvisiit workspace screenshot",
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
              screenshot: {
                src: withBase(productAssets.product2.featureCards[0]),
                alt: "EelPohak analytics feature",
              },
            },
            {
              label: "Prioritization",
              text: "Show how teams identify what matters most without extra complexity.",
              screenshot: {
                src: withBase(productAssets.product2.featureCards[1]),
                alt: "EelPohak prioritization feature",
              },
            },
            {
              label: "Decision support",
              text: "Feature a crisp product element that reinforces clarity and confidence.",
              screenshot: {
                src: withBase(productAssets.product2.featureCards[2]),
                alt: "EelPohak decision support feature",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product2.mainPreview),
            alt: "EelPohak main preview",
          },
          screenshots: [
            {
              title: "Live overview",
              description:
                "Present a high-level command center view for daily monitoring, trends, and quick decisions.",
              src: withBase(productAssets.product2.gallery[0]),
              alt: "EelPohak live overview screenshot",
            },
            {
              title: "Detailed module",
              description:
                "Open a focused screenshot that explains one important product function in context.",
              src: withBase(productAssets.product2.gallery[1]),
              alt: "EelPohak detailed module screenshot",
            },
            {
              title: "Reporting view",
              description:
                "Show how results, summaries, or trends are made easy to understand for busy teams.",
              src: withBase(productAssets.product2.gallery[2]),
              alt: "EelPohak reporting view screenshot",
            },
          ],
        },
        {
          id: "03",
          name: "Patient Journey",
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
              screenshot: {
                src: withBase(productAssets.product3.featureCards[0]),
                alt: "Patient Journey experience feature",
              },
            },
            {
              label: "Guidance",
              text: "Highlight a specific element that helps users move forward with confidence.",
              screenshot: {
                src: withBase(productAssets.product3.featureCards[1]),
                alt: "Patient Journey guidance feature",
              },
            },
            {
              label: "Scale",
              text: "Demonstrate how the product stays structured and clean as usage grows.",
              screenshot: {
                src: withBase(productAssets.product3.featureCards[2]),
                alt: "Patient Journey scale feature",
              },
            },
          ],
          mainPreview: {
            src: withBase(productAssets.product3.mainPreview),
            alt: "Patient Journey main preview",
          },
          screenshots: [
            {
              title: "User journey",
              description:
                "Show the core service path or interaction flow in a calm, elegant way.",
              src: withBase(productAssets.product3.gallery[0]),
              alt: "Patient Journey user journey screenshot",
            },
            {
              title: "Smart interaction",
              description:
                "Use this slot to explain an experience-enhancing product function with a more detailed screen.",
              src: withBase(productAssets.product3.gallery[1]),
              alt: "Patient Journey smart interaction screenshot",
            },
            {
              title: "Management view",
              description:
                "Present the operational side of the platform with a clear supporting visual.",
              src: withBase(productAssets.product3.gallery[2]),
              alt: "Patient Journey management view screenshot",
            },
          ],
        },
      ],
    },
  };
}