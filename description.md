
---

## Stone Game III

### Requirements

* Players take turns picking stones from the **start of the row**.
* On each turn, a player can take **1, 2, or 3 stones**.
* Alice always goes first.
* Each player’s score is the sum of the stones they picked.
* Both players play **optimally** to maximize their final score difference.
* Game continues until **all stones are taken**.
* Return:

  * `"Alice"` if Alice wins
  * `"Bob"` if Bob wins
  * `"Tie"` if scores are equal

### Edge Cases & Constraints

* **Single stone** → Alice takes it, wins if positive, loses if negative.
* **All stones negative** → Players try to minimize losses, not maximize gains.
* **All stones positive** → Players try to maximize their score.
* **Tie scenarios** → Possible if both end with equal total score.
* **Strategic scenarios** → Sometimes taking fewer stones early leads to a better long-term outcome.
* **Constraints:**

  * `1 <= stoneValue.length <= 5 * 10^4`
  * `-1000 <= stoneValue[i] <= 1000`

### data-testid Attributes

* `stone-input` → Input for array of stone values.
* `calculate-button` → Button to calculate winner.
* `reset-button` → Button to reset input.
* `result-display` → Shows final result ("Alice", "Bob", "Tie").
* `error-message` → Displays validation errors.
* `game-steps` → Shows step-by-step optimal play sequence.

---

