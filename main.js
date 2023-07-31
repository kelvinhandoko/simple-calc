const themeSwitch = document.querySelector(".theme-switch")
const switcher = themeSwitch.querySelectorAll("i")
const body = document.querySelector("body")

switcher.forEach(item => {
    item.addEventListener("click", () => {
        const sunIcon = themeSwitch.querySelector('[data-toggle="light"]')
        const moonIcon = themeSwitch.querySelector('[data-toggle="dark"]')
        moonIcon.classList.toggle("bi-moon")
        moonIcon.classList.toggle("bi-moon-fill")
        sunIcon.classList.toggle("bi-sun")
        sunIcon.classList.toggle("bi-sun-fill")
        body.dataset.theme = item.dataset.toggle
    })
})

const resultElement = document.querySelector(".result")
const prevResultElement = document.querySelector(".prev-result")
const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll("[data-type='operation']")
const submitButton = document.querySelector('[data-type="submit"]')
const acButton = document.querySelector('[data-value="AC"]')
const percentButton = document.querySelector('[data-type="percent"]')
const restartButton = document.querySelector('[data-type="restart"]')
const decimalButton = document.querySelector('[data-type="decimal"]')
const negativeButton = document.querySelector('[data-type="negative"]')

let currentExpression = ""
let prevResult = ""

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentExpression += button.innerText
        updateDisplay()
    })
})

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentExpression += " " + button.innerText + " "
        updateDisplay()
    })
})

negativeButton.addEventListener("click", () => {
    const currentCalc = currentExpression.split(" ")
    console.log(currentCalc)
    const convertLastNumber = currentCalc.at(-1) * -1
    currentCalc.splice(currentCalc.length - 1, 1, convertLastNumber)
    currentExpression = currentCalc.join(" ")
    updateDisplay()
})

// Add event listener to the "=" (equal) button
submitButton.addEventListener("click", () => {
    try {
        prevResult = currentExpression
        currentExpression = calculateExpression(currentExpression).toString()
        updateDisplay()
    } catch (error) {
        // Handle errors, e.g., divide by zero
        currentExpression = "Error"
        updateDisplay()
    }
})

acButton.addEventListener("click", () => {
    currentExpression = ""
    prevResult = ""
    updateDisplay()
})

percentButton.addEventListener("click", () => {
    try {
        currentExpression = (calculateExpression(currentExpression) / 100).toString()
        updateDisplay()
    } catch (error) {
        currentExpression = "Error"
        updateDisplay()
    }
})

restartButton.addEventListener("click", () => {
    currentExpression = ""
    prevResult = ""
    updateDisplay()
})

decimalButton.addEventListener("click", () => {
    currentExpression += "."
    updateDisplay()
})

function updateDisplay() {
    resultElement.innerText = currentExpression
    prevResultElement.innerText = prevResult
}

function calculateExpression(expression) {
    const tokens = expression.split(" ")
    let result = parseFloat(tokens[0])

    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i]
        const operand = parseFloat(tokens[i + 1])

        if (operator === "+") {
            result += operand
        } else if (operator === "-") {
            result -= operand
        } else if (operator === "*") {
            result *= operand
        } else if (operator === "/") {
            if (operand === 0) {
                throw new Error("Division by zero is not allowed.")
            }
            result /= operand
        }
    }

    return result
}
