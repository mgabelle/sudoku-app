// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
import TestRenderer from 'react-test-renderer';
import { default as Grid } from "./Grid";

const gridStub = [
    [0,1,0,0,0,0,8,5,0],
    [0,0,2,0,0,0,0,0,0],
    [6,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,6,0,0,0],
    [0,0,7,0,0,0,8,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,0,0,0],
    [0,0,0,6,0,0,0,0,0],
    [0,9,0,0,0,0,5,0,0],
];

test('should update the Grid status', () => {
    const grid = new Grid();

    const [i, j] = [3, 4];
    const stubValue = (grid.state.grid[i][j] + 1) % 9;

    expect(grid.getCell(i,j).getValue()).not.toEqual(stubValue);
    
    //change the value
    grid.updateCell(i, j, stubValue);
    expect(grid.getCell(i,j).getValue()).toEqual(stubValue);
})

test('should get the grid', () => {
    const grid = new Grid();
    expect(grid.getGrid()).toEqual(grid.state.grid);
})

test('should render Grid', () => {
    const gridRenderer = TestRenderer.create(<Grid/>);
    console.log(gridRenderer);
    expect(gridRenderer).toBeTruthy();
})

