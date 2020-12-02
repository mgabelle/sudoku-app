import { 
    createEmptyGrid,
    isFull,
    SUDOKU_SIZE,
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