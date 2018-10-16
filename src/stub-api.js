import Api from './api.js';
import sampleRequest from './sample-request.json';

// var messageEndpoint = '/api/message';

function translateResponse(payload) {
    let responses = [];
    if (payload && payload.output && payload.output.generic) {
        responses = payload.output.generic;
    }
    return responses;
}

Api.sendRequest = sendRequest;

function sendRequest(text) {
    // Build request payload
    var payloadToWatson = {};
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

    return new Promise(function (resolve, reject) {
        resolve(sampleRequest);
    }).then(function (response) {
        Api.setResponsePayload(translateResponse(response));
    });

}

export default Api;
