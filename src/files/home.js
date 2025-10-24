import { greet } from "../modules/greet.js";
import { checkScriptLoaded } from "../modules/scriptLogger.js";

window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  checkScriptLoaded("Home");
  greet("Mike");
});
