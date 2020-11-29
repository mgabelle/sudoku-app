import { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        console.log(event.target.value);
    }

    render() {
        if(this.props.type === 'fixed') {
            return (
                <td className="Cell">
                    { this.props.number }
                </td>
            );
        }
        else {
            return (
                <td className="Cell">
                    <input 
                        onChange={this.handleChange}
                    />
                </td>
            );
        }
    }
}