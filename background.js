chrome.runtime.onInstalled.addListener(function () {
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            switch (request.type) {
                case 'set':
                    chrome.storage.local.set({ blockedElements: request.data });
                    sendResponse(request.data);
                    break;
                case 'get':
                    chrome.storage.local.get(['blockedElements'], function (value) {
                        sendResponse(value.blockedElements);
                    });
                    return true;
                case 'clear':
                    chrome.storage.local.clear();
                    break;
            }
        });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'developer.chrome.com' },
                })],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});