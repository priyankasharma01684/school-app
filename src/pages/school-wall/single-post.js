import React from 'react';
import { bool, func, number, string } from 'prop-types';
import moment from 'moment';
import Utils from '../../utility';
import { VideoPlayer } from '../../components';
import { IMAGE_FORMATS, VIDEO_FORMATS } from '../../constants';

const SinglePost = ({
  asset, asset_type, onDownload, onPlay, playing, post_created_date_time, post_description, user_name, user_image, thumbnail,
}) => {
  const [readMore, setReadMore] = React.useState(false);

  return (
    <div className="card-body col-sm-12 py-0 px-2 mt-3">
      <div className="list-group">
        <div className="list-group-item">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper align-items-center">
              <div className="widget-content-left mr-3">
                <img
                  height={50}
                  width={50}
                  className="rounded-circle"
                  src={encodeURI(user_image) || Utils.getImage('user-placeholder.png')}
                  alt='user'
                />
              </div>
              <div className="widget-content-left">
                <div className="h6 my-0 font-weight-bold">{user_name.capitalizeEachLetter() || 'Skulman User'}</div>
                <div className="small mt-1">
                  <i className="fa fa-calendar-alt mr-1" />
                  {moment(post_created_date_time, 'X').fromNow()}
                </div>
              </div>
            </div>
            <div className="mt-1">
              {`${post_description.length > 300 && !readMore ? `${post_description.substr(0, 300).trim()}...` : post_description} `}
              {post_description.length > 300 && <span role='presentation' className="text-info readmore" onClick={() => setReadMore(!readMore)}>{readMore ? 'Read less' : 'Read more'}</span>}
            </div>
            {asset_type && VIDEO_FORMATS.includes(asset_type.toLowerCase()) && (
              <VideoPlayer
                thumbnail={thumbnail}
                playing={playing}
                onPlay={onPlay}
                className="image  mh-200 my-2"
                url={asset}
                onClickPreview={onPlay}
              />
            )}
            {asset_type && IMAGE_FORMATS.includes(asset_type.toLowerCase()) && (
              <div className="thumbnail mh-200 image my-2">
                <img src={encodeURI(asset)} alt='media shared' />
              </div>
            )}
            {asset_type && ['pdf', 'xlsx', 'xlsm', 'xlsb', 'xltx', 'xltm', 'doc', 'docx', 'ppt', 'pptx'].includes(asset_type.toLowerCase()) && (
              <div role='presentation' onClick={onDownload} className=" mh-200 image my-2 pdf">
                <img height={100} src={Utils.getImage('document.png')} className="mw-100" alt='media shared' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SinglePost.propTypes = {
  asset: string.isRequired,
  asset_type: string,
  onDownload: func.isRequired,
  onPlay: func.isRequired,
  playing: bool.isRequired,
  post_created_date_time: number.isRequired,
  post_description: string.isRequired,
  thumbnail: string,
  user_image: string,
  user_name: string,
};

SinglePost.defaultProps = {
  asset_type: null,
  thumbnail: null,
  user_image: null,
  user_name: '',
};

export default SinglePost;
