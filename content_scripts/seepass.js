/* See Password extension
Matt Jaquiery, 2017

Use a page action icon to swap between displaying password field content as
asterisks and readable characters.

*/
// TODO: svg icons

//console.log("Loading seepass.js");
var iconpath = "icons/eye.svg";

/* Create icons and add properties for all password fields */
function seePasswordInit() {
  inputs = document.querySelectorAll("input[type=password]");
  //console.log("Found password field(s): "+inputs.length);
  for(i=0; i<inputs.length; i++) {
    createIcon(inputs[i]);
    addProperties(inputs[i]);
  }
}

/* Create the icon DOM object and establish its properties */
function createIcon(elem) {
  icon = document.createElement("img");
  icon.alt = browser.i18n.getMessage("iconAltText");
  icon.title = browser.i18n.getMessage("iconTitle");
  icon.src = browser.extension.getURL(iconpath);
  icon.addEventListener("click", togglePassword);
  icon.className = "icon icon-hidden";
  icon.scriptTarget = elem;
  elem.iconTarget = icon;

  elem.parentElement.insertBefore(icon, elem.nextSibling);
}

/* Add onfocus and onblur properties to password fields */
function addProperties(elem) {
  elem.addEventListener("focus", showIcon);
  //elem.addEventListener("blur", hideIcon);
}

/* Show the icon */
function showIcon() {
  this.iconTarget.className = "icon";
}

/* Hide the icon */
function hideIcon() {
  this.iconTarget.className = "icon icon-hidden"
}

/* Toggle type between text and password */
function togglePassword() {
  //console.log("Toggling");
  this.scriptTarget.setAttribute("type", (this.scriptTarget.type=="text")? "password" : "text");
}

//console.log("Initializing...");
seePasswordInit();
//console.log("Complete.");
