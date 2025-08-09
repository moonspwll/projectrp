const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, 'dist');
const dest = path.join(__dirname, '..', 'ui');

// очищаємо старі файли та копіюємо нові
fs.removeSync(dest);
fs.copySync(src, dest);
console.log(`Copied ${src} -> ${dest}`);
