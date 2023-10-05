const visiblityClass = 'is-visible';

async function saveOptions(e) {
    e.preventDefault();
    hideMessages();

    let saved = browser.storage.sync.set({
        xdebug_trigger: document.querySelector(".xdebug_trigger").value,
        xdebug_on_color: document.querySelector(".xdebug-on-color:checked").value,
        xdebug_off_color: document.querySelector(".xdebug-off-color:checked").value
    });
    saved.then(showSuccess, showError);
}

async function restoreOptions() {
    const items = [
        'xdebug_trigger',
        'xdebug_on_color',
        'xdebug_off_color'
    ];
    let sessionKey = await browser.storage.sync.get(items);

    document.querySelector(".xdebug_trigger").value = sessionKey.xdebug_trigger || '';

    let onColor = sessionKey.xdebug_on_color || 'red';
    let offColor = sessionKey.xdebug_off_color || 'light';
    document.querySelector(".xdebug-on-color[value="+ onColor +"]").checked = true;
    document.querySelector(".xdebug-off-color[value="+ offColor +"]").checked = true;
}

function showSuccess() {
    let messageClass = document.querySelector(".saved-successfully").classList;

    messageClass.add(visiblityClass);
    setTimeout(function() {
        hideMessages();
    }, 2000);
}

function showError() {
    let messageClass = document.querySelector(".saved-error").classList;
    messageClass.add('is-visible');
}

function hideMessages() {
    let messages = document.querySelector(".message").classList;
    messages.remove(visiblityClass);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
