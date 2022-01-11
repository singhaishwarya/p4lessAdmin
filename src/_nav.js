/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer, cilStar } from '@coreui/icons'
import { CNavItem, CNavGroup } from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavItem,
        name: 'reports',
        to: '/reports',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    },
    {
        component: CNavGroup,
        name: 'Policy',
        to: '/policy',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Create Policy',
                to: '/policy/create-policy',
            },
            {
                component: CNavItem,
                name: 'List Policy',
                to: '/policy/list-policy',
            },
        ]
    }
]

export default _nav
