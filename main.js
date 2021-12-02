let getDisplay = document.querySelector("p");

let currNum = "";
let prevNum = "";
let operand = null;
let equalSign = null;
let result = 0;
let total = false;

function getNum(e) {
  //if total is false, btn click stores in prev
  //if true,, btn click stores in curr
  if (prevNum.length > 9 || currNum.length > 9) {
    getDisplay.style.overflow = "hidden";
  }

  !total ? (prevNum += e) : (currNum += e);
  if (equalSign) {
    //when btn is click, if there is equal sign present
    //set result to 0 and equal sign to null
    //so number click will be stored to previous
    result = 0;
    equalSign = null;
    getDisplay.innerHTML = "";
  }
  if (result) {
    getDisplay.innerHTML = currNum;
  } else {
    getDisplay.innerHTML += e;
  }
}

function getOperand(e) {   

   getDisplay.innerHTML = ""; 
  if (currNum === "") {
    //when operation click, and the current is empty
    //we return true, so the number click gets store in current
    total = true; 
    operand = e
  } else {  
    if (result === 0) { 
      //when operation click and current and previous are
      //present and result is 0
      //compute curr and prev
      //after, we set total to true, so next number
      //click gets store in current
      //we empty current too, to get a fresh new number
      result = compute(currNum, prevNum);
       
      if (result.toString().length > 9) {
        getDisplay.style.overflow = "hidden";
      }
      getDisplay.innerHTML = result;
      prevNum = result; 
      total = true;
      currNum = "";
      operand = e
      console.log(e)
    } else {  
      //when operation click and result is not 0 and curr is no empty
      //we assign result to previous
      //then compute prev to curr (prev is the result prev number)
      prevNum = result; 
      result = compute(currNum, prevNum);
      if (result.toString().length > 9) {
        getDisplay.style.overflow = "hidden";
      }
      getDisplay.innerHTML = result;
      currNum = ""; 
      operand = e
    }
  }

   
  if (equalSign) {
    //if equal sign is present when operation btn is clicked
    //assign result to previous, total to true so the number click
    //gets store to current and result will be zero
    //so when we click = again, it will compute the result
    //using the previous result and the current number clicked.
    prevNum = result;
    total = true;
    result = 0;
    currNum = "";
  }
}

function equals(e) {
  equalSign = e;

  result = compute(currNum, prevNum);
  getDisplay.innerHTML = result;
  console.log(result);
  //once equal is click, compute current and previous
  //set total to false- so next number click saves to prev
  //clear prev and num, and clear operand too (to be sure!!)
  prevNum = "";
  currNum = "";
  total = false;
  operand = null;
  // console.log(`current: ${currNum}, previous: ${prevNum}, result: ${result}
  //  operand: ${operand}`)
  if (getDisplay.innerHTML === "NaN") {
    getDisplay.innerHTML = "Err..";
  }
}

function compute(currNum, prevNum) {
  let current = parseFloat(currNum);
  let previous = parseFloat(prevNum);

  if (operand === "+") {
    return previous + current;
  }
  if (operand === "-") {
    return previous - current;
  }
  if (operand === "*") {
    return previous * current;
  }
  if (operand === "/") {
    return previous / current;
  }
}

function reset() {
  getDisplay.innerHTML = "";
  currNum = "";
  prevNum = "";
  result = 0;
  operand = null;
  equalSign = null;
  total = false;
}
 