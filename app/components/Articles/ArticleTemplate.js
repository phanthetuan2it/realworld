import React from 'react';
import PropTypes from 'prop-types';
import Tags from 'components/Tags';
class ArticleTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tagList: [],
      body: '',
      tag: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { article } = nextProps;
    this.setState({
      title: article.title ? article.title : '',
      description: article.description ? article.description : '',
      tagList: article.tagList ? article.tagList : [],
      body: article.body ? article.body : '',
      tag: '',
    });
  }

  onKeyDowned = (e) => {
    const tag = this.state.tag;
    if (e.keyCode === 13 && tag !== '') {
      const tagList = this.state.tagList;
      tagList.push(tag);
      this.setState({
        tag: '',
        tagList,
      });
    }
  }

  updateState = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      tagList: this.state.tagList,
      body: this.state.body,
    };
    this.props.postArticle(data);
  }

  removeTag = (index) => {
    const tagList = this.state.tagList;
    tagList.splice(index, 1);
    this.setState({
      tagList,
    });
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form >
                <fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" value={this.state.title} onChange={this.updateState('title')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="What's this article about?" value={this.state.description} onChange={this.updateState('description')} />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea className="form-control" rows="8" placeholder="Write your article (in markdown)" value={this.state.body} onChange={this.updateState('body')}></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" value={this.state.tag} onKeyDown={this.onKeyDowned} onChange={this.updateState('tag')} />
                    <div className="tag-list"></div>
                  </fieldset>
                  <Tags
                    tags={this.state.tagList}
                    tagType="form"
                    removeTag={this.removeTag}
                  />
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={this.handleSubmit}>
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleTemplate.propTypes = {
  article: PropTypes.object,
  postArticle: PropTypes.func,
};

export default ArticleTemplate;
