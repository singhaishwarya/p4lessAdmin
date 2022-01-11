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
    CRow,
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
            passwordError: ''
        };
    }
    handleSubmit = () => {
        if (this.validate()) {
            this.setState({ usernameError: '', passwordError: '' });
            const { username, password } = this.state;
            AuthService.login({ "password": password, "username": username })
                .then((result) => {

                    if (!result) return

                    if (result.status === 'success') {

                        localStorage.setItem('userData', JSON.stringify(result.user));
                        localStorage.setItem('userAuth', JSON.stringify(result.token));

                        // window.location.reload();
                        // ToastService.success("Successfully Login");
                        // this.props.location.state.tabId ? this.props.history.push({
                        //     pathname: '/buy-protection', state: {
                        //         tabId: this.props.location.state.tabId
                        //     }
                        // }) : this.props.history.push({ pathname: '/home' });
                    }
                    else {
                        return ToastService.error(result.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            // axiosConfig.post('user/register', { "first_name": f_name, "last_name": l_name, "password": password, "email": email, "username": "" })
            //     .then(res => {
            //         console.log(res);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })};
        }
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
                                        <CForm>
                                            <h1>Login</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput placeholder="Username" autoComplete="username" />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                />
                                            </CInputGroup>
                                            <CRow>
                                                <CCol xs={6}>
                                                    <Link to='/'>
                                                        <CButton color="primary" className="px-4">
                                                            Login
                                                        </CButton></Link>
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
