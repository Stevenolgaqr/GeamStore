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
  status: 'undetected' | 'updating' | 'detected';
  statusLabel: string;
  tag?: string;
  features: string[];
  plans: CheatPlan[];
  image: string;
  gameIcon: string;
  category: string;
  isFeatured?: boolean;
  reviews: number;
  rating: number;
}

export const gameImages: Record<string, string> = {
  'abi': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180722.jpeg',
  'apex': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180723 (1).jpeg',
  'fortnite': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180735.jpeg',
  'spoofer': '/cheats/اريد_نفس_هذه_الصوره_._202605172217.jpeg',
  'battlefield': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180729.jpeg',
  'arc': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180730.jpeg',
  'rust': '/cheats/Cinematic_gaming_banner,_16_9_widescreen,_202605180731.jpeg',
  // Newly provided game images
  'ark': '/cheats/ark.jpeg',
  'arma': '/cheats/arma.jpeg',
  'cs2': '/cheats/cs2.jpeg',
  'dayz': '/cheats/dayz.jpeg',
  'tarkov': '/cheats/tarkov.jpeg',
  'pubg': '/cheats/pubg.jpeg',
  'r6': '/cheats/r6.jpeg',
  'valorant': '/cheats/valorant.jpeg',
  'albion': '/cheats/albion.jpeg',
};

