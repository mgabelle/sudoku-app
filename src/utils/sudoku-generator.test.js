import { SudokuGenerator } from './sudoku-generator';
import { SudokuSolver } from './sudoku-solver';
import { SUDOKU_COORDINATES, SUDOKU_VALUES } from './sudoku-variables';

test('should generate a correct and solvable grid', () => {
    const generator = new SudokuGenerator();
    const NUMBER_OF_CELLS = 30;
    const grid = generator.generate(NUMBER_OF_CELLS);

    expect(grid).toBeTruthy();
    
    const solver = new SudokuSolver(grid);
    //the grid should not be solved and full
    expect(solver.isGridSolvedAndFull()).toBeFalsy();
    //the grid should be solvable
    expect(solver.solve()).toBeTruthy();
})

test('should generate a correct grid in less than MAX_TRY number of try', () => {
    const MAX_TRY = 5;
    const NUMBER_OF_CELLS = 20;
    const generator = new SudokuGenerator();
    let counter = 0;
    let grid = false;

    while(!grid && counter < MAX_TRY) {
        grid = generator.generateCorrectGrid(NUMBER_OF_CELLS);
        counter++;
    }
    
    expect(counter).toBeLessThan(MAX_TRY);
    expect(grid).toBeTruthy();
})

test('should return all the sudoku coordiantes shuffled', () => {
    const generator = new SudokuGenerator();
    const coordinates = SUDOKU_COORDINATES;
    const generatedCoordinates = generator.getGridCoordinatesShuffled();

    expect(coordinates.length).toEqual(81);
    expect(generatedCoordinates.length).toEqual(81);

    expect(generatedCoordinates.toString()).not.toEqual(coordinates.toString());
    expect(generatedCoordinates.sort().toString()).toEqual(coordinates.toString());
})

test('should return all the sudoku values shuffled', () => {
    const generator = new SudokuGenerator();
    const values = SUDOKU_VALUES;
    const generatedValues = generator.getRandomSudokuValues();

    expect(generatedValues.toString()).not.toEqual(values.toString());
    expect(generatedValues.sort().toString()).toEqual(values.toString());
})