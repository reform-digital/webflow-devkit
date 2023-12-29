// Global Variables
let toggleButton;
let classViewerOn = false;
let outlineElement;
let labelContainer;
let viewportBorder;
let blackBox;

// Store references to the functions to be able to remove them later
const updateOutlineAndLabelRef = (e) => updateOutlineAndLabel(e);
const hideOutlineAndLabelRef = () => hideOutlineAndLabel();

// SVG Icons
const iconToggleOff = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" style="margin-right: 8px; pointer-events: none;"><title>toggle-off</title><g fill="#666666"><path fill="#666666" d="M11,3H5C2.2,3,0,5.2,0,8s2.2,5,5,5h6c2.8,0,5-2.2,5-5S13.8,3,11,3z M5,11c-1.7,0-3-1.3-3-3s1.3-3,3-3 s3,1.3,3,3S6.7,11,5,11z"></path></g></svg>`;
const iconToggleOn = `
<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="margin-right: 8px; pointer-events: none;" xmlns="http://www.w3.org/2000/svg"><path d="M5 3H11C13.8 3 16 5.2 16 8C16 10.8 13.8 13 11 13H5C2.2 13 0 10.8 0 8C0 5.2 2.2 3 5 3ZM11 11C12.7 11 14 9.7 14 8C14 6.3 12.7 5 11 5C9.3 5 8 6.3 8 8C8 9.7 9.3 11 11 11Z" fill="white"/></svg>`;
const iconCheckmark = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" style="margin-left: 8px;"><title>checkmark</title><g fill="#FFFFFF"><path fill="#FFFFFF" d="M14.3,2.3L5,11.6L1.7,8.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4,4C4.5,13.9,4.7,14,5,14s0.5-0.1,0.7-0.3 l10-10c0.4-0.4,0.4-1,0-1.4S14.7,1.9,14.3,2.3z"></path></g></svg>`;
const iconCopy = `
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 16 16" style="margin-left: 8px; flex: 0 0 auto;"><g fill="#FFFFFF"><path fill="#FFFFFF" d="M11,12H1c-0.553,0-1-0.447-1-1V1c0-0.552,0.447-1,1-1h10c0.553,0,1,0.448,1,1v10C12,11.553,11.553,12,11,12z "></path><path d="M15,16H4v-2h10V4h2v11C16,15.553,15.553,16,15,16z"></path></g></svg>`;

// Main Code Start – when Webflow ready
window.Webflow = window.Webflow || [];
window.Webflow.push(function () {
  addToggleButton();
  addStylesToBypassAnimations();
});

function addToggleButton() {
  toggleButton = document.createElement("button");
  toggleButton.setAttribute("rd-classviewer-btn", "true");
  toggleButton.innerHTML = `${iconToggleOff}<span style="pointer-events: none;">RD® Class Viewer</span>`;
  toggleButton.style.position = "fixed";
  toggleButton.style.bottom = "10px";
  toggleButton.style.right = "10px";
  toggleButton.style.zIndex = "10001";
  toggleButton.style.background = "rgb(20, 20, 20)";
  toggleButton.style.color = "#888888";
  toggleButton.style.border = "none";
  toggleButton.style.padding = "5px 10px";
  toggleButton.style.cursor = "pointer";
  toggleButton.style.fontSize = "12px";
  toggleButton.style.borderRadius = "8px";
  toggleButton.style.border = "1px solid rgba(255, 255, 255, 0.2)";
  toggleButton.style.display = "flex";
  toggleButton.style.alignItems = "center";
  toggleButton.style.cursor = "pointer";
  delete toggleButton.dataset.previousCursor;
  toggleButton.querySelectorAll("*").forEach((child) => {
    child.style.cursor = "inherit";
    delete child.dataset.previousCursor;
  });
  toggleButton.addEventListener("mouseenter", () => {
    toggleButton.style.background = "rgb(40, 40, 40)";
  });
  toggleButton.addEventListener("mouseleave", () => {
    toggleButton.style.background = "rgb(20, 20, 20)";
  });
  toggleButton.addEventListener("click", toggleButtonFunction);
  document.body.appendChild(toggleButton);
}

