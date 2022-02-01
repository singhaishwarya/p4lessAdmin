/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow, CFormFeedback
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from '../../../services/AuthService';
import ToastService from '../../../services/ToastService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            isValidated: false,
        };
    }


    handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        // this.setState({ usernameError: '', passwordError: '' });
        const { username, password } = this.state;
        AuthService.login({ "password": password, "username": username, group_name: "agent" })
            .then((result) => {

                if (!result) return

                if (result.status === 'success') {
                    localStorage.setItem('userData', JSON.stringify(result.user));
                    localStorage.setItem('userAuth', JSON.stringify(result.token));
                    // eslint-disable-next-line react/prop-types
                    this.props.history.push({ pathname: '/dashboard' });
                }
                else {
                    return ToastService.error(result.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validated = (val) => {
        this.setState({ isValidated: val })
    }
    render() {
        const { username, password, usernameError, passwordError } = this.state;
        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={4}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit}
                                            noValidate
                                            validated={this.state.isValidated}
                                        >
                                            <h1>Login</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="Username" autoComplete="username" name="username" onChange={this.handleChange} required />
                                                <CFormFeedback invalid>Please enter valid username.</CFormFeedback>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    name="password"
                                                    onChange={this.handleChange} required
                                                />
                                                <CFormFeedback invalid>Please enter password.</CFormFeedback>
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <CButton type="submit" color="primary" className="px-4">
                                                        Login
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>

        );
    }
}


export default withRouter(Login);
