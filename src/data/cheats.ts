export interface CheatPlan {
  label: string;
  price: number;
  currency: string;
  duration: string;
  sellauthProductId?: string;
  sellauthVariantId?: string;
}

export interface Cheat {
  id: string;
  slug: string;
  game: string;
  gameEn: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn?: string;
  status: 'undetected' | 'updating' | 'detected';
  statusLabel: string;
  tag?: string;
  features: string[];
  featuresEn?: string[];
  plans: CheatPlan[];
  image: string;
  gameIcon: string;
  category: string;
  isFeatured?: boolean;
  reviews: number;
  rating: number;
  media?: string[];
}

export const gameImages: Record<string, string> = {
  'abi': '/cheats/abi.jpeg',
  'apex': '/cheats/apex.jpeg',
  'fortnite': '/cheats/fortnite.jpeg',
  'spoofer': '/cheats/spoofer.jpeg',
  'battlefield': '/cheats/battlefield.jpeg',
  'arc': '/cheats/arc.jpeg',
  'rust': '/cheats/rust.jpeg',
  'cod': '/cheats/cod.jpeg',
  'ark': '/cheats/ark.jpeg',
  'arma': '/cheats/arma.jpeg',
  'cs2': '/cheats/cs2.jpeg',
  'dayz': '/cheats/dayz.jpeg',
  'tarkov': '/cheats/tarkov.jpeg',
  'pubg': '/cheats/pubg.jpeg',
  'r6': '/cheats/r6.jpeg',
  'valorant': '/cheats/valorant.jpeg',
  'albion': '/cheats/albion.jpeg',
  'dbd': '/cheats/dbd.jpeg',
  'deadside': '/cheats/deadside.jpeg',
  'dune': '/cheats/dune.jpeg',
  'farlight': '/cheats/farlight.jpeg',
  'grayzone': '/cheats/grayzone.jpeg',
  'hell-let-loose': '/cheats/hell-let-loose.jpeg',
  'highguard': '/cheats/highguard.jpeg',
  'humanitz': '/cheats/humanitz.jpeg',
  'marvel-rivals': '/cheats/marvel-rivals.jpeg',
  'off-the-grid': '/cheats/off-the-grid.jpeg',
  'pioner': '/cheats/pioner.jpeg',
};

/** Store catalog: games shown first (in this order). */
export const storeCategoryOrder = ['rust', 'fortnite', 'valorant'] as const;

