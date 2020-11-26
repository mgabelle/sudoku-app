import './Cell.css';

export const Cell = (props) => {
    return (
        <td className="Cell">
            <input value={props.number}/>
        </td>
    );
}