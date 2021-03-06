import { SudokuSolver } from './sudoku-solver';
import { createEmptyGrid } from './sudoku-utils';

const VALID_SUDOKU_STUB_1 = [
    [0,3,0,0,0,0,0,6,0],
    [0,9,0,6,7,5,0,4,0],
    [8,0,0,0,0,0,0,0,2],
    [0,0,0,0,9,0,0,0,0],
    [4,6,0,0,8,0,0,1,7],
    [9,0,0,0,1,0,0,0,8],
    [0,0,1,7,0,2,3,0,0],
    [6,0,0,0,0,0,0,0,1],
    [0,0,9,0,0,0,5,0,0],
];

//invalid
const VALID_SOLUTION_FOR_STUB_1 = [
    [7,3,4,9,2,8,1,6,5],
    [1,9,2,6,7,5,8,4,3],
    [8,5,6,1,3,4,7,9,2],
    [2,1,8,5,9,7,6,3,4],
    [4,6,5,2,8,3,9,1,7],
    [9,7,3,4,1,6,2,5,8],
    [5,4,1,7,6,2,3,8,9],
    [6,8,7,3,5,9,4,2,1],
    [3,2,9,8,4,1,5,7,6],
];

/* 
    ######################### 
    ####  SUDOKU SOLVER  ####
    #########################
 */

 test('should update a cell value', () => {
    const solver = new SudokuSolver(createEmptyGrid());
    const [i,j,randomValue] = [0,2,9];
    expect(solver.getGrid()[i][j]).toEqual(0);
    
    solver.updateGrid(i,j,randomValue);
    expect(solver.getGrid()[i][j]).toEqual(randomValue);
 })

test('should check correctly lines, blocks, and columns', () => {
    const grid = createEmptyGrid();
    const [i, j] = [5,5];
    const value = 6;
    grid[i][j] = value;

    const solver = new SudokuSolver(grid);

    //incorrect line
    const incorrectLines = [0,1,2,3,4,6,7,8,];
    for(let line of incorrectLines) {
        expect(solver.isValueInLine(line, value)).toBeFalsy();
    }

    //correct line
    expect(solver.isValueInLine(i,value)).toBeTruthy();

    //incorrect column
    const incorrectColumns = [0,1,2,3,4,6,7,8,];
    for(let column of incorrectColumns) {
        expect(solver.isValueInColumn(column, value)).toBeFalsy();
    }

    //correct column
    expect(solver.isValueInColumn(j, value)).toBeTruthy();

    //incorrect block
    const incorrectBlock = [[1,1], [2,2],[3,2]];
    for(let block of incorrectBlock) {
        expect(solver.isValueInBlock(...block)).toBeFalsy();
    }

    //correct block
    expect(solver.isValueInBlock(i,j,value)).toBeTruthy();

})

test('should calculate possibilities of each empty cell and sort them', () => {
    const grid = VALID_SUDOKU_STUB_1;
    const solver = new SudokuSolver(grid);

    const emptyCells = solver.getEmptyCells();
    expect(emptyCells).not.toBeUndefined();

    //check the sorting
    for(let i = 0; i < emptyCells.length - 1; i++) {
        expect(emptyCells[i].possibilities.length).toBeLessThanOrEqual(emptyCells[i+1].possibilities.length);
    }
})

test('should correctly check if the grid is solved', () => {
    let solver;

    const notFullGrid = createEmptyGrid(); 
    solver = new SudokuSolver(notFullGrid);
    expect(solver.isGridSolvedAndFull()).toBeFalsy();

    const fullGridNotSolved = new Array(9).fill(new Array(9));
    solver = new SudokuSolver(fullGridNotSolved);
    expect(solver.isGridSolvedAndFull()).toBeFalsy();

    const gridSolved = VALID_SOLUTION_FOR_STUB_1;
    solver = new SudokuSolver(gridSolved);
    expect(solver.isGridSolvedAndFull()).toBeTruthy();
})

test('should solve the grid and find the right grid', () => {
	const grid = VALID_SUDOKU_STUB_1;
	const expectedSolvedGrid = VALID_SOLUTION_FOR_STUB_1;
	const solver = new SudokuSolver(grid);

	expect(solver.getGrid()).toEqual(grid);
	expect(solver.getInitialGrid()).toEqual(solver.getGrid());

	const isSolved = solver.solve();
	expect(isSolved).toBeTruthy();

	expect(solver.getInitialGrid()).not.toEqual(solver.getGrid());
	expect(solver.getGrid()).toEqual(expectedSolvedGrid);
})