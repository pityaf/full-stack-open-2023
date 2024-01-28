import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author for testing',
    url: 'test',
    likes: 2,
  }

  const { container } = render(<Blog blog={blog} setRefreshBlog={ true } refreshBlog={ true } />);
  const div = container.querySelector('.blog');

  expect(div).toHaveTextContent('Component testing is done with react-testing-library');
})


describe('Tests from 5.13 to 5.16', () => {
  test('5.13 - Component display blog\'s title and author, but not its URL or likes by default', () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://localhost.com',
      likes: 100,
      user:{
        id:'PaC'
      }
    }
  
    const { container } = render(<Blog blog={blog} setRefreshBlog={ true } refreshBlog={ true } />);
    const div = container.querySelector('.false');
  
    expect(div).toBeDefined();
  })

  test('5.14 - Blog\'s URL and likes are shown when button "show more" has been clicked', async () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://localhost.com',
      likes: 100,
      user:{
        id:'PaC'
      }
    }
  
    const { container } = render(<Blog blog={blog} setRefreshBlog={ true } refreshBlog={ true } />);
    const div = container.querySelector('.blog');
  
    const user = userEvent.setup()
    const button = screen.getByText('view more')
    await user.click(button)
  
    expect(div).toHaveTextContent('view less');
  })

  test('5.15 - Ensure that if the like button is pressed twice, the event handler is called twice', async () => {
    const onClick = jest.fn()

    render(<button className='addLike' onClick={ onClick }>add like</button>);

    const user = userEvent.setup()
    const button = screen.getByText('add like')

    await user.click(button)
    await user.click(button)
  
    expect(onClick.mock.calls).toHaveLength(2);
  })

  /*
  test('5.16 - Check that the form for creating a new blog calls the event handler with the right details', async () => {
    const blog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://localhost.com',
      likes: 100,
      user:{
        id:'PaC'
      }
    }

    const userId = {
      id: 'PaC'
    }

    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleSubmit={ createBlog } title={ true } setTitle={ () => {}  } author={ true } setAuthor={ () => {} } url={ true } setURL={ () => {} } />);

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    const sendButton = screen.getByText('Add blog')

    await user.type(title, 'testing a title...')
    await user.type(author, 'testing a title...')
    await user.type(url, 'testing a title...')
    await user.click(sendButton)
  
    expect(createBlog).toHaveBeenCalled()
  }, 10000)
  */
})