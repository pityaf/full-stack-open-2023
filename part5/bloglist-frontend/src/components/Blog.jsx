const Blog = ({ blog }) => {
    return (
      <div>
        <p>Title: { blog.title }, Author: { blog.author }</p>
      </div>  
    )
}

export default Blog