/* eslint-disable no-console */
import Axios from 'axios';
import Api from './api.js';
import StorageOpt from './assets/js/storage.js';
import uuidv4 from 'uuid/v4';

// let url = '/api/message';
// let url = 'http://localhost:3000/api/message';

let
    // url                 = 'https://pgp-layla-test.mybluemix.net/api/message',
    url                 = 'https://watson-layla-env.publicgoodprojects.rocks/api/message',
    storage,
    axiosInstance       = Axios.create({
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
Api.CONFIDENCE_THRESHOLD = .4;

function getIntents(response) {
    return response.data.intents;
}

function sendRequest(text, context) {
    // Build request payload
    let payloadToWatson = {},
        userId = getUser();

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

    // Include a unique user id for the session to enable user metrics
    if (userId) {
        payloadToWatson.context.metadata = payloadToWatson.context.metadata || {};
        payloadToWatson.context.metadata.user_id = userId;
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

function getUser() {
    if (! storage) {
        return false;
    }

    let userId = storage.get('user_id');
    if (! userId) {

        userId = uuidv4();
        storage.set('user_id', userId);
    }

    return userId;
}

function init() {
    try {
        // sessionStorage
        storage = StorageOpt(true);
    }
    catch ($e) {
        // console.log('sessionStorage not enabled');
    }
}

init();

export default Api;
