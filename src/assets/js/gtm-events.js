var gtmEvents = function (eventName) {
    eventName = eventName || 'ga-custom-event';

    function logEvent(category, action, label, value, callback) {
        var dataLayer = window.dataLayer || [],
            event     = {
                event        : eventName,
                label        : (label || '').toLowerCase(),
                category     : (category || '').toLowerCase(),
                action       : (action || '').toLowerCase(),
                value        : value || '',
                eventCallback: callback || function () {}
            };
        dataLayer.push(event);
    }
    return logEvent;
}

export default gtmEvents;
