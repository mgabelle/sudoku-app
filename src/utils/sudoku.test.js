import { 
    createEmptyGrid,
    isFull,
    SUDOKU_SIZE,
    SudokuSolver,
    isInArray
} from './sudoku';

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

    expect(solver.isValueInColumn(j, value)).toBeTruthy();

    //incorrect block
})