function toggleButtonFunction() {
  classViewerOn = !classViewerOn;
  if (classViewerOn) {
    toggleButton.innerHTML = `${iconToggleOn}<span style="pointer-events: none;">RD® Class Viewer</span>`;
    toggleButton.style.color = "white";
    addViewportBorder();
    addOverlayOnHover();
    applySelectiveNoPointer();
    document.querySelectorAll("*").forEach((el) => {
      if (
        !el.matches(
          ":scope [rd-element-badge=true], [rd-element-badge=true]",
        ) &&
        !el.matches(
          ":scope [rd-classviewer-btn=true], [rd-classviewer-btn=true] *",
        )
      ) {
        el.setAttribute("rd-bypass-animations", "true");
        el.addEventListener("click", elementClick, true);
      }
    });
  } else {
    toggleButton.innerHTML = `${iconToggleOff}<span style="pointer-events: none;">RD® Class Viewer</span>`;
    toggleButton.style.color = "#888888";
    removeViewportBorder();
    removeOverlayOnHover();
    restoreOriginalCursors();
    document.querySelectorAll("*").forEach((el) => {
      el.removeAttribute("rd-bypass-animations", "true");
      el.removeEventListener("click", elementClick, true);
      if (blackBox) {
        blackBox.remove();
      }
    });
  }
}

function addOverlayOnHover() {
  // Create the outline element
  outlineElement = document.createElement("div");
  outlineElement.setAttribute("rd-outline-element", "true");
  outlineElement.style.position = "absolute";
  outlineElement.style.pointerEvents = "none";
  outlineElement.style.border = "1px solid #0084ff";
  outlineElement.style.zIndex = "9999";
  document.body.appendChild(outlineElement);

  // Create the label element container
  labelContainer = document.createElement("div");
  labelContainer.setAttribute("rd-label-element", "true");
  labelContainer.style.position = "absolute";
  labelContainer.style.zIndex = "10000";
  labelContainer.style.fontSize = "12px";
  labelContainer.style.pointerEvents = "none";
  labelContainer.style.display = "flex";
  labelContainer.style.gap = "8px"; // Flex gap of 4px
  document.body.appendChild(labelContainer);

  // Attach the event listeners to all elements
  document.querySelectorAll("*").forEach((el) => {
    el.addEventListener("mouseover", updateOutlineAndLabel);
    el.addEventListener("mouseout", hideOutlineAndLabel);
  });
}

function updateOutlineAndLabel(e) {
  if (
    e.target.closest("[rd-classviewer-btn='true']") ||
    e.target.closest("[rd-black-box='true']")
  ) {
    // If so, don't apply the outline and label
    return;
  }
  const rect = e.target.getBoundingClientRect();
  outlineElement.style.top = `${rect.top + window.scrollY}px`;
  outlineElement.style.left = `${rect.left + window.scrollX}px`;
  outlineElement.style.width = `${rect.width}px`;
  outlineElement.style.height = `${rect.height}px`;
  outlineElement.style.display = "block"; // Show the outline

  // Clear previous label text
  labelContainer.innerHTML = "";

  // Get classes, filter out the ones starting with 'w-', and join them
  let classes = Array.from(e.target.classList)
    .filter((className) => !className.startsWith("w-"))
    .join(".");

  // If there are classes, create span for them
  if (classes) {
    const classSpan = document.createElement("span");
    classSpan.style.color = "#0084ff";
    classSpan.textContent = `.${classes}`;
    labelContainer.appendChild(classSpan);
  }

  // Get id if it exists and does not start with 'w-'
  let id = e.target.id;
  if (id && !id.startsWith("w-")) {
    const idSpan = document.createElement("span");
    idSpan.style.color = "green";
    idSpan.textContent = `#${id}`;
    labelContainer.appendChild(idSpan);
  }

  // If there are no classes or id, create span for element type
  if (!classes && !id) {
    const typeSpan = document.createElement("span");
    typeSpan.style.color = "grey";
    typeSpan.textContent = e.target.tagName.toLowerCase();
    labelContainer.appendChild(typeSpan);
  }

  // Calculate the top position of the labelContainer
  let labelTopPosition =
    rect.top + window.scrollY - labelContainer.offsetHeight - 2;

  // If the labelContainer goes above the top of the viewport, position it below the outlineElement
  if (labelTopPosition < window.scrollY) {
    labelTopPosition = rect.bottom + window.scrollY + 2; // Adjust this value to add some space below the outlineElement if needed
  }

  labelContainer.style.top = `${labelTopPosition}px`; // Apply the top position
  labelContainer.style.left = `${rect.left + window.scrollX}px`;
  labelContainer.style.display = "flex"; // Show the label container
}

function hideOutlineAndLabel() {
  outlineElement.style.display = "none";
  labelContainer.style.display = "none";
}

