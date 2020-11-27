import './Cell.css';

export function CellFix(props) {
    return (
        <td className="Cell">
            { props.number }
        </td>
    );
}

export function CellDynamic(props) {
    return (
        <td className="Cell">
            <input 
                value={ props.number === 0 ? "" : props.number }
                onKeyUp={(e) => props.onKeyUpHandler(e.key) }
            />
        </td>
    );
}