import { Component } from "react";
import Cell from '../Cell/Cell';
import { generateRandomGrid, FIXED, DYNAMIC } from '../../utils/sudoku'
import './Grid.css';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: generateRandomGrid()
        }
    }

    renderRow = (row, i) => {
        const cells = row.map((cellObject, j) => {

            switch(cellObject.getType()) {
                case FIXED:
                    return <Cell cellObject={cellObject} key={[i,j]}/>;
                case DYNAMIC:
                    return <Cell cellObject={cellObject} key={[i,j]} handleChange={(value) => this.updateCell(i,j,value)}/>;
                default:
                    console.error('this is not a valid type for a Cell Object');
            }
        });
        return <tr key={i}>{cells}</tr>;
    }

    updateCell = (i, j, value) => {
        const grid = this.getGrid();
        grid[i][j].updateValue(value);
        this.setState({
            grid: grid
        })
    }

    getGrid = _ => this.state.grid;

    render() {
        let table = this.getGrid().map((row, j) => this.renderRow(row, j));
        return (
            <table>
                <tbody>
                    {table}
                </tbody>
            </table>
        );
    }
}

