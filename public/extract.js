const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const texts = new Set();
const regex = />([^<]+)</g;
let match;
while ((match = regex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text && text.length > 1 && /[A-Za-z]/.test(text) && !text.includes('function') && !text.includes('var ')) {
        texts.add(text);
    }
}

console.log(Array.from(texts).sort().join('\n'));
