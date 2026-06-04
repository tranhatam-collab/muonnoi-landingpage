const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('/Users/tranhatam/Documents/Devnewproject/muonnoi.org/plays/assets/catalog-lite.js', 'utf8');
const matches = [...content.matchAll(/\{"id":"([^"]+)"[^}]*"status":"live"/g)];
const liveIds = matches.map(m => m[1]);

const stubIds = [];
const realIds = [];
for (const id of liveIds) {
  const p = path.join('/Users/tranhatam/Documents/Devnewproject/muonnoi.org/plays/games', id, 'index.html');
  if (fs.existsSync(p)) {
    const size = fs.statSync(p).size;
    if (size <= 5000) stubIds.push(id);
    else realIds.push(id);
  } else {
    stubIds.push(id + '(missing)');
  }
}
console.log('Total live:', liveIds.length);
console.log('Real:', realIds.length);
console.log('Stub:', stubIds.length);
if (stubIds.length) console.log('Stub IDs:', stubIds.join(', '));
