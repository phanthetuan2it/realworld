/**
 *
 * Asynchronously loads the component for ListArticles
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
