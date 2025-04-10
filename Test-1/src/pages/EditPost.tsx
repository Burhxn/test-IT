// src/pages/EditPost.tsx
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PostFormInputs, Post } from '../types/post'
import { schema } from '../utils/validation'



const EditPost: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormInputs>({
    resolver: yupResolver(schema),
  })

  const fetchPost = async () => {
    try {
      const res = await axios.get<Post>(`http://localhost:3000/posts/${id}`)
      setValue('title', res.data.title)
      setValue('views', res.data.views)
    } catch (err) {
      console.error('Failed to fetch post', err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  const onSubmit = async (data: PostFormInputs) => {
    try {
      await axios.patch(`http://localhost:3000/posts/${id}`, data)
      navigate('/')
    } catch (err) {
      console.error('Failed to update post', err)
    }
  }

  return (
    <div  style={{ padding: '2rem' }}>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input className="text-center text-gray-500" placeholder="Title" {...register('title')} />
          <p style={{ color: 'red' }}>{errors.title?.message}</p>
        </div>
        <div>
          <input className="text-center text-gray-500" placeholder="Views" type="number" {...register('views')} />
          <p style={{ color: 'red' }}>{errors.views?.message}</p>
        </div>
        <button type="submit">Update</button>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{ marginLeft: '1rem' }}
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default EditPost
