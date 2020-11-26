import './Cell.css';

export default function Cell(props) {
    return (
        <td className="Cell">
            { props.number > 0 &&  props.number }
        </td>
    );
}