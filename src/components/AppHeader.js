/* eslint-disable prettier/prettier */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler, CNavLink, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CHeader position="sticky" className="mb-3">
            <CContainer fluid>
                <CHeaderToggler
                    className="ps-1"
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                {/* <AppBreadcrumb /> */}
                <CHeaderNav className="ms-3">
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <AppHeaderDropdown />
                </CHeaderNav>
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
