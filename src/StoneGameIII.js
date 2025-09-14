import React, { useState } from 'react';

function stoneGameIII(stoneValue) {
    const n = stoneValue.length;

    const dp = new Array(n + 3).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        dp[i] = -Infinity;

        for (let k = 1; k <= 3 && i + k <= n; k++) {
            take += stoneValue[i + k - 1];

            dp[i] = Math.max(dp[i], take - dp[i + k]);
        }
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";
    return "Tie";
}

function StoneGameIII() {
    const [input, setInput] = useState('[1,2,3,7]');
    const [result, setResult] = useState('');
    const [gameSteps, setGameSteps] = useState([]);
    const [error, setError] = useState('');

    const parseInput = (str) => {
        try {

            const cleaned = str.trim();
            if (!cleaned.startsWith('[') || !cleaned.endsWith(']')) {
                throw new Error('Input must be in array format [1,2,3,...]');
            }
            const parsed = JSON.parse(cleaned);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                throw new Error('Input must be a non-empty array');
            }
            if (parsed.some(val => !Number.isInteger(val) || val < -1000 || val > 1000)) {
                throw new Error('All values must be integers between -1000 and 1000');
            }
            return parsed;
        } catch (e) {
            throw new Error(`Invalid input: ${e.message}`);
        }
    };

    const simulateGame = (stones) => {
        const steps = [];
        const remaining = [...stones];
        let aliceScore = 0;
        let bobScore = 0;
        let isAliceTurn = true;

        while (remaining.length > 0) {
            const player = isAliceTurn ? 'Alice' : 'Bob';
            const n = remaining.length;
            const dp = new Array(n + 3).fill(0);

            for (let i = n - 1; i >= 0; i--) {
                let take = 0;
                dp[i] = -Infinity;

                for (let k = 1; k <= 3 && i + k <= n; k++) {
                    take += remaining[i + k - 1];
                    dp[i] = Math.max(dp[i], take - dp[i + k]);
                }
            }

            let bestMove = 1;
            let take = 0;
            let bestValue = -Infinity;

            for (let k = 1; k <= 3 && k <= remaining.length; k++) {
                take += remaining[k - 1];
                const value = take - dp[k];
                if (value > bestValue) {
                    bestValue = value;
                    bestMove = k;
                }
                if (k > 1) take -= remaining[k - 2];
            }

            const takenStones = remaining.splice(0, bestMove);
            const moveScore = takenStones.reduce((sum, val) => sum + val, 0);

            if (isAliceTurn) {
                aliceScore += moveScore;
            } else {
                bobScore += moveScore;
            }

            steps.push({
                player,
                taken: takenStones,
                score: moveScore,
                aliceTotal: aliceScore,
                bobTotal: bobScore,
                remaining: [...remaining]
            });

            isAliceTurn = !isAliceTurn;
        }

        return steps;
    };

    const handleCalculate = () => {
        try {
            setError('');
            const stones = parseInput(input);

            if (stones.length > 50000) {
                setError('Array size must not exceed 50,000 elements');
                return;
            }

            const winner = stoneGameIII(stones);
            setResult(winner);

            const steps = simulateGame(stones);
            setGameSteps(steps);
        } catch (err) {
            setError(err.message);
            setResult('');
            setGameSteps([]);
        }
    };

    const handleReset = () => {
        setInput('[1,2,3,7]');
        setResult('');
        setGameSteps([]);
        setError('');
    };

    return (
        <div className="stone-game-container">
            <div className="header">
                <h1>Stone Game III</h1>
                <p>Alice and Bob play optimally. Who will win?</p>
            </div>

            <div className="input-section">
                <label htmlFor="stone-input">Stone Values (JSON Array):</label>
                <input
                    id="stone-input"
                    data-testid="stone-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="[1,2,3,7]"
                    className={error ? 'error' : ''}
                />

                <div className="button-group">
                    <button 
                        data-testid="calculate-button"
                        onClick={handleCalculate}
                        className="calculate-btn"
                    >
                        Calculate Winner
                    </button>
                    <button 
                        data-testid="reset-button"
                        onClick={handleReset}
                        className="reset-btn"
                    >
                        Reset
                    </button>
                </div>

                {error && (
                    <div data-testid="error-message" className="error-message">
                        {error}
                    </div>
                )}
            </div>

            {result && (
                <div className="result-section">
                    <h2>Result</h2>
                    <div 
                        data-testid="result-display" 
                        className={`result-display ${result.toLowerCase()}`}
                    >
                        Winner: <strong>{result}</strong>
                    </div>
                </div>
            )}

            {gameSteps.length > 0 && (
                <div className="simulation-section">
                    <h3>Game Simulation (Optimal Play)</h3>
                    <div data-testid="game-steps" className="game-steps">
                        {gameSteps.map((step, index) => (
                            <div key={index} className={`step ${step.player.toLowerCase()}`}>
                                <div className="step-header">
                                    <span className="player">{step.player}</span>
                                    <span className="move">Takes {step.taken.length} stone{step.taken.length > 1 ? 's' : ''}: [{step.taken.join(', ')}]</span>
                                    <span className="score">+{step.score} points</span>
                                </div>
                                <div className="step-details">
                                    <span>Alice: {step.aliceTotal} | Bob: {step.bobTotal}</span>
                                    {step.remaining.length > 0 && (
                                        <span>Remaining: [{step.remaining.join(', ')}]</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="final-score">
                        <h4>Final Scores</h4>
                        <div className="scores">
                            <span>Alice: {gameSteps[gameSteps.length - 1]?.aliceTotal || 0}</span>
                            <span>Bob: {gameSteps[gameSteps.length - 1]?.bobTotal || 0}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StoneGameIII;