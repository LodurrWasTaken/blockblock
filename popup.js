document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('click', function () {
        chrome.runtime.sendMessage({ type: 'clear' }, function () {
            window.close();
        });
    });
});