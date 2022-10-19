import React from 'react';
import moment from 'moment';
import { Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';
import { Delete, MoreHoriz, ThumbUpAlt } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts'

import './post.css';

const likesPrintOut = (post) => {
    if (post.likes.length === 1) return `${post.likes.length} like`
    return `${post.likes.length} likes`
}



export default function Post({ post, setCurrentId }) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const renderDelete = () => {
        if (user?.result?._id === post.creator)
            return (<Button size="small" onClick={() => { dispatch(deletePost(post._id)) }} color="primary">
                <Delete fontSize='small' />
                Delete
            </Button>)
        return ''
    }
    const renderEdit = () => {
        if (user?.result?._id === post.creator)
            return (<div className='overlay2'>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}>
                    <MoreHoriz fontSize='default' />
                </Button>
            </div>)
        return ''
    }
    return (
        <Card className='card'>
            <CardMedia className='media' image={post.selectedFile} title={post.title} />
            <div className='overlay'>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {renderEdit()}
            <div className='details'>
                <Typography varian="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className="title" color="textSecondary" variant="h5">{post.title}   </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            <CardActions className='cardActions'>
                <Button size="small" onClick={() => { dispatch(likePost(post._id)) }} color="primary">
                    <ThumbUpAlt fontSize='small' />
                    {likesPrintOut(post)}
                </Button>
                {renderDelete()}
            </CardActions>
        </Card>
    )
}
