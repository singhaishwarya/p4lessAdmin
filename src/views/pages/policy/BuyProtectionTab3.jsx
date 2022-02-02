/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
// import ToastService from '../../services/ToastService';
// import FacebookLogin from "../registration/facebook_login";
// import GoogleLogin from "../registration/google_login";


class BuyProtectionTab3 extends Component {
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
            AuthService.register({ "first_name": f_name, "last_name": l_name, "password": password, "email": email, "username": email })
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
                                        <div className="summaryWrap">
                                            <h4>
                                                Device summary
                                            </h4>
                                            <ul className="deviceListing">
                                                <li>
                                                    <div className="deviceTitle">
                                                        Device :
                                                    </div>
                                                    <div className="deviceDesc">
                                                        {/* {selectedDeviceName?.name} */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="deviceTitle">
                                                        Brand :
                                                    </div>
                                                    <div className="deviceDesc">
                                                        {/* {selectedBrandName?.name} */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="deviceTitle">
                                                        Device Value :
                                                    </div>
                                                    <div className="deviceDesc">
                                                        {/* {selectedDeviceValueName?.name} */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="deviceTitle">
                                                        Purchase month :
                                                    </div>
                                                    <div className="deviceDesc">
                                                        {/* {selectedDeviceIdName?.name} */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="deviceTitle">
                                                        Plan selected :
                                                    </div>
                                                    <div className="deviceDesc">
                                                        {/* {selectedPlanName?.price} */}
                                                    </div>
                                                </li>
                                            </ul>
                                            {/* {/* {selectedPlanName?.price &&  */}
                                            <><div className="totalPay">
                                                Total Payable
                                            </div>
                                                <h4 className="pricePlan">
                                                    {/* USD {promoApplied ? discountedPrice : selectedPlanName?.price} */}
                                                </h4></>
                                            {/* } */}
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

export default withRouter(BuyProtectionTab3);