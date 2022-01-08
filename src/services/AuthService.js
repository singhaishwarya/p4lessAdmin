/* eslint-disable prettier/prettier */
import axios from "axios";
import { Component } from "react";
import { baseUrl, config } from './index.js';

export default class AuthService extends Component {

    static login = async (data) => {
        try {
            const response = await axios.post(baseUrl + `user/login`, data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }

    static register = async (data) => {

        try {
            const response = await axios.post(baseUrl + `user/agent_register`, data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) { console.log(`FETCH GET ERROR`, response); return; }
            return response.data ? response.data : response;
        }
    }

    static logout = async () => {
        try {
            config.url = baseUrl + 'user/logout';
            config.method = 'post';

            const response = await axios(config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) return;
            console.log(`FETCH GET ERROR`, response);
        }
    }

    static forgotPassword = async (data) => {
        try {
            const response = await axios.post(baseUrl + `user/forgot/password`, data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) { console.log(`FETCH GET ERROR`, response); return; }
            return response.data ? response.data : [];
        }
    }
    static verifyOtp = async (data) => {
        try {
            const response = await axios.post(baseUrl + `user/verify_otp`, data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) { console.log(`FETCH GET ERROR`, response); return; }
            return response.data ? response.data : [];
        }
    }
    static resetPassword = async (data) => {
        try {
            const response = await axios.post(baseUrl + `user/reset_pwd`, data, config);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) { console.log(`FETCH GET ERROR`, response); return; }
            return response.data ? response.data : [];
        }
    }
}


