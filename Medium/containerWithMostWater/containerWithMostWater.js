//* Container With Most Water - Medium
// https://leetcode.com/problems/container-with-most-water/

//* You are given an integer array 'height' of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i,0) and
//* (i, height[i])
//* Find two lines that together with the x-axis form a container, such that the container contains the most water.
//* Return the maximum amount of water a container can store.

//* Simplified

//* You are given an array of positive integers where each integer represents the height of a vertical line on a chart.
//* Find two lines which together with the x-axis forms a container that would hold the greatest amount of water.
//* Return the area of water it would hold
//* Area = Length * Width

//* Example - [1,8,6,2,9,4] - 8 and 9 would be used to create the box - 3 indecies between 8 and 9 - 8*3 = 24
//* (use 8 because the water cant go past the lowest of the pair in hegith) (8 is the length and 3 is the width) (futhered apart biggest pair)

//! Step 1 - Verify the constriants

//! Ask questions to help figure out the problem - Examples below:

//? Does the thickness of the lines affect the area? for example a larger column in the middle of the pair used for the container
// No assume they take up no space.

//? Do the left and right sides of the graph count as walls?
// No, the sides cannot be used to form a container

//? Does a higher line inside our container affect our area?
// No, the value in the middle won't affect the container

//! Step 2 - Write our test cases - work with interviewer to create these

//* Test Case #1 - Best Case - Where i know for sure what the ansir will be for the given inputs that i receive.

//* [7,1,2,3,9] - 7 and 9 are the highest and furthest so highest area - 7 x 4 = 28

//* Test Case #2 - Worst Case - Where the 2 numbers that would give the most area are not the furthest apart in the array

//* [6,9,3,4,5,8] - 8 x 4 = 32 and 6 x 5 = 30 so 9 and 8 are the numbers i need

//* Test Case #3 - Worst Case - empty array

//* [] target = 1 - return as 0

//* Test Case #3 - Worst Case - only one number in the array

//* [5] target 5 - return as 0

//! Step 3: Figure out a solution without code

// Test array = [7,1,2,3,9]

// Looking for a specific max value (we need to calculate all number combinations) - calculate every single container
// Length x width = max area
// Length is the lesser of the two values
// Width is the differnce in indexes between the highest and the lowest
// Min(a,b) * (b[i]-a[i]) = formula for area
// Pointer a is first pointer
// Pointer b is second pointer (the value that moves and checks)
// Need to track maxArea with a variable
// Min(7,1) x (1-0) = 1*1 = 1
// If maxArea is < area (1 in this case) replace maxArea with 1
// Move pointer b to the next index
// Min(7,2) * (2-0) 2*2 = 4
// If maxArea is < area (4 in this case) maxArea becomes 4
// Min(7,3) * (3-0) 3*3 = 9
// If maxArea is < area (4 in this case) maxArea becomes 9
// Min(7,9) * (4-0) 7*4 = 28
// If maxArea is < area (28 in this case) maxArea becomes 28
// After this we have finished all cases for index 0 (7) so pointer a moves to index 1(1) and pointer b moves to index 2(2)
// Min(1,2) * (2-1) = 1
// If maxArea(28) is < 1 maxArea becomes 1 but it isnt so maxArea stays 28
// Repeat this process for the whole array

//! Step 4: Brute force solution

//* area = min(a,b) * (b[i]-a[i])
//* Time = 0(n^2) as we have nested for loops
//* Space = 0(1) not storing any scaling value in memory only using static values

const getMaxWaterContainer = function (heights) {
  // instatiate maxArea with inital value of 0
  let maxArea = 0;
  console.log({ maxArea });
  // as we need to move through the array this needs to be done with a forloop
  for (let p1 = 0; p1 < heights.length; p1++) {
    console.log({ p1, value: heights[p1] });
    // dont need to instatiate variables inside first loop as our solution is based on p1 and p2 together
    // we need every value to the right of p1 so its p2 = p1+1 so p2 starts at index 1 not index 0
    for (let p2 = p1 + 1; p2 < heights.length; p2++) {
      console.log({ p2 });
      // Logic - min(a,b) * (b[i] - a[i])
      // Initialize height value
      // min number from heights[p1], heights[p2] (7,1 would return 1)
      console.log(heights[p1], heights[[p2]]);
      const height = Math.min(heights[p1], heights[p2]);
      console.log(height);
      // get the width by subtracting the index
      const width = p2 - p1;
      // calculate the area by height * width;
      const area = height * width;
      console.log(area);
      // compare existing maxArea with our new calculated area and replace maxArea with the heighest value
      maxArea = Math.max(maxArea, area);
    }
  }
  return maxArea;
};

