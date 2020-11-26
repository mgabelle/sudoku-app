import './Cell.css';

export default function Cell(props) {
    //const [cellValue, setCellValue] = useState(0)
    return (
        <td className="Cell">
            { props.number > 0 &&  props.number }
        </td>
    );
}