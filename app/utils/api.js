import axios from 'axios';
import { getUserToken } from 'utils/helpers';

export const urlRoot = 'https://conduit.productionready.io';
export const urlApi = `${urlRoot}/api`;
// config axios
axios.defaults.baseURL = urlApi;
export const dataUserToken = getUserToken();

if (dataUserToken) {
  axios.defaults.headers.common.Authorization = `Token ${dataUserToken}`;
}

export const setTokenInApi = (tokenUser) => {
  // dataUserToken = tokenUser;
  axios.defaults.headers.common.Authorization = `Token ${tokenUser}`;
};
// end config axios

export const imageDefault = `${urlRoot}/images/smiley-cyrus.jpg`;
export const textDefault = '--';
export const urlApiArticles = '/articles';
export const urlApiArticlesFeed = '/articles/feed';
export const urlApiTags = '/tags';
export const urlProfiles = '/profiles';
export const urlUser = '/user';
export const urlUsers = '/users';

// call api
export const apiGetProfile = (username) => axios.get(`${urlProfiles}/${username}`);

export const apiCallLogin = (email, password) => axios.post(
  `${urlUsers}/login`,
  {
    user: {
      email,
      password,
    },
  },
);

export const apiCallSignUp = (params) => axios.post(
  urlUsers,
  {
    user: params,
  },
);

export const apiGetInfoUser = () => axios.get(urlUser);

export const apiUpdateInfoUser = (data) => axios.put(urlUser, data);

export const apiGetArticles = (params) => axios.get(urlApiArticles, { params });

export const apiGetArticle = (slug) => axios.get(`${urlApiArticles}/${slug}`);

export const apiDeleteArticle = (slug) => axios.delete(`${urlApiArticles}/${slug}`);

export const apiGetArticlesFeed = (params) => axios.get(urlApiArticlesFeed, { params });

export const apiGetTags = () => axios.get(urlApiTags);

export const apiGetComments = (slug) => axios.get(`${urlApiArticles}/${slug}/comments`);

export const apiDeleteComments = (slug, id) => axios.delete(`${urlApiArticles}/${slug}/comments/${id}`);

export const apiPostComments = (slug, comment) => axios.post(
  `${urlApiArticles}/${slug}/comments`,
  {
    comment: {
      body: comment,
    },
  },
);

export const apiCallFollow = (params) => {
  const { following, username } = params;
  return axios({
    url: `${urlProfiles}/${username}/follow`,
    method: following ? 'DELETE' : 'POST',
  });
};


export const apiCallFavorited = (params) => {
  const { favorited, slug } = params;
  return axios({
    url: `${urlApiArticles}/${slug}/favorite`,
    method: favorited ? 'DELETE' : 'POST',
  });
};

export const apiCallArticle = (data, article) => {
  const { slug } = article;
  if (data) {
    const url = article.slug !== undefined
      ?
        `${urlApiArticles}/${slug}`
      :
        `${urlApiArticles}`;
    const method = article.slug !== undefined ? 'PUT' : 'POST';
    return axios({
      url,
      method,
      data,
    });
  }
  return axios.get(`${urlApiArticles}/${slug}`);
};
