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

        this.state = {
            tabClass: 1,
        };
    }

    buyProtectionButton = () => {

        const { selectedModel, selectedPlan, promocode, selectedMonth, selectedPaymentMethod, agreeTnC } = this.state;
        if (!selectedPlan || !selectedMonth || !selectedPaymentMethod || !agreeTnC) {
            return alert.error("Please fill mandatory detail");
        }
        else {
            localStorage.setItem('tab1Data', JSON.stringify(this.state));
            this.props.tabHandleChange({ tabclass: 2, selectedModel: selectedModel, selectedPlan: selectedPlan, promocode: promocode, selectedMonth: selectedMonth, selectedPaymentMethod: selectedPaymentMethod, tabData: this.state });
        }
    }
    tabHandleChange = (e) => {

        const { selectedModel, selectedPlan, promocode, selectedMonth } = this.state;

        if (e.tabclass === 2) this.setState({ tab1Data: e.tabData })

        this.setState({
            tabClass: e.tabclass,
            selectedModel: e.selectedModel ? e.selectedModel : selectedModel,
            selectedPlan: e.selectedPlan ? e.selectedPlan : selectedPlan,
            promocode: e.promocode ? e.promocode : promocode,
            selectedMonth: e.selectedMonth ? e.selectedMonth : selectedMonth,
        });

        if (e.tabclass === 3) {
            this.order(e.tabData);
        }
    }
    order = (customerDetail) => {

        MasterService.order({
            "first_name": customerDetail?.f_name,
            "last_name": customerDetail?.l_name,
            "email": customerDetail?.email,
            "mobile_no": customerDetail?.contact,
            "group_name": "agent",
            "plan_price_id": this.state.tab1Data?.selectedPlan,
            "devices_id": this.state.tab1Data?.selectedDevice,
            "brands_id": this.state.tab1Data?.selectedBrand

        }).then((result) => {
            if (!result && !result.records[0]) return
            this.setState({ tabClass: 3, tab3Data: result.record, tab1Data: {} })
            localStorage.removeItem("tab1Data");
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const { tabClass, tab1Data, tab2Data, tab3Data } = this.state;

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
                                                    <div className="card" id="msform">
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
                                                        {tabClass === 2 ? <BuyProtectionTab2 tab2Data={tab2Data} tabClass={tabClass} tabHandleChange={this.tabHandleChange} /> : ''}
                                                        {tabClass === 3 && tab3Data ? <BuyProtectionTab3 tab3Data={tab3Data} tabClass={tabClass} tabHandleChange={this.tabHandleChange} /> : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </CCol>
            </CRow>
        );
    }
}