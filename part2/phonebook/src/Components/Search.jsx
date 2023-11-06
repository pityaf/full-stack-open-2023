const Search = (props) => {
    return(
        <form onSubmit={ props.onSearchSubmit }>
            Search: 
            <input value={ props.filteredPerson } onChange={ props.handleFilterPersons }/>
        </form>
    )
}

export default Search;