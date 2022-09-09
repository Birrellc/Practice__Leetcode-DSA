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

const trappedRainwater = function (heights) {
  // initialize totalWater to track amount of water we find
  let totalWater = 0;
  console.log({ totalWater });

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
    console.log({ leftP });
    console.log({ rightP });

    // >= 0 as we stop at start of array
    while (leftP >= 0) {
      console.log({ maxLeft });
      // check which is heightest number between maxLeft and LeftP
      // if leftP value is higher than maxLeft then leftP height becomes new maxLeft
      maxLeft = Math.max(maxLeft, heights[leftP]);
      console.log({ maxLeft });

      // decrement as leftP moves left in the array
      leftP--;
      console.log({ leftP });
    }

    // heights.length as we stop at the end of the array
    while (rightP < heights.length) {
      console.log({ maxRight });
      // check which is heightest number between maxRight and rightP
      // if rightP value is higher than maxRight then rightP height becomes new maxRight
      maxRight = Math.max(maxRight, heights[rightP]);
      console.log({ maxRight });
      // increment as rightP moves right in the array
      rightP++;
      console.log({ rightP });
    }

    // calculate and store water that we have
    // min value as water cant store heigher than this
    // subtract current p value'
    // so if maxLeft is 3, maxRight is 4 and p is 1
    // 3 - 1 = 2 so we can store 2 squares of water in that space
    const currentWater = Math.min(maxLeft, maxRight) - heights[p];
    console.log(heights[p]);
    console.log({ currentWater });

    // make sure currentWater isn't a negative number then add the currentWater to the totalWater then move onto the next iteration and repeat
    // until the whole array water space has been totalled
    if (currentWater >= 0) {
      totalWater += currentWater;
      console.log({ totalWater });
    }
  }
  return totalWater;
};

//! Step 5 - Check for errors

//* Console log's added to track whats happening in the code line by line with no errors

//! Step 6 - Check against Test Cases

console.log(trappedRainwater([0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2])); //8
console.log(trappedRainwater([])); //0
console.log(trappedRainwater([2])); //0

//! Step 7 - Space and time complexity

//* Time = o(n^2) - touch every element once per iteration (iterate through values n times per n iteration)
//* Space = O(1) - No scaling storage (always only holds 1 value at a time)

//! Step 8 - Look for ways to improve the //! Step 11 - Reviewcode time complexity

//* Will reducing space performance to improve time performance be a good idea? - Not Applicable (nothing we can do with memory to improve time)
//* Shifting Pointers? - iterate inwards instead of outwards? - lowest of the 2 moves inwards in the array?
//* One while loop instead of a forloop? instantiate left = 0 and right as heights.length -1 and do left < right?

//! Step 9 - Plan more efficient solution

//* initialize a left and right pointer (0 & heights.length -1)
//* initialize maxLeft and maxRight at 0
//* while left < right (heights.length < 1) perform the calculation
//* assign heights[left] to maxLeft if >= and same for heights[right] & maxRight
//* if heights[left] <= maxLeft then totalwater += maxLeft - heights[left]
//* iterate left to the next index regardless of which outcome
//* if heights[right] <= maxRight then totalwater += maxRight - heights[right]
//* decrement right to the previous item in the array regardless of outcome
//* once all calculations have complete return the totalWater value
//* Example:

//
// index:        0 1 2 3 4 5 6 7 8 9 10
// test array:  [0,1,0,2,1,0,3,1,0,1,2]
// Pointers:    pl                   pr

// inital left = 0, right = 10, maxLeft = 0, maxRight = 0, pl = 0, pr = 2
// left(0) < right(10) so enter the while loop
// conditional if pl(0) <= pr(2) enter to next conditional
// conditional if pl(0) >= maxLeft(0) then maxLeft = maxLeft(0) - heights[left](0)
// maxLeft = 0
// left++

// repeat the process till maxLeft is > than pl then if so totalWater += maxLeft - pl
// gives us 1 for index 2

// throughout the process if pl > pr
// do the same calculation with pr and maxRight instead
// but instead of incrementing we decrement (right--)

//! Step 10 - Code our more efficent solution

//* Time = O(n) - iterating over the array only once
//* Space = O(1) - static variables

const trappedRainwaterTwo = function (heights) {
  let left = 0,
    right = heights.length - 1,
    maxLeft = 0,
    maxRight = 0,
    totalWater = 0;

  while (left < right) {
    console.log({ left, right });
    if (heights[left] <= heights[right]) {
      if (heights[left] >= maxLeft) {
        console.log('pl', heights[left], { maxLeft });
        maxLeft = heights[left];
      } else {
        console.log({ maxLeft }, 'pl', heights[left]);
        totalWater += maxLeft - heights[left];
        console.log({ totalWater });
      }

      left++;
      console.log({ left });
    } else {
      if (heights[right] >= maxRight) {
        console.log('pr', heights[right], { maxRight });
        maxRight = heights[right];
        console.log('pr', heights[right], { maxRight });
      } else {
        console.log({ maxRight }, 'pl', heights[right]);
        totalWater += maxRight - heights[right];
        console.log({ totalWater });
      }
      right--;
    }
    console.log({ totalWater });
  }
  return totalWater;
};

console.log(trappedRainwaterTwo([0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 2])); //8
console.log(trappedRainwaterTwo([])); //0
console.log(trappedRainwaterTwo([2])); //0

//! Step 11 - Review

//* initialize left, right, maxLeft, maxRight & totalWater variables
//* while left <= Right
//* identify pointer with lesser value
//* if our pointer value is >= the max on that side
//* if so assign maxLeft as the pointer value
//* else maxLeft - pointer value += totalWater
//* move pointer inwards
//* then when left > right do the same but for the right side and decrement
