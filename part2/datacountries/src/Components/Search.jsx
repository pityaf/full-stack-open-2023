const Search = (props) => {
    return(
        <div>
            Find countries: 
            <input onChange={ props.handleFilter } />
        </div>
    )
}

export default Search;