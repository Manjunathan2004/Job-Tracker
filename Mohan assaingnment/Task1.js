                             // Task 1 //
const studentName = "Mohan";
const courseName = "JavaScript";

let score = 75;

console.log("Student Name:", studentName);
console.log("Course Name:", courseName);
console.log("Initial Score:", score);

score = 85;

console.log("Updated Score:", score);

                             // Task 2 //
// Square of a number
const square = (n) => {
    return n * n;
};

// Greet a person
const greet = (name) => {
    return "Hello " + name;
};

// Check whether a person is an adult
const isAdult = (age) => {
    return age >= 18;
};

// Testing the functions
console.log(square(5));
console.log(greet("Mohan"));
console.log(isAdult(20));
console.log(isAdult(16));

                             // Task 3//
const student = {
    name: "Anitha",
    course: "MERN",
    score: 88,
    city: "Chennai",
    batch: "2026"
};

// Object destructuring
const { name, course, score1 } = student;

console.log("Name:", name);
console.log("Course:", course);
console.log("Score1:", score);

                             // Task 4 //
const frontend = ["HTML", "CSS", "JavaScript", "React"];

const backend = ["Node.js", "Express", "MongoDB"];

// Combine frontend and backend skills
const fullStack = [...frontend, ...backend];

console.log("Frontend Skills:", frontend);
console.log("Backend Skills:", backend);
console.log("Full Stack Skills:", fullStack);


// Student object
const student1 = {
    name: "Mohan",
    course: "MERN",
    score: 88
};

// Create updated student object with a new score
const updatedStudent = {
    ...student,
    score: 95
};

console.log("Original Student:", student1);
console.log("Updated Student:", updatedStudent);