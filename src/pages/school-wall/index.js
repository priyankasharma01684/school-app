import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProfileDetail } from '../../actions/user-action-types';
import { createPost, fetchPosts } from '../../actions/posts-action-types';
import { Button } from '../../components';
import AddPost from './add-post';
import SinglePost from './single-post';

const SchoolWall = () => {
  const dispatch = useDispatch();
  const [visible, setVisibility] = React.useState(false);
  const [playing, setPlaying] = React.useState(null);
  const posts = useSelector((store) => store.posts.records);

  React.useEffect(() => {
    dispatch(fetchMyProfileDetail());
    dispatch(fetchPosts());
  }, []);

  function onPlay(id) {
    setPlaying(id);
  }

  function onDownload(url) {
    window.open(url, '_blank');
  }

  function onCreatePost(payload) {
    setVisibility(false);
    dispatch(createPost(payload));
  }

  return (
    <>
      <div className="mb-3 card">
        <div className="card-header-tab card-header border-0">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
            School Wall
          </div>
          <ul
            className="nav d-flex align-items-center justify-content-center justify-content-md-right mb-2 mb-md-0"
            role="tablist"
          >
            <Button onClick={() => setVisibility(true)} className="btn-pill btn-shadow btn-wide btn btn-info btn-sm">
              <span className="add-icon"> + </span>
              Add Post
            </Button>
          </ul>
        </div>
        <div className="main-card mb-3   card-footer">
          <div className="row px-2">
            {posts?.map((post) => (
              <SinglePost
                {...post}
                key={post.school_wall_posts_id}
                playing={post.school_wall_posts_id === playing}
                onDownload={() => onDownload(post.asset)}
                onPlay={() => onPlay(post.school_wall_posts_id)}
              />
            ))}
          </div>
        </div>
      </div>
      {visible && <AddPost onSave={onCreatePost} onClose={() => setVisibility(false)} />}
    </>
  );
};

export default SchoolWall;
