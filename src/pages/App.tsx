import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Post } from '../types/post'
import CreatePost from '../components/CreatePost'

const API = 'http://localhost:3000/posts'



const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<PostFormInputs>({
  //   resolver: yupResolver(schema),
  // })

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>(API)
      setPosts(res.data)
      console.log(res.data);
      
    } catch (err) {
      console.error('Failed to fetch posts', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  // const onSubmit = async (data: PostFormInputs) => {
  //   try {
  //     await axios.post(API, data)
  //     reset()
  //     fetchPosts()
  //   } catch (err) {
  //     console.error('Error creating post', err)
  //   }
  // }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`)
      fetchPosts()
    } catch (err) {
      console.error('Error deleting post', err)
    }
  }

  return (
    <div className='p-2'>
      {/* <h1>Create Post</h1> */}
      <CreatePost onPostCreated={fetchPosts} />
    

      <h1>All Posts</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              margin :"5px"
            }}
          >
            <h3 className='text-xl font-semibold text-center'>{post.title}</h3>
            <p className="text-center text-gray-500">Views: {post.views}</p>
            <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
            <button
              onClick={() => handleDelete(post.id)}
              style={{ marginLeft: '1rem', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
