// Get references to the buttons and iframe
const switch360Button = document.getElementById('Switch360');
const switchSlbsgmcButton = document.getElementById('SwitchSLBSGMC');
const mapIframe = document.querySelector('.google-map iframe'); 

// Iframe URLs
const mappedInURL = "https://app.mappedin.com/map/67af9483845fda000bf299c3"; 
const healthCenterURL = "https://iitm360.ankitthakur.eu.org/?media-index=4";
const slbsgmcURL = "https://ankitthakur.eu.org/api_slbsgmc"; 

let currentIframe = mappedInURL; 

// Event listener for the 360 switch button
switch360Button.addEventListener('click', () => {
    document.getElementById('loadingMessage').style.display = 'block';

    if (currentIframe === mappedInURL) {
        mapIframe.src = healthCenterURL;
        currentIframe = healthCenterURL;
    } else {
        mapIframe.src = mappedInURL;
        currentIframe = mappedInURL;
    }
});

// Event listener for the SLBSGMC switch button
switchSlbsgmcButton.addEventListener('click', () => {
    document.getElementById('loadingMessage').style.display = 'block';

    if (currentIframe === mappedInURL) {
        mapIframe.src = slbsgmcURL;
        currentIframe = slbsgmcURL;
    } else {
        mapIframe.src = mappedInURL;
        currentIframe = mappedInURL;
    }
});

// Event listener for when the iframe has finished loading
mapIframe.onload = function() {
    document.getElementById('loadingMessage').style.display = 'none';
};
