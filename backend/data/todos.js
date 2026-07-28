// In-memory "database" — data yahan sirf tab tak rehta hai jab tak server chal raha hai.
// Jaise hi server restart hoga, data reset ho jayega (kyunki koi real DB use nahi ho raha).

let todos = [
  { id: 1, text: "Learn React basics", completed: false },
  { id: 2, text: "Build a Todo App", completed: false },
];

// Naya id generate karne ke liye counter — hamesha next unique number deta hai
let nextId = 3;

const getNextId = () => nextId++;

module.exports = { todos, getNextId };
