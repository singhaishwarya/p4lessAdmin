/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
// import React from 'react'
import React, { Component } from "react";
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
    CRow, CFormFeedback, CFormSelect
} from '@coreui/react'

import { withRouter } from 'react-router-dom';
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import AuthService from '../../../services/AuthService';
import MasterService from '../../../services/MasterService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidated: false, countries: [], states: [], cities: []
        }
    }
    componentDidMount() {
        this.getCountries()
    }
    getCity = (countryId, stateId) => {
        MasterService.getCity({ country_id: countryId, state_id: stateId }).then((result) => {

            if (!result) return
            this.setState({
                cities: result?.records?.map(({ id: value, name: label }) => ({ label, value }))
            })

        })
            .catch((err) => {
                console.log(err);
            });
    }
    getStates = (countryId) => {
        MasterService.getStates({ country_id: countryId }).then((result) => {

            if (!result) return
            this.setState({
                states: result?.records?.map(({ id: value, name: label }) => ({ label, value }))
            })

        })
            .catch((err) => {
                console.log(err);
            });
    }
    submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        // const { f_name, l_name, email, password } = this.state;
        AuthService.register(this.state)
            .then((result) => {

                if (!result) return

                if (result.status === 'success') {

                    localStorage.setItem('userData', JSON.stringify(result.user));
                    localStorage.setItem('userAuth', JSON.stringify(result.token));
                    this.props.history.push({ pathname: '/' });
                }
                else {
                    return alert(result.message);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        this.validated(true)

    }
    getCountries = () => {
        MasterService.getCountry().then((result) => {

            if (!result) return
            this.setState({
                countries: result?.records?.map(({ id: value, name: label }) => ({ label, value }))
            })

        })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        if (e.target.name === 'company_license') {
            this.setState({ [e.target.name]: e.target.files[0] })
        }

        else {
            this.setState({ [e.target.name]: e.target.value });
            if (e.target.name === 'company_country') {

                this.getStates(e.target.value)
            }
            if (e.target.name === 'company_state') {

                this.getCity(this.state.company_country, e.target.value)
            }
        }

    }
    validated = (val) => {
        this.setState({ isValidated: val })
    }
    render() {
        return (
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={9} lg={7} xl={6}>

                            <CCard className="mx-4">
                                <CCardBody className="p-4">
                                    <CForm onSubmit={this.submitHandler} noValidate
                                        validated={this.state.isValidated}
                                    >
                                        <h1>Sign Up and Start Earning</h1>
                                        <CInputGroup className="mb-3 has-validation">
                                            <CFormInput placeholder="UUID" name="uuid" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                                        </CInputGroup>

                                        <CInputGroup className="mb-3">
                                            <CFormInput placeholder="First name" name="first_name" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput placeholder="Last name" name="last_name" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput placeholder="Address" name="address" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput placeholder="Password" name="password" type="password" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput placeholder="Company name" name="company_name" autoComplete="company name" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormSelect
                                                aria-label="Default select example"
                                                options={
                                                    this.state.countries
                                                }
                                                onChange={this.handleChange} name="company_country" required
                                            />
                                            {/* <CFormInput placeholder="country" name="company_country" autoComplete="country" onChange={this.handleChange} required /> */}
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormSelect
                                                aria-label="Default select example"
                                                options={
                                                    this.state.states
                                                } name="company_state"
                                                onChange={this.handleChange} required
                                            />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormSelect
                                                aria-label="Default select example"
                                                options={
                                                    this.state.cities
                                                } name="company_city"
                                                onChange={this.handleChange} required
                                            />
                                            {/* <CFormInput name="company_city" placeholder="City" autoComplete="City" onChange={this.handleChange} required /> */}
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="company_founded_year" placeholder="Founded" autoComplete="Founded" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="yearly_turnover" placeholder="Last 12 months turover" autoComplete="turnover" type="number" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="no_of_unit_sold" placeholder="Number of units sold" autoComplete="units" type="number" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>Company license</CInputGroupText>
                                            <CFormInput name="company_license" placeholder="Upload documents" autoComplete="units" type="file" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>

                                        <p className="text-medium-emphasis">Business Contact Person</p>
                                        {/* <CInputGroup className="mb-3">
                                            <CFormInput name="" placeholder="Name" autoComplete="name" onChange={this.handleChange} />
 <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
</CInputGroup> */}
                                        {/* <CInputGroup className="mb-3">
                                            <CInputGroupText>+971</CInputGroupText><CFormInput name="" placeholder="Mobile" autoComplete="mobile" type="number" onChange={this.handleChange} />
 <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
</CInputGroup> */}
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="email" placeholder="Email" autoComplete="email" type="email" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <p className="text-medium-emphasis">Business Details</p>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="expected_monthly_sale" placeholder="Expected Monthly Salary" type="number" autoComplete="salary" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="no_of_retail_outlets" placeholder="Number of rental outlets" type="number" autoComplete="outlets" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-3">
                                            <CFormInput name="no_of_countries" placeholder="Number of countries" type="number" onChange={this.handleChange} required />
                                            <CFormFeedback invalid>Please enter valid field.</CFormFeedback>
                                        </CInputGroup>
                                        <div className="d-grid">
                                            <CButton type="submit" color="success">Submit</CButton>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    };
}

export default withRouter(Register);
