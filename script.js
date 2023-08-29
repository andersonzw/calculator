class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        // only allow 1 period
        if (number === '.' && this.currentOperand.includes('.')) return

        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute() //update variable
        }
       
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '' //clearing out current operand
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'X':
                computation = prev * current
                break

            case '/':
                computation = prev / current
                break
        default:
            return
        }
        //reset
        this.currentOperand = computation
        this.operation = undefined
  
    }
    

    
    updateDisplay(){
        this.currentOperandTextElement.textContent = this.currentOperand
        if (this.operation != null){
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.textContent = ''
        }
    }


    getDisplayNumber(number){
        return number
    }
}



const numberButtons = document.querySelectorAll(".number")
const operationButtons = document.querySelectorAll(".operand")
const equalsButton = document.querySelector("#equal")
const clearButton = document.querySelector("#clear")
const delButton = document.querySelector("#delete")
const previousOperandTextElement = document.querySelector(".previous-operand")
const currentOperandTextElement = document.querySelector(".current-operand")


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })

})

operationButtons.forEach(button =>{
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })

})


equalsButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})