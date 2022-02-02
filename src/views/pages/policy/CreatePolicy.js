/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import { Link } from 'react-router-dom'; import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow, CInputGroup, CFormSelect, CInputGroupText, CButton
} from '@coreui/react'
import MasterService from '../../../services/MasterService';
import step1 from '../../../../src/assets/images/step1.png';
import step2 from '../../../../src/assets/images/step2.png';
import step4 from '../../../../src/assets/images/step4.png';
import BuyProtectionTab1 from "./BuyProtectionTab1";
import BuyProtectionTab2 from "./BuyProtectionTab2";
import BuyProtectionTab3 from "./BuyProtectionTab3";

export default class CreatePolicy extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        let storedData = '';
        // localStorage.getItem('tab1Data') ? JSON.parse(localStorage.getItem('tab1Data')) : this.props.tab1Data;

        this.state = storedData ? storedData : {
            devices: [], selectedDevice: 0, brands: [], selectedBrand: 0, models: [], selectedModel: 0,
            months: [], discountedPrice: 0, selectedMonth: 0, plans: [], selectedPlan: 0, promocode: '', promoApplied: false, promoMessage: '', selectedPaymentMethod: '', agreeTnC: false
        };
    }
    componentDidMount() {
        this.getDevices();
    }

    componentWillUnmount() {
        // window.history?.replaceState({ key: this.props.history?.location.key, state: this.state }, window.location.href)
    }
    getPlans = (model, month) => {
        MasterService.getPlans({
            "depriciation": month,
            "model": model
        }).then((result) => {
            if (!result && !result.records[0]) return
            this.setState({ plans: result.records[0].price });
            let selectedPlanName = result.records[0].price.find(o => o.no_of_month === 12);
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
    getDepeciation = () => {
        MasterService.getDepreciation().then((result) => {

            if (!result) return
            this.setState({ months: result.records })

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
    getModel = (brand, device) => {
        MasterService.getModels({
            "brand_id": brand,
            "device_id": device,
        }).then((result) => {

            if (!result) return
            this.setState({ models: result.records })

        }).catch((err) => {
            console.log(err);
        });
    }
    handleChange(field, e) {
        if (field === 'agreeTnC') {
            this.setState({ [field]: e.target.checked });

        } else {

            this.setState({ [field]: e.target.value });
            if (field === 'selectedBrand') {
                this.setState({ selectedModel: '' });
                this.getModel(e.target.value, this.state.selectedDevice)
            }
            if (field === 'selectedDevice') {

                this.setState({ selectedBrand: '', selectedModel: '' });
                this.getBrands(e.target.value)
            }
            if (field === 'selectedMonth') {
                this.getPlans(this.state.selectedModel, e.target.value)

            }
            if (field === 'selectedModel') {
                this.getDepeciation()
            }
        }

    }
    applyPromo = () => {

        let { promocode, plans, selectedPlan } = this.state;
        let selectedPlanAmount = plans.find(o => o.id === selectedPlan);
        MasterService.applyPromo({ "amount": selectedPlanAmount?.price, "promocode": promocode })
            .then((result) => {

                if (!result) return
                if (result.status === 'success') {
                    let amount = selectedPlanAmount.price - result.records.discount;


                    this.setState({ discountedPrice: amount, promoApplied: true })
                }
                else {
                    this.setState({ promoApplied: false, promoMessage: result.message })
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    buyProtectionButton = () => {
        // check the required fields and values
        // if user logined than tabClass is 3 otherwise 2
        const { selectedModel, selectedPlan, promocode, selectedMonth, selectedPaymentMethod, agreeTnC } = this.state;
        if (!selectedPlan || !selectedMonth || !selectedPaymentMethod || !agreeTnC) {
            // return ToastService.error("Please fill mandatory detail");
        }
        else {
            localStorage.setItem('tab1Data', JSON.stringify(this.state));
            this.props.tabHandleChange({ tabclass: 2, selectedModel: selectedModel, selectedPlan: selectedPlan, promocode: promocode, selectedMonth: selectedMonth, selectedPaymentMethod: selectedPaymentMethod, tabData: this.state });
        }
    }
    tabHandleChange = (e) => {
        const { selectedModel, selectedPlan, promocode, selectedMonth } = this.state;

        if (e.tabclass === 2) this.setState({ tab1Data: e.tabData })
        if (e.tabclass === 3) this.setState({ tab2Data: e.tabData })
        if (e.tabclass === 4) this.setState({ tab3Data: e.tabData })

        const token = localStorage.getItem('userAuth') ? JSON.parse(localStorage.getItem('userAuth')) : '';
        this.setState({
            tabClass: e.tabclass === 2 ? (token ? 3 : e.tabclass) : e.tabclass,
            selectedModel: e.selectedModel ? e.selectedModel : selectedModel,
            selectedPlan: e.selectedPlan ? e.selectedPlan : selectedPlan,
            promocode: e.promocode ? e.promocode : promocode,
            selectedMonth: e.selectedMonth ? e.selectedMonth : selectedMonth,
        });
        if (e.tabclass === 3 || (token && e.tabclass === 2)) {
            this.order(e.selectedModel, e.selectedPlan, e.promocode, e.selectedMonth);
        }
    }
    order = (selectedModel, selectedPlan, promocode, selectedMonth) => {

        MasterService.order({
            model_id: selectedModel,
            plan_price_id: selectedPlan,
            promocode: promocode,
            depriciation_id: selectedMonth,
            payment_method: "pointspay",
        }).then((result) => {
            if (!result && !result.records[0]) return
            // this.setState({ tabClass: 4})
        }).catch((err) => {
            console.log(err);
        });
    }
    getDiscountPer = (item, plans) => {

        let pricePerYear = item.no_of_month === 1 ? item.price * 12 : (item.no_of_month === 3 ? item.price * 4 : item.no_of_month === 6 ? item.price * 2 : item.price);
        const yearlyPlan = plans.find(element => element.no_of_month === 12);
        let priceDiff = 100 * (pricePerYear - yearlyPlan.price) / pricePerYear;
        return priceDiff;

    }
    render() {
        const { devices, selectedDevice, brands, selectedBrand, selectedModel, models, months, selectedMonth, plans, promocode, promoApplied, promoMessage, discountedPrice, selectedPlan, agreeTnC, selectedPaymentMethod, tabClass, tab1Data, tab2Data, tab3Data } = this.state;


        let selectedDeviceName = devices?.find(o => o.id === selectedDevice * 1),
            selectedBrandName = brands?.find(o => o.id === selectedBrand * 1),
            selectedModelName = models?.find(o => o.id === selectedModel * 1),
            selectedMonthName = months?.find(o => o.id === selectedMonth * 1),
            selectedPlanName = plans?.find(o => o.id === selectedPlan * 1);


        return (
            <CRow>
                <CCol xs={12}>

                    <section className="protectionFormWrap" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300">
                        <div className="container">


                            <div className="row desktop-show">
                                <div className="col-md-12">
                                    <div className="protectformCover">
                                        <div className="container-fluid">
                                            <div className="row justify-content-center">
                                                <div className="col-md-10">
                                                    <div className="card ">
                                                        <ul id="progressbar">
                                                            <li className={(tabClass >= 1) ? "active" : ""} id="account" key={"account"} onClick={() => this.setState({ tabClass: 1 })}>
                                                                <img src={step1} className="stepImage" alt="" />
                                                                <div>1. select plan</div>
                                                            </li>
                                                            <li id="personal" className={(tabClass >= 2) ? "active" : ""} key={"personal"} onClick={() => this.setState({ tabClass: 2 })}>
                                                                <img src={step2} className="stepImage" alt="" />
                                                                <div>2. Register</div>
                                                            </li>
                                                            <li id="confirm" className={(tabClass >= 3) ? "active" : ""} key={"confirm"} onClick={() => this.setState({ tabClass: 3 })}>
                                                                <img src={step4} className="stepImage" alt="" />
                                                                <div>3. Device details</div>
                                                            </li>
                                                        </ul>
                                                        <br />
                                                        {tabClass === 1 ? <BuyProtectionTab1 tab1Data={tab1Data} tabClass={tabClass} tabHandleChange={this.tabHandleChange} /> : ''}
                                                        {tabClass === 2 ? <BuyProtectionTab2 tab1Data={tab2Data} tabClass={tabClass} tabHandleChange={this.tabHandleChange} /> : ''}
                                                        {tabClass === 3 ? <BuyProtectionTab3 tab1Data={tab3Data} tabClass={tabClass} tabHandleChange={this.tabHandleChange} /> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>


                    {/* <CCard className="mb-4">
                        <div className="form-card">
                            <div className="row">
                                <div className="col-md-6">
                                    <h2>
                                        Select your device
                                    </h2>
                                    <div className="deviceSection">
                                        <div className="deviceDropDown">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="dropdown-wrap">
                                                        <CFormSelect className="btn dropdown-toggle selectDropDown"
                                                            name="selectedDevice"
                                                            data-toggle="dropdown" value={selectedDevice}
                                                            onChange={this.handleChange.bind(this, "selectedDevice")}
                                                        >
                                                            <option
                                                                className="btn dropdown-toggle selectDropDown"
                                                                name="recordinput"
                                                                data-toggle="dropdown" defaultValue='selected'>Device</option>
                                                            {devices?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                        </CFormSelect>

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="dropdown-wrap">

                                                        <CFormSelect className="btn dropdown-toggle selectDropDown"
                                                            name="selectedBrand"
                                                            data-toggle="dropdown" value={selectedBrand}
                                                            onChange={this.handleChange.bind(this, "selectedBrand")}
                                                        >
                                                            <option
                                                                className="btn dropdown-toggle selectDropDown"
                                                                name="recordinput"
                                                                data-toggle="dropdown" defaultValue='selected'>Brand</option>
                                                            {brands?.map((item, index) => <option key={index} value={item.id}
                                                                onClick={() => this.getModel(selectedBrand, selectedDevice)}>{item.name}</option>)}
                                                        </CFormSelect>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="dropdown-wrap">

                                                        <CFormSelect className="btn dropdown-toggle selectDropDown"
                                                            name="selectedModel"
                                                            data-toggle="dropdown" value={selectedModel}
                                                            onChange={this.handleChange.bind(this, "selectedModel")}>
                                                            <option
                                                                className="btn dropdown-toggle selectDropDown"
                                                                name="recordinput"
                                                                data-toggle="dropdown" defaultValue='selected'>Model</option>
                                                            {models?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                        </CFormSelect>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="dropdown-wrap">
                                                        <CFormSelect className="btn dropdown-toggle selectDropDown"
                                                            name="selectedMonth"
                                                            data-toggle="dropdown" value={selectedMonth}
                                                            onChange={this.handleChange.bind(this, "selectedMonth")}>
                                                            <option
                                                                className="btn dropdown-toggle selectDropDown"
                                                                name="recordinput"
                                                                data-toggle="dropdown" defaultValue='selected'>Purchase Month</option>
                                                            {months?.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)}
                                                        </CFormSelect>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane active" id="about">


                                    <div className="row pricing justify-content-center" >
                                        <h4><b>Device Base Price is <span id="item_base_price"  >AED 0.00</span></b></h4>
                                    </div>
                                    <div className="row pricing justify-content-center">
                                        <h3><b>Yearly Price is <span id="plan_price"  >AED 0.00</span> (Inclusive of VAT) </b></h3>
                                    </div>
                                    <div className="row pricing justify-content-center">
                                        <h4><b>Deductible Amount - <span id="deductible_price"  >AED 0.00</span></b></h4>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </CCard> */}
                </CCol>
            </CRow>
        );
    }
}