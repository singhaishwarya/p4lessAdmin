/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Link } from 'react-router-dom';
import MasterService from '../../../services/MasterService';
import cardList from '../../../../src/assets/images/cardList.png';
// import ToastService from '../../services/ToastService';

export default class BuyProtectionTab1 extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        let storedData = localStorage.getItem('tab1Data') ? JSON.parse(localStorage.getItem('tab1Data')) : this.props.tab1Data;

        this.state = storedData ? storedData : {
            devices: [], selectedDevice: 0, brands: [], selectedBrand: 0, deviceValues: [], selectedDeviceValue: 0,
            deviceAge: [], discountedPrice: 0, selectedDeviceAge: 0, plans: [], selectedPlan: 0, promocode: '', promoApplied: false, promoMessage: '', selectedPaymentMethod: '', agreeTnC: false
        };
    }
    componentDidMount() {
        this.getDevices();
    }

    componentWillUnmount() {
        window.history?.replaceState({ key: this.props?.history?.location.key, state: this.state }, window.location.href)
    }
    getPlans = (deviceId, slabId) => {
        MasterService.getPlans({
            "country_code": "UAE",//localStorage.getItem('location'),
            "device_id": deviceId,
            "slab_id": slabId,
        }).then((result) => {
            if (!result && !result.records[0]) return
            this.setState({ plans: result.records });
            let selectedPlanName = result.records.find(o => o.no_of_month === 12);
            this.setState({ selectedPlan: selectedPlanName.id });
        }).catch((err) => {
            console.log(err);
        });
    }
    getDevices = () => {
        MasterService.getDevices().then((result) => {

            if (!result) return
            this.setState({ devices: result.records })

        }).catch((err) => {
            console.log(err);
        });
    }
    getDeviceAge = (deviceCategoryId) => {
        MasterService.getDeviceAge({ "category_id": deviceCategoryId }).then((result) => {

            if (!result) return
            this.setState({ deviceAge: result.records })

        }).catch((err) => {
            console.log(err);
        });
    }
    getBrands = (deviceId) => {
        MasterService.getBrands({ device_id: deviceId }).then((result) => {

            if (!result) return
            this.setState({ brands: result.records })

        }).catch((err) => {
            console.log(err);
        });
    }
    getDeviceValues = () => {
        MasterService.getDeviceValues({
            "country_code": "UAE",//localStorage.getItem('location'),
        }).then((result) => {

            if (!result) return
            this.setState({ deviceValues: result.records })

        }).catch((err) => {
            console.log(err);
        });
    }
    handleChange(field, e) {
        console.log("===", field)
        if (field === 'agreeTnC') {
            this.setState({ [field]: e.target.checked });

        } else {

            this.setState({ [field]: e.target.value });
            if (field === 'selectedBrand') {
                this.setState({ selectedDeviceValue: '' });
                this.getDeviceValues()
            }
            if (field === 'selectedDevice') {
                this.setState({ selectedBrand: '', selectedDeviceValue: '' });
                this.getBrands(e.target.value)
                let deviceCategory = this.state.devices?.find(o => o.id === e.target.value * 1);
                this.getDeviceAge(deviceCategory.category_id)
            }
            if (field === 'selectedDeviceAge') {
                this.getPlans(this.state.selectedDevice, e.target.value)

            }
            if (field === 'selectedDeviceValue') {

            }
        }

    }

    buyProtectionButton = () => {
        // check the required fields and values
        // if user logined than tabClass is 3 otherwise 2
        const { selectedDeviceValue, selectedPlan, promocode, selectedDeviceAge, selectedPaymentMethod, agreeTnC } = this.state;
        if (!selectedPlan || !selectedDeviceAge || !selectedPaymentMethod || !agreeTnC) {
            // return ToastService.error("Please fill mandatory detail");
        }
        else {
            localStorage.setItem('tab1Data', JSON.stringify(this.state));
            this.props.tabHandleChange({ tabclass: 2, selectedDeviceValue: selectedDeviceValue, selectedPlan: selectedPlan, promocode: promocode, selectedDeviceAge: selectedDeviceAge, selectedPaymentMethod: selectedPaymentMethod, tabData: this.state });
        }
    }
    getDiscountPer = (item, plans) => {

        let pricePerYear = item.no_of_month === 1 ? item.price * 12 : (item.no_of_month === 3 ? item.price * 4 : item.no_of_month === 6 ? item.price * 2 : item.price);
        const yearlyPlan = plans.find(element => element.no_of_month === 12);
        let priceDiff = 100 * (pricePerYear - yearlyPlan.price) / pricePerYear;
        return priceDiff;

    }
    render() {
        const { devices, selectedDevice, brands, selectedBrand, selectedDeviceValue, deviceValues, deviceAge, selectedDeviceAge, plans, promocode, promoApplied, promoMessage, discountedPrice, selectedPlan, agreeTnC, selectedPaymentMethod } = this.state;


        let selectedDeviceName = devices?.find(o => o.id === selectedDevice * 1),
            selectedBrandName = brands?.find(o => o.id === selectedBrand * 1),
            selectedDeviceValueName = deviceValues?.find(o => o.id === selectedDeviceValue * 1),
            selectedDeviceIdName = deviceAge?.find(o => o.id === selectedDeviceAge * 1),
            selectedPlanName = plans?.find(o => o.id === selectedPlan * 1);

        return (
            <fieldset className="fieldCover">
                <div className="form-card">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>
                                Select your device
                            </h2>
                            <div className="deviceSection">
                                <h5>
                                    <span className="text-red">
                                        A.
                                    </span> Device Details
                                </h5>
                                <div className="deviceDropDown">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="dropdown-wrap">
                                                <select className="selectDropDown"
                                                    name="selectedDevice"
                                                    data-toggle="dropdown" value={selectedDevice}
                                                    onChange={this.handleChange.bind(this, "selectedDevice")}
                                                >
                                                    <option
                                                        className="btn dropdown-toggle selectDropDown"
                                                        name="recordinput"
                                                        data-toggle="dropdown" defaultValue='selected'>Device</option>
                                                    {devices?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dropdown-wrap">

                                                <select className="selectDropDown"
                                                    name="selectedBrand"
                                                    data-toggle="dropdown" value={selectedBrand}
                                                    onChange={this.handleChange.bind(this, "selectedBrand")}
                                                >
                                                    <option
                                                        className="btn dropdown-toggle selectDropDown"
                                                        name="recordinput"
                                                        data-toggle="dropdown" defaultValue='selected'>Brand</option>
                                                    {brands?.map((item, index) => <option key={index} value={item.id}
                                                    // onClick={() => this.getDeviceValues(selectedBrand, selectedDevice)}
                                                    >{item.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="dropdown-wrap">

                                                <select className="selectDropDown"
                                                    name="selectedDeviceValue"
                                                    data-toggle="dropdown" value={selectedDeviceValue}
                                                    onChange={this.handleChange.bind(this, "selectedDeviceValue")}>
                                                    <option
                                                        className="btn dropdown-toggle selectDropDown"
                                                        name="recordinput"
                                                        data-toggle="dropdown" defaultValue='selected'>Device Value</option>
                                                    {deviceValues?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dropdown-wrap">
                                                <select className="selectDropDown"
                                                    name="selectedDeviceAge"
                                                    data-toggle="dropdown" value={selectedDeviceAge}
                                                    onChange={this.handleChange.bind(this, "selectedDeviceAge")}>
                                                    <option
                                                        className="btn dropdown-toggle selectDropDown"
                                                        name="recordinput"
                                                        data-toggle="dropdown" defaultValue='selected'>Purchase Month</option>
                                                    {deviceAge?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="deviceSection">
                                <h5>
                                    <span className="text-red"> B. </span> Select Plan
                                </h5>
                                <div className="planWrap">
                                    {
                                        plans?.map((item, index) =>
                                            <div key={index} className={selectedPlan && selectedPlan == item.id ? "planList active" : (!selectedPlan && item.no_of_month === 12) ? "planList active" : "planList"}>
                                                <input type="radio"
                                                    name="planSelect"
                                                    id={index}
                                                    value={item.id}
                                                    defaultChecked={selectedPlan && selectedPlan == item.id ? true : (!selectedPlan && item.no_of_month === 12) ? true : false}
                                                    onChange={this.handleChange.bind(this, 'selectedPlan')}
                                                />
                                                <label htmlFor="planSelect"></label>
                                                {this.getDiscountPer(item, plans) ? <div className="percentOff">
                                                    {Math.ceil(this.getDiscountPer(item, plans))}% OFF
                                                </div> : ''}
                                                <div className="monthlyRate">
                                                    <div className="monthTitle">
                                                        {item.label}(in USD)
                                                    </div>
                                                    {item.price && <div className="monthPrice">
                                                        USD {item.price}
                                                    </div>}
                                                </div>
                                            </div>)}
                                </div>
                            </div>
                            <div className="deviceSection">
                                <h5>
                                    <span className="text-red">
                                        C.
                                    </span> Select Payment Option
                                </h5>
                                <div className="planList">


                                    <input type="radio"
                                        name="paymentMethod"
                                        value="pointspay"
                                        defaultChecked={selectedPaymentMethod === "pointspay"}

                                        onChange={this.handleChange.bind(this, 'selectedPaymentMethod')}
                                    />
                                    <label htmlFor="paymentMethod"></label>

                                    <div className="monthlyRate">
                                        <div className="monthTitle">
                                            <img src="https://protect4less.ae/static/images/pointspay.png" className="formCard" alt="" />
                                        </div>
                                    </div>
                                </div><div className="planList">

                                    <input type="radio"
                                        name="paymentMethod"
                                        value="paytabs"
                                        defaultChecked={selectedPaymentMethod === "paytabs"}

                                        onChange={this.handleChange.bind(this, 'selectedPaymentMethod')}
                                    />
                                    <label htmlFor="paymentMethod"></label>

                                    <div className="monthlyRate">
                                        <div className="monthTitle">
                                            <img src={cardList} className="formCard" alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/* <img src={cardList} className="formCard" alt="" /> */}
                            </div>
                            <br />

                        </div>
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
                                            {selectedDeviceName?.name}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="deviceTitle">
                                            Brand :
                                        </div>
                                        <div className="deviceDesc">
                                            {selectedBrandName?.name}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="deviceTitle">
                                            Device Value :
                                        </div>
                                        <div className="deviceDesc">
                                            {selectedDeviceValueName?.name}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="deviceTitle">
                                            Purchase month :
                                        </div>
                                        <div className="deviceDesc">
                                            {selectedDeviceIdName?.name}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="deviceTitle">
                                            Plan selected :
                                        </div>
                                        <div className="deviceDesc">
                                            {selectedPlanName?.price}
                                        </div>
                                    </li>
                                </ul>
                                {selectedPlanName?.price && <><div className="totalPay">
                                    Total Payable
                                </div>
                                    <h4 className="pricePlan">
                                        USD {promoApplied ? discountedPrice : selectedPlanName?.price}
                                    </h4></>}
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <br /><br />
                            <div className="termConWrap">
                                <div htmlFor="termsBox">
                                    <input type="checkbox" id="termsAgree" value={agreeTnC} defaultChecked={agreeTnC}
                                        name="plan-select" onClick={this.handleChange.bind(this, 'agreeTnC')}
                                    />
                                    <label htmlFor="termsAgree">
                                        <span className="terms-data">
                                            You are Agreeing to the Protection Plan <Link to="/">Terms & Conditions </Link> and the <Link to="/">Privacy Policy</Link> . Your protection plan comes with flexible payments monthly or yearly which are recurring until you choose to cancel your plan. A deductible applies with all accidental damage or theft claims. Please read our <Link to="/">FAQ</Link> for more details.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button className="buttonDefault next onlyDesktop" name="next" onClick={() => this.buyProtectionButton()}>BUY PROTECTION</button>


                    </div>
                </div>
            </fieldset>
        );
    }
}