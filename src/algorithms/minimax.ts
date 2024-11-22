function countMoves(values: number[]) {
    var res = 0
    for(let i = 0; i < 42; i++) {
        if(values[i] !== 0) {
            res += 1
        }
    }
    return res
}


export function evaluation(values: number[], move: number) {
    for(let x = 0; x < 6; x++) {
        for(let y = 0; y < 4; y++) {
            if(values[7 * x + y] !== 0 && values[7 * x + y] === values[7 * x + y + 1] && values[7 * x + y + 1] === values[7 * x + y + 2] && values[7*x + y + 2] === values[7 * x + y + 3]) {
                return values[7 * x + y]
            }
        }
    }
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 7; y++) { 
            if (values[7 * x + y] !== 0 && values[7 * x + y] === values[7 * (x + 1) + y] && 
                values[7 * (x + 1) + y] === values[7 * (x + 2) + y] && 
                values[7 * (x + 2) + y] === values[7 * (x + 3) + y]) {
                return values[7 * x + y];
            }
        }
    }
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) { 
            if (values[7 * x + y] !== 0 && values[7 * x + y] === values[7 * (x + 1) + (y + 1)] && 
                values[7 * (x + 1) + (y + 1)] === values[7 * (x + 2) + (y + 2)] && 
                values[7 * (x + 2) + (y + 2)] === values[7 * (x + 3) + (y + 3)]) {
                return values[7 * x + y];
            }
        }
    }
    for (let x = 3; x < 6; x++) { 
        for (let y = 0; y < 4; y++) {
            if (values[7 * x + y] !== 0 && values[7 * x + y] === values[7 * (x - 1) + (y + 1)] && 
                values[7 * (x - 1) + (y + 1)] === values[7 * (x - 2) + (y + 2)] && 
                values[7 * (x - 2) + (y + 2)] === values[7 * (x - 3) + (y + 3)]) {
                return values[7 * x + y];
            }
        }
    }
    return move === 42 ? 0 : null
}

function legalMoves(values: number[]) {
    var legal = Array(7).fill(-1)
    for(let i = 0; i < 42; i++) {
        if(legal[i % 7] === -1 && values[i] === 0) {
            legal[i % 7] = i
        }
    } 
    return legal
}

function minimax(values: number[], isMaximizing: boolean,  depth: number, heuristic: (values: number[]) => number) {
    const moves = countMoves(values)
    const e = evaluation(values, moves)
    if(e !== null) {
        if(e === 0) {
            return 0
        }
        return 1000000 * e
    }
    if(depth === 0) {
        return heuristic(values)
    }
    const legal = legalMoves(values)
    if(isMaximizing) {
        let best = -1000000
        for(let i = 0; i < 7; i++) {
            if(legal[i] !== -1) {
                values[legal[i]] = 1
                let score = minimax(values, false, depth - 1, heuristic)
                values[legal[i]] = 0
                best = Math.max(best, score)
            }
        }
        return best
    }
    else {
        let best = 1000000
        for(let i = 0; i < 7; i++) {
            if(legal[i] !== -1) {
                values[legal[i]] = -1
                let score = minimax(values, true, depth - 1, heuristic)
                values[legal[i]] = 0
                best = Math.min(best, score)            
            }
        }
        return best
    }
}

export function findBestMove(values: number[], depth: number, heuristic: (values: number[]) => number) {
    const move = countMoves(values)
    const isMaximizing = move % 2 === 0
    let bestMove = 0
    let bestScore = isMaximizing ? -1000000 : 1000000
    const legal = legalMoves(values)
    for(let i = 0; i < 7; i++) {
        if(legal[i] !== -1) {
            values[legal[i]] = isMaximizing ? 1 : -1
            let score = minimax(values, !isMaximizing, depth, heuristic)
            values[legal[i]] = 0
            if(isMaximizing && score > bestScore) {
                bestScore = score
                bestMove = legal[i]
            }
            if(!isMaximizing && score < bestScore) {
                bestScore = score
                bestMove = legal[i]
            }
        }
    }
    return bestMove
}

export function heuristic(values: number[], A: number, B: number, C: number): number {
    let score = 0;
    const move = countMoves(values)
    const player = move % 2 ? -1 : 1;
    const opponent = player === 1 ? -1 : 1;

    // Horizontal check
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            let countPlayer = 0;
            let countOpponent = 0;

            for (let i = 0; i < 4; i++) {
                const cell = values[7 * x + y + i];
                if (cell === player) countPlayer++;
                else if (cell === opponent) countOpponent++;
            }

            if (countOpponent === 0) {
                if (countPlayer === 1) score += A;
                else if (countPlayer === 2) score += B;
                else if (countPlayer === 3) score += C;
            }
            if (countPlayer === 0) {
                if (countOpponent === 1) score -= A;
                else if (countOpponent === 2) score -= B;
                else if (countOpponent === 3) score -= C;
            }
        }
    }

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 7; y++) {
            let countPlayer = 0;
            let countOpponent = 0;

            for (let i = 0; i < 4; i++) {
                const cell = values[7 * (x + i) + y];
                if (cell === player) countPlayer++;
                else if (cell === opponent) countOpponent++;
            }

            if (countOpponent === 0) {
                if (countPlayer === 1) score += A;
                else if (countPlayer === 2) score += B;
                else if (countPlayer === 3) score += C;
            }
            if (countPlayer === 0) {
                if (countOpponent === 1) score -= A;
                else if (countOpponent === 2) score -= B;
                else if (countOpponent === 3) score -= C;
            }
        }
    }

    // Positive diagonal check (\ direction)
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            let countPlayer = 0;
            let countOpponent = 0;

            for (let i = 0; i < 4; i++) {
                const cell = values[7 * (x + i) + (y + i)];
                if (cell === player) countPlayer++;
                else if (cell === opponent) countOpponent++;
            }

            if (countOpponent === 0) {
                if (countPlayer === 1) score += A;
                else if (countPlayer === 2) score += B;
                else if (countPlayer === 3) score += C;
            }
            if (countPlayer === 0) {
                if (countOpponent === 1) score -= A;
                else if (countOpponent === 2) score -= B;
                else if (countOpponent === 3) score -= C;
            }
        }
    }

    // Negative diagonal check (/ direction)
    for (let x = 3; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            let countPlayer = 0;
            let countOpponent = 0;

            for (let i = 0; i < 4; i++) {
                const cell = values[7 * (x - i) + (y + i)];
                if (cell === player) countPlayer++;
                else if (cell === opponent) countOpponent++;
            }

            if (countOpponent === 0) {
                if (countPlayer === 1) score += A;
                else if (countPlayer === 2) score += B;
                else if (countPlayer === 3) score += C;
            }
            if (countPlayer === 0) {
                if (countOpponent === 1) score -= A;
                else if (countOpponent === 2) score -= B;
                else if (countOpponent === 3) score -= C;
            }
        }
    }

    return score;
}
