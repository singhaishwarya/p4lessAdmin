/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import MasterService from "src/services/MasterService";


class BuyProtectionTab2 extends Component {
    constructor(props) {
        super(props);
        this.state = //this.props.tab2Data ? this.props.tab2Data :
        {
            contact: '',
            f_name: '',
            l_name: '',
            email: '',
            password: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            re_password: '',
            newPasswordError: ''
        };
    }
    validate() {
        let nameError = "", emailError = "", passwordError = "", newPasswordError = "";
        if (!this.state.f_name) {
            nameError = "Name field is required";
        }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!this.state.email || reg.test(this.state.email) === false) {
            emailError = "Email Field is Invalid ";
        }
        if (!this.state.password || passwordReg.test(this.state.password) === false) {
            passwordError = "Please enter an alphanumic password of min. length 8";
        }
        if (!this.state.re_password || passwordReg.test(this.state.re_password) === false) {
            newPasswordError = "Please enter an alphanumic password of min. length 8";
        }
        if (this.state.password && (this.state.re_password !== this.state.password)) {
            newPasswordError = "New password did not match with old password";
        }
        if (emailError || nameError || passwordError || newPasswordError) {
            this.setState({ nameError, emailError, passwordError, newPasswordError });
            return false;
        }

        return true;
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = () => {
        if (this.validate()) {
            this.setState({ nameError: '', emailError: '', passwordError: '', newPasswordError: '' });
            const { f_name, l_name, email, password } = this.state;
            MasterService.order({ customerDetail: { "first_name": f_name, "last_name": l_name, "password": password, "email": email, "username": email } })
                .then((result) => {
                    if (!result) return

                    if (result.status === 'success') {
                        localStorage.setItem('userData', JSON.stringify(result.user));
                        localStorage.setItem('userAuth', JSON.stringify(result.token));
                        // localStorage.setItem('tabClass', 3);

                        this.props.tabHandleChange({ tabclass: 3 });
                        // this.props.history.push({
                        //     pathname: '/buy-protection', state: {
                        //         tabId: 3
                        //     }
                        // })
                        // this.props.tabHandleChange({ tabclass: 3 });
                        window.location.reload()
                    }
                    else {
                        // return ToastService.error(result.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }
    render() {
        const { f_name, l_name, email, password, nameError, emailError, passwordError, contact, re_password, newPasswordError } = this.state;
        return (
            <fieldset className="fieldCover">
                <div className="row">
                    <div className="col-md-12">
                        <div className="secondStep">
                            <h2>Register your details</h2>
                            <div className="registerDetailWrap">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name *</label>
                                                <input type="text" className="form-control" value={f_name} name="f_name" placeholder="First Name" id="firstName" required onChange={this.handleChange} />
                                            </div>
                                            <div className="errorText">
                                                {nameError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="l_name">Last Name </label>
                                                <input type="text" className="form-control" value={l_name} id="l_name" name="l_name" placeholder="Last Name" required onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="email">Email ID *</label>
                                                <input type="email" className="form-control" value={email} name="email" id="email" placeholder="Email" required onChange={this.handleChange} />
                                            </div>
                                            <div className="errorText">
                                                {emailError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="contact">Contact No </label>
                                                <input id="contact" className="form-control contactNumber" value={contact}
                                                    placeholder="52535362725" type="number" name="contact" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="password">Password *</label>
                                                <input type="password" className="form-control" value={password} name="password" placeholder="Password" id="password" required onChange={this.handleChange} />
                                                <div className="errorText">
                                                    {passwordError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="formGrpWrap">
                                            <div className="form-group">
                                                <label htmlFor="firstName">Re-enter Password
                                                    *</label>
                                                <input id="re_password" placeholder="Re Enter Password" className="form-control" type="Password"
                                                    name="re_password" value={re_password} onChange={this.handleChange} />
                                                <div className="errorText">
                                                    {newPasswordError}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="buttonDefault next secondStepButtonn" onClick={() => this.handleSubmit()}>NEXT</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}

export default withRouter(BuyProtectionTab2);