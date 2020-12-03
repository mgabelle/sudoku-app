/**
 * Sudoku module.
 * This module has for goal to generate sudoku grid
 */

export { 
    generateRandomGrid,
    createEmptyGrid,
    isFull,
    FIXED,
    DYNAMIC,
    SUDOKU_SIZE
};

const SUDOKU_SIZE = 9;
const FIXED = 'fixed';
const DYNAMIC = 'dynamic';

/**
 * Cell object :
 *  -value : number
 *  -type : 'fixed' or 'dynamic'
 */
class CellObject {
    constructor(value) {
        this.value = value;
        this.type = value === 0 ? DYNAMIC : FIXED;
    }

    updateValue = newValue => this.value = newValue;

    getValue = _ => this.value;
    
    getType = _ => this.type;
}

//Return 9x9 matrix of zeros
const createEmptyGrid = () => new Array(SUDOKU_SIZE).fill(new Array(SUDOKU_SIZE).fill(0));

//Generate a 9x9 grid of random number
const generateRandomGrid = () => {
    return createEmptyGrid().map(
        row => row.map(number => {
            const randomNumber = Math.floor(Math.random()*10);
            return new CellObject(randomNumber);
        })
    )
};

const isFull = grid => {
    for(let row of grid) {
        for(let n of row) {
            if(n === 0) return false;
        }
    }
    return true;
}

const generateSudokuGrid = () => createEmptyGrid();