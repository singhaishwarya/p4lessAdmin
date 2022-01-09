/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPuzzle, cilSpeedometer, cilStar } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

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
        name: 'Detailed Reports',
        to: '/reports',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Policy',
        to: '/policy',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    },
    //   {
    //     component: CNavItem,
    //     name: 'Register',
    //     to: '/register',
    //     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Error 404',
    //     to: '/404',
    //     icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    //   },
]

export default _nav
