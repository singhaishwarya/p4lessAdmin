/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import plusIn from '../../../../src/assets/images/plusIn.png';
import cross from '../../../../src/assets/images/cross.png';
import { Link } from 'react-router-dom';


export default class BuyProtectionTab3 extends Component {
    render() {
        return (
            <fieldset className="fieldCover">
                <div className="secondStep">
                    <div className="registerDetailWrap">
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
                                        {this.props.tab3Data?.device_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Brand :
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.brand_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Device Value :
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.slabs_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Purchase month :
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.device_age_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Plan selected :
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.plan_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Customer Name :
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.first_name} {this.props.tab3Data?.last_name}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Customer Email Id:
                                    </div>
                                    <div className="deviceDesc">
                                        {this.props.tab3Data?.email}
                                    </div>
                                </li>
                                <li>
                                    <div className="deviceTitle">
                                        Total Amount:
                                    </div>
                                    <div className="deviceDesc">
                                        AED {this.props.tab3Data?.total_amount}
                                    </div>
                                </li>
                            </ul>
                            {/* {selectedPlanName?.price && <><div className="totalPay">
                                Total Payable
                            </div>
                                <h4 className="pricePlan">
                                    USD {promoApplied ? discountedPrice : selectedPlanName?.price}
                                </h4></>} */}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="findDevice">
                                    Dont find your device? <Link to="/" >Click here</Link>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="formGrpWrap">
                                    <div className="form-group">
                                        <input id="firstName" className="form-control"
                                            placeholder="Name your device eg my iPhone 5"
                                            type="text" name="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="formGrpWrap">
                                    <div className="form-group">
                                        <input id="firstName" className="form-control"
                                            placeholder="Enter min 15 digit IMEI or min 7 digit Serial No."
                                            type="text" name="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <br /><br />
                                <div className="imeiNo">
                                    <span className="emiText">
                                        How to find my IMEI / Serial No. ?
                                        <img src={plusIn} className="plusIn" alt="" />
                                    </span>
                                    <div className="unorderedIMEI">
                                        <img src={cross} className="imeiClose" alt="" />
                                        <ul className="imeiList">
                                            <li>
                                                Dial <span className="text-red">
                                                    *#06#</span> on your phone.
                                                <br /> The IMEI should display on the
                                                screen.
                                            </li>
                                            <li>
                                                Dial <span className="text-red">
                                                    *#06#</span> on your phone.
                                                <br /> The IMEI should display on the
                                                screen.
                                            </li>
                                            <li>
                                                Dial <span className="text-red">
                                                    *#06#</span> on your phone.
                                                <br /> The IMEI should display on the
                                                screen.
                                            </li>
                                            <li>
                                                Dial <span className="text-red">
                                                    *#06#</span> on your phone.
                                                <br /> The IMEI should display on the
                                                screen.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="buttonDefault">
                                    Issue my protection plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}