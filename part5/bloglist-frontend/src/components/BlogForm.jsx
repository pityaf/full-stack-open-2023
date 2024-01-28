const BlogForm = (props) => {

    const styleInput = {
        width: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5px'
    }

    return(
        <form onSubmit={ props.handleSubmit }>
            <div style={ styleInput }>
                <label>Title:</label>
                <input type="text" className="title" id="title" value={ props.title } onChange={ ({ target }) => props.setTitle(target.value) } placeholder='title' />
            </div>

            <div style={ styleInput }>
                <label>Author:</label>
                <input type="text" className="author" id="author" value={ props.author } onChange={ ({ target }) => props.setAuthor(target.value) } placeholder='author' />
            </div>

            <div style={ styleInput }>
                <label>URL:</label>
                <input type="text" className="url" id="url" value={ props.url } onChange={ ({ target }) => props.setURL(target.value) } placeholder='url' />
            </div>
            <button type="submit">Add blog</button>
        </form>
    )
}

export default BlogForm