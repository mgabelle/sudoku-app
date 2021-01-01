//SUDKU SOLVER - BACKTRACKING ALGORITHM

import { SUDOKU_SIZE , SUDOKU_VALUES } from './sudoku-variables';
import {
    isFull,
    isInArray,
    arrayHasDuplicate
} from './sudoku-utils';

export class SudokuSolver {
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
    }

    getGrid = _ => this.grid;
    getInitialGrid = _ => this.initialGrid;

    updateGrid = (i,j,value) => {
        this.grid[i][j] = value;
    }

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

        //Launch solver
        if(index === undefined) {
            this.calculateEmptyCellsPossibilities();
            return this.solve(0);
        }

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