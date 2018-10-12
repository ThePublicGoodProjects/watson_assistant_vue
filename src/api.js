// var messageEndpoint = '/api/message';
let requestPayload,
    responsePayload,
    responseContext,
    api           = {
        sendRequest: sendRequest,
        getContext: function () {
            return responseContext;
        },

        getRequestPayload : function () {
            return requestPayload;
        },
        setRequestPayload : function (newPayloadStr) {
            requestPayload = newPayloadStr;
        },
        getResponsePayload: function () {
            return responsePayload;
        },
        setResponsePayload: function (newPayloadStr, context) {
            responseContext = context;
            responsePayload = newPayloadStr;
        }
    };

function sendRequest() {
    throw "sendRequest not implemented";
}

export default api;
