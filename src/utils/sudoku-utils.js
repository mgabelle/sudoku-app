import { 
    SUDOKU_SIZE,
    SUDOKU_VALUES 
} from './sudoku-variables';

export const FIXED = 'fixed';
export const DYNAMIC = 'dynamic';

/**
 * Cell object :
 *  -value : number
 *  -type : 'fixed' or 'dynamic'
 */
export class CellObject {
    constructor(value) {
        this.value = value;
        this.type = value === 0 ? DYNAMIC : FIXED;
    }

    updateValue = newValue => this.value = newValue;

    getValue = _ => this.value;
    
    getType = _ => this.type;
}

/**
 * Functions for Sudoku grid check
 */

 //Checker
export const isInArray = (array, value) => array.includes(value); 

//Return 9x9 matrix of zeros
export const createEmptyGrid = () => {
    const grid = [];
    for(let i = 0; i < SUDOKU_SIZE; i++)
        grid.push(new Array(SUDOKU_SIZE).fill(0));
    return grid;
}

//Generate a 9x9 grid of random number
export const generateRandomGrid = () => {
    return createEmptyGrid().map(
        row => row.map(number => {
            const randomNumber = Math.floor(Math.random()*10);
            return new CellObject(randomNumber);
        })
    )
};

//Return true if a grid is full
export const isFull = grid => {
    for(let row of grid) {
        for(let n of row) {
            if(n === 0) return false;
        }
    }
    return true;
}

//Return true if a sudoku Array has duplicate
export const arrayHasDuplicate = (array) => {
    const arrayToCheck = Object.assign([], array).sort();
    if(arrayToCheck.toString() === SUDOKU_VALUES.toString()) return false;
    return true;
} 