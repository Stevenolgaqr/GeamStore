export type CheatStatus = 'undetected' | 'updating' | 'detected' | 'risk';

export interface StatusProduct {
  name: string;
  status: CheatStatus;
  since?: string;
  note?: string;
  slug: string;
}

export interface StatusCategory {
  game: string;
  icon: string;
  products: StatusProduct[];
}

export const statusData: StatusCategory[] = [
  {
    game: 'DMA Firmware',
    icon: '💾',
    products: [
      {
        name: 'Custom 1:1 Emulated EAC Firmware',
        status: 'updating',
        note: 'As of 3/24/26 Potentially blocked on Rust - Waiting on confirmation',
        slug: 'dma-eac',
      },
      {
        name: 'Emulated Battle Eye Firmware',
        status: 'undetected',
        since: 'N/A',
        slug: 'dma-battleye',
      },
    ],
  },
  {
    game: 'HWID Spoofer',
    icon: '🛡️',
    products: [
      {
        name: 'Nova Temp HWID Spoofer',
        status: 'detected',
        note: 'Detected on Rust/FN/Apex - works on other games',
        slug: 'spoofer-temp',
      },
      {
        name: 'Reported Spoofer',
        status: 'risk',
        note: 'Rust and FN use at own risk - Lowest rust ban rate',
        slug: 'spoofer-reported',
      },
      {
        name: 'Exception Spoofer',
        status: 'risk',
        since: 'Never Detected',
        slug: 'spoofer-exception',
      },
    ],
  },
  {
    game: 'Rust',
    icon: '🔥',
    products: [
      {
        name: 'Nova Rust External',
        status: 'undetected',
        slug: 'rust-external',
      },
      {
        name: 'Ancient Rust External',
        status: 'undetected',
        since: '2025',
        slug: 'rust-ancient',
      },
      {
        name: 'ModSquad Internal',
        status: 'undetected',
        since: 'Never',
        slug: 'rust-modsquad',
      },
      {
        name: 'Rust MEK External',
        status: 'risk',
        since: 'Detected: January 2026',
        slug: 'rust-mek',
      },
      {
        name: 'Rust Disconnect External',
        status: 'risk',
        since: 'Detected since May 2025',
        slug: 'rust-disconnect',
      },
    ],
  },
  {
    game: 'Rainbow Six Siege',
    icon: '🎯',
    products: [
      {
        name: 'R6 Crusader',
        status: 'undetected',
        since: 'December 2025',
        slug: 'r6-crusader',
      },
      {
        name: 'Caruso R6 DMA',
        status: 'undetected',
        slug: 'r6-caruso',
      },
      {
        name: 'Ancient R6',
        status: 'undetected',
        slug: 'ancient-r6',
      },
    ],
  },
  {
    game: 'Apex Legends',
    icon: '⚡',
    products: [
      {
        name: 'Nova Apex External',
        status: 'undetected',
        since: '2025',
        slug: 'apex-external',
      },
      {
        name: 'Apex DMA',
        status: 'updating',
        note: 'Currently undergoing seasonal update',
        slug: 'apex-dma',
      },
    ],
  },
  {
    game: 'Fortnite',
    icon: '🏆',
    products: [
      {
        name: 'Nova Fortnite External',
        status: 'undetected',
        since: 'Chapter 6',
        slug: 'fn-external',
      },
      {
        name: 'Fortnite DMA',
        status: 'undetected',
        slug: 'fn-dma',
      },
    ],
  },
  {
    game: 'ARC Raiders',
    icon: '🤖',
    products: [
      {
        name: 'RageByte ARC Raiders',
        status: 'undetected',
        slug: 'arc-ragebyte',
      },
    ],
  },
  {
    game: 'Call of Duty',
    icon: '💀',
    products: [
      {
        name: 'Nova CoD External',
        status: 'undetected',
        since: '2025',
        slug: 'cod-external',
      },
      {
        name: 'CoD DMA Suite',
        status: 'updating',
        note: 'Warzone Season update in progress',
        slug: 'cod-dma',
      },
    ],
  },
];
