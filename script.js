"use strict";

var numbers = document.querySelectorAll('.number'),
    opeations = document.querySelectorAll('.operation'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),
    howWorkBtn = document.getElementById('howWorkBtn'),
    display = document.getElementById('display'),
    operationsList = document.getElementById('operationsList');
var memoryCUR = 0,
    memoryNEW = false,
    memoryPendingOp = '';

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener('click', function (e) {
    return numberPress(e.target.textContent);
  });
}

;

for (var _i = 0; _i < opeations.length; _i++) {
  var operation = opeations[_i];
  operation.addEventListener('click', function (e) {
    return Operation(e.target.textContent);
  });
}

;
decimalBtn.addEventListener('click', Decimal);

for (var _i2 = 0; _i2 < clearBtns.length; _i2++) {
  var clearBtn = clearBtns[_i2];
  clearBtn.addEventListener('click', function (e) {
    return Clear(e.srcElement.id);
  });
}

;
howWorkBtn.addEventListener('click', How);

function numberPress(number) {
  if (memoryNEW) {
    display.value = number;
    memoryNEW = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

;

function Operation(op) {
  var localMem = display.value;

  if (memoryNEW && memoryPendingOp !== '=') {
    display.value = memoryCUR;
  } else {
    memoryNEW = true;

    if (memoryPendingOp === '+') {
      memoryCUR += parseFloat(localMem);
    } else if (memoryPendingOp === '-') {
      memoryCUR -= parseFloat(localMem);
    } else if (memoryPendingOp === '*') {
      memoryCUR *= parseFloat(localMem);
    } else if (memoryPendingOp === '/') {
      memoryCUR /= parseFloat(localMem);
    } else memoryCUR = parseFloat(localMem);

    display.value = memoryCUR;
    memoryPendingOp = op;
  }
}

function Decimal() {
  var localDecim = display.value;

  if (memoryNEW) {
    localDecim = '0.';
    memoryNEW = false;
  } else {
    if (localDecim.indexOf('.') === -1) {
      localDecim += '.';
    }
  }

  display.value = localDecim;
}

function Clear(id) {
  if (id === 'ce') {
    display.value = '0';
    memoryNEW = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryCUR = 0;
    memoryPendingOp = '';
  }
}

function How() {
  if (!operationsList.hasChildNodes()) {
    for (var _i3 = 0; _i3 < opeations.length; _i3++) {
      var newLi = document.createElement('li');
      var operationText = opeations[_i3].value;
      newLi.innerText = operationText;
      operationsList.appendChild(newLi);
    }
  } else operationsList.textContent = '';
}