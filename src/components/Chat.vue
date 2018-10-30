<template>
    <div class="chat" :class="debugMode ? 'debug' : ''">
        <div class="chat-inner">
            <div class="chat-scroll-container">
                <chat-message-list :messages="messages"></chat-message-list>
            </div>
            <chat-message-input @changeInput="changeInput" @submitMessage="addRequest"></chat-message-input>
        </div>
        <div class="chat-analysis" v-if="debugMode">
            <ul>
                <li v-for="(intent, index) in intents" v-bind:key="index" >
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

    let settings = {
        pauseDelay                  : 0,
        firstInteractionMessageDelay: 30000,
    };

    export default {
        name      : "Chat",
        components: {
            chatMessageList,
            chatMessageInput
        },
        props     : {
            debugMode: {
                type   : Boolean,
                default: false
            }
        },
        data() {
            return {
                messages        : [],
                intents         : [],
                debug           : this.debugMode,
                firstInteraction: false
            };

        },
        created() {

        },
        mounted() {
            let vm = this;
            this.sendRequest('', {'bot_lang': 'layla'});
            setTimeout(function () {
                if (!vm.firstInteraction) {
                    vm.sendRequest('How can I use this system');
                }
            }, settings.firstInteractionMessageDelay);
        },
        methods   : {
            sendRequest   : function (message, context) {
                const vm = this;
                Api.sendRequest(message, context || {}).then(function () {
                    let intents   = Api.getResponseIntents(),
                        responses = Api.getResponsePayload();
                    if (message !== Api.UNKNOWN_MESSAGE) {
                        vm.setIntents(message, intents);
                    }
                    if (!intents.length || intents[0].confidence > .4) {
                        vm.setResponse(responses);
                    }
                    else {
                        vm.sendRequest(Api.UNKNOWN_MESSAGE, context);
                    }
                });
            },
            setIntents    : function (message, intents, index) {
                this.intents.push({
                    message: message,
                    intents: intents
                })
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
                this.sendRequest(message);
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