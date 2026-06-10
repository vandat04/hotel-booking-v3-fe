const fs = require('fs');
const path = require('path');

const mode = process.argv[2];
if (mode !== 'local' && mode !== 'prod') {
    console.log("Usage: node switch-env.js [local|prod]");
    process.exit(1);
}

const LOCAL_URL = 'http://localhost:8080/api';
const PROD_URL = 'https://hotel-booking-v3.onrender.com/api';

let targetSearch = '';
let targetReplace = '';

if (mode === 'local') {
    targetSearch = PROD_URL;
    targetReplace = LOCAL_URL;
    console.log(`Switching API endpoints to LOCAL: ${LOCAL_URL}...`);
} else {
    targetSearch = LOCAL_URL;
    targetReplace = PROD_URL;
    console.log(`Switching API endpoints to PRODUCTION: ${PROD_URL}...`);
}

const dir = __dirname;
fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html') || file.endsWith('.js')) {
        if (file === 'switch-env.js') return;
        
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(targetSearch)) {
            // Replace all occurrences
            content = content.split(targetSearch).join(targetReplace);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});

console.log(`Completed switching to ${mode}!`);
