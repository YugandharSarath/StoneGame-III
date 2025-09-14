# Stone Game III - Test Cases

## Basic Examples (From Problem Statement)

### Test Case 1
```
Input: [1,2,3,7]
Expected Output: "Bob"
Explanation: Alice takes [1,2,3] = 6, Bob takes [7] = 7. Bob wins 7-6.
```

### Test Case 2
```
Input: [1,2,3,-9]
Expected Output: "Alice" 
Explanation: Alice takes [1,2,3] = 6, Bob takes [-9] = -9. Alice wins 6-(-9) = 15.
```

### Test Case 3
```
Input: [1,2,3,6]
Expected Output: "Tie"
Explanation: Alice takes [1,2,3] = 6, Bob takes [6] = 6. Tie 6-6 = 0.
```

## Edge Cases

### Test Case 4 - Single Stone (Positive)
```
Input: [5]
Expected Output: "Alice"
Explanation: Alice takes the only stone and wins 5-0.
```

### Test Case 5 - Single Stone (Negative)  
```
Input: [-5]
Expected Output: "Bob"
Explanation: Alice must take the negative stone, ending with -5. Bob has 0, so Bob wins.
```

### Test Case 6 - Single Stone (Zero)
```
Input: [0]
Expected Output: "Tie" 
Explanation: Alice takes 0, both players end with score 0.
```

### Test Case 7 - Two Stones
```
Input: [3, 4]
Expected Output: "Alice"
Explanation: Alice takes both stones [3,4] = 7, Bob gets 0. Alice wins.
```

### Test Case 8 - All Negative Values
```
Input: [-1, -2, -3, -4]
Expected Output: "Bob"
Explanation: Alice must start and will end with a worse (more negative) score.
```

## Strategic Cases

### Test Case 9 - Strategic Play Required
```
Input: [1, 1, 1, 100]
Expected Output: "Alice"
Explanation: Alice should take 3 stones [1,1,1] = 3, forcing Bob to take [100] = 100. 
Wait, this seems wrong... Let me recalculate.
Actually: Alice takes [1] = 1, Bob takes [1,1,100] = 102. Bob wins.
Correction: "Bob"
```

### Test Case 10 - Large Strategic Array
```
Input: [20, 3, -5, 17, 10, -3, 25]
Expected Output: "Alice"
Explanation: Complex strategic play where Alice can maintain advantage.
```

## Boundary and Performance Cases

### Test Case 11 - Maximum Values
```
Input: [1000, -1000, 1000]
Expected Output: "Alice"
Explanation: Alice takes [1000] = 1000, Bob takes [-1000, 1000] = 0. Alice wins.
```

### Test Case 12 - Minimum Values  
```
Input: [-1000, 1000, -1000]
Expected Output: "Bob"
Explanation: Alice takes [-1000] = -1000, Bob takes [1000, -1000] = 0. Bob wins.
```

### Test Case 13 - All Positive Sequential
```
Input: [1, 2, 3, 4, 5]
Expected Output: "Alice"
Explanation: Alice can always maintain advantage with optimal play.
```

### Test Case 14 - Alternating Pattern
```
Input: [10, -5, 10, -5, 10, -5]
Expected Output: "Alice" 
Explanation: Alice can take positive values while forcing Bob to take negatives.
```

### Test Case 15 - Large Array (Performance Test)
```
Input: Array of 1000 elements alternating between 1 and -1
Expected Output: "Alice" or "Bob" or "Tie" (depends on exact pattern)
Explanation: Tests algorithm performance on larger inputs.
```

## Corner Cases

### Test Case 16 - Three Zeros
```
Input: [0, 0, 0]
Expected Output: "Tie"
Explanation: No matter how stones are taken, both players end with 0.
```

### Test Case 17 - Mixed with Zero
```
Input: [0, 1, -1]  
Expected Output: "Tie"
Explanation: Total sum is 0, optimal play leads to tie.
```

### Test Case 18 - Decreasing Sequence
```
Input: [10, 5, 2, 1]
Expected Output: "Alice"
Explanation: Alice takes [10] = 10, Bob's best is [5,2,1] = 8. Alice wins.
```

## Validation Test Cases

### Test Case 19 - Invalid Input (Empty Array)
```
Input: []
Expected Output: Error - "Input must be a non-empty array"
```

### Test Case 20 - Invalid Input (Out of Range)
```
Input: [1001, 500]
Expected Output: Error - "All values must be integers between -1000 and 1000"
```