_This project is for Shopify test purposes_

##Instructions

- clone repository
- npm install
- npm run start

# Shopify Integration

### Paste the following code in Shopify Online Store -> Pages:

```
<script>// <![CDATA[
function showPopUp(proxyAnchorId) {
document.getElementById(proxyAnchorId).click();
}
var eventMethod = window.addEventListener
? "addEventListener"
: "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent"
? "onmessage"
: "message";
eventer(messageEvent, function (e) {
if (e.data === "showPopUpForPrize1" || e.message === "showPopUpForPrize1")
showPopUp("prize1ProxyAnchor");

if (e.data === "showPopUpForPrize2" || e.message === "showPopUpForPrize2")
showPopUp("prize2ProxyAnchor");

if (e.data === "showPopUpForPrize3" || e.message === "showPopUpForPrize3")
showPopUp("prize3ProxyAnchor");

if (e.data === "showPopUpForPrize4" || e.message === "showPopUpForPrize4")
showPopUp("prize4ProxyAnchor");
});
// ]]></script>
<a href="#mailmunch-pop-844180" id="prize1ProxyAnchor" style="display: none;">prize1</a> <a href="#mailmunch-pop-844182" id="prize2ProxyAnchor" style="display: none;">prize2</a> <a href="#mailmunch-pop-844184" id="prize3ProxyAnchor" style="display: none;">prize3</a> <a href="#mailmunch-pop-844185" id="prize4ProxyAnchor" style="display: none;">prize4</a> <iframe frameborder="0" src="https://puppod-web-game.svitlanafilatova.now.sh" scrolling="no" width="800" height="670"></iframe>

```
