import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Post, PostFormInputs } from './types/post'

// interface Post {
//   id: number
//   title: string
//   views: number
// }

// interface PostFormInputs {
//   title: string
//   views: number
// }

const schema = yup.object({
  title: yup.string().required('Title is required'),
  views: yup
    .number()
    .typeError('Views must be a number')
    .min(0, 'Views must be at least 0')
    .required('Views is required'),
})

const API = 'http://localhost:3000/posts'

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [editingPostId, setEditingPostId] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PostFormInputs>({
    resolver: yupResolver(schema),
  })

  const fetchPosts = async () => {
    try {
      const res = await axios.get<Post[]>(API)
      setPosts(res.data)
    } catch (err) {
      console.error('Failed to fetch posts', err)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const onSubmit = async (data: PostFormInputs) => {
    try {
      if (editingPostId) {
        await axios.patch(`${API}/${editingPostId}`, data)
        setEditingPostId(null)
      } else {
        await axios.post(API, data)
      }
      reset()
      fetchPosts()
    } catch (err) {
      console.error('Error saving post', err)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id)
    setValue('title', post.title)
    setValue('views', post.views)
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API}/${id}`)
      fetchPosts()
    } catch (err) {
      console.error('Error deleting post', err)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{editingPostId ? 'Edit Post' : 'Create Post'}</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '2rem' }}>
        <div>
          <input placeholder="Title" {...register('title')} />
          <p style={{ color: 'red' }}>{errors.title?.message}</p>
        </div>
        <div>
          <input placeholder="Views" type="number" {...register('views')} />
          <p style={{ color: 'red' }}>{errors.views?.message}</p>
        </div>
        <button type="submit">{editingPostId ? 'Update' : 'Create'}</button>
        {editingPostId && (
          <button
            type="button"
            onClick={() => {
              setEditingPostId(null)
              reset()
            }}
            style={{ marginLeft: '1rem' }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>All Posts</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h3>{post.title}</h3>
            <p>Views: {post.views}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
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
