/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const CreatePolicy = React.lazy(() => import('./views/pages/policy/CreatePolicy'))
const ListPolicy = React.lazy(() => import('./views/pages/policy/ListPolicy'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/policy/create-policy', name: 'CreatePolicy', component: CreatePolicy },
    { path: '/policy/list-policy', name: 'ListPolicy', component: ListPolicy },
]

export default routes
