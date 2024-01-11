const Notification = ({ message, type }) => {
    const addition = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    if(message && type) {
        return(
            <div style={ type === 'addition' ? addition : error }>
                <p>{ message }</p>
            </div>
        )
    } 

    return null
}

export default Notification;