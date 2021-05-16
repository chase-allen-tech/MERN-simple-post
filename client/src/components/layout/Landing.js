import React, { useEffect, useState } from "react";
import FroalaEditor from 'react-froala-wysiwyg';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createPost, getPosts, deletePost } from "../../actions/postActions";
import ReactHtmlParser from 'react-html-parser';

const Landing = () => {
  const [model, setModel] = useState('');
  const [title, setTitle] = useState('');
  const [reload, setReload] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { posts } = useSelector(state => state.posts);
  const { error } = useSelector(state => state.errors);

  useEffect(() => {
    if (reload) {
      dispatch(getPosts());
      setReload(false);
    }
  }, [reload])

  const handleModelChange = (val) => { setModel(val); }
  const handleInputChange = (e) => { setTitle(e.target.value) }

  const onSubmit = (e) => { 
    setModel('');
    setTitle('');
    dispatch(createPost({ title: title, model: model })); 
  }
  const gotoPost = (id) => { history.push('/post/' + id); }

  const onDeletePost = (id) => {
    dispatch(deletePost(id));
    console.log('delete')
  }

  return (
    <div className="container">
      <h1>LANDING</h1>

      <div className="row">
        <div>
          <input value={title} onChange={handleInputChange} type="text" className="form-control mb-3" required />
          <FroalaEditor model={model} onModelChange={handleModelChange} required />
          <button onClick={onSubmit} className="btn btn-primary mt-3">SUBMIT</button>
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <table className="table table-striped">
          <thead>
            <tr><th>Title</th><th>Model</th><th>Date</th></tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 && posts.map((post, index) =>
              <tr key={index} >
                <td>{post.title}</td><td>{ReactHtmlParser(post.model)}</td><td>{post.date}</td>
                <td><button onClick={() => gotoPost(post._id)} className="btn btn-secondary">View</button></td>
                <td><button onClick={() => onDeletePost(post._id)} className="btn btn-secondary">Delete</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Landing;
