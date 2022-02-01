/* eslint-disable prettier/prettier */
export const userData = localStorage.getItem('userAuth')
    ? JSON.parse(localStorage.getItem('userAuth'))
    : ''

export const baseUrl = 'http://63.33.220.126:8000/api/v1/'
export const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: userData ? 'Token ' + userData : '',
    },
}
export const fileConfig = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: userData ? 'Token ' + userData : '',
    },
}
