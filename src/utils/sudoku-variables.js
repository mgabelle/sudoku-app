export const SUDOKU_SIZE = 9;

export const SUDOKU_VALUES = [1, 2, 3, 4, 5, 6, 7 ,8 ,9];

const getSudokuCoordinates = () => {
    let coordinates = [];
    for(let i = 0; i < SUDOKU_SIZE; i++){
        for(let j = 0; j < SUDOKU_SIZE; j++) {
            coordinates.push([i,j]);
        }
    }
    return coordinates;
}

export let SUDOKU_COORDINATES = getSudokuCoordinates();