export const cheats: Cheat[] = [
  {
    "id": "ancient-apex-cheat",
    "slug": "ancient-apex",
    "game": "أبيكس ليجندز",
    "gameEn": "Apex Legends",
    "title": "Ancient Apex",
    "titleEn": "Ancient Apex",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Aimbot",
      "Enable",
      "Ignore Knocked",
      "Aim Only Visible",
      "Draw FOV",
      "FOV (slider)",
      "Aim Bind",
      "Smooth (slider)",
      "Second Aim Bind",
      "Second Smooth (slider)",
      "Misc",
      "Lock Target"
    ],
    "featuresEn": [
      "Aimbot",
      "Enable",
      "Ignore Knocked",
      "Aim Only Visible",
      "Draw FOV",
      "FOV (slider)",
      "Aim Bind",
      "Smooth (slider)",
      "Second Aim Bind",
      "Second Smooth (slider)",
      "Misc",
      "Lock Target"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179736"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179737"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179738"
      }
    ],
    "image": "/cheats/products/ancient-apex/hero.png",
    "media": [
      "/cheats/products/ancient-apex/gallery-1.png",
      "/cheats/products/ancient-apex/gallery-2.png",
      "/cheats/products/ancient-apex/gallery-3.png",
      "/cheats/products/ancient-apex/gallery-4.png",
      "/cheats/products/ancient-apex/gallery-5.png",
      "/cheats/products/ancient-apex/gallery-6.png",
      "/cheats/products/ancient-apex/gallery-7.png"
    ],
    "gameIcon": "⚡",
    "category": "apex",
    "reviews": 32,
    "rating": 4.6
  },
  {
    "id": "arcane-apex-cheat",
    "slug": "arcane-apex",
    "game": "أبيكس ليجندز",
    "gameEn": "Apex Legends",
    "title": "Arcane Apex",
    "titleEn": "Arcane Apex",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable Aimbot – enables the aimbot",
      "Always Active – aimbot works constantly without holding a key",
      "Prediction – predicts target movement trajectory",
      "Recoil Control – reduces weapon recoil while shooting",
      "Target Bots – allows aimbot to target bots",
      "Target Teammates – allows teammates to be selected as targets",
      "Target Knocked – aims at knocked enemies",
      "Visible Check – ignores targets behind walls",
      "Switch Delay – delay before switching targets",
      "Radius (FOV) – aimbot target selection radius",
      "Draw FOV – displays aimbot working area as a circle",
      "Activation Key (First / Second) – bind up to two activation keys"
    ],
    "featuresEn": [
      "Enable Aimbot – enables the aimbot",
      "Always Active – aimbot works constantly without holding a key",
      "Prediction – predicts target movement trajectory",
      "Recoil Control – reduces weapon recoil while shooting",
      "Target Bots – allows aimbot to target bots",
      "Target Teammates – allows teammates to be selected as targets",
      "Target Knocked – aims at knocked enemies",
      "Visible Check – ignores targets behind walls",
      "Switch Delay – delay before switching targets",
      "Radius (FOV) – aimbot target selection radius",
      "Draw FOV – displays aimbot working area as a circle",
      "Activation Key (First / Second) – bind up to two activation keys"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179774"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179775"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179776"
      }
    ],
    "image": "/cheats/products/arcane-apex/hero.jpg",
    "media": [
      "/cheats/products/arcane-apex/gallery-1.png",
      "/cheats/products/arcane-apex/gallery-2.gif",
      "/cheats/products/arcane-apex/gallery-3.jpg"
    ],
    "gameIcon": "⚡",
    "category": "apex",
    "reviews": 88,
    "rating": 4.8
  },
  {
    "id": "ancient-bf6-cheat",
    "slug": "ancient-bf6",
    "game": "باتلفيلد",
    "gameEn": "Battlefield",
    "title": "Ancient BF6",
    "titleEn": "Ancient BF6",
    "description": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD and INTEL CPU.\nSecure Boot enabled.",
    "descriptionEn": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD and INTEL CPU.\nSecure Boot enabled.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "General",
      "Enable – enables aimbot",
      "Aim Key 1 – primary aim activation key",
      "Aim Key 2 – secondary aim activation key",
      "Enable FOV – enables aimbot field of view",
      "FOV Radius – aimbot working radius",
      "Smooth Radius – aim smoothing radius",
      "Target",
      "Target Bone (Head, Neck, Body, Pelvis) – select target bone",
      "Nearest Bone – automatically selects the closest bone",
      "Force Bone Key – keybind to force selected bone",
      "Force Bones (Head, Neck, Body, Pelvis) – bones used when force mode is active"
    ],
    "featuresEn": [
      "General",
      "Enable – enables aimbot",
      "Aim Key 1 – primary aim activation key",
      "Aim Key 2 – secondary aim activation key",
      "Enable FOV – enables aimbot field of view",
      "FOV Radius – aimbot working radius",
      "Smooth Radius – aim smoothing radius",
      "Target",
      "Target Bone (Head, Neck, Body, Pelvis) – select target bone",
      "Nearest Bone – automatically selects the closest bone",
      "Force Bone Key – keybind to force selected bone",
      "Force Bones (Head, Neck, Body, Pelvis) – bones used when force mode is active"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179742"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179743"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179744"
      }
    ],
    "image": "/cheats/products/ancient-bf6/hero.png",
    "media": [
      "/cheats/products/ancient-bf6/gallery-1.jpg",
      "/cheats/products/ancient-bf6/gallery-2.jpg",
      "/cheats/products/ancient-bf6/gallery-3.jpg",
      "/cheats/products/ancient-bf6/gallery-4.jpg",
      "/cheats/products/ancient-bf6/gallery-5.jpg",
      "/cheats/products/ancient-bf6/gallery-6.jpg"
    ],
    "gameIcon": "🪖",
    "category": "battlefield",
    "reviews": 188,
    "rating": 4.7
  },
  {
    "id": "arcane-bf6-cheat",
    "slug": "arcane-bf6",
    "game": "باتلفيلد",
    "gameEn": "Battlefield",
    "title": "Arcane BF6",
    "titleEn": "Arcane BF6",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – enable or disable the aimbot",
      "Aim Mode – aimbot operation mode (always active / on keypress)",
      "Aim Key 1 / 2 – two selectable activation keys for aimbot",
      "Visible Check – aimbot targets only visible enemies",
      "Targets – select aimbot targets (players / bots / teammates)",
      "Bones – select target bones (head / neck / chest / pelvis)",
      "Bones Priority – bone selection priority (closest to crosshair / random / selected)",
      "Draw FOV – displays the aimbot action radius as a circle",
      "FOV – size of the aimbot working area",
      "Smooth – smooths aimbot movements",
      "Max Distance – maximum aimbot operating range",
      "Box – wallhack displayed as boxes"
    ],
    "featuresEn": [
      "Enable – enable or disable the aimbot",
      "Aim Mode – aimbot operation mode (always active / on keypress)",
      "Aim Key 1 / 2 – two selectable activation keys for aimbot",
      "Visible Check – aimbot targets only visible enemies",
      "Targets – select aimbot targets (players / bots / teammates)",
      "Bones – select target bones (head / neck / chest / pelvis)",
      "Bones Priority – bone selection priority (closest to crosshair / random / selected)",
      "Draw FOV – displays the aimbot action radius as a circle",
      "FOV – size of the aimbot working area",
      "Smooth – smooths aimbot movements",
      "Max Distance – maximum aimbot operating range",
      "Box – wallhack displayed as boxes"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179786"
      },
      {
        "label": "أسبوع",
        "price": 17.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179787"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179788"
      }
    ],
    "image": "/cheats/products/arcane-bf6/hero.jpg",
    "media": [
      "/cheats/products/arcane-bf6/gallery-1.gif",
      "/cheats/products/arcane-bf6/gallery-2.jpg",
      "/cheats/products/arcane-bf6/gallery-3.jpg"
    ],
    "gameIcon": "🪖",
    "category": "battlefield",
    "reviews": 78,
    "rating": 4.6
  },
  {
    "id": "ancient-cod-cheat",
    "slug": "ancient-cod",
    "game": "كول أوف ديوتي",
    "gameEn": "Call of Duty",
    "title": "Ancient COD",
    "titleEn": "Ancient COD",
    "description": "System requirements\n\nSVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD CPU only.\nHyper v enabled for INTEL CPU only.\nDisable integrate GPU for laptop in BIOS.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.",
    "descriptionEn": "System requirements\n\nSVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD CPU only.\nHyper v enabled for INTEL CPU only.\nDisable integrate GPU for laptop in BIOS.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "General",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "Draw FOV – displays the aimbot field of view",
      "FOV Color – color of the FOV circle",
      "FOV Radius – aimbot working radius",
      "Smooth – enables aim smoothing",
      "Smooth Value – smoothing strength",
      "Draw Crosshair – displays custom crosshair",
      "Prediction Dot – displays prediction point",
      "Target Line – draws a line to the target",
      "Other"
    ],
    "featuresEn": [
      "General",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "Draw FOV – displays the aimbot field of view",
      "FOV Color – color of the FOV circle",
      "FOV Radius – aimbot working radius",
      "Smooth – enables aim smoothing",
      "Smooth Value – smoothing strength",
      "Draw Crosshair – displays custom crosshair",
      "Prediction Dot – displays prediction point",
      "Target Line – draws a line to the target",
      "Other"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179745"
      },
      {
        "label": "3 Days",
        "price": 62,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179746"
      },
      {
        "label": "أسبوع",
        "price": 10.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179747"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179748"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179749"
      }
    ],
    "image": "/cheats/products/ancient-cod/hero.png",
    "gameIcon": "💀",
    "category": "cod",
    "reviews": 63,
    "rating": 4.9
  },
  {
    "id": "labcore-bo7-and-warzone-dma-cheat",
    "slug": "labcore-bo7-and-warzone-dma",
    "game": "كول أوف ديوتي",
    "gameEn": "Call of Duty",
    "title": "Labcore BO7 and Warzone DMA",
    "titleEn": "Labcore BO7 and Warzone DMA",
    "description": "أداة Labcore BO7 and Warzone DMA الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 7.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179863"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179864"
      },
      {
        "label": "شهر",
        "price": 26.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179865"
      },
      {
        "label": "3 أشهر",
        "price": 69.79,
        "currency": "USD",
        "duration": "90 يوم",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179866"
      }
    ],
    "image": "",
    "gameIcon": "💀",
    "category": "cod",
    "reviews": 158,
    "rating": 4.8
  },
  {
    "id": "ancient-eft-chams-cheat",
    "slug": "ancient-eft-chams",
    "game": "تاركوف",
    "gameEn": "Escape from Tarkov",
    "title": "Ancient EFT Chams",
    "titleEn": "Ancient EFT Chams",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Main Settings",
      "PMC (Visible / Invisible Colors) – chams colors for PMC players",
      "Team (Visible / Invisible Colors) – chams colors for teammates",
      "Scav (Visible / Invisible Colors) – chams colors for scavs",
      "AI (Visible / Invisible Colors) – chams colors for AI",
      "Boss (Visible / Invisible Colors) – chams colors for bosses",
      "Loot",
      "Loot &lt; 10k – color for low-value loot",
      "Loot &gt; 10k – color for medium-value loot",
      "Loot &gt; 50k – color for high-value loot",
      "Loot &gt; 100k – color for very high-value loot",
      "Loot &gt; 500k – color for ultra high-value loot"
    ],
    "featuresEn": [
      "Main Settings",
      "PMC (Visible / Invisible Colors) – chams colors for PMC players",
      "Team (Visible / Invisible Colors) – chams colors for teammates",
      "Scav (Visible / Invisible Colors) – chams colors for scavs",
      "AI (Visible / Invisible Colors) – chams colors for AI",
      "Boss (Visible / Invisible Colors) – chams colors for bosses",
      "Loot",
      "Loot &lt; 10k – color for low-value loot",
      "Loot &gt; 10k – color for medium-value loot",
      "Loot &gt; 50k – color for high-value loot",
      "Loot &gt; 100k – color for very high-value loot",
      "Loot &gt; 500k – color for ultra high-value loot"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179753"
      },
      {
        "label": "أسبوع",
        "price": 5.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179754"
      },
      {
        "label": "شهر",
        "price": 11.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179755"
      }
    ],
    "image": "/cheats/products/ancient-eft-chams/hero.png",
    "media": [
      "/cheats/products/ancient-eft-chams/gallery-1.jpg",
      "/cheats/products/ancient-eft-chams/gallery-2.jpg",
      "/cheats/products/ancient-eft-chams/gallery-3.jpg"
    ],
    "gameIcon": "🐻",
    "category": "tarkov",
    "reviews": 40,
    "rating": 4.6
  },
  {
    "id": "ancient-eft-full-cheat",
    "slug": "ancient-eft-full",
    "game": "تاركوف",
    "gameEn": "Escape from Tarkov",
    "title": "Ancient EFT Full",
    "titleEn": "Ancient EFT Full",
    "description": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).",
    "descriptionEn": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable",
      "Aim Key",
      "Draw Crosshair",
      "Crosshair Color",
      "Draw Aim FOV",
      "Dynamic FOV",
      "FOV Color",
      "FOV Value",
      "Max Aimbot Distance",
      "Target Selection",
      "Target Capture Mode: Closest to Crosshair | Closest by Distance | Lowest Health",
      "Target Bones: Head | Neck | Stomach | Pelvis | Legs"
    ],
    "featuresEn": [
      "Enable",
      "Aim Key",
      "Draw Crosshair",
      "Crosshair Color",
      "Draw Aim FOV",
      "Dynamic FOV",
      "FOV Color",
      "FOV Value",
      "Max Aimbot Distance",
      "Target Selection",
      "Target Capture Mode: Closest to Crosshair | Closest by Distance | Lowest Health",
      "Target Bones: Head | Neck | Stomach | Pelvis | Legs"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179756"
      },
      {
        "label": "أسبوع",
        "price": 19.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179757"
      },
      {
        "label": "شهر",
        "price": 38.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179758"
      }
    ],
    "image": "/cheats/products/ancient-eft-full/hero.png",
    "gameIcon": "🐻",
    "category": "tarkov",
    "reviews": 211,
    "rating": 4.8
  },
  {
    "id": "ancient-fortnite-cheat",
    "slug": "ancient-fortnite",
    "game": "فورتنايت",
    "gameEn": "Fortnite",
    "title": "Ancient Fortnite",
    "titleEn": "Ancient Fortnite",
    "description": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper V disabled for AMD CPU only.\nHyper V enabled for INTEL CPU only.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.\nSupported: INTEL + AMD, Windows 10-11 | 1909 - 25h2.",
    "descriptionEn": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper V disabled for AMD CPU only.\nHyper V enabled for INTEL CPU only.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.\nSupported: INTEL + AMD, Windows 10-11 | 1909 - 25h2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "General",
      "Enable AimBot",
      "AimBot Type: (Static; Curved)",
      "Aim key",
      "Aim key 2",
      "Draw FOV",
      "Target",
      "Only Visible",
      "Lock Target",
      "Lock Knocked",
      "Prediction",
      "Category Settings"
    ],
    "featuresEn": [
      "General",
      "Enable AimBot",
      "AimBot Type: (Static; Curved)",
      "Aim key",
      "Aim key 2",
      "Draw FOV",
      "Target",
      "Only Visible",
      "Lock Target",
      "Lock Knocked",
      "Prediction",
      "Category Settings"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179759"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179760"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179761"
      }
    ],
    "image": "/cheats/products/ancient-fortnite/hero.jpg",
    "media": [
      "/cheats/products/ancient-fortnite/gallery-1.jpg",
      "/cheats/products/ancient-fortnite/gallery-2.jpg",
      "/cheats/products/ancient-fortnite/gallery-3.jpg",
      "/cheats/products/ancient-fortnite/gallery-4.jpg",
      "/cheats/products/ancient-fortnite/gallery-5.jpg",
      "/cheats/products/ancient-fortnite/gallery-6.jpg",
      "/cheats/products/ancient-fortnite/gallery-7.jpg"
    ],
    "gameIcon": "🔥",
    "category": "fortnite",
    "reviews": 83,
    "rating": 4.8
  },
  {
    "id": "arcane-fortnite-cheat",
    "slug": "arcane-fortnite",
    "game": "فورتنايت",
    "gameEn": "Fortnite",
    "title": "Arcane Fortnite",
    "titleEn": "Arcane Fortnite",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Epic",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Epic",
    "status": "undetected",
    "statusLabel": "Use at own Risk",
    "features": [
      "Enable Aimbot – turns the aimbot on",
      "Aim Key – keybind for aimbot activation",
      "Weapon Type (Pistol / SMG / Rifle / Shotgun / Sniper) – separate aimbot settings per weapon type",
      "Targets (Knocked / BOT / Team) – select which targets the aimbot can aim at",
      "Bone (Head / Neck / Body / Legs) – select body parts for aiming",
      "Smooth – smoothness of aimbot movements (higher value = weaker aim)",
      "FOV – size of the aimbot working area",
      "Draw FOV – displays the aimbot area as a circle on the screen",
      "Distance – maximum aimbot working range",
      "No Recoil – disables weapon recoil",
      "Visible Check – aimbot targets only visible enemies",
      "Prediction – predicts enemy movement trajectories"
    ],
    "featuresEn": [
      "Enable Aimbot – turns the aimbot on",
      "Aim Key – keybind for aimbot activation",
      "Weapon Type (Pistol / SMG / Rifle / Shotgun / Sniper) – separate aimbot settings per weapon type",
      "Targets (Knocked / BOT / Team) – select which targets the aimbot can aim at",
      "Bone (Head / Neck / Body / Legs) – select body parts for aiming",
      "Smooth – smoothness of aimbot movements (higher value = weaker aim)",
      "FOV – size of the aimbot working area",
      "Draw FOV – displays the aimbot area as a circle on the screen",
      "Distance – maximum aimbot working range",
      "No Recoil – disables weapon recoil",
      "Visible Check – aimbot targets only visible enemies",
      "Prediction – predicts enemy movement trajectories"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 5.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179818"
      },
      {
        "label": "3 Days",
        "price": 12.79,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179819"
      },
      {
        "label": "أسبوع",
        "price": 27.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179820"
      },
      {
        "label": "شهر",
        "price": 46.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179821"
      }
    ],
    "image": "/cheats/products/arcane-fortnite/hero.jpg",
    "media": [
      "/cheats/products/arcane-fortnite/gallery-1.gif",
      "/cheats/products/arcane-fortnite/gallery-2.webp",
      "/cheats/products/arcane-fortnite/gallery-3.webp"
    ],
    "gameIcon": "🔥",
    "category": "fortnite",
    "reviews": 123,
    "rating": 4.5
  },
  {
    "id": "ancient-pubg-cheat",
    "slug": "ancient-pubg",
    "game": "ببجي",
    "gameEn": "PUBG",
    "title": "Ancient Pubg",
    "titleEn": "Ancient Pubg",
    "description": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD CPU only.\nHyper v enabled for INTEL CPU only.\nDisable integrate GPU for laptop in BIOS.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.",
    "descriptionEn": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper v disabled for AMD CPU only.\nHyper v enabled for INTEL CPU only.\nDisable integrate GPU for laptop in BIOS.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "General",
      "AimBot Type (Static / Curved) – select aimbot aiming style",
      "Aim Keys (Aim Key 1 / Aim Key 2) – aimbot activation keys",
      "FOV – aimbot field of view size",
      "Smooth – aim smoothing strength",
      "Draw FOV (Color) – display FOV circle with custom color",
      "Target",
      "Bone (Head / Neck / Pelvis / Stomach) – target bone selection",
      "Force Bone (Head / Neck / Pelvis / Stomach) – forced bone selection",
      "Force Key – keybind to force selected bone",
      "Only Visible – aim only at visible targets",
      "Lock Target – lock aim onto selected target"
    ],
    "featuresEn": [
      "General",
      "AimBot Type (Static / Curved) – select aimbot aiming style",
      "Aim Keys (Aim Key 1 / Aim Key 2) – aimbot activation keys",
      "FOV – aimbot field of view size",
      "Smooth – aim smoothing strength",
      "Draw FOV (Color) – display FOV circle with custom color",
      "Target",
      "Bone (Head / Neck / Pelvis / Stomach) – target bone selection",
      "Force Bone (Head / Neck / Pelvis / Stomach) – forced bone selection",
      "Force Key – keybind to force selected bone",
      "Only Visible – aim only at visible targets",
      "Lock Target – lock aim onto selected target"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179765"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179766"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179767"
      }
    ],
    "image": "/cheats/products/ancient-pubg/hero.png",
    "media": [
      "/cheats/products/ancient-pubg/gallery-1.png",
      "/cheats/products/ancient-pubg/gallery-2.png",
      "/cheats/products/ancient-pubg/gallery-3.png",
      "/cheats/products/ancient-pubg/gallery-4.png",
      "/cheats/products/ancient-pubg/gallery-5.png",
      "/cheats/products/ancient-pubg/gallery-6.png",
      "/cheats/products/ancient-pubg/gallery-7.png"
    ],
    "gameIcon": "🍳",
    "category": "pubg",
    "reviews": 65,
    "rating": 4.9
  },
  {
    "id": "arcane-pubg-cheat",
    "slug": "arcane-pubg",
    "game": "ببجي",
    "gameEn": "PUBG",
    "title": "Arcane Pubg",
    "titleEn": "Arcane Pubg",
    "description": "System Requirements\nOperating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Kakao, Epic Games",
    "descriptionEn": "System Requirements\nOperating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Kakao, Epic Games",
    "status": "undetected",
    "statusLabel": "Use at own Risk",
    "features": [
      "Enable Aimbot – enable/disable Aimbot",
      "Aim Type - the mode of operation of the aimbot (always, when pressed)",
      "FOV – Aimbot working radius",
      "FOV Style - the display style of the aimbot circle",
      "FOV Adaptive - dynamic FOV depending on",
      "Smooth - smoothing of AIM movements",
      "Distance – Aimbot working distance",
      "Bone – target point for Aimbot (head, neck, body)",
      "Prediction – predicts the movement trajectory of targets",
      "Lock Target – Aim focuses on the active target until it is destroyed",
      "Recoil Control System (RCS) – recoil control system",
      "No Sway – removes weapon sway (only when aiming)"
    ],
    "featuresEn": [
      "Enable Aimbot – enable/disable Aimbot",
      "Aim Type - the mode of operation of the aimbot (always, when pressed)",
      "FOV – Aimbot working radius",
      "FOV Style - the display style of the aimbot circle",
      "FOV Adaptive - dynamic FOV depending on",
      "Smooth - smoothing of AIM movements",
      "Distance – Aimbot working distance",
      "Bone – target point for Aimbot (head, neck, body)",
      "Prediction – predicts the movement trajectory of targets",
      "Lock Target – Aim focuses on the active target until it is destroyed",
      "Recoil Control System (RCS) – recoil control system",
      "No Sway – removes weapon sway (only when aiming)"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179843"
      },
      {
        "label": "أسبوع",
        "price": 17.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179844"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179845"
      }
    ],
    "image": "/cheats/products/arcane-pubg/hero.jpg",
    "gameIcon": "🍳",
    "category": "pubg",
    "reviews": 79,
    "rating": 4.6
  },
  {
    "id": "ancient-r6-cheat",
    "slug": "ancient-r6",
    "game": "رينبو 6 سيج",
    "gameEn": "Rainbow Six Siege",
    "title": "Ancient R6",
    "titleEn": "Ancient R6",
    "description": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper V disabled for AMD CPU only.\nHyper V enabled for INTEL CPU only.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.\nSupported: INTEL + AMD, Windows 10-11 | 1909 - 25h2.",
    "descriptionEn": "SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n16GB RAM (or more).\nHyper V disabled for AMD CPU only.\nHyper V enabled for INTEL CPU only.\nFirmware in UEFI mode only for INTEL CPU.\nThe system use GPT format disk only for INTEL CPU.\nSecure Boot disabled.\nSupported: INTEL + AMD, Windows 10-11 | 1909 - 25h2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "General",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "FOV (Slider) – aimbot field of view size",
      "Aim Smooth (Slider) – smoothness of aim movement",
      "Aim Sensitivity (Slider) – aimbot sensitivity adjustment",
      "Target",
      "Target Bone – select body part to aim at",
      "Nearest Bone – automatically selects the closest bone",
      "Target Lock – locks aim onto the selected target",
      "General",
      "Box – displays player boxes"
    ],
    "featuresEn": [
      "General",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "FOV (Slider) – aimbot field of view size",
      "Aim Smooth (Slider) – smoothness of aim movement",
      "Aim Sensitivity (Slider) – aimbot sensitivity adjustment",
      "Target",
      "Target Bone – select body part to aim at",
      "Nearest Bone – automatically selects the closest bone",
      "Target Lock – locks aim onto the selected target",
      "General",
      "Box – displays player boxes"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179768"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179769"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179770"
      }
    ],
    "image": "/cheats/products/ancient-r6/hero.png",
    "media": [
      "/cheats/products/ancient-r6/gallery-1.png",
      "/cheats/products/ancient-r6/gallery-2.png",
      "/cheats/products/ancient-r6/gallery-3.png",
      "/cheats/products/ancient-r6/gallery-4.png",
      "/cheats/products/ancient-r6/gallery-5.png",
      "/cheats/products/ancient-r6/gallery-6.png"
    ],
    "gameIcon": "💥",
    "category": "r6",
    "reviews": 212,
    "rating": 4.8
  },
  {
    "id": "ancient-rust-cheat",
    "slug": "ancient-rust",
    "game": "رست",
    "gameEn": "Rust",
    "title": "Ancient Rust",
    "titleEn": "Ancient Rust",
    "description": "# System requirements\n\n- SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n- 16GB RAM (or more).\n- Hyper v enabled for INTEL and AMD CPU.\n- Firmware in UEFI mode.\n- The system use GPT format disk.\n- Secure Boot disabled.",
    "descriptionEn": "# System requirements\n\n- SVM [AMD] / VT-X [INTEL] (BIOS) enabled.\n- 16GB RAM (or more).\n- Hyper v enabled for INTEL and AMD CPU.\n- Firmware in UEFI mode.\n- The system use GPT format disk.\n- Secure Boot disabled.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Aimbot Settings",
      "Enable – enables aimbot",
      "Aim Type (Silent / Memory) – aimbot operation mode",
      "Aim Key – keybind to activate aimbot",
      "Hit Chance (Slider) – chance for aimbot to apply",
      "Max Aim Distance (Slider) – maximum aimbot range",
      "Use Smooth (Slider) – smoothing strength (memory aim only)",
      "Draw FOV – displays aimbot field of view",
      "Aim FOV (Slider) – aimbot FOV size",
      "Aim Bone (Head / Neck / Stomach / Closest / Closest No Head) – target bone selection",
      "Target Settings",
      "Enemies – target enemies"
    ],
    "featuresEn": [
      "Aimbot Settings",
      "Enable – enables aimbot",
      "Aim Type (Silent / Memory) – aimbot operation mode",
      "Aim Key – keybind to activate aimbot",
      "Hit Chance (Slider) – chance for aimbot to apply",
      "Max Aim Distance (Slider) – maximum aimbot range",
      "Use Smooth (Slider) – smoothing strength (memory aim only)",
      "Draw FOV – displays aimbot field of view",
      "Aim FOV (Slider) – aimbot FOV size",
      "Aim Bone (Head / Neck / Stomach / Closest / Closest No Head) – target bone selection",
      "Target Settings",
      "Enemies – target enemies"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179771"
      },
      {
        "label": "أسبوع",
        "price": 19.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179772"
      },
      {
        "label": "شهر",
        "price": 38.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179773"
      }
    ],
    "image": "/cheats/products/ancient-rust/hero.png",
    "media": [
      "/cheats/products/ancient-rust/gallery-1.jpg",
      "/cheats/products/ancient-rust/gallery-2.jpg",
      "/cheats/products/ancient-rust/gallery-3.jpg",
      "/cheats/products/ancient-rust/gallery-4.jpg",
      "/cheats/products/ancient-rust/gallery-5.jpg",
      "/cheats/products/ancient-rust/gallery-6.jpg",
      "/cheats/products/ancient-rust/gallery-7.jpg"
    ],
    "gameIcon": "🦀",
    "category": "rust",
    "reviews": 162,
    "rating": 4.8
  },
  {
    "id": "arcane-rust-cheat",
    "slug": "arcane-rust",
    "game": "رست",
    "gameEn": "Rust",
    "title": "Arcane Rust",
    "titleEn": "Arcane Rust",
    "description": "System Requirements\nOperating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "descriptionEn": "System Requirements\nOperating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Enable Aimbot – enables or disables the aimbot",
      "Aim Always – keeps the aimbot active without holding a key",
      "Aim Key – allows binding two keys for aimbot activation",
      "Aim Type (Silent / Vector) – select aimbot aiming method",
      "Vector Aimbot – simulates human-like mouse movement",
      "Silent Aimbot – hits targets without moving the crosshair or camera",
      "Prediction – predicts target movement for higher accuracy",
      "Visible Check – targets only enemies in direct line of sight",
      "Target Bots – allows targeting NPCs and bots",
      "Target Teams – allows targeting squad members",
      "Target Knocked – targets knocked-down players",
      "Max Distance – maximum target search range"
    ],
    "featuresEn": [
      "Enable Aimbot – enables or disables the aimbot",
      "Aim Always – keeps the aimbot active without holding a key",
      "Aim Key – allows binding two keys for aimbot activation",
      "Aim Type (Silent / Vector) – select aimbot aiming method",
      "Vector Aimbot – simulates human-like mouse movement",
      "Silent Aimbot – hits targets without moving the crosshair or camera",
      "Prediction – predicts target movement for higher accuracy",
      "Visible Check – targets only enemies in direct line of sight",
      "Target Bots – allows targeting NPCs and bots",
      "Target Teams – allows targeting squad members",
      "Target Knocked – targets knocked-down players",
      "Max Distance – maximum target search range"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179846"
      },
      {
        "label": "3 Days",
        "price": 11.79,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179847"
      },
      {
        "label": "أسبوع",
        "price": 23.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179848"
      },
      {
        "label": "شهر",
        "price": 46.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179849"
      }
    ],
    "image": "/cheats/products/arcane-rust/hero.jpg",
    "media": [
      "/cheats/products/arcane-rust/gallery-1.jpg",
      "/cheats/products/arcane-rust/gallery-2.jpg",
      "/cheats/products/arcane-rust/gallery-3.gif"
    ],
    "gameIcon": "🦀",
    "category": "rust",
    "reviews": 117,
    "rating": 4.9
  },
  {
    "id": "memez-valorant-esp-cheat",
    "slug": "memez-valorant-esp",
    "game": "فالورانت",
    "gameEn": "Valorant",
    "title": "MEMEZ Valorant ESP",
    "titleEn": "MEMEZ Valorant ESP",
    "description": "أداة MEMEZ Valorant ESP الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727098",
        "sellauthVariantId": "1179867"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727098",
        "sellauthVariantId": "1179868"
      },
      {
        "label": "شهر",
        "price": 24.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727098",
        "sellauthVariantId": "1179869"
      }
    ],
    "image": "",
    "gameIcon": "🎯",
    "category": "valorant",
    "reviews": 53,
    "rating": 4.7
  },
  {
    "id": "memez-valorant-full-cheat",
    "slug": "memez-valorant-full",
    "game": "فالورانت",
    "gameEn": "Valorant",
    "title": "MEMEZ Valorant FULL",
    "titleEn": "MEMEZ Valorant FULL",
    "description": "أداة MEMEZ Valorant FULL الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727099",
        "sellauthVariantId": "1179870"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727099",
        "sellauthVariantId": "1179871"
      },
      {
        "label": "شهر",
        "price": 29.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727099",
        "sellauthVariantId": "1179872"
      }
    ],
    "image": "",
    "gameIcon": "🎯",
    "category": "valorant",
    "reviews": 146,
    "rating": 4.7
  },
  {
    "id": "ancient-dayz-cheat",
    "slug": "ancient-dayz",
    "game": "دايز",
    "gameEn": "DayZ",
    "title": "Ancient Dayz",
    "titleEn": "Ancient Dayz",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Main",
      "Enable (Head / Neck / Chest) – enables aimbot with selectable target bones",
      "Aimbot Key – keybind to activate aimbot",
      "On Players – enables aimbot on players",
      "On Zombies – enables aimbot on zombies",
      "Settings",
      "Hitbox – select hitbox for aiming",
      "Draw FOV – displays aimbot field of view",
      "Draw Aim Point – displays aim point indicator",
      "Enable – enables enemy ESP",
      "Draw Skeleton – displays skeleton ESP",
      "Draw Box – displays box ESP"
    ],
    "featuresEn": [
      "Main",
      "Enable (Head / Neck / Chest) – enables aimbot with selectable target bones",
      "Aimbot Key – keybind to activate aimbot",
      "On Players – enables aimbot on players",
      "On Zombies – enables aimbot on zombies",
      "Settings",
      "Hitbox – select hitbox for aiming",
      "Draw FOV – displays aimbot field of view",
      "Draw Aim Point – displays aim point indicator",
      "Enable – enables enemy ESP",
      "Draw Skeleton – displays skeleton ESP",
      "Draw Box – displays box ESP"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179750"
      },
      {
        "label": "أسبوع",
        "price": 23.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179751"
      },
      {
        "label": "شهر",
        "price": 46.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179752"
      }
    ],
    "image": "/cheats/products/ancient-dayz/hero.png",
    "media": [
      "/cheats/products/ancient-dayz/gallery-1.jpg",
      "/cheats/products/ancient-dayz/gallery-2.jpg",
      "/cheats/products/ancient-dayz/gallery-3.jpg",
      "/cheats/products/ancient-dayz/gallery-4.jpg",
      "/cheats/products/ancient-dayz/gallery-5.jpg",
      "/cheats/products/ancient-dayz/gallery-6.jpg",
      "/cheats/products/ancient-dayz/gallery-7.jpg"
    ],
    "gameIcon": "🧟",
    "category": "dayz",
    "reviews": 72,
    "rating": 4.8
  },
  {
    "id": "arcane-dayz-cheat",
    "slug": "arcane-dayz",
    "game": "دايز",
    "gameEn": "DayZ",
    "title": "Arcane Dayz",
    "titleEn": "Arcane Dayz",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Silent Aimbot – powerful aim type where shots hit targets without moving the camera",
      "Enabled – enable or disable aimbot",
      "FOV – size of the area where aimbot selects targets",
      "Draw FOV (Style / Color) – displays the aiming area as a circle",
      "Max Distance – maximum aimbot range",
      "Ignore – ignore selected targets (zombies, friends)",
      "Bone – select body parts (hitboxes) for aiming",
      "Line To Target – draws a line to the current aim target",
      "Players – display players using wallhack",
      "Zombies – display zombies using wallhack",
      "Friends – toggle ESP visibility for friends",
      "Box (2D / Corners / Outline / Filled) – box ESP with multiple styles"
    ],
    "featuresEn": [
      "Silent Aimbot – powerful aim type where shots hit targets without moving the camera",
      "Enabled – enable or disable aimbot",
      "FOV – size of the area where aimbot selects targets",
      "Draw FOV (Style / Color) – displays the aiming area as a circle",
      "Max Distance – maximum aimbot range",
      "Ignore – ignore selected targets (zombies, friends)",
      "Bone – select body parts (hitboxes) for aiming",
      "Line To Target – draws a line to the current aim target",
      "Players – display players using wallhack",
      "Zombies – display zombies using wallhack",
      "Friends – toggle ESP visibility for friends",
      "Box (2D / Corners / Outline / Filled) – box ESP with multiple styles"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179803"
      },
      {
        "label": "أسبوع",
        "price": 9.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179804"
      },
      {
        "label": "شهر",
        "price": 20.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179805"
      }
    ],
    "image": "/cheats/products/arcane-dayz/hero.jpg",
    "media": [
      "/cheats/products/arcane-dayz/gallery-1.png",
      "/cheats/products/arcane-dayz/gallery-2.webp"
    ],
    "gameIcon": "🧟",
    "category": "dayz",
    "reviews": 92,
    "rating": 4.8
  },
  {
    "id": "arcane-marvel-rivals-cheat",
    "slug": "arcane-marvel-rivals",
    "game": "مارفل رايفلز",
    "gameEn": "Marvel Rivals",
    "title": "Arcane Marvel Rivals",
    "titleEn": "Arcane Marvel Rivals",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable Aimbot – enables aimbot assistance",
      "Hold Mode – aimbot is active only while holding the key",
      "Toggle Mode – aimbot toggles on/off with a single key press",
      "Aim Key – keybind to activate aimbot",
      "Vector Aimbot – simulates human-like mouse movements",
      "FOV (Field of View) – area where aimbot selects targets",
      "Draw FOV – displays the aiming radius as a circle",
      "FOV Color – customize the FOV circle color",
      "Adaptive FOV – dynamically adjusts FOV based on combat situation",
      "Smooth – aim smoothness (higher value = slower, smoother aim)",
      "Distance – maximum aiming range in meters",
      "Bone – select target body part"
    ],
    "featuresEn": [
      "Enable Aimbot – enables aimbot assistance",
      "Hold Mode – aimbot is active only while holding the key",
      "Toggle Mode – aimbot toggles on/off with a single key press",
      "Aim Key – keybind to activate aimbot",
      "Vector Aimbot – simulates human-like mouse movements",
      "FOV (Field of View) – area where aimbot selects targets",
      "Draw FOV – displays the aiming radius as a circle",
      "FOV Color – customize the FOV circle color",
      "Adaptive FOV – dynamically adjusts FOV based on combat situation",
      "Smooth – aim smoothness (higher value = slower, smoother aim)",
      "Distance – maximum aiming range in meters",
      "Bone – select target body part"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179834"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179835"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179836"
      }
    ],
    "image": "/cheats/products/arcane-marvel-rivals/hero.jpg",
    "media": [
      "/cheats/products/arcane-marvel-rivals/gallery-1.jpg",
      "/cheats/products/arcane-marvel-rivals/gallery-2.jpg",
      "/cheats/products/arcane-marvel-rivals/gallery-3.gif"
    ],
    "gameIcon": "🦸",
    "category": "marvel-rivals",
    "reviews": 162,
    "rating": 4.5
  },


  {
    "id": "ancient-albion-online-cheat",
    "slug": "ancient-albion-online",
    "game": "البيون أونلاين",
    "gameEn": "Albion Online",
    "title": "Ancient Albion Online",
    "titleEn": "Ancient Albion Online",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Zoom – zoom level of the radar",
      "Transparency – radar transparency level",
      "Point Scale – scale of points/icons",
      "Text Scale – scale of text labels",
      "Disable Radar Key – hotkey to disable radar",
      "Disable Player Key – hotkey to disable player ESP",
      "General",
      "Enable – enable player ESP",
      "Draw Is On Mount – shows if player is mounted",
      "Draw Name – displays player name",
      "Draw Health – displays player health",
      "Draw Distance – displays distance to players"
    ],
    "featuresEn": [
      "Zoom – zoom level of the radar",
      "Transparency – radar transparency level",
      "Point Scale – scale of points/icons",
      "Text Scale – scale of text labels",
      "Disable Radar Key – hotkey to disable radar",
      "Disable Player Key – hotkey to disable player ESP",
      "General",
      "Enable – enable player ESP",
      "Draw Is On Mount – shows if player is mounted",
      "Draw Name – displays player name",
      "Draw Health – displays player health",
      "Draw Distance – displays distance to players"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179733"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179734"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179735"
      }
    ],
    "image": "/cheats/products/ancient-albion-online/hero.png",
    "gameIcon": "⚔️",
    "category": "albion",
    "reviews": 123,
    "rating": 4.6,
    "media": [
      "/cheats/products/ancient-albion-online/gallery-1.png",
      "/cheats/products/ancient-albion-online/gallery-2.png",
      "/cheats/products/ancient-albion-online/gallery-3.png",
      "/cheats/products/ancient-albion-online/gallery-4.png",
      "/cheats/products/ancient-albion-online/gallery-5.png"
    ]
  },

  {
    "id": "ancient-arc-raiders-cheat",
    "slug": "ancient-arc-raiders",
    "game": "أرك ريدرز",
    "gameEn": "ARC Raiders",
    "title": "Ancient Arc Raiders",
    "titleEn": "Ancient Arc Raiders",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Main",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "Aim Type (Mouse, Memory) – aimbot operation mode",
      "Smooth (Slider) – smoothness of aim movement",
      "Draw FOV – displays the aimbot field of view",
      "FOV Radius (Slider) – aimbot working radius",
      "Prediction – predicts enemy movement",
      "Prediction Dot – displays a prediction point",
      "Target Line – draws a line to the current target",
      "Target",
      "Target Lock – locks aim onto the selected target"
    ],
    "featuresEn": [
      "Main",
      "Enable – enables aimbot",
      "Aim Key – keybind to activate aimbot",
      "Aim Type (Mouse, Memory) – aimbot operation mode",
      "Smooth (Slider) – smoothness of aim movement",
      "Draw FOV – displays the aimbot field of view",
      "FOV Radius (Slider) – aimbot working radius",
      "Prediction – predicts enemy movement",
      "Prediction Dot – displays a prediction point",
      "Target Line – draws a line to the current target",
      "Target",
      "Target Lock – locks aim onto the selected target"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179739"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179740"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179741"
      }
    ],
    "image": "/cheats/products/ancient-arc-raiders/hero.png",
    "media": [
      "/cheats/products/ancient-arc-raiders/gallery-1.png",
      "/cheats/products/ancient-arc-raiders/gallery-2.png",
      "/cheats/products/ancient-arc-raiders/gallery-3.png",
      "/cheats/products/ancient-arc-raiders/gallery-4.png",
      "/cheats/products/ancient-arc-raiders/gallery-5.png",
      "/cheats/products/ancient-arc-raiders/gallery-6.png",
      "/cheats/products/ancient-arc-raiders/gallery-7.png"
    ],
    "gameIcon": "🤖",
    "category": "arc",
    "reviews": 153,
    "rating": 4.7
  },
  {
    "id": "arcane-arc-raiders-cheat",
    "slug": "arcane-arc-raiders",
    "game": "أرك ريدرز",
    "gameEn": "ARC Raiders",
    "title": "Arcane Arc Raiders",
    "titleEn": "Arcane Arc Raiders",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Xbox",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Xbox",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – enable or disable aimbot",
      "Aim Mode – aimbot operation mode (always active / on keypress)",
      "Aim Keys – bind up to two keys for aimbot activation",
      "Visible Check – targets only visible enemies",
      "Anti Aim – distorts your player model position for opponents",
      "Draw FOV – displays the aimbot working area as a circle",
      "Adaptive FOV – dynamically adjusts FOV based on target distance",
      "FOV Style – visual style of the aimbot circle",
      "FOV – aimbot field of view size",
      "Smooth – smooths aimbot movements",
      "No Spread – removes bullet spread",
      "Targets – select aimbot targets (players / bots / teammates)"
    ],
    "featuresEn": [
      "Enable – enable or disable aimbot",
      "Aim Mode – aimbot operation mode (always active / on keypress)",
      "Aim Keys – bind up to two keys for aimbot activation",
      "Visible Check – targets only visible enemies",
      "Anti Aim – distorts your player model position for opponents",
      "Draw FOV – displays the aimbot working area as a circle",
      "Adaptive FOV – dynamically adjusts FOV based on target distance",
      "FOV Style – visual style of the aimbot circle",
      "FOV – aimbot field of view size",
      "Smooth – smooths aimbot movements",
      "No Spread – removes bullet spread",
      "Targets – select aimbot targets (players / bots / teammates)"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179777"
      },
      {
        "label": "أسبوع",
        "price": 17.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179778"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179779"
      }
    ],
    "image": "/cheats/products/arcane-arc-raiders/hero.jpg",
    "media": [
      "/cheats/products/arcane-arc-raiders/gallery-1.jpg",
      "/cheats/products/arcane-arc-raiders/gallery-2.jpg",
      "/cheats/products/arcane-arc-raiders/gallery-3.gif"
    ],
    "gameIcon": "🤖",
    "category": "arc",
    "reviews": 29,
    "rating": 4.7
  },
  {
    "id": "ancient-abi-radar-cheat",
    "slug": "ancient-abi-radar",
    "game": "أرينا بريك أوت",
    "gameEn": "Arena Breakout Infinite",
    "title": "Ancient ABI Radar",
    "titleEn": "Ancient ABI Radar",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Follow Player",
      "Return To Player",
      "Rotate map",
      "Fullscreen",
      "Auto Detect map",
      "Text/Icons scale",
      "Russian",
      "English",
      "Chinese",
      "Show Enemies",
      "Show Nicknames",
      "Show Look Direction"
    ],
    "featuresEn": [
      "Follow Player",
      "Return To Player",
      "Rotate map",
      "Fullscreen",
      "Auto Detect map",
      "Text/Icons scale",
      "Russian",
      "English",
      "Chinese",
      "Show Enemies",
      "Show Nicknames",
      "Show Look Direction"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179730"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179731"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179732"
      }
    ],
    "image": "/cheats/products/ancient-abi-radar/hero.png",
    "media": [
      "/cheats/products/ancient-abi-radar/gallery-1.png"
    ],
    "gameIcon": "💰",
    "category": "abi",
    "reviews": 97,
    "rating": 4.9
  },
  {
    "id": "unnamedtech-arena-breakout-infinite-cheat",
    "slug": "unnamedtech-arena-breakout-infinite",
    "game": "أرينا بريك أوت",
    "gameEn": "Arena Breakout Infinite",
    "title": "UnnamedTech Arena Breakout Infinite",
    "titleEn": "UnnamedTech Arena Breakout Infinite",
    "description": "أداة UnnamedTech Arena Breakout Infinite الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 7.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727101",
        "sellauthVariantId": "1179877"
      },
      {
        "label": "أسبوع",
        "price": 25.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727101",
        "sellauthVariantId": "1179878"
      },
      {
        "label": "شهر",
        "price": 51.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727101",
        "sellauthVariantId": "1179879"
      }
    ],
    "image": "",
    "gameIcon": "💰",
    "category": "abi",
    "reviews": 46,
    "rating": 4.7
  },
  {
    "id": "arcane-ark-ascended-cheat",
    "slug": "arcane-ark-ascended",
    "game": "ارك أسينديد",
    "gameEn": "ARK Ascended",
    "title": "Arcane Ark Ascended",
    "titleEn": "Arcane Ark Ascended",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable Aimbot – enable or disable aimbot",
      "Aim Key – set a custom key to activate aimbot",
      "Aim Mode (Hold / Always) – choose between hold-to-aim or always active",
      "Targets (Players / Dinos) – separate aimbot targeting for players and dinosaurs",
      "Ignore Targets (Sleeper / Dead) – ignores sleeping or dead targets",
      "Prediction – predicts target movement trajectory",
      "Humanization – makes aimbot movement look more human-like",
      "FOV – aimbot working radius",
      "Draw FOV – displays aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Distance – maximum aimbot working distance",
      "Priority (Screen Center / Distance) – target priority method"
    ],
    "featuresEn": [
      "Enable Aimbot – enable or disable aimbot",
      "Aim Key – set a custom key to activate aimbot",
      "Aim Mode (Hold / Always) – choose between hold-to-aim or always active",
      "Targets (Players / Dinos) – separate aimbot targeting for players and dinosaurs",
      "Ignore Targets (Sleeper / Dead) – ignores sleeping or dead targets",
      "Prediction – predicts target movement trajectory",
      "Humanization – makes aimbot movement look more human-like",
      "FOV – aimbot working radius",
      "Draw FOV – displays aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Distance – maximum aimbot working distance",
      "Priority (Screen Center / Distance) – target priority method"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179780"
      },
      {
        "label": "أسبوع",
        "price": 17.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179781"
      },
      {
        "label": "شهر",
        "price": 37.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179782"
      }
    ],
    "image": "/cheats/products/arcane-ark-ascended/hero.jpg",
    "media": [
      "/cheats/products/arcane-ark-ascended/gallery-1.webp",
      "/cheats/products/arcane-ark-ascended/gallery-2.webp",
      "/cheats/products/arcane-ark-ascended/gallery-3.webp",
      "/cheats/products/arcane-ark-ascended/gallery-4.gif"
    ],
    "gameIcon": "🦖",
    "category": "ark",
    "reviews": 106,
    "rating": 4.9
  },
  {
    "id": "arcane-dark-and-darker-cheat",
    "slug": "arcane-dark-and-darker",
    "game": "ارك أسينديد",
    "gameEn": "ARK Ascended",
    "title": "Arcane Dark and Darker",
    "titleEn": "Arcane Dark and Darker",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Player ESP – ESP tab responsible for displaying players",
      "Box 2D – displays players using 2D boxes",
      "Box Style (Full / Corner) – full boxes or corner-only boxes",
      "Box Filled (Static / Gradient) – box background fill style",
      "Line – wallhack lines pointing to enemies",
      "Skeleton – ESP displayed as skeletons",
      "Nickname – displays player names",
      "Distance – distance to targets in meters",
      "Level – displays player character level",
      "Max Distance – ESP render distance for players",
      "Health (Text / Bar) – displays player HP",
      "View Line – shows direction of the target’s view"
    ],
    "featuresEn": [
      "Player ESP – ESP tab responsible for displaying players",
      "Box 2D – displays players using 2D boxes",
      "Box Style (Full / Corner) – full boxes or corner-only boxes",
      "Box Filled (Static / Gradient) – box background fill style",
      "Line – wallhack lines pointing to enemies",
      "Skeleton – ESP displayed as skeletons",
      "Nickname – displays player names",
      "Distance – distance to targets in meters",
      "Level – displays player character level",
      "Max Distance – ESP render distance for players",
      "Health (Text / Bar) – displays player HP",
      "View Line – shows direction of the target’s view"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179792"
      },
      {
        "label": "أسبوع",
        "price": 4.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179793"
      },
      {
        "label": "شهر",
        "price": 9.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179794"
      }
    ],
    "image": "/cheats/products/arcane-dark-and-darker/hero.jpg",
    "media": [
      "/cheats/products/arcane-dark-and-darker/gallery-1.png",
      "/cheats/products/arcane-dark-and-darker/gallery-2.png",
      "/cheats/products/arcane-dark-and-darker/gallery-3.gif"
    ],
    "gameIcon": "🦖",
    "category": "ark",
    "reviews": 71,
    "rating": 4.6
  },
  {
    "id": "arcane-arma-reforger-cheat",
    "slug": "arcane-arma-reforger",
    "game": "أرما ريفورجر",
    "gameEn": "Arma Reforger",
    "title": "Arcane Arma Reforger",
    "titleEn": "Arcane Arma Reforger",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – enables or disables the aimbot",
      "Aim Key – keybind to activate the aimbot",
      "Aim Type – aiming mode (hold / always on)",
      "Bones – select target bone (head, neck, etc.)",
      "Adaptive FOV – dynamically adjusts FOV based on target",
      "Draw FOV Border – displays the FOV circle outline",
      "Draw FOV Background – displays the FOV circle fill",
      "FOV Size – adjusts the aimbot working radius",
      "Smooth – controls aim smoothness",
      "Max Distance – maximum aimbot operating distance",
      "Box – displays players using 2D boxes",
      "Box Style – configure box type, fill, and appearance"
    ],
    "featuresEn": [
      "Enable – enables or disables the aimbot",
      "Aim Key – keybind to activate the aimbot",
      "Aim Type – aiming mode (hold / always on)",
      "Bones – select target bone (head, neck, etc.)",
      "Adaptive FOV – dynamically adjusts FOV based on target",
      "Draw FOV Border – displays the FOV circle outline",
      "Draw FOV Background – displays the FOV circle fill",
      "FOV Size – adjusts the aimbot working radius",
      "Smooth – controls aim smoothness",
      "Max Distance – maximum aimbot operating distance",
      "Box – displays players using 2D boxes",
      "Box Style – configure box type, fill, and appearance"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179783"
      },
      {
        "label": "أسبوع",
        "price": 17.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179784"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179785"
      }
    ],
    "image": "/cheats/products/arcane-arma-reforger/hero.jpg",
    "media": [
      "/cheats/products/arcane-arma-reforger/gallery-1.jpg",
      "/cheats/products/arcane-arma-reforger/gallery-2.jpg",
      "/cheats/products/arcane-arma-reforger/gallery-3.jpg",
      "/cheats/products/arcane-arma-reforger/gallery-4.gif"
    ],
    "gameIcon": "🔫",
    "category": "arma",
    "reviews": 171,
    "rating": 4.8
  },
  {
    "id": "zcheats-arma-package-cheat",
    "slug": "zcheats-arma-package",
    "game": "أرما ريفورجر",
    "gameEn": "Arma Reforger",
    "title": "Zcheats Arma Package",
    "titleEn": "Zcheats Arma Package",
    "description": "أداة Zcheats Arma Package الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 6.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179890"
      },
      {
        "label": "3 Days",
        "price": 14.79,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179891"
      },
      {
        "label": "أسبوع",
        "price": 23.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179892"
      },
      {
        "label": "شهر",
        "price": 56.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179893"
      }
    ],
    "image": "",
    "gameIcon": "🔫",
    "category": "arma",
    "reviews": 205,
    "rating": 4.5
  },
  {
    "id": "arcane-cs2-cheat",
    "slug": "arcane-cs2",
    "game": "كاونتر سترايك 2",
    "gameEn": "Counter Strike 2",
    "title": "Arcane CS2",
    "titleEn": "Arcane CS2",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: Intel & AMD\nVideo card: Nvidia & AMD\nClient: Steam",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enabled – activates automatic aim assist",
      "Aim Key – keybind to activate aimbot (hold)",
      "Aim Mode – aimbot working mode (hold key / always on)",
      "Aim Lock – keeps aim locked on target until eliminated",
      "On Teammate – allows aiming at teammates",
      "Visible Check – aims only at visible targets",
      "Bones – select target hitbox (head, chest, body, etc.)",
      "Target Type – hitbox selection method (selected / closest to crosshair / random)",
      "Draw FOV – displays aimbot area as a circle",
      "Dynamic FOV – dynamically changes FOV based on weapon",
      "FOV – aimbot working radius",
      "Smooth – smoothness level of aim movement"
    ],
    "featuresEn": [
      "Enabled – activates automatic aim assist",
      "Aim Key – keybind to activate aimbot (hold)",
      "Aim Mode – aimbot working mode (hold key / always on)",
      "Aim Lock – keeps aim locked on target until eliminated",
      "On Teammate – allows aiming at teammates",
      "Visible Check – aims only at visible targets",
      "Bones – select target hitbox (head, chest, body, etc.)",
      "Target Type – hitbox selection method (selected / closest to crosshair / random)",
      "Draw FOV – displays aimbot area as a circle",
      "Dynamic FOV – dynamically changes FOV based on weapon",
      "FOV – aimbot working radius",
      "Smooth – smoothness level of aim movement"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179789"
      },
      {
        "label": "أسبوع",
        "price": 4.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179790"
      },
      {
        "label": "شهر",
        "price": 6.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179791"
      }
    ],
    "image": "/cheats/products/arcane-cs2/hero.jpg",
    "media": [
      "/cheats/products/arcane-cs2/gallery-1.jpg",
      "/cheats/products/arcane-cs2/gallery-2.png",
      "/cheats/products/arcane-cs2/gallery-3.gif"
    ],
    "gameIcon": "🔫",
    "category": "cs2",
    "reviews": 75,
    "rating": 4.8
  },
  {
    "id": "predator-cs2-cheat",
    "slug": "predator-cs2",
    "game": "كاونتر سترايك 2",
    "gameEn": "Counter Strike 2",
    "title": "Predator CS2",
    "titleEn": "Predator CS2",
    "description": "أداة Predator CS2 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 1.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179873"
      },
      {
        "label": "أسبوع",
        "price": 3.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179874"
      },
      {
        "label": "شهر",
        "price": 5.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179875"
      },
      {
        "label": "3 أشهر",
        "price": 12.79,
        "currency": "USD",
        "duration": "90 يوم",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179876"
      }
    ],
    "image": "",
    "gameIcon": "🔫",
    "category": "cs2",
    "reviews": 91,
    "rating": 4.5
  },
  {
    "id": "arcane-dead-by-daylight-cheat",
    "slug": "arcane-dead-by-daylight",
    "game": "ديد باي دايلايت",
    "gameEn": "Dead by Daylight",
    "title": "Arcane Dead By Daylight",
    "titleEn": "Arcane Dead By Daylight",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Kakao, Epic Games",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & INTEL\nVideo card: AMD & NVIDIA\nClient: Steam, Kakao, Epic Games",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – activate or disable aimbot",
      "Vector – vector aimbot simulates human mouse movements",
      "Aim Key – keybind to activate aim",
      "Max Distance – maximum aimbot working range",
      "FOV – aimbot field of view size",
      "FOV Show – displays the aim area as a circle",
      "FOV Color – customize the FOV circle color",
      "Smooth – smooths aiming movement",
      "Boxes – ESP displayed as boxes",
      "Box Style – customize box appearance (full, corners, fill, colors, etc.)",
      "Skeleton – ESP displayed as skeletons",
      "Skeleton Thickness – adjust skeleton line thickness"
    ],
    "featuresEn": [
      "Enable – activate or disable aimbot",
      "Vector – vector aimbot simulates human mouse movements",
      "Aim Key – keybind to activate aim",
      "Max Distance – maximum aimbot working range",
      "FOV – aimbot field of view size",
      "FOV Show – displays the aim area as a circle",
      "FOV Color – customize the FOV circle color",
      "Smooth – smooths aiming movement",
      "Boxes – ESP displayed as boxes",
      "Box Style – customize box appearance (full, corners, fill, colors, etc.)",
      "Skeleton – ESP displayed as skeletons",
      "Skeleton Thickness – adjust skeleton line thickness"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179806"
      },
      {
        "label": "أسبوع",
        "price": 11.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179807"
      },
      {
        "label": "شهر",
        "price": 23.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179808"
      }
    ],
    "image": "/cheats/products/arcane-dead-by-daylight/hero.jpg",
    "media": [
      "/cheats/products/arcane-dead-by-daylight/gallery-1.gif",
      "/cheats/products/arcane-dead-by-daylight/gallery-2.jpg",
      "/cheats/products/arcane-dead-by-daylight/gallery-3.jpg"
    ],
    "gameIcon": "💀",
    "category": "dbd",
    "reviews": 180,
    "rating": 4.7
  },
  {
    "id": "vector-dead-by-daylight-cheat",
    "slug": "vector-dead-by-daylight",
    "game": "ديد باي دايلايت",
    "gameEn": "Dead by Daylight",
    "title": "Vector Dead by Daylight",
    "titleEn": "Vector Dead by Daylight",
    "description": "أداة Vector Dead by Daylight الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727102",
        "sellauthVariantId": "1179880"
      },
      {
        "label": "أسبوع",
        "price": 10.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727102",
        "sellauthVariantId": "1179881"
      },
      {
        "label": "شهر",
        "price": 20.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727102",
        "sellauthVariantId": "1179882"
      }
    ],
    "image": "",
    "gameIcon": "💀",
    "category": "dbd",
    "reviews": 184,
    "rating": 4.6
  },
  {
    "id": "arcane-deadside-cheat",
    "slug": "arcane-deadside",
    "game": "ديد سايد",
    "gameEn": "Deadside",
    "title": "Arcane Deadside",
    "titleEn": "Arcane Deadside",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – enable or disable aimbot",
      "Aim Key – keybind to activate aim",
      "Aim Mode (Hold / Always) – aimbot operation type",
      "Aim at NPC – allows aimbot to target bots",
      "Visible Check – targets only visible enemies",
      "FOV – action zone radius of the aimbot",
      "Draw FOV – displays the aimbot radius as a circle",
      "FOV Color – customize the FOV circle color",
      "Bones – select hitboxes (Head / Neck / Chest / Pelvis)",
      "Smooth – smooth aim assistance",
      "Max Distance – maximum aimbot working range",
      "Box – wallhack displayed as 2D boxes"
    ],
    "featuresEn": [
      "Enable – enable or disable aimbot",
      "Aim Key – keybind to activate aim",
      "Aim Mode (Hold / Always) – aimbot operation type",
      "Aim at NPC – allows aimbot to target bots",
      "Visible Check – targets only visible enemies",
      "FOV – action zone radius of the aimbot",
      "Draw FOV – displays the aimbot radius as a circle",
      "FOV Color – customize the FOV circle color",
      "Bones – select hitboxes (Head / Neck / Chest / Pelvis)",
      "Smooth – smooth aim assistance",
      "Max Distance – maximum aimbot working range",
      "Box – wallhack displayed as 2D boxes"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179809"
      },
      {
        "label": "أسبوع",
        "price": 9.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179810"
      },
      {
        "label": "شهر",
        "price": 17.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179811"
      }
    ],
    "image": "/cheats/products/arcane-deadside/hero.jpg",
    "media": [
      "/cheats/products/arcane-deadside/gallery-1.webp",
      "/cheats/products/arcane-deadside/gallery-2.webp"
    ],
    "gameIcon": "🏚️",
    "category": "deadside",
    "reviews": 207,
    "rating": 4.6
  },
  {
    "id": "zcheats-deadside-cheat",
    "slug": "zcheats-deadside",
    "game": "ديد سايد",
    "gameEn": "Deadside",
    "title": "Zcheats DeadSide",
    "titleEn": "Zcheats DeadSide",
    "description": "أداة Zcheats DeadSide الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179894"
      },
      {
        "label": "3 Days",
        "price": 9.79,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179895"
      },
      {
        "label": "أسبوع",
        "price": 16.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179896"
      },
      {
        "label": "شهر",
        "price": 32.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179897"
      }
    ],
    "image": "",
    "gameIcon": "🏚️",
    "category": "deadside",
    "reviews": 86,
    "rating": 4.8
  },
  {
    "id": "arcane-dune-awakening-cheat",
    "slug": "arcane-dune-awakening",
    "game": "ديون: أواكينينغ",
    "gameEn": "Dune: Awakening",
    "title": "Arcane Dune: Awakening",
    "titleEn": "Arcane Dune: Awakening",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – enable or disable aimbot",
      "Aim Key – set a key to activate aim assist",
      "Aim Mode (Hold / Always) – choose hold-to-aim or always active mode",
      "FOV – aimbot working radius",
      "Draw FOV – displays the aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Smooth – smoothness level of aiming",
      "Targets (Players / Bots) – select aimbot target types",
      "Visible Check – aimbot works only on visible targets",
      "Distance – maximum aimbot working distance",
      "Bones – select hitboxes (head / neck / body / pelvis)",
      "2D Box – displays players and bots using boxes"
    ],
    "featuresEn": [
      "Enable – enable or disable aimbot",
      "Aim Key – set a key to activate aim assist",
      "Aim Mode (Hold / Always) – choose hold-to-aim or always active mode",
      "FOV – aimbot working radius",
      "Draw FOV – displays the aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Smooth – smoothness level of aiming",
      "Targets (Players / Bots) – select aimbot target types",
      "Visible Check – aimbot works only on visible targets",
      "Distance – maximum aimbot working distance",
      "Bones – select hitboxes (head / neck / body / pelvis)",
      "2D Box – displays players and bots using boxes"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 38.75,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179812"
      },
      {
        "label": "أسبوع",
        "price": 116.25,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179813"
      },
      {
        "label": "شهر",
        "price": 232.50,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179814"
      }
    ],
    "image": "/cheats/products/arcane-dune-awakening/hero.jpg",
    "media": [
      "/cheats/products/arcane-dune-awakening/gallery-1.jpg",
      "/cheats/products/arcane-dune-awakening/gallery-2.jpg",
      "/cheats/products/arcane-dune-awakening/gallery-3.gif"
    ],
    "gameIcon": "⏳",
    "category": "dune",
    "reviews": 81,
    "rating": 4.7
  },
  {
    "id": "arcane-farlight-84-cheat",
    "slug": "arcane-farlight-84",
    "game": "فارلايت 84",
    "gameEn": "Farlight 84",
    "title": "Arcane Farlight 84",
    "titleEn": "Arcane Farlight 84",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable Aimbot – enables the aimbot",
      "Always Active – aimbot works without holding a key",
      "Prediction – predicts target movement trajectory",
      "Target Bots – allows aiming at bots",
      "Target Teammates – allows aiming at teammates",
      "Radius (FOV) – size of the aimbot working area",
      "Draw FOV – displays the aiming area as a circle",
      "Smoothness – smooths aim movements (higher value = weaker aim)",
      "Distance – maximum aimbot range",
      "Bone – select body parts for aiming",
      "Nearest Bone – aims at the closest hitbox",
      "Random Bone – randomly selects a hitbox"
    ],
    "featuresEn": [
      "Enable Aimbot – enables the aimbot",
      "Always Active – aimbot works without holding a key",
      "Prediction – predicts target movement trajectory",
      "Target Bots – allows aiming at bots",
      "Target Teammates – allows aiming at teammates",
      "Radius (FOV) – size of the aimbot working area",
      "Draw FOV – displays the aiming area as a circle",
      "Smoothness – smooths aim movements (higher value = weaker aim)",
      "Distance – maximum aimbot range",
      "Bone – select body parts for aiming",
      "Nearest Bone – aims at the closest hitbox",
      "Random Bone – randomly selects a hitbox"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 23.25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179815"
      },
      {
        "label": "أسبوع",
        "price": 46.50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179816"
      },
      {
        "label": "شهر",
        "price": 93,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179817"
      }
    ],
    "image": "/cheats/products/arcane-farlight-84/hero.jpg",
    "media": [
      "/cheats/products/arcane-farlight-84/gallery-1.jpg",
      "/cheats/products/arcane-farlight-84/gallery-2.jpg",
      "/cheats/products/arcane-farlight-84/gallery-3.gif"
    ],
    "gameIcon": "🚀",
    "category": "farlight",
    "reviews": 43,
    "rating": 4.8
  },
  {
    "id": "fellas-grayzone-cheat",
    "slug": "fellas-grayzone",
    "game": "جراي زون",
    "gameEn": "Gray Zone Warfare",
    "title": "Fellas GrayZone",
    "titleEn": "Fellas GrayZone",
    "description": "أداة Fellas GrayZone الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727095",
        "sellauthVariantId": "1179856"
      },
      {
        "label": "أسبوع",
        "price": 14.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727095",
        "sellauthVariantId": "1179857"
      },
      {
        "label": "شهر",
        "price": 37.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727095",
        "sellauthVariantId": "1179858"
      }
    ],
    "image": "",
    "gameIcon": "🌲",
    "category": "grayzone",
    "reviews": 101,
    "rating": 4.8
  },
  {
    "id": "arcane-hell-let-loose-cheat",
    "slug": "arcane-hell-let-loose",
    "game": "هيل ليت لوس",
    "gameEn": "Hell Let Loose",
    "title": "Arcane Hell Let Loose",
    "titleEn": "Arcane Hell Let Loose",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Vector Aimbot – aimbot with human-like aiming behavior",
      "Enabled – enable or disable the aimbot",
      "Aim Key – keybind to activate aim",
      "FOV – aimbot working area",
      "Smooth – smoothness of aim toward targets",
      "Bones – select target bones (head / neck / body / legs)",
      "Show FOV – displays the aim area as a circle",
      "Distance – maximum aimbot working range",
      "No Recoil – disables weapon recoil",
      "Rapid Fire – enables rapid fire for semi-automatic weapons",
      "Box – ESP displayed as boxes",
      "Filled – filled boxes for better visibility"
    ],
    "featuresEn": [
      "Vector Aimbot – aimbot with human-like aiming behavior",
      "Enabled – enable or disable the aimbot",
      "Aim Key – keybind to activate aim",
      "FOV – aimbot working area",
      "Smooth – smoothness of aim toward targets",
      "Bones – select target bones (head / neck / body / legs)",
      "Show FOV – displays the aim area as a circle",
      "Distance – maximum aimbot working range",
      "No Recoil – disables weapon recoil",
      "Rapid Fire – enables rapid fire for semi-automatic weapons",
      "Box – ESP displayed as boxes",
      "Filled – filled boxes for better visibility"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 31,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179822"
      },
      {
        "label": "أسبوع",
        "price": 116.25,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179823"
      },
      {
        "label": "شهر",
        "price": 232.50,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179824"
      }
    ],
    "image": "/cheats/products/arcane-hell-let-loose/hero.jpg",
    "media": [
      "/cheats/products/arcane-hell-let-loose/gallery-1.jpg",
      "/cheats/products/arcane-hell-let-loose/gallery-2.jpg",
      "/cheats/products/arcane-hell-let-loose/gallery-3.gif"
    ],
    "gameIcon": "🎖️",
    "category": "hell-let-loose",
    "reviews": 39,
    "rating": 4.7
  },
  {
    "id": "arcane-highguard-cheat",
    "slug": "arcane-highguard",
    "game": "هاي غارد",
    "gameEn": "HighGuard",
    "title": "Arcane HighGuard",
    "titleEn": "Arcane HighGuard",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Enable – enables or disables the aimbot",
      "Aim Key – sets the aim activation key",
      "Adaptive FOV – automatically adjusts the FOV circle size",
      "Visible Check – aimbot targets only visible enemies",
      "Aim Mode – aim mode (always active / hold to activate)",
      "Bone – selects the target bone",
      "Draw FOV Border – displays the FOV circle outline",
      "Draw FOV Background – displays the FOV circle fill",
      "FOV Size – adjusts the FOV circle size",
      "Smoothness – controls aim smoothing",
      "Max Distance – maximum aimbot working distance",
      "Bounding Box – displays 2D boxes around players"
    ],
    "featuresEn": [
      "Enable – enables or disables the aimbot",
      "Aim Key – sets the aim activation key",
      "Adaptive FOV – automatically adjusts the FOV circle size",
      "Visible Check – aimbot targets only visible enemies",
      "Aim Mode – aim mode (always active / hold to activate)",
      "Bone – selects the target bone",
      "Draw FOV Border – displays the FOV circle outline",
      "Draw FOV Background – displays the FOV circle fill",
      "FOV Size – adjusts the FOV circle size",
      "Smoothness – controls aim smoothing",
      "Max Distance – maximum aimbot working distance",
      "Bounding Box – displays 2D boxes around players"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 35.65,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179825"
      },
      {
        "label": "أسبوع",
        "price": 128.65,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179826"
      },
      {
        "label": "شهر",
        "price": 263.50,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179827"
      }
    ],
    "image": "/cheats/products/arcane-highguard/hero.jpg",
    "media": [
      "/cheats/products/arcane-highguard/gallery-1.jpg",
      "/cheats/products/arcane-highguard/gallery-2.jpg",
      "/cheats/products/arcane-highguard/gallery-3.gif"
    ],
    "gameIcon": "🛡️",
    "category": "highguard",
    "reviews": 124,
    "rating": 4.7
  },
  {
    "id": "arcane-humanitz-cheat",
    "slug": "arcane-humanitz",
    "game": "هيومانيتز",
    "gameEn": "HumanitZ",
    "title": "Arcane HumanitZ",
    "titleEn": "Arcane HumanitZ",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Box – displays players using a 2D box",
      "Box Style – choose box style (corners / full box)",
      "Filled – fills the box with a background",
      "Filled Style – box fill style",
      "Name – displays player nicknames",
      "Distance – shows distance to players",
      "Skeleton – displays player skeleton",
      "Thickness – adjusts skeleton line thickness",
      "View Line – shows player view direction",
      "Snaplines – line drawn from you to the target",
      "Max Distance – maximum player render distance",
      "Box – displays zombies using a 2D box"
    ],
    "featuresEn": [
      "Box – displays players using a 2D box",
      "Box Style – choose box style (corners / full box)",
      "Filled – fills the box with a background",
      "Filled Style – box fill style",
      "Name – displays player nicknames",
      "Distance – shows distance to players",
      "Skeleton – displays player skeleton",
      "Thickness – adjusts skeleton line thickness",
      "View Line – shows player view direction",
      "Snaplines – line drawn from you to the target",
      "Max Distance – maximum player render distance",
      "Box – displays zombies using a 2D box"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 31,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179828"
      },
      {
        "label": "أسبوع",
        "price": 93,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179829"
      },
      {
        "label": "شهر",
        "price": 170.50,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179830"
      }
    ],
    "image": "/cheats/products/arcane-humanitz/hero.jpg",
    "media": [
      "/cheats/products/arcane-humanitz/gallery-1.jpg",
      "/cheats/products/arcane-humanitz/gallery-2.jpg",
      "/cheats/products/arcane-humanitz/gallery-3.gif"
    ],
    "gameIcon": "🧟",
    "category": "humanitz",
    "reviews": 19,
    "rating": 4.9
  },
  {
    "id": "ancient-hunt-showdown-cheat",
    "slug": "ancient-hunt-showdown",
    "game": "هانت شو داون",
    "gameEn": "Hunt Showdown",
    "title": "Ancient Hunt Showdown",
    "titleEn": "Ancient Hunt Showdown",
    "description": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "descriptionEn": "INTEL + AMD CPU.\nWindows 10 - 11 | 1909 - 25H2.",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Generals",
      "Active – enables aimbot",
      "Crosshair – displays custom crosshair",
      "Draw FOV – shows aimbot field of view",
      "Draw Aim Point – displays aim point",
      "Misc",
      "Aim at Players – enables aiming at players",
      "Aim at Zombies – enables aiming at zombies",
      "Aim at Boss – enables aiming at bosses",
      "Target Bone (Head, Neck, Pelvis) – select target bone",
      "Players",
      "Glow – enables glow effect"
    ],
    "featuresEn": [
      "Generals",
      "Active – enables aimbot",
      "Crosshair – displays custom crosshair",
      "Draw FOV – shows aimbot field of view",
      "Draw Aim Point – displays aim point",
      "Misc",
      "Aim at Players – enables aiming at players",
      "Aim at Zombies – enables aiming at zombies",
      "Aim at Boss – enables aiming at bosses",
      "Target Bone (Head, Neck, Pelvis) – select target bone",
      "Players",
      "Glow – enables glow effect"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 4.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179762"
      },
      {
        "label": "أسبوع",
        "price": 15.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179763"
      },
      {
        "label": "شهر",
        "price": 31.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179764"
      }
    ],
    "image": "/cheats/products/ancient-hunt-showdown/hero.png",
    "media": [
      "/cheats/products/ancient-hunt-showdown/gallery-1.jpg",
      "/cheats/products/ancient-hunt-showdown/gallery-2.jpg",
      "/cheats/products/ancient-hunt-showdown/gallery-3.jpg"
    ],
    "gameIcon": "🤠",
    "category": "hunt",
    "reviews": 181,
    "rating": 4.6
  },
  {
    "id": "arcane-hunt-showdown-cheat",
    "slug": "arcane-hunt-showdown",
    "game": "هانت شو داون",
    "gameEn": "Hunt Showdown",
    "title": "Arcane Hunt Showdown",
    "titleEn": "Arcane Hunt Showdown",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA\nClient: Steam",
    "status": "updating",
    "statusLabel": "Under Maintenance",
    "features": [
      "Enable – turn aimbot on or off",
      "Aim Key – activation key for aimbot",
      "First Key – first activation key (hold to use)",
      "Second Key – second activation key (hold to use)",
      "Aim Mode (Hold / Always) – aimbot operation mode",
      "Aim at Players – aimbot targets hunters",
      "Aim at Zombie – aimbot targets zombies",
      "Aim at Dummy – aimbot targets training dummies",
      "FOV – action zone radius where aimbot works",
      "Show FOV – displays the aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Bones (Head / Neck / Chest / Pelvis) – target hitbox selection"
    ],
    "featuresEn": [
      "Enable – turn aimbot on or off",
      "Aim Key – activation key for aimbot",
      "First Key – first activation key (hold to use)",
      "Second Key – second activation key (hold to use)",
      "Aim Mode (Hold / Always) – aimbot operation mode",
      "Aim at Players – aimbot targets hunters",
      "Aim at Zombie – aimbot targets zombies",
      "Aim at Dummy – aimbot targets training dummies",
      "FOV – action zone radius where aimbot works",
      "Show FOV – displays the aimbot area as a circle",
      "FOV Color – customize the FOV circle color",
      "Bones (Head / Neck / Chest / Pelvis) – target hitbox selection"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 23.25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179831"
      },
      {
        "label": "أسبوع",
        "price": 77.50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179832"
      },
      {
        "label": "شهر",
        "price": 155,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179833"
      }
    ],
    "image": "/cheats/products/arcane-hunt-showdown/hero.jpg",
    "media": [
      "/cheats/products/arcane-hunt-showdown/gallery-1.png",
      "/cheats/products/arcane-hunt-showdown/gallery-2.png",
      "/cheats/products/arcane-hunt-showdown/gallery-3.gif"
    ],
    "gameIcon": "🤠",
    "category": "hunt",
    "reviews": 28,
    "rating": 4.6
  },
  {
    "id": "gouda-spoofer-cheat",
    "slug": "gouda-spoofer",
    "game": "مخفي جهاز HWID",
    "gameEn": "HWID Spoofer",
    "title": "Gouda Spoofer",
    "titleEn": "Gouda Spoofer",
    "description": "أداة Gouda Spoofer الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 3.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179859"
      },
      {
        "label": "أسبوع",
        "price": 7.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179860"
      },
      {
        "label": "شهر",
        "price": 15.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179861"
      },
      {
        "label": "سنة واحدة",
        "price": 93.79,
        "currency": "USD",
        "duration": "365 يوم",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179862"
      }
    ],
    "image": "",
    "gameIcon": "🛡️",
    "category": "spoofer",
    "reviews": 85,
    "rating": 4.8
  },
  {
    "id": "vector-spoofer-cheat",
    "slug": "vector-spoofer",
    "game": "مخفي جهاز HWID",
    "gameEn": "HWID Spoofer",
    "title": "Vector Spoofer",
    "titleEn": "Vector Spoofer",
    "description": "أداة Vector Spoofer الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
    "status": "undetected",
    "statusLabel": "غير مكتشف",
    "features": [
      "ESP الأعداء والفريق",
      "Aimbot دقيق وقابل للتعديل",
      "تجاوز أنظمة مكافحة الغش",
      "حماية فائقة ودعم مستمر"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 2.79,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727103",
        "sellauthVariantId": "1179883"
      },
      {
        "label": "أسبوع",
        "price": 10.79,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727103",
        "sellauthVariantId": "1179884"
      },
      {
        "label": "شهر",
        "price": 15.79,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727103",
        "sellauthVariantId": "1179885"
      }
    ],
    "image": "",
    "gameIcon": "🛡️",
    "category": "spoofer",
    "reviews": 178,
    "rating": 4.7
  },
  {
    "id": "arcane-off-the-grid-cheat",
    "slug": "arcane-off-the-grid",
    "game": "أوف ذا جريد",
    "gameEn": "Off The Grid",
    "title": "Arcane Off The Grid",
    "titleEn": "Arcane Off The Grid",
    "description": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "descriptionEn": "Operating system: Windows 10, Windows 11 (21H2, 22H2, 23H2, 24H2, 25H2)\nProcessor: AMD & iNTEL\nVideo card: AMD & NVIDIA",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Box – ESP displayed as 2D boxes",
      "Box Style (2D / Corners / Filled) – box display settings",
      "Skeleton – ESP showing enemies as skeletons",
      "Skeleton Thickness – adjust skeleton line thickness",
      "Visible Check – marks visible enemies with a different color",
      "Lines – shows enemy view direction",
      "Snaplines – ESP lines pointing to enemies",
      "Health (Bar / Text) – displays enemy HP",
      "Shield (Bar / Text) – displays enemy shield level",
      "Name – displays enemy nicknames",
      "Clan Tag – displays enemy clan tags",
      "Team ID – displays player team ID"
    ],
    "featuresEn": [
      "Box – ESP displayed as 2D boxes",
      "Box Style (2D / Corners / Filled) – box display settings",
      "Skeleton – ESP showing enemies as skeletons",
      "Skeleton Thickness – adjust skeleton line thickness",
      "Visible Check – marks visible enemies with a different color",
      "Lines – shows enemy view direction",
      "Snaplines – ESP lines pointing to enemies",
      "Health (Bar / Text) – displays enemy HP",
      "Shield (Bar / Text) – displays enemy shield level",
      "Name – displays enemy nicknames",
      "Clan Tag – displays enemy clan tags",
      "Team ID – displays player team ID"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 23.25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179837"
      },
      {
        "label": "أسبوع",
        "price": 77.50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179838"
      },
      {
        "label": "شهر",
        "price": 155,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179839"
      }
    ],
    "image": "/cheats/products/arcane-off-the-grid/hero.jpg",
    "media": [
      "/cheats/products/arcane-off-the-grid/gallery-1.gif",
      "/cheats/products/arcane-off-the-grid/gallery-2.webp"
    ],
    "gameIcon": "🔌",
    "category": "off-the-grid",
    "reviews": 29,
    "rating": 4.7
  },
  {
    "id": "arcane-pioner-cheat",
    "slug": "arcane-pioner",
    "game": "بيونير",
    "gameEn": "PIONER",
    "title": "Arcane PIONER",
    "titleEn": "Arcane PIONER",
    "description": "Arcane PIONER on KeyHub",
    "descriptionEn": "Arcane PIONER on KeyHub",
    "status": "undetected",
    "statusLabel": "Undetected",
    "features": [
      "Enable – activates the aimbot",
      "Players – aimbot targets real players",
      "NPCs – aimbot targets non-playable characters (bots)",
      "Aim Key – keybind to activate aiming",
      "Aim Mode – aimbot operation mode (hold / always on)",
      "Adaptive FOV – dynamically adjusts aim area based on distance or scope",
      "Visible Check – aimbot targets only visible enemies",
      "Bones – select target hitbox (head / neck / body / pelvis)",
      "FOV – aimbot working radius",
      "FOV Style – visual style settings for the FOV circle",
      "Smooth – smooths aim movements",
      "Max Distance – maximum aimbot activation range"
    ],
    "featuresEn": [
      "Enable – activates the aimbot",
      "Players – aimbot targets real players",
      "NPCs – aimbot targets non-playable characters (bots)",
      "Aim Key – keybind to activate aiming",
      "Aim Mode – aimbot operation mode (hold / always on)",
      "Adaptive FOV – dynamically adjusts aim area based on distance or scope",
      "Visible Check – aimbot targets only visible enemies",
      "Bones – select target hitbox (head / neck / body / pelvis)",
      "FOV – aimbot working radius",
      "FOV Style – visual style settings for the FOV circle",
      "Smooth – smooths aim movements",
      "Max Distance – maximum aimbot activation range"
    ],
    "plans": [
      {
        "label": "يوم واحد",
        "price": 23.25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179840"
      },
      {
        "label": "أسبوع",
        "price": 93,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179841"
      },
      {
        "label": "شهر",
        "price": 170.50,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179842"
      }
    ],
    "image": "/cheats/products/arcane-pioner/hero.jpg",
    "media": [
      "/cheats/products/arcane-pioner/gallery-1.gif",
      "/cheats/products/arcane-pioner/gallery-2.png",
      "/cheats/products/arcane-pioner/gallery-3.png"
    ],
    "gameIcon": "🧭",
    "category": "pioner",
    "reviews": 31,
    "rating": 4.9
  }
];

