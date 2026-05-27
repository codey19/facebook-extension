const FB_DOMAINS = ["facebook.com", "www.facebook.com", "m.facebook.com", "fbcdn.net"];
 
async function clearFacebookData() {
  for (const domain of FB_DOMAINS) {
    const cookies = await chrome.cookies.getAll({ domain });
    for (const cookie of cookies) {
      chrome.cookies.remove({ url: `https://${domain}`, name: cookie.name });
    }
  }
 
  chrome.browsingData.remove(
    { origins: ["https://www.facebook.com", "https://m.facebook.com"] },
    { cache: true, localStorage: true, indexedDB: true, serviceWorkers: true }
  );
}
 
// Clear existing cookies on load, then the rules.json blocks any new ones being set
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url?.includes("facebook.com")) {
    clearFacebookData();
  }
});
