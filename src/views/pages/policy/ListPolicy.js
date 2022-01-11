/* eslint-disable prettier/prettier */
import React from 'react'
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
    CTableRow, CInputGroup, CFormSelect, CInputGroupText, CButton
} from '@coreui/react'

const ListPolicy = () => {
    return (
        <CRow>
            <CInputGroup className="mb-3">
                <CInputGroupText>Category</CInputGroupText><CFormSelect
                    aria-label="Default select example"
                    options={[]}
                // onChange={this.handleChange} name="company_country" required
                />
                <CInputGroupText>Date</CInputGroupText><CFormSelect
                    aria-label="Default select example"
                    options={[]}
                // onChange={this.handleChange} name="company_country" required
                />

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

export default ListPolicy
