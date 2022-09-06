//* Two Sum - Target number 6, array = [2,3,1,4,9] - Easy
// https://leetcode.com/problems/two-sum/

//* Given an array of integers, return the indices of the two numbers that add up to a given target.

//* Goal sort through the array adding items in the array with the previous item to see if it equals the
//* Target number which is 6 so it would be 4 + 2 or 2 + 4

//! Step 1 - Verify the constriants

//! Ask questions to help figure out the problem - Examples below:

//? Are all the numbers positive or can there be negatives? - this would change how i work the solution.

//? Are there any duplicates in the array?

//? Will there always be a solution available? - sometimes the array wont contain numbers that add up to the target
//? so i need to check for this in the solution.
//? Another edge case for this would be that i may recieve an empty array.

//? What do i return if there is no solution? - eg. just return null

//! Step 2 - Write our test cases - work with interviewer to create these

//* Test Cases - i need multiple test cases, best case, worst case etc

//* Test Case #1 - Best Case - where i know for sure what the ansir will be for the given inputs that i receive.

//* [1,3,7,9,2] target = 11, ans = [3,4] so 9 and 2

//* Test Case #2 - Worst Case - no matching numbers for the target

//* [1,3,7,9,2] target = 25 - return null as no possible solution exists

//* Test Case #3 - Worst Case - empty array

//* [] target = 1 - return null as empty array

//* Test Case #3 - Worst Case - only one number in the array

//* [5] target 5 - still null as i need 2 numbers added together to make the target

//! Step 3: Figure out a solution without code

//* Try combination of every single possible number added up to see if there is a pair that equals the target number

//? How would i logically compare all numbers? simple way is nested loop?

//*  0 1 2 3 4  - array index
//* [1,3,7,9,2] t = 11
//* p1(1),p2(3) -> pointer 1 (num1) / pointer 2 (num2)

//*  number to find = target - nums[p1]
//*  11 - 1 = 10 so i're looking for 10 in the rest of the array so p2 will scan for it 1 by 1
//*  p2 couldnt find 10 which means array index 0 (1) cant be part of the solution so array index 1 becomes p1 (3)

//! Brute Force Solution

const findTwoSumOne = function (nums, target) {
  // capture p1 and p2 positions with 2 for loops
  for (let p1 = 0; p1 < nums.length; p1++) {
    //initialises pointer p1 then calculates the number to find (opposing pair)
    //capture number to find
    const numberToFind = target - nums[p1]; //subtract nums[p1] from the target number to find the needed number
    // initialize p2 with another for loop
    // as p2 is 1 position to the right of p1 its p1 + 1
    for (p2 = p1 + 1; p2 < nums.length; p2++) {
      // checking if current value is equal to number to find
      if (numberToFind === nums[p2]) {
        return [p1, p2];
      }
    }
  }
  // inputs with no solution
  return null;
};

console.log(findTwoSumOne([1, 3, 7, 9, 2], 11));

//! Brute Force Method 2

const findTwoSumTwo = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return null;
};

//! Step 5 - Check for errors

//* Check cases, syntax etc

//! Step 6 - Check against Test Cases

//! Step 7 - Space and time complexity

//* for loops are o(n) and i have nested loops so o(n2) not good
//* space complexity i're only reassigning p1 which is a static variable so 0(1) which is good

//! Step 8 - Look for ways to improve the code time complexity (hash map is 0(1) if i have the key)

//* for loop 1 - calculate numberToFind
//* for loop 2 - check nums[p2] === numberToFind - this is wasteful as numberToFind is in the instance of the for loop

//? i want to find a way to store our numberToFind so that i dont have to keep looping through everytime i change p1

//! Step 9 - Plan more efficient solution

// i want to set the key is equal to numberToFind
// the logic is i have a hash map with p1 initialized and it will compare with the number to find
// eg if the array is [1,3,7,9,2] t = 11 - p1 will place 10 in the hash map and so on so hash map becomes {10,8,4,2}
// p1 then moves over to check if if 11 - 9 = 2 is in the array next and it is so it finds it
// since i need to get the index not value i can store the index of the value in the hashmap for the values so 10: 0, 8: 1, etc
// {numberToFind:index} - our hash map

//! Step 10 - Code our more efficent solution

// Space = 0(n)
// Time = 0(n)

const findTwoSumThree = function (nums, target) {
  const numsMap = {}; // this is our hash map of numbers that i generate
  //combine the two for loops into one
  for (let p = 0; p < nums.length; p++) {
    //only 1 pointer needed now
    // first thing i need to do is check if the current value at p already exists inside the hash map
    // currentMapValue is assigned numsMap[nums[p]]
    // returns the index if it exists or undefined if it doesnt
    const currentMapValue = numsMap[nums[p]];
    // check i have the correct index
    // remember 0 is falsey in JS!
    if (currentMapValue >= 0) {
      // returns current value and the index

      return [currentMapValue, p];
    } else {
      // if it doesnt exist (aka not the correct sum pairs)
      const numberToFind = target - nums[p];
      numsMap[numberToFind] = p;
    }
  }
  return null;
};

console.log(findTwoSumThree([0], 11));

//! Step 11 - Review

//* initialize the hash map (numsMap)
//* initialize variable p in our for loop (default value 0)
//* calculate the currentMapValue which is numsMap[nums[p]]
//* hash map is empty as no keys meaning i get undefined
//* assign currentMapValue = undefined
//* compare check in if statement is currentMapValue(undefined) >= 0? which = false
//* step into else block where i set new numberToFind value which = target(11) - nums[p](1) gives us 10
//* so i then set numsMap[numberToFind] to p which is 10
//* repeat after incrementing p by 1 (move to next item in the array)
//* when i get to the number 9 in the array (index 3) 11-9 = 2 which assigns 2:3 to the hashmap (value and index)
//* when i do our next check i find 2 is already in the hashmap
//* i then check if the index(p) so 3 >= 0 then i return the value and index in an array = [3,4]
