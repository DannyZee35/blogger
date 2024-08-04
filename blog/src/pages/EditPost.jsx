


import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../services/DbService'
import { getSinglePost } from '../store/postSlice'
import { useDispatch } from 'react-redux'
import { PostForm, Wrapper } from '../components'
import { Box } from '@mui/material'

export const EditPost = () => {
  const [post,setPost] = useState()
  const {slug} = useParams()
  const navigate = useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(slug){
      dbService.getSinglePost(slug).then((post)=>{
        if (post) {
          dispatch(getSinglePost(post))
          setPost(post)
        }
      })
    }
  },[navigate,slug])


return post ? (
    <Box >
        <Wrapper>
            <PostForm post={post} />
        </Wrapper>
    </Box>
  ) : null
}