import Axios from 'axios';
import Api from './api.js';

// let url = '/api/message';
// let url = 'http://localhost:3000/api/message';
let url = 'https://pgp-layla-test.mybluemix.net/api/message';
let axiosInstance = Axios.create({
        baseURL: url,
        headers: {'Content-type': 'application/json'}
    });
    // confidenceThreshold = .1;

function translateResponse(payload) {
    let responses = [];
    if (payload && payload.output && payload.output.generic) {
        responses = payload.output.generic;
    }
    return responses;
}

Api.sendRequest = sendRequest;

// function checkConfidence(response) {
//     let confidence = response.data.intents && response.data.intents.length && response.data.intents[0].confidence || false;
//     if (confidence && confidence < confidenceThreshold) {
//         response.data.output.generic = [];
//         response.data.output.generic.push({
//             response_type: 'text',
//             text: "Sorry... I don't have an answer for that. Want to ask that another way?"
//         })
//     }
// }

function sendRequest(text) {
    // Build request payload
    let payloadToWatson = {};
    if (text) {
        payloadToWatson.input = {
            text: text
        };
    }
    if (Api.getContext()) {
        payloadToWatson.context = Api.getContext();
    }

    if (Object.getOwnPropertyNames(payloadToWatson)) {
        Api.setRequestPayload(payloadToWatson);
    }

    return axiosInstance.post(url, payloadToWatson, {
        headers: {'Content-type': 'application/json'},
    }).then(function (response) {
        if (response && response.data) {
            // checkConfidence(response);
            Api.setResponsePayload(translateResponse(response.data), response.data.context);
        }
    });
}

export default Api;
