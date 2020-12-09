import { Component } from 'react';
import { FIXED } from '../../utils/sudoku-utils';
import './Cell.css';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.cellObject.getType(),
            value: this.props.cellObject.getValue()
        }
    }

    getValue = _ => this.state.value;

    getType = _ => this.state.type;

    handleChange = (event) => {
        const value = event.target.value;

        if(this.isValidNumber(value)) {
            const valueToInt = parseInt(value);
            this.updateCellStateAndGrid(valueToInt);
        } else if (value === "") {
            this.updateCellStateAndGrid(0);
        }
    }

    updateCellStateAndGrid = (value) => { 
        this.setState({value: value});
        this.props.handleChange(value);
    }

    //Select all the cell content on click
    handleClick = (e) => {
        e.target.select();
    } 

    //Check if value is a valid number
    isValidNumber(value) {
        if(isNaN(parseInt(value))) return false;

        if(value === 0 || value > 9) return false;

        return true;
    }

    render() {
        const value = this.getValue();
        const type = this.getType();
        
        if(type === FIXED) {
            return (
                <td className="Cell">
                    { value }
                </td>
            );
        } else {
            return (
                <td className="Cell">
                    <input
                        value={ value === 0 ? "" : value } 
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    />
                </td>
            );
        }
    }
}