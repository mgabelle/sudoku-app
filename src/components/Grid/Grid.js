import { Component } from "react";
import Cell from '../Cell/Cell';
import { CellObject, FIXED, DYNAMIC } from '../../utils/sudoku-utils';
import './Grid.css';
import { SudokuGenerator } from "../../utils/sudoku-generator";

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.grid = this.generateNewGrid();   
    }
    
    getGrid = _ => this.grid;

    updateGrid = grid => {
        this.grid = grid;
    }
    
    getCell = (i,j) => this.getGrid()[i][j];
    
    updateCell = (i, j, value) => {
        this.getGrid()[i][j].updateValue(value);
    }

    generateNewGrid = _ => {
        const generator = new SudokuGenerator();
        return generator.generate(25).map(row => row.map(number => new CellObject(number)))
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

    render() {
        let table = this.getGrid().map((row, j) => this.renderRow(row, j));
        return (
            <div className="Grid">
                <table>
                    <tbody>
                        {table}
                    </tbody>
                </table>
                <button onClick={this.generateNewGrid}>New Sudoku grid</button>
            </div>
        );
    }
}