export const reviewsData = [
  {
    id: 1,
    name: 'w queen',
    avatar: 'W',
    game: 'Rust',
    rating: 5,
    text: 'لقد كان دليلاً متعمقاً للغاية وعمل بشكل جيد دون أي مشاكل حتى الآن!',
    date: 'منذ 3 أيام',
  },
  {
    id: 2,
    name: 'love ancient',
    avatar: 'L',
    game: 'Rainbow Six Siege',
    rating: 5,
    text: 'أفضل أداة استخدمتها في R6. الـ ESP دقيق جداً والـ aimbot مذهل. لم أكشف أبداً.',
    date: 'منذ أسبوع',
  },
  {
    id: 3,
    name: 'XxShadowxX',
    avatar: 'X',
    game: 'Apex Legends',
    rating: 5,
    text: 'الدعم الفني ممتاز، ردوا علي خلال دقائق. الأداة تعمل بشكل مثالي على Apex.',
    date: 'منذ أسبوعين',
  },
  {
    id: 4,
    name: 'GhostSniper',
    avatar: 'G',
    game: 'CS2',
    rating: 4,
    text: 'رائع جداً، الـ triggerbot يعمل بشكل مثالي. أتمنى لو كان فيه خيارات أكثر للـ aimbot.',
    date: 'منذ 3 أسابيع',
  },
  {
    id: 5,
    name: 'RustyBoy99',
    avatar: 'R',
    game: 'Rust',
    rating: 5,
    text: 'استخدمه منذ 6 أشهر، لم أكشف مرة واحدة. التحديثات سريعة جداً بعد كل باتش.',
    date: 'منذ شهر',
  },
  {
    id: 6,
    name: 'TarkovKing',
    avatar: 'T',
    game: 'EFT',
    rating: 5,
    text: 'الـ item ESP في Tarkov غيّر اللعبة كلياً. أفضل استثمار قمت به!',
    date: 'منذ شهر',
  },
];

