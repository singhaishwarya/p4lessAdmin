/* eslint-disable prettier/prettier */
import axios from 'axios'
import { Component } from 'react'
import { baseUrl, config } from './index.js'

export default class MasterService extends Component {
    static getStates = async (data) => {
        try {
            config.url = baseUrl + 'state/list'
            config.method = 'get'
            config.params = data
            const response = await axios(config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }

    static getDevices = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'device/list', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }

    static getBrands = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'brand/list', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }

    static getModels = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'model/list', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }

    static getCountry = async (data) => {
        try {
            config.url = baseUrl + 'country/list'
            config.method = 'get'
            config.params = data
            const response = await axios(config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }
    static getCity = async (data) => {
        try {
            config.url = baseUrl + 'city/list'
            config.method = 'get'
            config.params = data
            const response = await axios(config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }
    static getDepreciation = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'depriciation/list', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }
    static getPlans = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'plan/list', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            console.log(`FETCH GET ERROR`, response)
        }
    }
    static applyPromo = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'promocode/apply', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error

            if (!response) return
            return response.data ? response.data : []
            // console.log(`FETCH GET ERROR`, response);
        }
    }
    static order = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'orders/create-bypartner', data, config)
            return response.data ? response.data : []
        } catch (error) {
            const { response } = error
            if (!response) return
            return response.data ? response.data : []
            // console.log(`FETCH GET ERROR`, response);
        }
    }

    static getStates = async (data) => {
        try {

            config.url = baseUrl + 'state/list';
            config.method = 'get';
            config.params = data;
            const response = await axios(config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }



    static getDevices = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'device/list', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }

    static getBrands = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'brand/list', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }


    static getDeviceValues = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'slabs/list', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }

    static getCountry = async (data) => {
        try {
            config.url = baseUrl + 'country/list';
            config.method = 'get';
            config.params = data;
            const response = await axios(config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }
    static getCity = async (data) => {
        try {
            config.url = baseUrl + 'city/list';
            config.method = 'get';
            config.params = data;
            const response = await axios(config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }
    static getDeviceAge = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'device/age_list', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }
    static getPlans = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'plan/list', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }
    static applyPromo = async (data) => {
        try {
            const response = await axios.post(baseUrl + 'promocode/apply', data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;

            if (!response) return;
            return response.data ? response.data : [];
            // console.log(`FETCH GET ERROR`, response);
        }
    }

}
