const fs = require('fs-extra');
const path = require('path');

const src = path.join(__dirname, 'dist');
// Destination where the built frontend should be copied.
// The login package expects its assets under "client_packages/login/ui",
// so copy the build output there.
const dest = path.join(__dirname, '..', 'client_packages', 'login', 'ui');

// Remove previous build files and copy the new ones
fs.emptyDirSync(dest);
fs.copySync(src, dest);
console.log(`Copied ${src} -> ${dest}`);
