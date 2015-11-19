// These are not cleared when extension is uninstalled.
sessionStorage.getScreenMediaJSExtensionId = chrome.runtime.id;

var readyDiv = document.createElement('div');
readyDiv.id = 'bigSmallScreenSharingReady';
document.body.appendChild(readyDiv);

var browserDiv = document.createElement('div');
browserDiv.id = 'bigSmallScreenSharingChrome';
document.body.appendChild(browserDiv);