function removeOverlayOnHover() {
  // Remove the outline element if it exists
  if (outlineElement && outlineElement.parentNode) {
    outlineElement.parentNode.removeChild(outlineElement);
  }
  // Remove the label container if it exists
  if (labelContainer && labelContainer.parentNode) {
    labelContainer.parentNode.removeChild(labelContainer);
  }

  // Remove the event listeners from all elements
  document.querySelectorAll("*").forEach((el) => {
    el.removeEventListener("mouseover", updateOutlineAndLabelRef);
    el.removeEventListener("mouseout", hideOutlineAndLabelRef);
  });
}

function applySelectiveNoPointer() {
  // Find all elements that currently have a pointer cursor
  const elementsWithPointer = document.querySelectorAll("*");

  elementsWithPointer.forEach((el) => {
    // Skip over the elements that should keep the pointer cursor
    if (
      !el.matches(":scope [rd-element-badge=true], [rd-element-badge=true]") &&
      !el.matches(
        ":scope [rd-classviewer-btn=true], [rd-classviewer-btn=true] *",
      )
    ) {
      const computedStyle = window.getComputedStyle(el);
      if (computedStyle.cursor !== "default") {
        // Set a data attribute to mark elements where the cursor is changed
        el.dataset.previousCursor = computedStyle.cursor;
        el.style.cursor = "default";
      }
    }
  });

  // Directly set the cursor for the badges and toggle button
  document
    .querySelectorAll("[rd-element-badge=true], [rd-classviewer-btn=true]")
    .forEach((el) => {
      el.style.cursor = "pointer";
    });
}

function restoreOriginalCursors() {
  // Find all elements where the cursor style was changed
  const elementsWithModifiedCursor = document.querySelectorAll(
    "[data-previous-cursor]",
  );

  elementsWithModifiedCursor.forEach((el) => {
    // Restore the original cursor style
    el.style.cursor = el.dataset.previousCursor;
    // Remove the data attribute
    delete el.dataset.previousCursor;
  });
}

function addViewportBorder() {
  viewportBorder = document.createElement("div");
  viewportBorder.setAttribute("rd-viewport-border", "true");
  viewportBorder.style.position = "fixed";
  viewportBorder.style.zIndex = "10000";
  viewportBorder.style.top = "0";
  viewportBorder.style.left = "0";
  viewportBorder.style.width = "100vw";
  viewportBorder.style.height = "100vh";
  viewportBorder.style.border = "4px solid #0084ff";
  viewportBorder.style.boxSizing = "border-box";
  viewportBorder.style.pointerEvents = "none";
  viewportBorder.style.display = "none"; // Start hidden
  document.body.appendChild(viewportBorder);
  viewportBorder.style.display = "block";
}

function removeViewportBorder() {
  viewportBorder.parentNode.removeChild(viewportBorder);
}

function addStylesToBypassAnimations() {
  const style = document.createElement("style");
  style.innerHTML = `
    [rd-bypass-animations]:hover {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }`;
  document.head.appendChild(style);
}

function elementClick(event) {
  let shouldPreventDefault = true;
  let currentElement = event.target;
  do {
    if (
      event.target.closest("[rd-classviewer-btn='true']") ||
      event.target.closest("[rd-black-box='true']")
    ) {
      shouldPreventDefault = false;
      break;
    }
    currentElement = currentElement.parentElement;
  } while (currentElement && currentElement !== document.body);
  if (shouldPreventDefault && classViewerOn) {
    event.preventDefault();
    event.stopPropagation();

    const blackBox = createBlackBox();
    const elementStack = getElementStack(event.target);
    const badgeRows = elementStack.map(createBadgeRow);

    // Clear the black box contents
    blackBox.innerHTML = "";

    // Set opacity and add new badge rows
    badgeRows.forEach((row, index) => {
      if (index < badgeRows.length - 1) {
        // All except the last row
        row.style.opacity = "0.6";
      }
      blackBox.appendChild(row);
    });
  }
}

function createBlackBox() {
  blackBox = document.querySelector(`[rd-black-box="true"]`);
  if (!blackBox) {
    blackBox = document.createElement("div");
    blackBox.setAttribute("rd-black-box", "true");
    document.body.appendChild(blackBox);

    // Style the black box wrapper
    blackBox.style.position = "fixed";
    blackBox.style.minWidth = "200px";
    blackBox.style.maxWidth = "97vw";
    blackBox.style.maxHeight = "90vh";
    blackBox.style.overflow = "scroll";
    blackBox.style.bottom = "47px";
    blackBox.style.right = "10px";
    blackBox.style.backgroundColor = "rgba(20, 20, 20, 1)";
    blackBox.style.border = "1px solid rgba(255, 255, 255, 0.2)";
    blackBox.style.padding = "4px";
    blackBox.style.borderRadius = "8px";
    blackBox.style.zIndex = "10000";
    blackBox.style.display = "flex";
    blackBox.style.flexDirection = "column";
    blackBox.style.alignItems = "left";
    blackBox.style.gap = "2px";
  }
  return blackBox;
}

