const Countries = ({ country, handleShow }) => {

    return(
        <li>{ country.name.common } 
            <button id={country.name.common} onClick={ handleShow }>Show</button>
        </li>
    )
}

export default Countries;