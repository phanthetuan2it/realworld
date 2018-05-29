import React from 'react';
import PropTypes from 'prop-types';
import { checkErrorImage } from 'utils/helpers';
import { Link } from 'react-router-dom';
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  onChangeComment = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { callPostComment } = this.props;
    callPostComment(this.state.comment);
    this.setState({
      comment: '',
    });
  }

  renderButtonDelete = (item) => {
    const { user, callDeleteComment } = this.props;
    if (item.author.username === user.username) {
      return (
        <span
          role="button"
          tabIndex="0"
          onClick={() => callDeleteComment(item.id)}
          className="mod-options"
        >
          <i className="ion-trash-a"></i>
        </span>
      );
    }
    return '';
  }

  renderFormComment = () => {
    const { user } = this.props;
    if (user.username) {
      return (
        <form onSubmit={this.handleSubmit} className="card comment-form">
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
              value={this.state.comment}
              onChange={this.onChangeComment}
            >
            </textarea>
          </div>
          <div className="card-footer">
            <img src={user.image} onError={checkErrorImage} className="comment-author-img" alt="comment-author-img" />
            <button
              className="btn btn-sm btn-primary"
            >
              Post Comment
            </button>
          </div>
        </form>
      );
    }
    return (
      <p>
        <Link to="/signin">Sign in</Link>
        &nbsp;or&nbsp;
        <Link to="/signup">Sign up</Link>
        &nbsp;to add comments on this article.&nbsp;
      </p>
    );
  }

  render() {
    const { comments } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          {this.renderFormComment()}
          {comments && comments.map((item) => (
            <div key={item.slug} className="card">
              <div className="card-block">
                <p className="card-text">{item.body}</p>
              </div>
              <div className="card-footer">
                <a href="" className="comment-author">
                  <img src={item.author.image} className="comment-author-img" alt="omment-author-img" />
                </a>
                &nbsp;
                <a href="" className="comment-author">{item.author.username}</a>
                <span className="date-posted">{item.createdAt}</span>
                {this.renderButtonDelete(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  callPostComment: PropTypes.func,
  callDeleteComment: PropTypes.func,
  user: PropTypes.object,
  comments: PropTypes.array,
};

export default Comments;
