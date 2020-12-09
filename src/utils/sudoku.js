/**
 * Sudoku module.
 * This module has for goal to generate sudoku grid
 */

export { 
    SudokuSolver,
    generateRandomGrid,
    createEmptyGrid,
    isFull,
    isInArray,
    arrayHasDuplicate,
    FIXED,
    DYNAMIC,
    SUDOKU_SIZE
};

const SUDOKU_SIZE = 9;
const SUDOKU_VALUES = [1, 2, 3, 4, 5, 6, 7 ,8 ,9];

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

//SUDKU SOLVER - BACKTRACKING ALGORITHM
class SudokuSolver {
    /*
        'grid' is a 9x9 matrix built with Array.
        In this class we use : 
            - i for the line position
            - j for the column position 
        
        'emptyCells' is an array containing all the empty cell of the grid 
          with the number of possibilities.
          emptyCells -> {
              position: [i: number, j: number],
              possibilities: [n1,n2,..]
          }
          The empty cells are sorted with the cell having the lowest possibilities to the 
            greatest number of possibilities
    */
    constructor(grid) {
        this.grid = grid;
        this.initialGrid = JSON.parse(JSON.stringify(grid));
        this.emptyCells = [];
        this.calculateEmptyCellsPossibilities();
    }

    getGrid = _ => this.grid;
    getInitialGrid = _ => this.initialGrid;

    //Checker
    isGridSolvedAndFull = () => {
        if(!isFull(this.getGrid())) return false;
        
        //check lines
        for(let line of this.getGrid()) {
            if(arrayHasDuplicate(line)) return false;
        }

        //check columns
        for(let j; j < SUDOKU_SIZE; j++) {
            const column = this.getColumn(j);
            if(arrayHasDuplicate(column)) return false;
        }

        //check blocks
        const blocks = [
            [1,1],[1,4],[1,7],
            [4,1],[4,4],[4,7],
            [7,1],[7,4],[7,7]
        ];
        
        for(let [i,j] of blocks) {
            const block = this.getBlock(i,j);
            if(arrayHasDuplicate(block)) return false;
        }

        return true;
    }

    //Solver 
    solve = (index) => {
        const cell = this.getEmptyCells()[index];

        //if there is no more cell to loop through
        if(cell === undefined) return true;

        const [i,j] = cell.position;
        const possibleValues = cell.possibilities;
        
        for(let k of possibleValues) { //from 0 to 8
            //check if k is not in the grid
            if(!this.isValueInLine(i,k) && !this.isValueInColumn(j,k) && !this.isValueInBlock(i,j,k)) {
                this.getGrid()[i][j] = k;
                if(this.solve(index + 1)) return true;
            } else {
                this.grid[i][j] = 0;
            }
        }

        return false;
    }
    
    //Empty cells to fill
    getEmptyCells = _ => this.emptyCells;

    calculateEmptyCellsPossibilities = () => {
        const grid = this.getGrid();
        for(let i = 0; i < SUDOKU_SIZE; i++) {
            for(let j = 0; j < SUDOKU_SIZE; j++) {
                if(this.grid[i][j] === 0){
                    let possibilities = [];
                    for(let number of SUDOKU_VALUES) {
                        if(
                            !this.isValueInLine(i, number) && 
                            !this.isValueInColumn(j, number) && 
                            !this.isValueInBlock(i, j, number)
                        ) {
                            possibilities.push(number);
                        }
                    }
                    this.emptyCells.push({
                        'position': [i, j],
                        'possibilities': possibilities
                    });
                }
            }
        }
        this.sortEmptyCells();
    }

    sortEmptyCells = () => {
        this.getEmptyCells().sort((cell1, cell2) => cell1.possibilities.length - cell2.possibilities.length);
    }

    //Lines
    getLine = i => this.getGrid()[i];

    isValueInLine = (i, value) => isInArray(this.getLine(i), value);

    //Columns
    getColumn = j => this.getGrid().map(row => row[j]);

    isValueInColumn = (j, value) => isInArray(this.getColumn(j), value);

    //Blocks
    getBlock = (i,j) => {
        const line = 3*Math.floor(i/3);
        const column = 3*Math.floor(j/3);
        const block = [];
        for(let m = line; m < line + 3; m++){
            for(let n = column; n < column + 3; n++){
                block.push(this.grid[m][n]);
            }
        }
        return block;
    }

    isValueInBlock = (i, j, value) => isInArray(this.getBlock(i,j), value);
}

//Checker
const isInArray = (array, value) => array.includes(value); 

//Return 9x9 matrix of zeros
const createEmptyGrid = () => {
    const grid = [];
    for(let i = 0; i < SUDOKU_SIZE; i++)
        grid.push(new Array(SUDOKU_SIZE).fill(0));
    return grid;
}

//Generate a 9x9 grid of random number
const generateRandomGrid = () => {
    return createEmptyGrid().map(
        row => row.map(number => {
            const randomNumber = Math.floor(Math.random()*10);
            return new CellObject(randomNumber);
        })
    )
};

//Return true if a grid is full
const isFull = grid => {
    for(let row of grid) {
        for(let n of row) {
            if(n === 0) return false;
        }
    }
    return true;
}

//Return true if a sudoku Array has duplicate
const arrayHasDuplicate = (array) => {
    const arrayToCheck = Object.assign([], array).sort();
    if(arrayToCheck.toString() === SUDOKU_VALUES.toString()) return false;
    return true;
} 