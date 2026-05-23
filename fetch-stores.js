const https = require('https');

async function fetchStore(idStr) {
  return new Promise((resolve) => {
    https.get(`https://pspo.jp/live/?id=${idStr}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const nameMatch = data.match(/<div id="tenpomei">(.*?)<\/div>/);
        const percentMatch = data.match(/const\s+CURRENT_PERCENT\s*=\s*(\d+);/);
        
        let name = nameMatch ? nameMatch[1].replace('P・SPO', '').trim() : null;
        let percent = percentMatch ? parseInt(percentMatch[1], 10) : null;
        
        if (name || percent !== null) {
            resolve({ id: idStr, name, percent });
        } else {
            resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  const promises = [];
  for (let i = 1; i <= 42; i++) {
    const idStr = `S${String(i).padStart(4, '0')}`;
    promises.push(fetchStore(idStr));
  }
  
  const results = await Promise.all(promises);
  const validStores = results.filter(r => r !== null && r.name && r.name !== '');
  
  console.log(JSON.stringify(validStores, null, 2));
}

main();
