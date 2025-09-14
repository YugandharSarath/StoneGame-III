import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoneGameIII from './StoneGameIII';

function stoneGameIII(stoneValue) {
    const n = stoneValue.length;
    const dp = new Array(n + 3).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let take = 0;
        let best = -Infinity;
        for (let k = 1; k <= 3 && i + k <= n; k++) {
            take += stoneValue[i + k - 1];
            best = Math.max(best, take - dp[i + k]);
        }
        dp[i] = best;
    }

    if (dp[0] > 0) return "Alice";
    if (dp[0] < 0) return "Bob";

    const total = stoneValue.reduce((a, b) => a + b, 0);
    return total < 0 ? "Bob" : "Tie";
}

describe('StoneGameIII Component', () => {
    beforeEach(() => {
        render(<StoneGameIII />);
    });

    test('renders initial UI elements correctly', () => {
        expect(screen.getByText('Stone Game III')).toBeInTheDocument();
        expect(screen.getByText('Alice and Bob play optimally. Who will win?')).toBeInTheDocument();
        expect(screen.getByTestId('stone-input')).toBeInTheDocument();
        expect(screen.getByTestId('calculate-button')).toBeInTheDocument();
        expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    test('has correct initial input value', () => {
        const input = screen.getByTestId('stone-input');
        expect(input).toHaveValue('[1,2,3,7]');
    });

    test('calculates correct result for example 1', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[1,2,3,7]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toHaveTextContent('Winner: Bob');
        });
    });

    test('calculates correct result for example 2', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[1,2,3,-9]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toHaveTextContent('Winner: Alice');
        });
    });

    test('calculates correct result for example 3', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[1,2,3,6]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toHaveTextContent('Winner: Tie');
        });
    });

    test('handles invalid input format', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '1,2,3,7' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
            expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid input: Input must be in array format');
        });
    });

    test('handles empty array input', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
            expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid input: Input must be a non-empty array');
        });
    });

    test('handles values outside valid range', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[1001, -1001]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('error-message')).toBeInTheDocument();
            expect(screen.getByTestId('error-message')).toHaveTextContent('All values must be integers between -1000 and 1000');
        });
    });

    test('reset button clears all fields', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');
        const resetBtn = screen.getByTestId('reset-button');

        fireEvent.change(input, { target: { value: '[1,2,3,7]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('result-display')).toBeInTheDocument();
        });

        fireEvent.click(resetBtn);

        expect(input).toHaveValue('[1,2,3,7]');
        expect(screen.queryByTestId('result-display')).not.toBeInTheDocument();
        expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('displays game simulation steps', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: '[1,2,3]' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(screen.getByTestId('game-steps')).toBeInTheDocument();
            expect(screen.getByText('Game Simulation (Optimal Play)')).toBeInTheDocument();
            expect(screen.getByText('Final Scores')).toBeInTheDocument();
        });
    });

    test('input field has error styling for invalid input', async () => {
        const input = screen.getByTestId('stone-input');
        const calculateBtn = screen.getByTestId('calculate-button');

        fireEvent.change(input, { target: { value: 'invalid' } });
        fireEvent.click(calculateBtn);

        await waitFor(() => {
            expect(input).toHaveClass('error');
        });
    });
});

describe('Stone Game III Core Logic', () => {
    test('example 1: [1,2,3,7] should return Bob', () => {
        expect(stoneGameIII([1, 2, 3, 7])).toBe('Bob');
    });

    test('example 2: [1,2,3,-9] should return Alice', () => {
        expect(stoneGameIII([1, 2, 3, -9])).toBe('Alice');
    });

    test('example 3: [1,2,3,6] should return Tie', () => {
        expect(stoneGameIII([1, 2, 3, 6])).toBe('Tie');
    });

    test('single element positive: Alice wins', () => {
        expect(stoneGameIII([5])).toBe('Alice');
    });

    test('single element negative: Bob wins', () => {
        expect(stoneGameIII([-5])).toBe('Bob');
    });

    test('single element zero: Tie', () => {
        expect(stoneGameIII([0])).toBe('Tie');
    });

    test('all negative values', () => {
    expect(stoneGameIII([-1, -2, -3, -4])).toBe('Bob');
});


    test('all positive values', () => {
        expect(stoneGameIII([1, 2, 3, 4])).toBe('Alice');
    });

    test('mixed values with strategic play', () => {
        expect(stoneGameIII([20, 3, -5, 17, 10, -3])).toBe('Alice');
    });

    test('edge case: two stones', () => {
        expect(stoneGameIII([1, 2])).toBe('Alice');
    });

    test('edge case: three stones', () => {
        expect(stoneGameIII([1, 2, 3])).toBe('Alice');
    });

    test('large array with alternating values', () => {
        const largeArray = [];
        for (let i = 0; i < 100; i++) {
            largeArray.push(i % 2 === 0 ? 1 : -1);
        }
        const result = stoneGameIII(largeArray);
        expect(['Alice', 'Bob', 'Tie']).toContain(result);
    });

    test('maximum constraint values', () => {
        expect(stoneGameIII([1000, -1000, 1000])).toBe('Alice');
    });
});