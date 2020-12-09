import { SUDOKU_SIZE } from './sudoku-variables';

import {
    createEmptyGrid,
    isFull,
    arrayHasDuplicate,
    isInArray
} from './sudoku-utils.js';

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

test('should check if an array has duplicate', () => {
    const expectNotToHaveDuplicate = [2, 3, 4, 6, 9, 8, 5, 7, 1];
    const expectToHaveDuplicate = [2, 3, 3, 6, 9, 8, 5, 7, 1];

    expect(arrayHasDuplicate(expectNotToHaveDuplicate)).toBeFalsy();
    expect(arrayHasDuplicate(expectToHaveDuplicate)).toBeTruthy();
})

test('should check if value is in array', ()=> {
    const value = 1;
    const array = new Array(9).fill(0);
    
    expect(isInArray(array, value)).toBeFalsy();
    
    array[0] = value;
    expect(isInArray(array, value)).toBeTruthy();
})