export const cheats: Cheat[] = [
  {
    "id": "ancient-apex-cheat",
    "slug": "ancient-apex",
    "game": "أبيكس ليجندز",
    "gameEn": "Apex Legends",
    "title": "Ancient Apex",
    "titleEn": "Ancient Apex",
    "description": "أداة Ancient Apex الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179736"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179737"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727058",
        "sellauthVariantId": "1179738"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Apex الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179774"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179775"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727070",
        "sellauthVariantId": "1179776"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient BF6 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179742"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179743"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727060",
        "sellauthVariantId": "1179744"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane BF6 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179786"
      },
      {
        "label": "أسبوع",
        "price": 110,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179787"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727074",
        "sellauthVariantId": "1179788"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient COD الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179745"
      },
      {
        "label": "3 Days",
        "price": 40,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179746"
      },
      {
        "label": "أسبوع",
        "price": 65,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179747"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179748"
      },
      {
        "label": "شهر",
        "price": 300,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727061",
        "sellauthVariantId": "1179749"
      }
    ],
    "image": "",
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
        "price": 48,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179863"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179864"
      },
      {
        "label": "شهر",
        "price": 168,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727097",
        "sellauthVariantId": "1179865"
      },
      {
        "label": "شهر",
        "price": 450,
        "currency": "USD",
        "duration": "30 يوم",
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
    "description": "أداة Ancient EFT Chams الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179753"
      },
      {
        "label": "أسبوع",
        "price": 35,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179754"
      },
      {
        "label": "شهر",
        "price": 75,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727063",
        "sellauthVariantId": "1179755"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient EFT Full الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179756"
      },
      {
        "label": "أسبوع",
        "price": 125,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179757"
      },
      {
        "label": "شهر",
        "price": 250,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727064",
        "sellauthVariantId": "1179758"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient Fortnite الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179759"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179760"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727065",
        "sellauthVariantId": "1179761"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Fortnite الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 35,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179818"
      },
      {
        "label": "3 Days",
        "price": 80,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179819"
      },
      {
        "label": "أسبوع",
        "price": 175,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179820"
      },
      {
        "label": "شهر",
        "price": 300,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727083",
        "sellauthVariantId": "1179821"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient Pubg الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179765"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179766"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727067",
        "sellauthVariantId": "1179767"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Pubg الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179843"
      },
      {
        "label": "أسبوع",
        "price": 110,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179844"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727091",
        "sellauthVariantId": "1179845"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient R6 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179768"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179769"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727068",
        "sellauthVariantId": "1179770"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient Rust الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179771"
      },
      {
        "label": "أسبوع",
        "price": 125,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179772"
      },
      {
        "label": "شهر",
        "price": 250,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727069",
        "sellauthVariantId": "1179773"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Rust الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179846"
      },
      {
        "label": "3 Days",
        "price": 75,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179847"
      },
      {
        "label": "أسبوع",
        "price": 150,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179848"
      },
      {
        "label": "شهر",
        "price": 300,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727092",
        "sellauthVariantId": "1179849"
      }
    ],
    "image": "",
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
        "price": 18,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727098",
        "sellauthVariantId": "1179867"
      },
      {
        "label": "أسبوع",
        "price": 72,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727098",
        "sellauthVariantId": "1179868"
      },
      {
        "label": "شهر",
        "price": 156,
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727099",
        "sellauthVariantId": "1179870"
      },
      {
        "label": "أسبوع",
        "price": 96,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727099",
        "sellauthVariantId": "1179871"
      },
      {
        "label": "شهر",
        "price": 192,
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
    "description": "أداة Ancient Dayz الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179750"
      },
      {
        "label": "أسبوع",
        "price": 150,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179751"
      },
      {
        "label": "شهر",
        "price": 300,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727062",
        "sellauthVariantId": "1179752"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Dayz الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179803"
      },
      {
        "label": "أسبوع",
        "price": 60,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179804"
      },
      {
        "label": "شهر",
        "price": 130,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727078",
        "sellauthVariantId": "1179805"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Marvel Rivals الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179834"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179835"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727088",
        "sellauthVariantId": "1179836"
      }
    ],
    "image": "",
    "gameIcon": "🦸",
    "category": "marvel-rivals",
    "reviews": 162,
    "rating": 4.5
  },
  {
    "id": "arcane-warthunder-cheat",
    "slug": "arcane-warthunder",
    "game": "وار ثاندر",
    "gameEn": "Warthunder",
    "title": "Arcane Warthunder",
    "titleEn": "Arcane Warthunder",
    "description": "أداة Arcane Warthunder الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727305",
        "sellauthVariantId": "1180864"
      },
      {
        "label": "أسبوع",
        "price": 90,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727305",
        "sellauthVariantId": "1180865"
      },
      {
        "label": "شهر",
        "price": 175,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727305",
        "sellauthVariantId": "1180866"
      }
    ],
    "image": "",
    "gameIcon": "✈️",
    "category": "warthunder",
    "reviews": 170,
    "rating": 4.5
  },
  {
    "id": "arcane-warthunder-lite-cheat",
    "slug": "arcane-warthunder-lite",
    "game": "وار ثاندر",
    "gameEn": "Warthunder",
    "title": "Arcane Warthunder Lite",
    "titleEn": "Arcane Warthunder Lite",
    "description": "أداة Arcane Warthunder Lite الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727306",
        "sellauthVariantId": "1180867"
      },
      {
        "label": "أسبوع",
        "price": 60,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727306",
        "sellauthVariantId": "1180868"
      },
      {
        "label": "شهر",
        "price": 110,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727306",
        "sellauthVariantId": "1180869"
      }
    ],
    "image": "",
    "gameIcon": "✈️",
    "category": "warthunder",
    "reviews": 43,
    "rating": 4.5
  },
  {
    "id": "ancient-albion-online-cheat",
    "slug": "ancient-albion-online",
    "game": "البيون أونلاين",
    "gameEn": "Albion Online",
    "title": "Ancient Albion Online",
    "titleEn": "Ancient Albion Online",
    "description": "أداة Ancient Albion Online الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179733"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179734"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727057",
        "sellauthVariantId": "1179735"
      }
    ],
    "image": "",
    "gameIcon": "⚔️",
    "category": "albion",
    "reviews": 123,
    "rating": 4.6
  },
  {
    "id": "zcheats-all-access-cheat",
    "slug": "zcheats-all-access",
    "game": "اشتراك شامل",
    "gameEn": "All Access",
    "title": "Zcheats All Access",
    "titleEn": "Zcheats All Access",
    "description": "أداة Zcheats All Access الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 42,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727104",
        "sellauthVariantId": "1179886"
      },
      {
        "label": "3 Days",
        "price": 120,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727104",
        "sellauthVariantId": "1179887"
      },
      {
        "label": "أسبوع",
        "price": 240,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727104",
        "sellauthVariantId": "1179888"
      },
      {
        "label": "شهر",
        "price": 550,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727104",
        "sellauthVariantId": "1179889"
      }
    ],
    "image": "",
    "gameIcon": "🔑",
    "category": "all-access",
    "reviews": 97,
    "rating": 4.7
  },
  {
    "id": "ancient-arc-raiders-cheat",
    "slug": "ancient-arc-raiders",
    "game": "أرك ريدرز",
    "gameEn": "ARC Raiders",
    "title": "Ancient Arc Raiders",
    "titleEn": "Ancient Arc Raiders",
    "description": "أداة Ancient Arc Raiders الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179739"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179740"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727059",
        "sellauthVariantId": "1179741"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Arc Raiders الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179777"
      },
      {
        "label": "أسبوع",
        "price": 110,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179778"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727071",
        "sellauthVariantId": "1179779"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient ABI Radar الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179730"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179731"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727056",
        "sellauthVariantId": "1179732"
      }
    ],
    "image": "",
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
        "price": 45,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727101",
        "sellauthVariantId": "1179877"
      },
      {
        "label": "أسبوع",
        "price": 165,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727101",
        "sellauthVariantId": "1179878"
      },
      {
        "label": "شهر",
        "price": 333,
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
    "description": "أداة Arcane Ark Ascended الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179780"
      },
      {
        "label": "أسبوع",
        "price": 110,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179781"
      },
      {
        "label": "شهر",
        "price": 240,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727072",
        "sellauthVariantId": "1179782"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Dark and Darker الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 13,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179792"
      },
      {
        "label": "أسبوع",
        "price": 30,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179793"
      },
      {
        "label": "شهر",
        "price": 60,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727076",
        "sellauthVariantId": "1179794"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Arma Reforger الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179783"
      },
      {
        "label": "أسبوع",
        "price": 110,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179784"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727073",
        "sellauthVariantId": "1179785"
      }
    ],
    "image": "",
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
        "price": 42,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179890"
      },
      {
        "label": "3 Days",
        "price": 90,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179891"
      },
      {
        "label": "أسبوع",
        "price": 150,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727105",
        "sellauthVariantId": "1179892"
      },
      {
        "label": "شهر",
        "price": 360,
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
    "description": "أداة Arcane CS2 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 13,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179789"
      },
      {
        "label": "أسبوع",
        "price": 25,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179790"
      },
      {
        "label": "شهر",
        "price": 40,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727075",
        "sellauthVariantId": "1179791"
      }
    ],
    "image": "",
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
        "price": 9,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179873"
      },
      {
        "label": "أسبوع",
        "price": 21,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179874"
      },
      {
        "label": "شهر",
        "price": 36,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727100",
        "sellauthVariantId": "1179875"
      },
      {
        "label": "شهر",
        "price": 82,
        "currency": "USD",
        "duration": "30 يوم",
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
    "description": "أداة Arcane Dead By Daylight الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179806"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179807"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727079",
        "sellauthVariantId": "1179808"
      }
    ],
    "image": "",
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
        "price": 19,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727102",
        "sellauthVariantId": "1179880"
      },
      {
        "label": "أسبوع",
        "price": 69,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727102",
        "sellauthVariantId": "1179881"
      },
      {
        "label": "شهر",
        "price": 134,
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
    "description": "أداة Arcane Deadside الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179809"
      },
      {
        "label": "أسبوع",
        "price": 60,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179810"
      },
      {
        "label": "شهر",
        "price": 110,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727080",
        "sellauthVariantId": "1179811"
      }
    ],
    "image": "",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179894"
      },
      {
        "label": "3 Days",
        "price": 60,
        "currency": "USD",
        "duration": "3 Days",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179895"
      },
      {
        "label": "أسبوع",
        "price": 108,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727106",
        "sellauthVariantId": "1179896"
      },
      {
        "label": "شهر",
        "price": 210,
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
    "description": "أداة Arcane Dune: Awakening الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 25,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179812"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179813"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727081",
        "sellauthVariantId": "1179814"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Farlight 84 الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179815"
      },
      {
        "label": "أسبوع",
        "price": 30,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179816"
      },
      {
        "label": "شهر",
        "price": 60,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727082",
        "sellauthVariantId": "1179817"
      }
    ],
    "image": "",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727095",
        "sellauthVariantId": "1179856"
      },
      {
        "label": "أسبوع",
        "price": 90,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727095",
        "sellauthVariantId": "1179857"
      },
      {
        "label": "شهر",
        "price": 240,
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
    "description": "أداة Arcane Hell Let Loose الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179822"
      },
      {
        "label": "أسبوع",
        "price": 75,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179823"
      },
      {
        "label": "شهر",
        "price": 150,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727084",
        "sellauthVariantId": "1179824"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane HighGuard الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 23,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179825"
      },
      {
        "label": "أسبوع",
        "price": 83,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179826"
      },
      {
        "label": "شهر",
        "price": 170,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727085",
        "sellauthVariantId": "1179827"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane HumanitZ الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179828"
      },
      {
        "label": "أسبوع",
        "price": 60,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179829"
      },
      {
        "label": "شهر",
        "price": 110,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727086",
        "sellauthVariantId": "1179830"
      }
    ],
    "image": "",
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
    "description": "أداة Ancient Hunt Showdown الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 30,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179762"
      },
      {
        "label": "أسبوع",
        "price": 100,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179763"
      },
      {
        "label": "شهر",
        "price": 200,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727066",
        "sellauthVariantId": "1179764"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane Hunt Showdown الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179831"
      },
      {
        "label": "أسبوع",
        "price": 50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179832"
      },
      {
        "label": "شهر",
        "price": 100,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727087",
        "sellauthVariantId": "1179833"
      }
    ],
    "image": "",
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
        "price": 20,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179859"
      },
      {
        "label": "أسبوع",
        "price": 50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179860"
      },
      {
        "label": "شهر",
        "price": 100,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727096",
        "sellauthVariantId": "1179861"
      },
      {
        "label": "سنة واحدة",
        "price": 600,
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727103",
        "sellauthVariantId": "1179883"
      },
      {
        "label": "أسبوع",
        "price": 65,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727103",
        "sellauthVariantId": "1179884"
      },
      {
        "label": "شهر",
        "price": 100,
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
    "description": "أداة Arcane Off The Grid الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179837"
      },
      {
        "label": "أسبوع",
        "price": 50,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179838"
      },
      {
        "label": "شهر",
        "price": 100,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727089",
        "sellauthVariantId": "1179839"
      }
    ],
    "image": "",
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
    "description": "أداة Arcane PIONER الاحترافية مع ميزات ESP ودعم كامل ومعدل حماية مرتفع.",
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
        "price": 15,
        "currency": "USD",
        "duration": "1 يوم",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179840"
      },
      {
        "label": "أسبوع",
        "price": 60,
        "currency": "USD",
        "duration": "7 أيام",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179841"
      },
      {
        "label": "شهر",
        "price": 110,
        "currency": "USD",
        "duration": "30 يوم",
        "sellauthProductId": "727090",
        "sellauthVariantId": "1179842"
      }
    ],
    "image": "",
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

