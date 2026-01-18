// Background service worker
// Currently not heavily used, but good for persistence later.

chrome.runtime.onInstalled.addListener(() => {
    console.log('LinkedIn Sales Copilot installed');
});

// Open side panel when extension icon is clicked (on any page)
chrome.action.onClicked.addListener(async (tab) => {
    try {
        // Check if tab ID is valid
        if (!tab || !tab.id) {
            console.error('Invalid tab:', tab);
            return;
        }

        // Check if side panel API is available
        if (!chrome.sidePanel) {
            console.error('Side panel API not available');
            return;
        }

        // Skip special Chrome pages where side panel might not work
        if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('edge://'))) {
            console.log('Side panel not available on Chrome internal pages');
            return;
        }

        // Open the side panel immediately (must be called directly in response to user gesture)
        // The side panel should already be configured via onUpdated listener or global default
        await chrome.sidePanel.open({ tabId: tab.id });
        console.log('Side panel opened successfully for tab:', tab.id);
    } catch (e) {
        console.error('Error opening side panel:', e);
        console.error('Error details:', {
            message: e.message,
            name: e.name,
            tabId: tab?.id,
            tabUrl: tab?.url
        });
    }
});

// Set side panel for all tabs automatically (makes it available everywhere)
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (info.status === 'complete') {
        try {
            await chrome.sidePanel.setOptions({
                tabId: tabId,
                path: 'popup/popup.html',
                enabled: true
            });
        } catch (e) {
            console.log('Side panel API not available:', e);
        }
    }
});
