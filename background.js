chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log("The color is green.");
        console.log(document)
    });

    chrome.runtime.getBackgroundPage(win => {
        console.log(win)
        // win.document.addEventListener('mouseover', e => {
        //     console.log(0)
        // });
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