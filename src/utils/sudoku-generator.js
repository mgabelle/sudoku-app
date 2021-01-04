import { SudokuSolver } from './sudoku-solver';
import { createEmptyGrid, shuffle } from './sudoku-utils';
import { SUDOKU_COORDINATES, SUDOKU_VALUES } from './sudoku-variables';

// const MIN_CELL_NUMBER = 30;
// const MAX_CELL_NUMBER = 60;
const MAX_ITERATION = 30;

export class SudokuGenerator {
    generate = (numberOfCell) => { 
        let grid;
        let solver;

        let isSolved = false;
        let counter = 0;

        do {
            grid = this.generateCorrectGrid(numberOfCell);
            if(!grid) continue;  //if the grid is incorrect regenerate

            solver = new SudokuSolver(grid);
            isSolved = solver.solve();
            counter++;
        } while(!isSolved && counter < MAX_ITERATION);
        
        return counter === MAX_ITERATION ? false : solver.getInitialGrid();
    }

    generateCorrectGrid = (numberOfCell) => {
        //Error : numberOfCell should not be null
        if(numberOfCell < 1) {
            throw(new Error("numberOfCell should not be negative or less than 0."))
        }
        const solver = new SudokuSolver(createEmptyGrid());
        const coordinates = this.getGridCoordinatesShuffled();
        let numberOfCellsToFill = numberOfCell;
        let [i,j] = [0,0];

        while(coordinates.length > 0 && numberOfCellsToFill > 0) {
            [i, j] = coordinates.pop();
            for(let randomValue of this.getRandomSudokuValues()) {
                if(
                    !solver.isValueInBlock(i, j, randomValue) &&
                    !solver.isValueInColumn(j, randomValue) &&
                    !solver.isValueInLine(i, randomValue)
                ) {
                    solver.updateGrid(i, j, randomValue);
                    numberOfCellsToFill--;
                    break;
                }
            }
        }

        return numberOfCellsToFill === 0 ? solver.getGrid() : false;
    }

    getGridCoordinatesShuffled = () => {
        let coordinates = JSON.parse(JSON.stringify(SUDOKU_COORDINATES));
        return shuffle(coordinates);
    }

    getRandomSudokuValues = () => {
        let values = JSON.parse(JSON.stringify(SUDOKU_VALUES));
        return shuffle(values);
    }

    removeValueInGrid = (grid) => {
        const coordinates = this.getGridCoordinatesShuffled();
        for(let [i, j] of coordinates) {
            if(grid[i,j] !== 0) {
                grid[i][j] = 0;
                break;
            }
        }
    }
}