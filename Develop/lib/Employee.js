// TODO: Write code to define and export the Employee class
//create class (activity 21)
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email
    }
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return "Employee";
    }
}
// let aliceName = new Employee("Alice")
// console.log(aliceName)
const alice = new Employee("Alice", 1, "test@test")
console.log(alice)

module.exports = Employee;