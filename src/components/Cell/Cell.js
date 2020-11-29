import { Component } from 'react';
import { FIXED } from '../../utils/sudoku';
import './Cell.css';

export default class Cell extends Component {
    handleChange = (event) => {
        const value = event.target.value;
        this.props.handleChange(value);
    }

    render() {
        const {value, type} = this.props.cellObject;
        
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
                    />
                </td>
            );
        }
    }
}