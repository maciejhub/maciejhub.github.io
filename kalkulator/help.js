    let operator = "";
    let wynik = "0";
    let oplength = operator.length;
    redraw();
    function addplus() {
      oplength = operator.length;
      if (oplength < 2) {
      operator = operator + "+";
      } else {
      operator = "+";
      }
      document.getElementById("operator").innerHTML = operator;
    }
    function addequal() { 
      oplength = operator.length;
      if (oplength < 2) {
      operator = operator + "=";
      } else {
      operator = "=";
      }
      document.getElementById("operator").innerHTML = operator;
    }
    function addminus() {
      oplength = operator.length;
      if (oplength < 2) {
      operator = operator + "-";
      } else {
      operator = "-";
      }
      document.getElementById("operator").innerHTML = operator;
    }  
      function redraw() {
      document.getElementById("operator").innerHTML = operator;
      document.getElementById("wynik").innerHTML = wynik;
      one = document.getElementById("1").value;
      two = document.getElementById("2").value;  
    if (operator == "+") {
        wynik = one + two;
    }
    if (operator == "-") {
        wynik = one - two;
    }
      if (operator == "+=") {
        wynik = parseInt(one) + parseInt(two);
    }
    if (operator == "-=") {
      wynik = parseInt(one) - parseInt(two);
    }
      if (operator.substring(0, 1) == "=") {
      wynik = "Uncaught ReferenceError: cannot assign to function call";
    }
      if (operator == "==") {
        if (one == two) {
          wynik = "true";
        } else {
          wynik = "false";
        }
    }
    if (operator == "=") {
      wynik = two;
    }
      if (operator == "++") {
      wynik = "Uncaught SyntaxError: unexpected token: identifier";
    }
          if (operator == "--") {
      wynik = "Uncaught SyntaxError: invalid increment/decrement operand";
    }
      document.getElementById("operator").innerHTML = operator;
      document.getElementById("wynik").innerHTML = wynik;
      one = document.getElementById("1").value;
      two = document.getElementById("2").value;  
    }
      