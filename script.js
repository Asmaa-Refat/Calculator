class Calculator
{
    constructor(firstOperandTextElement , secondOperandTextElement)
    {
        this.firstOperandTextElement = firstOperandTextElement
        this.secondOperandTextElement = secondOperandTextElement
        this.clear()
    }
    clear()
    {
        this.secondOperand = ''
        this.firstOperand = ''
        this.operation = undefined
    }

    compute()
    {
        let computation
        const first = parseFloat (this.firstOperand)
        const second = parseFloat(this.secondOperand)
        if (isNaN(first) || isNaN(second))
           return
        switch (this.operation)
        {
            case '+':
                computation = first + second
                break
            case '-':
                computation = first - second
                break
            case '/':
                computation = first / second
                break 
            case '*':
                computation = first * second
                break 
            default:
                return                              
        }
        this.secondOperand = computation
        this.operation = undefined
        this.firstOperand = ''
    }

    

    update() 
    {
        this.secondOperandTextElement.innerText = this.secondOperand
        if(this.operation != null )
        {
            this.firstOperandTextElement.innerText =
            `${this.firstOperand} ${this.operation}`
        }
        else
        {
            this.firstOperandTextElement.innerText = ''
        }
    }

    delete()
    {
        this.secondOperand = this.secondOperand.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        if(number === '.' && this.secondOperand.includes('.')) 
           return
        this.secondOperand = this.secondOperand.toString() +  number.toString()
    }

    chooseOperation(operation)
    {
        if (this.secondOperand === '') 
           return 
        if (this.firstOperand !== '')
        {
            this.compute()
        }
        this.operation = operation
        this.firstOperand = this.secondOperand
        this.secondOperand = ''
    }


}
 


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const ClearButton = document.querySelector('[data-clear] ')
const firstOperandTextElement = document.querySelector('[data-first-operand]')
const secondOperandTextElement = document.querySelector('[data-second-operand]')


// creating an object from class Calculator  
const calculator = new Calculator(firstOperandTextElement, secondOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText)
        calculator.update()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText)
        calculator.update()
    })
})

equalsButton.addEventListener('click' , button => {
    calculator.compute()
    calculator.update()
})


ClearButton.addEventListener('click' , button => {
    calculator.clear()
    calculator.update()
})

deleteButton.addEventListener('click' , button => {
    calculator.delete()
    calculator.update()
})