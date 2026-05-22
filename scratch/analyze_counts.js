const fs = require('fs');
const path = require('path');

const parsedPath = path.join(__dirname, 'parsed_products.json');
const products = JSON.parse(fs.readFileSync(parsedPath, 'utf8'));

const counts = {};
const allProducts = [];

products.forEach(p => {
  counts[p.gameName] = (counts[p.gameName] || 0) + 1;
  allProducts.push({ name: p.cheatName, game: p.gameName });
});

console.log("Game Counts:");
console.log(Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([game, count]) => `${game}: ${count}`).join('\n'));

console.log("\nAll Products:");
console.log(JSON.stringify(allProducts, null, 2));
