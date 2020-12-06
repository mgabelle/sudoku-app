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

//SUDKU SOLVER - BACKTRACKING ALGORITHM
class SudokuSolver {
    /*
        A grid is a 9x9 matrix built with Array.
        In this class we use : 
            - i for the line position
            - j for the column position 
    */
    constructor(grid) {
        this.grid = grid;
        this.position = [];
    }

    getGrid = _ => this.grid;

    //Lines
    getLine = i => this.getGrid()[i];

    isValueInLine = (i, value) => this.isInArray(this.getLine(i), value);

    //Columns
    getColumn = j => this.getGrid().map(row => row[j]);

    isValueInColumn = (j, value) => this.isInArray(this.getColumn(j), value);

    //Block 
    getBlock = (i,j) => {
        const line = Math.floor(i/3);
        const column = Math.floor(j/3);
        const block = [];
        for(let m = line; m < line + 3; m++){
            for(let n = column; n < column + 3; n++){
                block.push(this.grid[m][n]);
            }
        }
    }

    isInBlock = (i, j, value) => this.isInArray(this.getBlock(i,j), value);

    //Checker
    isInArray = (array, value) => {
        if(value in array) {
            return true;
        }
        return false;
    }
}