/* eslint-disable prettier/prettier */
import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Sign Up and Start Earning</h1>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Company name" autoComplete="company name" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="country" autoComplete="country" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="City" autoComplete="City" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Founded" autoComplete="Founded" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Last 12 months turover" autoComplete="turnover" type="number" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Number of units sold" autoComplete="units" type="number" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>Company license</CInputGroupText>
                                        <CFormInput placeholder="Upload documents" autoComplete="units" type="file" />
                                    </CInputGroup>

                                    <p className="text-medium-emphasis">Business Contact Person</p>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Name" autoComplete="name" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>+971</CInputGroupText><CFormInput placeholder="Mobile" autoComplete="mobile" type="number" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Email" autoComplete="email" type="email" />
                                    </CInputGroup>
                                    <p className="text-medium-emphasis">Business Details</p>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Expected Monthly Salary" type="number" autoComplete="salary" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Number od rental outlets" type="number" autoComplete="outlets" />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CFormInput placeholder="Number of countries" type="number" autoComplete="email" />
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="success">Submit</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Register
