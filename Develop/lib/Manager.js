// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
//activity 21
const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;

    }
    getRole() {
        return "Manager";
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

let karen = new Manager("Karen", 23, "test@test", 100);
// console.log(karen);

module.exports = Manager;