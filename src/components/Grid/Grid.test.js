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

    expect(grid.state.grid[i][j]).not.toEqual(stubValue);
    
    //change the value
    grid.updateCell(i, j, stubValue);
    expect(grid.state.grid[i][j]).toEqual(stubValue);
})

