/* eslint-disable prettier/prettier */
import axios from "axios";
import { Component } from "react";
import { baseUrl, fileConfig } from './index.js';

export default class BulkUploadService extends Component {

    static bulkUploadService = async (data) => {

        try {
            const response = await axios.post(baseUrl + `orders/xlupload`, data, fileConfig);
            return response.data ? response.data : [];
        } catch (error) {
            const { response } = error;
            if (!response) { console.log(`FETCH GET ERROR`, response); return; }
            return response.data ? response.data : response;
        }
    }

}


