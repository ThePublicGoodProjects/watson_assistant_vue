import Axios from 'axios';
import Api from './api.js';

// let url = '/api/message';
// let url = 'http://localhost:3000/api/message';
let url                 = 'https://pgp-layla-test.mybluemix.net/api/message';
let axiosInstance       = Axios.create({
        baseURL: url,
        headers: {'Content-type': 'application/json'}
    });

function translateResponse(payload) {
    let responses = [];
    if (payload && payload.output && payload.output.generic) {
        responses = payload.output.generic;
    }
    return responses;
}

Api.sendRequest = sendRequest;
Api.UNKNOWN_MESSAGE = 'e1eb36b0-040d-4fdd-843d-ccde7dc6a3c8';

function getIntents(response) {
    return response.data.intents;
}

function sendRequest(text, context) {
    // Build request payload
    let payloadToWatson = {};

    context = context || {};
    if (text) {
        payloadToWatson.input = {
            text: text
        };
    }

    if (Api.getContext()) {
        payloadToWatson.context = Api.getContext();
    }

    if (Object.prototype.toString.call(context) === '[object Object]' && Object.keys(context).length > 0) {
        payloadToWatson.context = Object.assign({}, payloadToWatson.context, context);
    }

    if (Object.getOwnPropertyNames(payloadToWatson)) {
        Api.setRequestPayload(payloadToWatson);
    }

    return axiosInstance.post(url, payloadToWatson, {
        headers: {'Content-type': 'application/json'},
    }).then(function (response) {
        if (response && response.data) {
            Api.setResponsePayload(translateResponse(response.data), response.data.context, getIntents(response));
        }
    });
}

export default Api;
