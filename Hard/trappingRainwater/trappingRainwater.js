//* Trapping Rain Water - Hard
// https://leetcode.com/problems/trapping-rain-water/

//* Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
//* The elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

//! Step 1 - Verify Constraints

//? Do the left and right sides of the graph count as walls?

// No

//? Will there be negative integers?

// No - all positive

//! Step 2 - Test Cases

//* Test Cases - I need multiple test cases, best case, worst case etc

//* Test Case #1 - Best Case - where I know for sure what the answer will be for the given inputs that i receive.

//* [0,1,0,2,1,0,3,1,0,1,2] - Target answer = 8

//* Test Case #2 - Worst Case - no possible rain storage

//* [3,4,3] answer = 0

//* Test Case #3 - Worst Case - empty array

//* [] answer = 0

//* Test Case #3 - Worst Case - only one number in the array

//* [5] answer = 0

//! Step 3: Figure out a solution without code

// Test array = [0,1,0,2,1,0,3,1,0,1,2]

// Requires whole array
// formula = currentWater = min(maxL,maxR) - currentHeight
// 4 values total, pointer, max left and max right
// max container height is the lowest of the heightest two walls
// heights inside container effect total water aswell
// start at p and check if any values to the left
// nothing to the left so L is 0
// start at p then check values to the right
// 1 to the right which is higher than 0 so R = 1
// move right again and 0 is less than 1 so R = 1
// move right again and 2 is greater than 1 so R = 2
// move right again and 1 is less than 2 so R = 2
// move right again and 0 is less than 2 so R = 2
// move right again and 3 is greater than 2 so R = 3
// repeat throughout the rest of the array
// min of L & R = 0 - our current height which is 0 (first item in the array is 0)
// total = 0, P moves to index 1 and repeat the above process
// If p is < 0 skip (need to have this or -1 issues will occur)

//! Step 4: Brute force solution

//* Formula = currentWater = min(maxL,maxR) - currentHeight
//* Time =
//* Space =

const trappedRainwater = function (heights) {
  // initialize totalWater to track amount of water we find
  let totalWater = 0;

  // for loops so we can iterate the pointer through the array
  for (let p = 0; p < heights.length; p++) {
    // initialize leftP and rightP to traverse through the array left & right from the origin of p,
    // initialize maxLeft and maxRight to track heighest values left and right
    // eg take the first 3 values from the test array above if p was at index 1
    // leftP(0) p(1) rightP(0)

    let leftP = p,
      rightP = p,
      maxLeft = 0,
      maxRight = 0;

    // >= 0 as we stop at start of array
    while (leftP >= 0) {
      // check which is heightest number between maxLeft and LeftP
      // if leftP value is higher than maxLeft then leftP height becomes new maxLeft
      maxLeft = Math.max(maxLeft, heights[leftP]);
      // decrement as leftP moves left in the array
      leftP--;
    }

    // heights.length as we stop at the end of the array
    while (rightP < heights.length) {
      // check which is heightest number between maxRight and rightP
      // if rightP value is higher than maxRight then rightP height becomes new maxRight
      maxRight = Math.max(maxRight, heights[rightP]);
      // increment as rightP moves right in the array
      rightP++;
    }

    // calculate and store water that we have
    // min value as water cant store heigher than this
    // subtract current p value'
    // so if maxLeft is 3, maxRight is 4 and p is 1
    // 3 - 1 = 2 so we can store 2 squares of water in that space
    const currentWater = Math.min(maxLeft, maxRight) - heights[p];

    // make sure currentWater isn't a negative number then add the currentWater to the totalWater then move onto the next iteration and repeat
    // until the whole array water space has been totalled
    if (currentWater >= 0) {
      totalWater += currentWater;
    }
  }
  return totalWater;
};

// Test Cases

console.log(trappedRainwater([0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2])); //8
console.log(trappedRainwater([])); //0
console.log(trappedRainwater([2])); //0
