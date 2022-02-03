/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/dashboard/Dashboard'))
const Reports = React.lazy(() => import('./views/pages/reports/reports'))
const CreatePolicy = React.lazy(() => import('./views/pages/policy/CreatePolicy'))
const BulkUpload = React.lazy(() => import('./views/pages/policy/BulkUpload'))
const ListPolicy = React.lazy(() => import('./views/pages/policy/ListPolicy'))

// const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/reports', name: 'Reports', component: Reports },
    { path: '/policy/create-policy', name: 'CreatePolicy', component: CreatePolicy },
    { path: '/policy/bulk-upload', name: 'BulkUpload', component: BulkUpload },
    { path: '/policy/list-policy', name: 'ListPolicy', component: ListPolicy },
]

export default routes
