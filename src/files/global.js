import { checkScriptLoaded } from "../modules/scriptLogger.js";

window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
    checkScriptLoaded("Global");
});