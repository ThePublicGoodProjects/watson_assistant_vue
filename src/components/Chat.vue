<template>
    <div class="chat" :class="debug ? 'debug' : ''">
        <div class="chat-inner">
            <div class="chat-scroll-container">
                <chat-message-list :messages="messages"></chat-message-list>
            </div>
            <chat-message-input @changeInput="changeInput" @submitMessage="addRequest"></chat-message-input>
        </div>
        <div class="chat-analysis" v-if="debug">
            <div class="info">Min. Threshold: {{ threshold * 100 }}%</div>
            <ul>
                <li v-for="(intent, index) in intents" v-bind:key="index">
                    <div class="message">{{ intent.message }}</div>
                    <div v-for="(intentVal, indexTwo) in intent.intents" v-bind:key="indexTwo">
                        <span>{{ intentVal.intent }}</span>: <span>{{ Math.round(intentVal.confidence * 100) }}%</span></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars, no-console */
    import 'current-script-polyfill';
    import chatMessageList from './ChatMessageList.vue';
    import chatMessageInput from './ChatMessageInput.vue';
    import Api from '../watson-api.js';
    import '../assets/sass/app.scss';
    import GtmEvents from '../assets/js/gtm-events.js';

    let settings = {
        pauseDelay                  : 0,
        firstInteractionMessageDelay: 30000,
    },
        gtmEvent = GtmEvents();

    export default {
        name      : "Chat",
        components: {
            chatMessageList,
            chatMessageInput
        },
        props     : {
            options: {
                type   : Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                messages        : [],
                intents         : [],
                debug           : this.options.debug || false,
                language        : this.options.language || 'default',
                mode            : this.options.mode || 'web',
                threshold       : Api.CONFIDENCE_THRESHOLD,
                firstInteraction: false
            };

        },
        created() {

        },
        mounted() {
            let vm = this,
                readyEvent = new Event('chatbot.ready');

            this.sendRequest('', {
                'bot_lang': this.language,
                'bot_mode': this.mode
            }, this.debug);

            document.dispatchEvent(readyEvent);

            setTimeout(function () {
                if (!vm.firstInteraction) {
                    vm.sendRequest('How can I use this system', false, true);
                }
            }, settings.firstInteractionMessageDelay);
        },
        methods   : {
            sendRequest   : function (message, context, noLog) {
                const vm = this;
                noLog = noLog || false;
                Api.sendRequest(message, context || {}, noLog).then(function () {
                    let intents   = Api.getResponseIntents(),
                        responses = Api.getResponsePayload();
                    if (message !== Api.UNKNOWN_MESSAGE) {
                        vm.setIntents(message, intents);
                    }
                    if (!intents.length || intents[0].confidence > Api.CONFIDENCE_THRESHOLD) {
                        if (intents.length) {
                            gtmEvent('layla-chat', 'user-intent', intents[0].intent);
                        }
                        vm.setResponse(responses);
                    }
                    else {
                        vm.sendRequest(Api.UNKNOWN_MESSAGE, context, noLog);
                    }
                });
            },
            setIntents    : function (message, intents, index) {
                if (intents.length) {
                    this.intents.unshift({
                        message: message,
                        intents: intents
                    });
                }
            },
            setResponse   : function (responses, index) {
                let response,
                    vm = this;
                index  = index || 0;
                if (index < responses.length) {
                    response = responses[index];
                    if (response.response_type === 'pause') {
                        // setTimeout(function () {
                        //     vm.addMessage(response);
                        // }, settings.pauseDelay);
                        vm.addMessage(response);

                        setTimeout(function () {
                            vm.setResponse(responses, index + 1);
                        }, response.time + settings.pauseDelay);
                    }
                    else {
                        vm.addMessage(response);
                        vm.setResponse(responses, index + 1);
                    }

                }
            },
            scrollToBottom: function () {
                var scrollingChat       = this.$el.querySelector('.chat-scroll-container');
                scrollingChat.scrollTop = scrollingChat.scrollHeight;
            },
            addRequest    : function (message) {

                this.addMessage({
                    user_response: true,
                    response_type: 'text',
                    text         : message
                });
                this.sendRequest(message, {}, this.debug);
            },
            addMessage    : function (message) {
                this.messages.push(message);

            },
            changeInput   : function () {
                this.firstInteraction = true;
            }
        }

    };
</script>

<style lang="scss">

</style>
