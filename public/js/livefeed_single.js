const loadIframeButton = document.getElementById('loadIframeButton');
const stopFeedButton = document.getElementById('stopFeedButton');
const ipAddressInput = document.getElementById('ipAddress');
const portInput = document.getElementById('port');
const dynamicIframe = document.getElementById('dynamicIframe');
const loadingBar = document.getElementById('loadingBar');

loadIframeButton.addEventListener('click', () => {
    const ipAddress = ipAddressInput.value.trim();
    const port = portInput.value.trim();

    let newSrc;

    if (port === '') {
        // If the port is empty, assume the IP address field contains a full URL
        newSrc = ipAddress.startsWith('http') ? ipAddress : `http://${ipAddress}`;
    } else {
        // If the port is not empty, construct the URL with the port
        newSrc = `http://${ipAddress}:${port}/`;
    }

    dynamicIframe.src = newSrc; // Update the iframe's src attribute
    loadingBar.style.display = 'block'; // Show the loading bar

    // Debugging logs
    console.log(`New iframe src set to: ${newSrc}`);
});

stopFeedButton.addEventListener('click', () => {
    dynamicIframe.src = ''; // Stop the feed by setting the src to an empty string
    console.log('Feed stopped.');
});

dynamicIframe.addEventListener('load', () => {
    loadingBar.style.display = 'none'; // Hide the loading bar
    console.log('Iframe loaded successfully.');
});

dynamicIframe.addEventListener('error', (err) => {
    console.error('Error loading iframe:', err);
    loadingBar.style.display = 'none'; // Hide the loading bar
});
