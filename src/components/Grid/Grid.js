import { Component } from "react";
import Cell from '../Cell/Cell';
import { generateRandomGrid } from '../../utils/sudoku'
import './Grid.css';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: generateRandomGrid()
        }
    }

    renderRow = (row) => {
    const cells = row.map(number => <Cell number={number}/>);
        return <tr>{cells}</tr>;
    }

    updateCell = (i, j, value) => {
        const grid = this.state.grid;
        grid[i][j] = value;
        this.setState({
            grid: grid
        })
    }

    render() {
        let table = this.state.grid.map(row => this.renderRow(row));
        return (
            <table>
                <tbody>
                    {table}
                </tbody>
            </table>
        );
    }
}
