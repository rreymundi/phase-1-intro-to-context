// Your code here
// create array for each employee with a record of their information
function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

// creates an array of employee records, which in turn holds an array for each employee
function createEmployeeRecords(employees){
    return employees.map(employee => createEmployeeRecord(employee)) 
}

// creates a time in event
function createTimeInEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ');
    let timeStampObj = {
        'type': 'TimeIn',
        'date': date,
        'hour': parseInt(hour, 10)
    }
    employee.timeInEvents.push(timeStampObj)
    return employee
}

// creates a time out event
function createTimeOutEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ');
    let timeStampObj = {
        'type': 'TimeOut',
        'date': date,
        'hour': parseInt(hour, 10)
    }
    employee.timeOutEvents.push(timeStampObj)
    return employee
}

// create an hours worked functions
function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(element => element.date === date)
    let timeOut = employee.timeOutEvents.find(element => element.date === date)
    let hoursWorkedOnDate = (timeOut.hour - timeIn.hour) / 100
    return hoursWorkedOnDate
}

// create a payroll function
function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

// create function that calculates ALL wages earned
function allWagesFor(employee){
   let datesWorked = employee.timeInEvents.map(employee => employee.date)
    let sum = []
    datesWorked.forEach(date => {
        sum.push(wagesEarnedOnDate(employee, date))
    })
    return sum.reduce((a, b) => a + b, 0)
    }

// create a function that aggregates all the wages for all employees
function calculatePayroll(employees){
   let employeeWages = employees.map(employee => 
        allWagesFor(employee))
    return employeeWages.reduce((a, b) => a + b, 0)
}