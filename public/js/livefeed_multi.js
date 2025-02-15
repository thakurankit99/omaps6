const spinner = document.getElementById('spinner');
const loadIframeButton = document.getElementById('loadIframeButton');
const ipAddressInput = document.getElementById('ipAddress');
const portInput = document.getElementById('port');
const iframeContainer = document.getElementById('iframeContainer');
let iframeCount = 0;

document.addEventListener('DOMContentLoaded', () => {
// Hide the spinner once the page has loaded
spinner.classList.remove('show');
});

loadIframeButton.addEventListener('click', () => {
const ipAddress = ipAddressInput.value.trim();
const port = portInput.value.trim();
let newSrc;

if (ipAddress.startsWith('http://') || ipAddress.startsWith('https://')) {
// If the IP address field starts with http or https, use it as the URL
newSrc = ipAddress;
} else if (port) {
// If a port is provided, build the URL with the port
newSrc = `http://${ipAddress}:${port}/`;
} else {
// If no port is provided, just use the IP address with http
newSrc = `http://${ipAddress}/`;
}

const iframeWrapper = document.createElement('div');
iframeWrapper.classList.add('iframe-wrapper');

const iframe = document.createElement('iframe');
iframe.src = newSrc;
iframe.setAttribute('allowfullscreen', '');
iframe.setAttribute('loading', 'lazy');
iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

const closeBtn = document.createElement('button');
closeBtn.classList.add('close-btn');
closeBtn.innerHTML = '&times;';
closeBtn.addEventListener('click', () => {
iframeContainer.removeChild(iframeWrapper);
iframeCount--;
adjustIframeLayout();
});

iframeWrapper.appendChild(iframe);
iframeWrapper.appendChild(closeBtn);
iframeContainer.appendChild(iframeWrapper);
iframeCount++;
adjustIframeLayout();

console.log(`New iframe src set to: ${newSrc}`);

iframe.addEventListener('load', () => {
console.log('Iframe loaded successfully.');
});

iframe.addEventListener('error', (err) => {
console.error('Error loading iframe:', err);
});

iframe.addEventListener('abort', () => {
console.warn('Iframe load aborted.');
});
});

function adjustIframeLayout() {
const iframes = iframeContainer.querySelectorAll('.iframe-wrapper');
let gridTemplateColumns;

if (iframeCount === 1) {
gridTemplateColumns = '1fr';
} else if (iframeCount === 2) {
gridTemplateColumns = '1fr 1fr';
} else {
gridTemplateColumns = 'repeat(auto-fit, minmax(600px, 1fr))';
}

iframeContainer.style.gridTemplateColumns = gridTemplateColumns;
}