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
    CTableRow, CInputGroup, CPagination, CPaginationItem, CButton, CFormInput
} from '@coreui/react'
import BulkUploadService from '../../../services/BulkUploadService';

class BulkUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bulkData: [],
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    submitHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const data = new FormData();
        data.append('data_file', this.state.data_file);
        BulkUploadService.bulkUploadService(data)
            .then((result) => {

                if (!result) return

                if (result.status === 'success') {
                    this.setState({ bulkData: result.all_order_data })
                }
            })
            .catch((err) => {
                console.log(err);
            });
        // this.validated(true)

    }
    render() {
        console.log("===", this.state)

        return (
            <CRow>
                <CInputGroup className="mb-3">


                </CInputGroup>
                <CInputGroup className="mb-3">
                    {/* <!-- <CInputGroupText>Company license</CInputGroupText> --> */}
                    <CFormInput name="data_file" placeholder="Upload documents" autoComplete="units" type="file" onChange={this.handleChange} accept=".xlsx,.xls" required />

                    <div className="d-grid">
                        <CButton type="submit" onClick={this.submitHandler} color="success">Submit</CButton>
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
                                    {this.state.bulkData?.map((item, index) =>
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
export default BulkUpload
