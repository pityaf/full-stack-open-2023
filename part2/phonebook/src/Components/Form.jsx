const Form = (props) => {
    return(
        <form onSubmit={ props.onSubmit }>
            <div>
                name: <input onChange={ props.handleNewPerson } required />
                <br />
                number: <input onChange={ props.handleNewNumber } required />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};

export default Form;