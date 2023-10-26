/**
 * Triggers a mirrored click on the target element.
 * @param {string} targetSelector - The CSS selector for the target element that receives the mirrored click.
 */
export function mirrorClick(targetSelector) {
  // Find the target element.
  const mirrorClickTarget = document.querySelector(targetSelector);

  if (mirrorClickTarget) {
    // Create and dispatch a click event on the target element.
    const clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    mirrorClickTarget.dispatchEvent(clickEvent);
  } else {
    console.error(
      `[mirrorClick Module] Error: No element found with selector "${targetSelector}"`,
    );
  }
}
