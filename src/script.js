const numbers = document.querySelectorAll('.number'),
    opeations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    howWorkBtn = document.getElementById('howWorkBtn'),
    display = document.getElementById('display'),
    operationsList = document.getElementById('operationsList');

let memoryCUR = 0,
    memoryNEW = false,
    memoryPendingOp = '';

for (let i = 0; i<numbers.length; i++)
{
    const number = numbers[i];
    number.addEventListener('click', (e) => numberPress(e.target.textContent));
};

for (let i = 0; i<opeations.length; i++)
{
    let operation = opeations[i];
    operation.addEventListener('click', (e) => Operation(e.target.textContent));

};

decimalBtn.addEventListener('click', Decimal);

for (let i = 0; i<clearBtns.length; i++)
{
    const clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', (e) => Clear(e.srcElement.id));
};

howWorkBtn.addEventListener('click', How);

function numberPress(number) {
    if(memoryNEW){
        display.value = number;
        memoryNEW = false;
    } else
        {
        if(display.value === '0' ) {
            display.value = number;
        }
        else {
            display.value += number;
        }
    }


};

function Operation(op) {
    const localMem = display.value;

    if(memoryNEW && memoryPendingOp !== '=')
    {
        display.value = memoryCUR;
    }
        else
        {
        memoryNEW = true;
        if(memoryPendingOp === '+')
        {
            memoryCUR += parseFloat(localMem);
        }
        else if (memoryPendingOp === '-')
        {
            memoryCUR -= parseFloat(localMem);
        }
        else if (memoryPendingOp === '*')
        {
            memoryCUR *= parseFloat(localMem);
        }
        else if (memoryPendingOp === '/')
        {
            memoryCUR /= parseFloat(localMem);
        }
        else memoryCUR = parseFloat(localMem);

        display.value = memoryCUR;
        memoryPendingOp = op;
    }


}
function Decimal() {
    let localDecim = display.value;

    if(memoryNEW)
    {
        localDecim  = '0.';
        memoryNEW = false;
    }
    else
        {
            if (localDecim.indexOf('.') === -1)
            {
                localDecim += '.';
            }
        }
     display.value = localDecim;

}

function Clear(id)
{
    if(id === 'ce')
    {
        display.value = '0';
        memoryNEW = true;
    }
    else if (id === 'c')
    {
        display.value = '0';
        memoryCUR = 0;
        memoryPendingOp = '';
    }
}

function How()
{
    if (!operationsList.hasChildNodes()) {
        for (let i = 0; i < opeations.length; i++) {
            let newLi = document.createElement('li');
            let operationText = opeations[i].value;
            newLi.innerText = operationText;
            operationsList.appendChild(newLi);
        }
    }
    else operationsList.textContent = '';
}