function getElementStack(element) {
  const stack = [];
  while (element && element.tagName.toLowerCase() !== "html") {
    stack.unshift(element);
    element = element.parentElement;
  }
  return stack;
}

function createBadgeRow(element) {
  const row = document.createElement("div");
  row.style.display = "flex";
  row.style.alignItems = "center";
  row.style.gap = "1px";

  // Filter out classes and ids starting with 'w-'
  const classes = element.className
    .split(" ")
    .filter((cls) => !cls.startsWith("w-"))
    .join(".");
  const id = element.id && !element.id.startsWith("w-") ? element.id : "";

  // Create badges
  if (classes || id) {
    if (classes) {
      const classBadge = createBadge("." + classes, "#006acc");
      row.appendChild(classBadge);
    }
    if (id) {
      const idBadge = createBadge("#" + id, "rgb(0, 133, 71)");
      row.appendChild(idBadge);
    }
  } else {
    // If there are no classes or id, or they are ignored, display the element type
    const typeBadge = createBadge(element.tagName.toLowerCase(), "#444444");
    row.appendChild(typeBadge);
  }

  return row;
}

function createBadge(content, backgroundColor) {
  const badge = document.createElement("span");
  badge.textContent = content;
  badge.style.padding = "3px 6px";
  badge.style.margin = "2px";
  badge.style.borderRadius = "4px";
  badge.style.background = backgroundColor;
  badge.style.fontSize = "12px";
  badge.style.color = "white";
  badge.style.minWidth = "26px";
  // badge.style.textAlign = "center";
  badge.style.display = "flex";
  badge.style.alignItems = "center";
  badge.style.justifyContent = "center";
  badge.style.cursor = "pointer";
  badge.isCopied = false; // Initialize copied flag
  badge.addEventListener("mouseenter", badgeHoverIn);
  badge.addEventListener("mouseleave", badgeHoverOut);
  badge.addEventListener("click", copyBadgeText);
  return badge;
}

function badgeHoverIn(event) {
  const badge = event.currentTarget;
  if (!badge.isCopied) {
    removeExistingSVG(badge);
    badge.insertAdjacentHTML("beforeend", iconCopy);
  }
}

function badgeHoverOut(event) {
  const badge = event.currentTarget;
  if (!badge.isCopied) {
    removeExistingSVG(badge);
  }
}

function removeExistingSVG(badge) {
  const existingSVG = badge.querySelector("svg");
  if (existingSVG) {
    existingSVG.remove();
  }
}

function copyBadgeText(event) {
  const badge = event.currentTarget;
  badge.isCopied = true; // Set the copied flag to true

  // Save the current width of the badge
  const originalWidth = badge.offsetWidth;

  // Save the current innerHTML (without the SVG icon)
  const originalInnerHTML = badge.innerHTML.replace(/<svg.*<\/svg>/, "").trim();

  // Set the minWidth to the current offsetWidth
  badge.style.minWidth = `${originalWidth}px`;

  // Hide the existing SVG icon
  const existingSVG = badge.querySelector("svg");
  existingSVG.style.display = "none";

  // Add the new SVG icon for "Copied"
  badge.insertAdjacentHTML("beforeend", iconCheckmark);

  // Update the text to "Copied!"
  badge.firstChild.textContent = "Copied!";

  // Copy the original text to the clipboard
  navigator.clipboard.writeText(originalInnerHTML);

  setTimeout(() => {
    // Remove the checkmark SVG icon
    const checkmarkSVG = badge.querySelector("svg[title='checkmark']");
    if (checkmarkSVG) {
      checkmarkSVG.remove();
    }

    // Restore the original SVG icon
    existingSVG.style.display = "block";

    // Reset the text to the original without affecting the SVG icon
    badge.innerHTML = originalInnerHTML;

    // Remove the minWidth style to allow the badge to resize to fit the content
    badge.style.minWidth = "";

    badge.isCopied = false; // Reset the copied flag
  }, 2000);

  event.stopPropagation();
}
