import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPostById } from '../actions/postActions';
import ReactHtmlParser from 'react-html-parser';

const Post = () => {
    const { postId } = useParams();
    const { post } = useSelector(state => state.posts)
    const dispatch = useDispatch();
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if(reload) {
            dispatch(getPostById(postId));
            setReload(false);
        }
    }, [reload]);
    
    return (
        <div className="container">
            <div>{post.title}</div>
            <div>{ReactHtmlParser(post.model)} </div>
            <p>{post.date}</p>
        </div>
    )
}

export default Post;