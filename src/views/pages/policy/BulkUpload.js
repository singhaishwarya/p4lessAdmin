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
    CTableRow, CInputGroup, CFormSelect, CInputGroupText, CButton, CFormInput
} from '@coreui/react'
import BulkUploadService from '../../../services/BulkUploadService';

class BulkUpload extends Component {


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

                    // localStorage.setItem('userData', JSON.stringify(result.user));
                    // localStorage.setItem('userAuth', JSON.stringify(result.token));
                    // this.props.history.push({ pathname: '/login' });
                }
                else {
                    // return alert(result.message);
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
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                    </CTableRow><CTableRow>
                                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                    </CTableRow><CTableRow>
                                        <CTableHeaderCell scope="row">1</CTableHeaderCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                        <CTableDataCell>Mark</CTableDataCell>
                                        <CTableDataCell>Otto</CTableDataCell>
                                        <CTableDataCell>@mdo</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                                <CTableCaption>Pagination</CTableCaption>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}
export default BulkUpload
