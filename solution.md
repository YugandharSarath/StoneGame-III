# Stone Game III - Complete Solution

## Solution Approach

This problem is solved using **Dynamic Programming** with a game theory approach. The key insight is to track the **score difference** rather than individual player scores.

### Core Concept
- `dp[i]` = Maximum score difference the current player can achieve starting from index `i`
- Score difference = (Current Player's Score - Opponent's Score) from position `i` onwards

## Step-by-Step Solution

### Algorithm Explanation

1. **State Definition**: `dp[i]` represents the maximum advantage the current player can get starting from position `i`

2. **Recurrence Relation**: For each position `i`, try taking 1, 2, or 3 stones:
   ```
   dp[i] = max(
       stones[i] - dp[i+1],                    // Take 1 stone
       stones[i] + stones[i+1] - dp[i+2],      // Take 2 stones
       stones[i] + stones[i+1] + stones[i+2] - dp[i+3]  // Take 3 stones
   )
   ```

3. **Base Cases**: `dp[n] = dp[n+1] = dp[n+2] = 0` (no stones remaining)

4. **Final Answer**: 
   - If `dp[0] > 0`: Alice wins
   - If `dp[0] < 0`: Bob wins
   - If `dp[0] = 0`: Tie

### JavaScript Implementation

```javascript
function stoneGameIII(stoneValue) {
    const n = stoneValue.length;
    // dp[i] represents max score difference starting from index i
    const dp = new Array(n + 3).fill(0);
    
    // Fill dp array backwards
    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        dp[i] = -Infinity;
        
        // Try taking 1, 2, or 3 stones
        for (let k = 1; k <= 3 && i + k <= n; k++) {
            take += stoneValue[i + k - 1];
            // Current advantage = stones taken - opponent's advantage from remaining
            dp[i] = Math.max(dp[i], take - dp[i + k]);
        }
    }
    
    // Determine winner based on Alice's advantage
    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
}
```

## Dry Run Example

Let's trace through Example 1: `stoneValue = [1,2,3,7]`

### Initial Setup
- `n = 4`
- `dp = [0, 0, 0, 0, 0, 0, 0]` (indices 0-6)

### Backwards Fill Process

**i = 3** (last stone):
- k=1: take = 7, dp[3] = max(-∞, 7 - dp[4]) = max(-∞, 7 - 0) = 7
- Final: dp[3] = 7

**i = 2**:
- k=1: take = 3, dp[2] = max(-∞, 3 - dp[3]) = max(-∞, 3 - 7) = -4
- k=2: take = 3+7 = 10, dp[2] = max(-4, 10 - dp[4]) = max(-4, 10 - 0) = 10
- Final: dp[2] = 10

**i = 1**:
- k=1: take = 2, dp[1] = max(-∞, 2 - dp[2]) = max(-∞, 2 - 10) = -8
- k=2: take = 2+3 = 5, dp[1] = max(-8, 5 - dp[3]) = max(-8, 5 - 7) = -2
- k=3: take = 2+3+7 = 12, dp[1] = max(-2, 12 - dp[4]) = max(-2, 12 - 0) = 12
- Final: dp[1] = 12

**i = 0**:
- k=1: take = 1, dp[0] = max(-∞, 1 - dp[1]) = max(-∞, 1 - 12) = -11
- k=2: take = 1+2 = 3, dp[0] = max(-11, 3 - dp[2]) = max(-11, 3 - 10) = -7
- k=3: take = 1+2+3 = 6, dp[0] = max(-7, 6 - dp[3]) = max(-7, 6 - 7) = -1
- Final: dp[0] = -1

### Result Analysis
- dp[0] = -1 < 0, so **Bob wins**

### Game Simulation
- Alice's optimal move: Take 3 stones [1,2,3] = 6 points
- Bob's optimal move: Take 1 stone [7] = 7 points
- Final scores: Alice = 6, Bob = 7
- Winner: Bob (7 > 6)

## Complexity Analysis

### Time Complexity: O(n)
- Single pass through the array from right to left
- For each position, we do at most 3 operations (trying 1, 2, 3 stones)
- Overall: O(n × 3) = O(n)

### Space Complexity: O(n)
- We use an additional array `dp` of size `n + 3`
- Can be optimized to O(1) by only keeping track of the last 3 values

## Space-Optimized Version

```javascript
function stoneGameIIIOptimized(stoneValue) {
    const n = stoneValue.length;
    let dp0 = 0, dp1 = 0, dp2 = 0; // dp[i], dp[i+1], dp[i+2]
    
    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        let curr = -Infinity;
        
        for (let k = 1; k <= 3 && i + k <= n; k++) {
            take += stoneValue[i + k - 1];
            const next = k === 1 ? dp0 : k === 2 ? dp1 : dp2;
            curr = Math.max(curr, take - next);
        }
        
        dp2 = dp1;
        dp1 = dp0;
        dp0 = curr;
    }
    
    if (dp0 > 0) return "Alice";
    if (dp0 < 0) return "Bob";
    return "Tie";
}
```

## Key Insights

1. **Game Theory**: Both players play optimally, so we need to consider opponent's best response
2. **Score Difference**: Tracking relative advantage is simpler than absolute scores
3. **Backwards DP**: We work from the end because we know the base cases
4. **Optimal Substructure**: The optimal strategy depends on optimal solutions to subproblems

## Edge Cases Handled

- **Single stone**: Direct comparison with 0
- **All negative values**: Player forced to take negatives loses
- **Strategic play**: Sometimes taking fewer stones is better long-term
- **Boundary conditions**: Handled by extending dp array with 3 extra positions