import { Component } from "react";
import { Cell } from './Cell';
import './Grid.css';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: new Array(9).fill(new Array(9).fill(0))
        }
    }

    renderRow = (row) => {
    const cells = row.map(number => <Cell number={number}/>);
        return <tr>{cells}</tr>;
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

