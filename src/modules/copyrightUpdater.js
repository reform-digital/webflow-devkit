/** CopyrightUpdater Module
 
Overview:
- Automates the updating of the copyright year on a website.
- Website should display a copyright year range (e.g. ©2017-2020).
- If the site is brand new, only the current year is displayed (e.g. ©2023).

Instructions for Webflow:
1. Manually add the copyright year text in a range format "©2023-2024"
2. Wrap the From Year and the dash (i.e. "2023-") in a span with an ID of "copyright-from".
3. Add a placeholder To Year in a span (i.e. "2024") with an ID of "copyright-to". This will be updated automatically to the current year.
4. If from and to years are the same, only a single year will be displayed.

Usage:
1. Import the module and run this function within your script file (e.g. in a "global.js" file that you will load on all pages):

import updateCopyrightYear from "../modules/copyrightUpdater.js";
updateCopyrightYear();
 
*/

class CopyrightUpdater {
  constructor(fromId, toId) {
    this.fromElement = document.getElementById(fromId);
    this.toElement = document.getElementById(toId);
  }

  updateCopyright() {
    const currentYear = new Date().getFullYear().toString();

    if (this.toElement) {
      this.toElement.textContent = currentYear;

      if (
        this.fromElement &&
        this.fromElement.textContent.startsWith(currentYear)
      ) {
        this.fromElement.style.display = "none";
      }
    }
  }
}

export default function updateCopyrightYear() {
  const copyrightUpdater = new CopyrightUpdater(
    "copyright-from",
    "copyright-to",
  );
  copyrightUpdater.updateCopyright();
}
