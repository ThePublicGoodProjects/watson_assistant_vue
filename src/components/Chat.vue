<template>
    <div class="chat">
        <div class="chat-scroll-container">
            <chat-message-list :messages="messages"></chat-message-list>
        </div>
        <chat-message-input @change="addRequest"></chat-message-input>
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
        pauseDelay: 0
    };

    export default {
        name      : "Chat",
        components: {
            chatMessageList,
            chatMessageInput
        },
        data() {
            return {
                messages: []
            };

        },
        created() {

        },
        mounted() {
            this.sendRequest('');
        },
        methods   : {
            sendRequest: function (message) {
                const vm = this;
                Api.sendRequest(message).then(function () {
                    var responses = Api.getResponsePayload();
                    vm.setResponse(responses)
                });
            },
            setResponse: function(responses, index) {
                let response,
                    vm = this;
                index = index || 0;
                if (index < responses.length) {
                    response = responses[index];
                    if (response.response_type === 'pause') {
                        setTimeout(function () {
                            vm.addMessage(response);
                        }, settings.pauseDelay);

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
            addRequest: function (message) {
                this.addMessage({
                    user_response: true,
                    response_type: 'text',
                    text: message
                });
                this.sendRequest(message);
            },
            addMessage: function (message) {
                this.messages.push(message);

            }
        }

    };
</script>

<style lang="scss">

</style>