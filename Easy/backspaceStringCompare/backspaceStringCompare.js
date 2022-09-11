//* Backspace String Compare - Easy
// https://leetcode.com/problems/backspace-string-compare/

//* Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
//* Note that after backspacing an empty text, the text will continue empty.

//* Example 1:
// Input: s = "ab#c", t = "ad#c"
// Output: true
// Explanation: Both s and t become "ac".

//* Example 2:
// Input: s = "ab##", t = "c#d#"
// Output: true
// Explanation: Both s and t become "".

//* Example 3:
// Input: s = "a#c", t = "b"
// Output: false
// Explanation: s becomes "c" while t becomes "b".

//! Step 1 - Verify Constraints

//? What happens when two #'s appear beside each other?

// ab## - becomes '' -

//? What if there is no letter prior to backspace?

// Deleted whitespace (nothing) like in a word document (a###b = b)

//? Does case sensitivity matter?

// Yes (if no just take any strings nad lowercase entire string)

//? Are two empty string equal to each other?

// Yes, consider two empty strings as equal.

//! Step 2 - Test Cases

//* Test Cases - I need multiple test cases, best case, worst case etc

//* Test Case #1 - Best Case - where I know for sure what the answer will be for the given inputs that i receive.

// s: 'ab#z' - t:'az#z - True

//* Test Case #2 - Wrong answer - where the answer seems correct but is wrong

// s:'abc#d' t:'acc#c' - False

//* Test Case #3 - Empty String - when we return empty strings - both empty

// s:'x#y#2#' t:'a#' - True

//* Test Case #4 - Multiple consecutive #'s

// s:'a###b' t:'b' - True

//* Test Case #5 - Upper & lower case

// s:'Ab#z' t:'ab#z - False

//! Step 3: Figure out a solution without code

//* Test data: s = 'ab#z' t = 'ab#z'

// convert both to az then boolean comparision?
// iterate through the array when we get to '#' remove previous value?
// do same for second string then deeply equals comparision?
// if equal return true
// if not equal return false
// if output strings length arent equal return false
// split into 2 seperate functions
// function a) remove # and

//! Step 4: Brute force solution

const buildString = (string) => {
  // initialize final output array to fill
  const builtArray = [];
  // loop through the string array (passed into the function)
  for (let p = 0; p < string.length; p++) {
    // string[p] === # pop from string array else push to builtArray
    if (string[p] !== '#') {
      builtArray.push(string[p]);
      console.log({ builtArray });
    } else {
      // pop the last element from array when reach # so will be 'ab' then we reach # and then we pop 'b'
      builtArray.pop();
    }
  }
  console.log({ builtArray });
  return builtArray;
};

console.log(buildString('ab#c')); // ac

const compareStrings = (s, t) => {
  // pass s & t through the buildString function to remove the backspaced characters then assign to new variables to use in this function
  const stringS = buildString(s);
  const stringT = buildString(t);

  // check if strings are not the same length as if they aren't they are not the same so return False
  if (stringS.length !== stringT.length) {
    return false;
  } else {
    // loop through the strings pointer by pointer and if they don't match return false
    for (let p = 0; p < stringS.length; p++) {
      if (stringS[p] !== stringT[p]) {
        return false;
      }
    }
  }
  return true;
};

console.log(compareStrings('ab#c', 'ad#c'));
