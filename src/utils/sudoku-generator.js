import { SudokuSolver } from './sudoku-solver';
import { createEmptyGrid } from './sudoku-utils';

const MIN_CELL_NUMBER = 17;
const MAX_CELL_NUMBER = 60;

export class SudokuGenerator {
    generate = () => { 
        const numberOfCell = Math.floor(Math.random()(MAX_CELL_NUMBER - MIN_CELL_NUMBER) + MIN_CELL_NUMBER);
        let grid;
        let solver;
        do {
            grid = this.generateCorrectGrid(numberOfCell);
            solver = new SudokuSolver(grid);
        } while(!solver.solve());
        
        return grid;
    }

    generateCorrectGrid = (numberOfCell) => {
        /* TODO */
        return createEmptyGrid();
    }
}