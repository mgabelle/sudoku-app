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

    renderRow = (row, i) => {
        const cells = row.map((number, j) => {
            return number === 0 ? 
                <Cell type={'dynamic'} key={[i,j]} number={number} handleChange={(value) => this.updateCell(i,j,value)}/> : 
                <Cell type={'fixed'} key={[i,j]} number={number}/>                
        });
        return <tr key={i}>{cells}</tr>;
    }

    updateCell = (i, j, value) => {
        const grid = this.getGrid();
        grid[i][j] = value;
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

