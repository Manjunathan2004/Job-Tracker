const studentName = document.getElementById("studentName");
const addButton = document.getElementById("addButton");
const studentList = document.getElementById("studentList");

addButton.addEventListener("click", function () {

    // Get the name entered by the user
    const name = studentName.value.trim();

    // Check if input is not empty
    if (name === "") {
        alert("Please enter a student name");
        return;
    }

    // Create a new list item
    const listItem = document.createElement("li");

    // Add the entered name to the list item
    listItem.textContent = name;

    // Add the list item to the student list
    studentList.appendChild(listItem);

    // Clear the input box
    studentName.value = "";

    // Put cursor back in input
    studentName.focus();
});