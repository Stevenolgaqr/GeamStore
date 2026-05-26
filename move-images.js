const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\odx.DESKTOP-4IQNBJQ\\Documents\\wep';
const GEAMSTORE_ROOT = path.join(ROOT, 'GeamStore');
const PUBLIC_CHEATS = path.join(GEAMSTORE_ROOT, 'public', 'cheats');

// Ensure destination folder exists
if (!fs.existsSync(PUBLIC_CHEATS)) {
  fs.mkdirSync(PUBLIC_CHEATS, { recursive: true });
}

function copyFile(src, destName) {
  const dest = path.join(PUBLIC_CHEATS, destName);
  if (!fs.existsSync(src)) {
    console.log(`❌ لم يوجد: ${src}`);
    return false;
  }
  fs.copyFileSync(src, dest);
  console.log(`✅ نُقل: ${destName}`);
  return true;
}

function getLargestFile(folder) {
  if (!fs.existsSync(folder)) return null;
  const files = fs.readdirSync(folder);
  let largest = null;
  let largestSize = 0;
  for (const f of files) {
    const fullPath = path.join(folder, f);
    const stat = fs.statSync(fullPath);
    if (stat.size > largestSize) {
      largestSize = stat.size;
      largest = fullPath;
    }
  }
  return largest;
}

// =====================
// 1. Apex Legends - Arcane
// =====================
const apexArcaneFolder = path.join(ROOT, 'apex', 'Arcane');
const apexArcaneMain = getLargestFile(apexArcaneFolder);
if (apexArcaneMain) {
  const ext = path.extname(apexArcaneMain);
  copyFile(apexArcaneMain, `apex-arcane-banner${ext}`);
}

// =====================
// 2. ARC Raiders - Ancient
// =====================
const arcAncientFolder = path.join(ROOT, 'arc raider', 'Ancient');
const arcAncientMain = getLargestFile(arcAncientFolder);
if (arcAncientMain) {
  const ext = path.extname(arcAncientMain);
  copyFile(arcAncientMain, `arc-ancient-banner${ext}`);
}

// =====================
// 3. ARC Raiders - Arcane
// =====================
const arcArcaneFolder = path.join(ROOT, 'arc raider', 'Arcane');
const arcArcaneMain = getLargestFile(arcArcaneFolder);
if (arcArcaneMain) {
  const ext = path.extname(arcArcaneMain);
  copyFile(arcArcaneMain, `arc-arcane-banner${ext}`);
}

// =====================
// 4. Fortnite - multiple files (take the 2 largest as main images)
// =====================
const fortFolder = path.join(ROOT, 'Fort');
if (fs.existsSync(fortFolder)) {
  const fortFiles = fs.readdirSync(fortFolder)
    .map(f => ({ name: f, size: fs.statSync(path.join(fortFolder, f)).size }))
    .sort((a, b) => b.size - a.size);
  
  if (fortFiles[0]) copyFile(path.join(fortFolder, fortFiles[0].name), `fortnite-banner1${path.extname(fortFiles[0].name)}`);
  if (fortFiles[1]) copyFile(path.join(fortFolder, fortFiles[1].name), `fortnite-banner2${path.extname(fortFiles[1].name)}`);
}

// =====================
// 5. Arcane / root images → simple ASCII names (category.jpeg)
// =====================
const newImages = [
  { src: path.join(GEAMSTORE_ROOT, 'Dead_by_Daylight_—_Arcane_202605212335.jpeg'), dest: 'dbd.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'Deadside_—_Arcane_Deadside_✦_202605212335.jpeg'), dest: 'deadside.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'Dune__Awakening_—_Arcane_✦_202605212335.jpeg'), dest: 'dune.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'Farlight_84_—_Arcane_✦_202605212335.jpeg'), dest: 'farlight.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'Gray_Zone_Warfare_—_Fellas_202605231215.jpeg'), dest: 'grayzone.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'Hell_Let_Loose_—_Arcane_202605231215.jpeg'), dest: 'hell-let-loose.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'HighGuard_—_Arcane_✦_Positive__202605231215.jpeg'), dest: 'highguard.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'HumanitZ_—_Arcane_✦_Positive__202605231216.jpeg'), dest: 'humanitz.jpeg' },
  { src: path.join(GEAMSTORE_ROOT, 'WID_Spoofer_—_Vector_Spoofer_202605231215.jpeg'), dest: 'spoofer.jpeg' },
];
newImages.forEach(({ src, dest }) => copyFile(src, dest));

// =====================
// 6. Update cheats.ts gameImages map
// =====================
const cheatsFile = path.join(GEAMSTORE_ROOT, 'src', 'data', 'cheats.ts');
let cheatsContent = fs.readFileSync(cheatsFile, 'utf8');

// Determine extensions for new images
const apexArcaneExt  = apexArcaneMain ? path.extname(apexArcaneMain) : '.jpg';
const arcAncientExt  = arcAncientMain ? path.extname(arcAncientMain) : '.jpg';
const arcArcaneExt   = arcArcaneMain  ? path.extname(arcArcaneMain)  : '.jpg';

const fortFiles2 = fs.existsSync(fortFolder)
  ? fs.readdirSync(fortFolder).map(f => ({ name: f, size: fs.statSync(path.join(fortFolder, f)).size })).sort((a, b) => b.size - a.size)
  : [];
const fortExt1 = fortFiles2[0] ? path.extname(fortFiles2[0].name) : '.jpg';
const fortExt2 = fortFiles2[1] ? path.extname(fortFiles2[1].name) : '.jpg';

// Build new gameImages block (keys must match cheat.category; use ASCII filenames only)
const newGameImages = `export const gameImages: Record<string, string> = {
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
};`;

// Replace the old gameImages block
cheatsContent = cheatsContent.replace(
  /export const gameImages: Record<string, string> = \{[\s\S]*?\};/,
  newGameImages
);

// Update individual product images (image: "")
// Apex - Arcane Apex
cheatsContent = cheatsContent.replace(
  /(\"slug\": \"arcane-apex\"[\s\S]*?\"image\": \")(\")/, 
  `$1/cheats/apex-arcane-banner${apexArcaneExt}"`
);
// ARC Raiders - Ancient
cheatsContent = cheatsContent.replace(
  /(\"slug\": \"ancient-arc-raiders\"[\s\S]*?\"image\": \")(\")/, 
  `$1/cheats/arc-ancient-banner${arcAncientExt}"`
);
// ARC Raiders - Arcane
cheatsContent = cheatsContent.replace(
  /(\"slug\": \"arcane-arc-raiders\"[\s\S]*?\"image\": \")(\")/, 
  `$1/cheats/arc-arcane-banner${arcArcaneExt}"`
);
// Fortnite - Ancient
cheatsContent = cheatsContent.replace(
  /(\"slug\": \"ancient-fortnite\"[\s\S]*?\"image\": \")(\")/, 
  `$1/cheats/fortnite-banner1${fortExt1}"`
);
// Fortnite - Arcane
cheatsContent = cheatsContent.replace(
  /(\"slug\": \"arcane-fortnite\"[\s\S]*?\"image\": \")(\")/, 
  `$1/cheats/fortnite-banner2${fortExt2}"`
);

fs.writeFileSync(cheatsFile, cheatsContent, 'utf8');
console.log('\n✅ تم تحديث cheats.ts بنجاح!');
console.log('\n🎉 انتهى! الآن قم بتشغيل:');
console.log('   git add .');
console.log('   git commit -m "Add product-specific game images"');
console.log('   git push');
