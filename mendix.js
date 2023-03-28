/**
 * 
 * Usage: hold Ctrl + arrowKey while focused on a timesheet enter field to 
 *        change focused field to the field matching the direction of the 
 *        arrowKey
 * 
 * You can change "e.ctrlKey" in the if statements to use a different hotkey 
 *        arrangement. See https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 *        for more information on available event properties
 * 
 * Currently there is no 'wrapping' i.e. hitting Ctrl + ArrowRight at the end
 *        of a row will not do anything. Let me know if it's a big deal and 
 *        I can add in the future
 * 
 */

function getParentElement(element, level = 1) {
  // 1 - default value (if no 'level' parameter is passed to the function)
  while (level-- > 0) {
    element = element.parentElement;
    if (!element) return null; // to avoid a possible "TypeError: Cannot read property 'parentElement' of null" if the requested level is higher than document
  }
  return element;
}
function getChildElement(element, level = 1) {
  // 1 - default value (if no 'level' parameter is passed to the function)
  while (level-- > 0) {
    element = element.firstElementChild;
    if (!element) return null; // to avoid a possible "TypeError: Cannot read property 'firstElementChild' of null" if the requested level is higher than document
  }
  return element;
}

window.addEventListener("keydown", logkey);

function logkey(e) {
  if (
    document.activeElement.parentElement &&
    document.activeElement.parentElement.className.includes(
      "timesheet-time-enter-field"
    )
  ) {
    // check if we are in a time sheet enter field
    if (e.ctrlKey && e.code == "ArrowRight") {
      // if arrow right
      if (document.activeElement.parentElement.nextElementSibling) {
        document.activeElement.parentElement.nextElementSibling.firstElementChild.focus();
      } // focus the next time sheet enter field to the right
    } else if (e.ctrlKey && e.code == "ArrowLeft") {
      // if arrow left
      if (document.activeElement.parentElement.previousElementSibling) {
        document.activeElement.parentElement.previousElementSibling.firstElementChild.focus();
      } // focus next time sheet enter field to the left
    } else if (e.ctrlKey && e.code == "ArrowUp") {
      // if arrow up
      if (getParentElement(document.activeElement, 18).previousElementSibling) {
        // if there is a field above
        prev = document.activeElement.parentElement.className; // store the classname of focused field
        temp = getParentElement(
          document.activeElement,
          18
        ).previousElementSibling; // find the parent that is the sibling of the parent of the next focused field
        let next = getChildElement(temp, 4).lastElementChild.firstElementChild
          .firstElementChild.firstElementChild.lastElementChild
          .firstElementChild.children[5].firstElementChild.firstElementChild
          .firstElementChild.firstElementChild.firstElementChild; // find the next row that contains the next focused field
        for (const child of next.children) {
          // loop over the row containing the next focused field
          if (child.className == prev) {
            // if the classname matches the stored classname then focus that field
            child.firstElementChild.focus();
          }
        }
      }
    } else if (e.ctrlKey && e.code == "ArrowDown") {
      // if arrow down
      if (getParentElement(document.activeElement, 18).nextElementSibling) {
        // if there is a field below
        prev = document.activeElement.parentElement.className; // store classname of focused field
        temp = getParentElement(document.activeElement, 18).nextElementSibling; // find the parent that is the sibling of the parent of the next focused field
        let next = getChildElement(temp, 4).lastElementChild.firstElementChild
          .firstElementChild.firstElementChild.lastElementChild
          .firstElementChild.children[5].firstElementChild.firstElementChild
          .firstElementChild.firstElementChild.firstElementChild; // find the row containing the next focused field
        for (const child of next.children) {
          // loop over the row containing the next focused field
          if (child.className == prev) {
            // if the classname matches the stored classname then focus that field
            child.firstElementChild.focus();
          }
        }
      }
    }
  }
}
