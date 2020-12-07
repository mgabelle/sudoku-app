import { 
    createEmptyGrid,
    isFull,
    SUDOKU_SIZE,
    SudokuSolver,
    isInArray
} from './sudoku';

const VALID_SUDOKU_STUB_1 = [
    [9,0,0,1,0,0,0,0,5],
    [0,0,5,0,9,0,2,0,1],
    [8,0,0,0,4,0,0,0,7],
    [0,0,0,0,8,0,0,0,0],
    [0,0,0,7,0,0,0,0,0],
    [0,0,0,0,2,6,0,0,9],
    [2,0,0,3,0,0,0,0,6],
    [0,0,0,2,0,0,9,0,0],
    [0,0,1,9,0,4,5,7,0]
];

const VALID_SOLUTION_FOR_STUB_1 = [
    [9,3,4,1,7,2,6,8,5],
    [7,6,5,8,9,3,2,4,1],
    [8,1,2,6,4,5,3,9,7],
    [4,2,9,5,8,1,7,6,3],
    [6,5,8,7,3,9,1,2,5],
    [1,7,3,4,2,6,8,5,9],
    [2,9,7,3,5,8,4,1,6],
    [5,4,6,2,1,7,9,3,8],
    [3,8,1,9,6,4,5,7,2]
];

const FIRST_EMPTY_CELL_EXPECTED_1 = {
    'position': [8, 4],
    'possibilities': 1 
} 

test('should create an empty grid', () => {
    const grid = createEmptyGrid();
    expect(grid.length).toEqual(SUDOKU_SIZE);

    grid.map(row => {
        expect(row.length).toEqual(9);
        row.map(n => expect(n).toEqual(0));
    });
})

test('should check if a grid is full or not', () => {
    let grid = createEmptyGrid();
    expect(isFull(grid)).toBeFalsy();
    grid = new Array(SUDOKU_SIZE).fill(new Array(SUDOKU_SIZE).fill(3));
    expect(isFull(grid)).toBeTruthy();
})

//SUDOKU SOLVER 

test('should check if value is in array', ()=> {
    const value = 1;
    const array = new Array(9).fill(0);
    
    expect(isInArray(array, value)).toBeFalsy();
    
    array[0] = value;
    expect(isInArray(array, value)).toBeTruthy();
})

test('should check correctly', () => {
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

test('should calculate the possibilities', () => {
    const grid = VALID_SUDOKU_STUB_1;
    const firstEmptyCellExpected = FIRST_EMPTY_CELL_EXPECTED_1;
    const solver = new SudokuSolver(grid);

    const emptyCells = solver.getEmptyCells();
    expect(emptyCells).not.toBeUndefined();

    //check the sorting
    for(let i = 0; i < emptyCells.length - 1; i++) {
        expect(emptyCells[i].possibilities).toBeLessThanOrEqual(emptyCells[i+1].possibilities);
    }

    //check the first value
    expect(emptyCells[0]).toEqual(firstEmptyCellExpected);
})

test('should solve the grid and find the right grid', () => {
	const grid = VALID_SUDOKU_STUB_1;
	const expectedSolvedGrid = VALID_SOLUTION_FOR_STUB_1;
	const solver = new SudokuSolver(grid);

	expect(solver.getGrid()).toEqual(grid);
	expect(solver.getInitialGrid()).toEqual(grid);

	const isSolved = solver.solve(0);
	expect(isSolved).toBeTruthy();

	expect(solver.getInitialGrid()).toEqual(grid);
	expect(solver.getGrid()).toEqual(expectedSolvedGrid);
})