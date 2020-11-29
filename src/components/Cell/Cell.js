import { Component } from 'react';
import { FIXED } from '../../utils/sudoku';
import './Cell.css';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.cellObject.getValue()
        }
    }

    handleChange = (event) => {
        const value = event.target.value;

        if(this.checkInput(value)) {
            this.props.handleChange(parseInt(value));
            this.setState({value : value});
        } else {
            this.props.handleChange(0);
        }
    }

    handleClick = (e) => {
        e.target.select();
    } 

    checkInput(value) {
        //check valid number
        if(isNaN(parseInt(value))) return false;

        if(value === 0 || value > 9) return false;

        return true;
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
                        value={this.state.value === 0 ? "" : this.state.value }
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    />
                </td>
            );
        }
    }
}