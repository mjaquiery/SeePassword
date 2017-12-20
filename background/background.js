// Reworked from the apply-css example:
// https://github.com/mdn/webextensions-examples/blob/master/apply-css/background.js

const APPLICABLE_PROTOCOLS = ["http:", "https:"];
const ICONS = {HIDE: "icons/hide.svg", SHOW: "icons/show.svg"};
const TITLES = {
    HIDE: browser.i18n.getMessage("iconTitleHide"),
    SHOW: browser.i18n.getMessage("iconTitleShow")
};

/*
Send a click message to the tab
*/
function sendClickMessage(tab) {

  function gotTitle(title) {
    if (title === TITLES.SHOW) {
      browser.pageAction.setIcon({tabId: tab.id, path: ICONS.HIDE});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLES.HIDE});
      browser.tabs.sendMessage(tab.id, {show: 1});
    } else {
      browser.pageAction.setIcon({tabId: tab.id, path: ICONS.SHOW});
      browser.pageAction.setTitle({tabId: tab.id, title: TITLES.SHOW});
      browser.tabs.sendMessage(tab.id, {show: 0});
    }
  }

  var gettingTitle = browser.pageAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor =  document.createElement('a');
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({tabId: tab.id, path: ICONS.SHOW});
    browser.pageAction.setTitle({tabId: tab.id, title: TITLES.SHOW});
    browser.pageAction.show(tab.id);
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(sendClickMessage);
