const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = `<!DOCTYPE html>
<html>
<body>
<button>
    <svg></svg>
    Local Multiplayer
</button>
</body>
</html>`;

const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost/" });
const window = dom.window;
const document = window.document;

const fs = require('fs');
const transSource = fs.readFileSync('trans.js', 'utf8');

const script = document.createElement('script');
script.textContent = transSource;
document.head.appendChild(script);

setTimeout(() => {
    window.setLanguage('es');
    setTimeout(() => {
        console.log(document.body.innerHTML);
    }, 200);
}, 200);

