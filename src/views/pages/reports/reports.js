/* eslint-disable prettier/prettier */
import React, { Component } from "react";
import {
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
    CTableRow, CInputGroup, CFormSelect, CInputGroupText, CButton, CPagination, CPaginationItem
} from '@coreui/react'
import MasterService from '../../../services/MasterService';
import DatePicker from 'react-date-picker'
export default class Reports extends Component {
    constructor(props) {
        super(props);

        this.state = { orderResult: [], devices: [], selectedCategory: '', showDate: false, selectedDate: '' };
    }

    componentDidMount() {
        this.getDevices();
        this.getOrderList()
    }
    getDevices = () => {
        MasterService.getDevices().then((result) => {

            if (!result) return
            this.setState({ devices: result?.records?.map(({ id: value, name: label }) => ({ label, value })) })
            this.state.devices.splice(0, 0, 'Select Category')
        }).catch((err) => {
            console.log(err);
        });
    }
    getOrderList = () => {
        MasterService.orderList({
            "group_name": "agent",
            // "agentcode": JSON.parse(localStorage.getItem('userData'))?.agent_code
        }).then((result) => {
            if (!result && !result.records[0]) alert("No plans exist")
            this.setState({ orderResult: result.records });
            // let selectedPlanName = result.records.find(o => o.no_of_month === 12);
            // this.setState({ selectedPlan: selectedPlanName.id });
        }).catch((err) => {
            console.log(err);
        });
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }
    onChange = (e) => {
        console.log("===", e)
    }
    render() {
        const { showDate, selectedDate } = this.state;
        return (
            <CRow>
                <CInputGroup className="mb-3">
                    <CInputGroupText>Category</CInputGroupText><CFormSelect
                        aria-label="Default select example"
                        options={this.state.devices}
                        onChange={this.handleChange} name="selectedCategory"
                    />
                    {/* <CInputGroupText>Date</CInputGroupText><CFormInput
                        aria-label="Default select example"
                        onClick={() => this.setState({ showDate: !showDate })} name="company_country" required
                    /> */}
                    <DatePicker calendarAriaLabel="Toggle calendar"
                        clearAriaLabel="Clear value"
                        dayAriaLabel="Day"
                        monthAriaLabel="Month"
                        nativeInputAriaLabel="Date"
                        onChange={this.onChange}
                        value={selectedDate}
                        yearAriaLabel="Year" />

                </CInputGroup>
                <CInputGroup className="mb-3">
                    <CInputGroupText>Plan</CInputGroupText><CFormSelect
                        aria-label="Default select example"
                        options={[]}
                    // onChange={this.handleChange} name="company_country" required
                    />
                    <div className="d-grid">
                        <CButton type="submit" color="success">Reset</CButton>
                    </div>
                    <div className="d-grid">
                        <CButton type="submit" color="success">Submit</CButton>
                    </div>
                    <div className="d-grid">
                        <CButton type="submit" color="success">Download</CButton>
                    </div>

                </CInputGroup>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            {/* <strong>React Table</strong> <small>Striped rows</small> */}
                        </CCardHeader>
                        <CCardBody>
                            <CTable striped>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Device</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Brand</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Model</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Plan</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Promo Code</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Commission</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Plans Sold</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Renewals</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Total Revenue</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {this.state.orderResult?.map((item, index) =>
                                        <CTableRow key={index}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{item.country_code}</CTableDataCell>
                                            <CTableDataCell>{item.date_added}</CTableDataCell>
                                            <CTableDataCell>{item.device_name}</CTableDataCell>
                                            <CTableDataCell>{item.brand_name}</CTableDataCell>
                                            <CTableDataCell>{item.model_name}</CTableDataCell>
                                            <CTableDataCell>{item.plan_name}</CTableDataCell>
                                            <CTableDataCell>{item.total_amount}</CTableDataCell>
                                            <CTableDataCell>{item.promocode}</CTableDataCell>
                                            <CTableDataCell>-</CTableDataCell>
                                            <CTableDataCell>-</CTableDataCell>
                                            <CTableDataCell>-</CTableDataCell>
                                            <CTableDataCell>-</CTableDataCell>
                                        </CTableRow>)}

                                </CTableBody>
                                {/* <CTableCaption>Pagination</CTableCaption> */}
                            </CTable>
                            <CPagination align="center" aria-label="Page navigation example">
                                <CPaginationItem disabled>Previous</CPaginationItem>
                                <CPaginationItem>1</CPaginationItem>
                                <CPaginationItem>2</CPaginationItem>
                                <CPaginationItem>3</CPaginationItem>
                                <CPaginationItem>Next</CPaginationItem>
                            </CPagination>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
