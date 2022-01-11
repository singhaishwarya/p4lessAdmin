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
// import cardList from '../../../src/assets/images/cardList.png';
// import ToastService from '../../services/ToastService';

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
            // this.props.tabHandleChange({ tabclass: 2, selectedModel: selectedModel, selectedPlan: selectedPlan, promocode: promocode, selectedMonth: selectedMonth, selectedPaymentMethod: selectedPaymentMethod, tabData: this.state });
        }
    }
    getDiscountPer = (item, plans) => {

        let pricePerYear = item.no_of_month === 1 ? item.price * 12 : (item.no_of_month === 3 ? item.price * 4 : item.no_of_month === 6 ? item.price * 2 : item.price);
        const yearlyPlan = plans.find(element => element.no_of_month === 12);
        let priceDiff = 100 * (pricePerYear - yearlyPlan.price) / pricePerYear;
        return priceDiff;

    }
    render() {
        const { devices, selectedDevice, brands, selectedBrand, selectedModel, models, months, selectedMonth, plans, promocode, promoApplied, promoMessage, discountedPrice, selectedPlan, agreeTnC, selectedPaymentMethod } = this.state;


        let selectedDeviceName = devices?.find(o => o.id === selectedDevice * 1),
            selectedBrandName = brands?.find(o => o.id === selectedBrand * 1),
            selectedModelName = models?.find(o => o.id === selectedModel * 1),
            selectedMonthName = months?.find(o => o.id === selectedMonth * 1),
            selectedPlanName = plans?.find(o => o.id === selectedPlan * 1);

        return (
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
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
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}