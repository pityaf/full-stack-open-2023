import Blog from '../components/Blog'

const Blogs = (props) => {

    return (
        <div>
            <h2>Blogs!</h2>
            {
                props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )
}
  
  export default Blogs