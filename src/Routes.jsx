import Fubag from './fubag/App';
import Ball from './ball/App';
import Bridge from './bridge/App';
import CollectStars from './collect-stars/App';

export default [
  {
    path: '/',
    exact: true,
    component: CollectStars,
  },
  {
    path: '/fubag',
    component: Fubag,
  },
  {
    path: '/ball',
    component: Ball,
  },
  {
    path: '/bridge',
    component: Bridge,
  },
];
