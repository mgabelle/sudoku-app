import { Component } from "react";
import './Counter.css';

export default class Counter extends Component {
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

const Cell = (props) => {
    return <td>{props.number}</td>;
}