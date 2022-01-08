/* eslint-disable prettier/prettier */
export const userData = localStorage.getItem('userAuth')
    ? JSON.parse(localStorage.getItem('userAuth'))
    : ''

export const baseUrl = 'http://34.253.210.129:8000/api/v1/'
export const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: userData ? 'Token ' + userData : '',
    },
}
