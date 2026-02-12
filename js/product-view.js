/*
 * DOCU: Toggles the visibility of the user dropdown menu when the avatar is clicked.
 * @param {MouseEvent} event - The click event triggered by the user.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-11
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */
function toggleDropdown(event) {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.classList.toggle("show");
    event.stopPropagation(); // Prevents event from bubbling to window
}

/*
 * DOCU: Closes the dropdown menu when the user clicks outside of it.
 * @param {MouseEvent} event - The click event triggered anywhere on the window.
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-11
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */
function closeDropdown(event) {
    const avatar = document.getElementById("avatar");
    const dropdown = document.getElementById("dropdownMenu");

    if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
}

// Event Listeners
document.getElementById("avatar").addEventListener("click", toggleDropdown);
window.addEventListener("click", closeDropdown);

/*
 * DOCU: Updates the quantity input when the user clicks the plus/minus buttons.
 * @param {number} step - The value to add to the current quantity (ex: -1 or 1).
 * @returns {void} - Does not return a value.
 * @throws {None} - No exceptions are thrown.
 *
 * Last Updated: 2026-02-11
 * Author: Jheanne A. Salan
 * Last Updated By: Jheanne A. Salan
 */
function changeQty(step) {
    const qtyInput = document.getElementById("qty");
    const current = parseInt(qtyInput.value, 10) || 1;
    const next = Math.max(1, current + step);
    qtyInput.value = next;
}

