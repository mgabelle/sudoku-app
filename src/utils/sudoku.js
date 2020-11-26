const SUDOKU_SIZE = 9;

const createEmptyGrid = () => new Array(SUDOKU_SIZE).fill(new Array(SUDOKU_SIZE).fill(0));
const generateRandomGrid = () => {
    return createEmptyGrid().map(
        row => row.map(number => Math.floor(Math.random()*10))
    )
};

export { 
    generateRandomGrid
};