// var messageEndpoint = '/api/message';
let requestPayload,
    responsePayload,
    responseContext,
    responseIntents,
    api           = {
        sendRequest: function () {
            throw "sendRequest not implemented";
        },
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
        getResponseIntents: function () {
            return responseIntents;
        },
        setResponsePayload: function (newPayloadStr, context, intents) {
            responseIntents = intents;
            responseContext = context;
            responsePayload = newPayloadStr;
        }
    };

export default api;
