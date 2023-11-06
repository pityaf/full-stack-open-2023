const Persons = ({ name, number, handleRemoval}) => {
    return (
        <li>
            { name } | { number }
            <button onClick={ handleRemoval }>Remove</button>
        </li>
    )
};

export default Persons;