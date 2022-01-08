import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Charts = React.lazy(() => import('./views/charts/Charts'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/tables', name: 'Tables', component: Tables },
  { path: '/forms/range', name: 'Range', component: Range },
]

export default routes