// Test Cases

console.log(getMaxWaterContainer([7, 1, 2, 3, 9])); // 28
console.log(getMaxWaterContainer([6, 9, 3, 4, 5, 8])); // 32
console.log(getMaxWaterContainer([])); // 0
console.log(getMaxWaterContainer([7])); // 0

//! Step 5 - Check for errors

//* Console log's added to track whats happening in the code line by line with no errors

//! Step 6 - Check against Test Cases

//! Step 7 - Space and time complexity

//* Time = O(n^2) as we have nested for loops
//* Space = O(1) not storing any scaling value in memory only using static values

//! Step 8 - Look for ways to improve the code time complexity

//* Will reducing space performance to improve time performance be a good idea? - Not Applicable (nothing we can do with memory to improve time)
//* Shifting Pointers? - smaller value is the main value to effect the area so if a < b ++a or if a > b --b?
//* So the main goal should be to move the smallest of the two values at the pointers to the next value

//! Step 9 - Plan more efficient solution

//* Initialize Two pointers at the opposite sides of the array - to maximize the width as distance between the 2 indexes is important
//* We want to clculate the area, track the maxArea, only move the smaller of the 2 values
//* Example:

// [4,8,1,2,3,9]
// p1         p2
// area = min(4,9) (4) * (b[i](5) - a[i](0))  (5) - 4 * 5 = 20

// then we store 20 and proceed to move the smaller of the two numbers so 4 will move to 8

// [4,8,1,2,3,9]
//    p1     p2
// area = min(8,9) (4) * (b[i](5) - a[i](1))  (4) - 8 * 4 = 32

// then we replace 20 with 32 as 32 is a bigger area
// continues calculation till reaches the end of the array and as 32 is the highest it still remains the maxArea

//! Step 10 - Code our more efficent solution

//* Time = O(n)
//* Space = O(1)

const getMaxWaterContainerTwo = function (heights) {
  // initialize p1 = 0 (start of the array)
  // initialize p2 = heights.legnth -1 (end of the array)
  // initialize maxArea as 0
  let p1 = 0,
    p2 = heights.length - 1,
    maxArea = 0;
  console.log({ p1, p2, maxArea });

  // While loop
  // logic to decide if we want to move p1 or p2 towards the center of the array
  while (p1 < p2) {
    console.log({ p1, p2 });
    // area = min(a,b) * (b[i]-a[i])
    const height = Math.min(heights[p1], heights[p2]);
    const width = p2 - p1;
    const area = height * width;
    console.log({ height, width, area });

    // compare existing maxArea with our new calculated area and replace maxArea with the heighest value
    maxArea = Math.max(maxArea, area);
    console.log({ maxArea });

    // comparision to check if p1 is lower than p2 if so move it forward to the next index in the array
    if (heights[p1] <= heights[p2]) {
      p1++;
      console.log({ p1 });
    } else {
      // else if heights[p1] > heights[p2] decrement p2 from the end of the array (move p2 left 1 space in the array index)
      p2--;
      console.log({ p2 });
    }
  }
  return maxArea;
};

// Test Cases

console.log(getMaxWaterContainerTwo([7, 1, 2, 3, 9])); // 28
console.log(getMaxWaterContainerTwo([6, 9, 3, 4, 5, 8])); // 32
console.log(getMaxWaterContainerTwo([])); // 0
console.log(getMaxWaterContainerTwo([7])); // 0

//! Step 11 - Review

//* Initialize 3 variables p1,p2 & maxArea - our pointers and our store of value
//* Workout the required equation for calculating the area - // area = min(a,b) * (b[i]-a[i])
//* The lowest value of the pair(as the highest would result in spillage) and the distance between its paired number in the array index (width)
//* The lowest value of the pair is what will effect the area the most so that is the pointer we need to move
//* so if p1 is less than p2 we want to calculate the area and store the value in maxArea if it is higher than the previous
//* also if p1 is less than or equal to p2 we want to move p1 to the next index of the array
//* if p2 is less than p1 we want to move p2 left in the array from the end.
