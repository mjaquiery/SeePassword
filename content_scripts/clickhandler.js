var PW_FIELDS = [];

function showPWs() {
    PW_FIELDS = document.querySelectorAll("input[type=password]");
    for(let pw of PW_FIELDS) {
        pw.setAttribute('type', 'text');
        pw.style.fontFamily = "monospace";
    }
}

function hidePWs() {
    for(let pw of PW_FIELDS) {
        pw.setAttribute('type', 'password');
        pw.style.fontFamily = 'inherit';
    }
    PW_FIELDS = [];
}

browser.runtime.onMessage.addListener(msg => {
    if(msg.show==1)
        showPWs();
    else
        hidePWs();
});
