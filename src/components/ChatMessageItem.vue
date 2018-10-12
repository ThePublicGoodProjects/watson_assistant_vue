<template>
    <li class="chat-message-item" v-bind:class="bubbleClass">
        <div class="item-avatar">
            <!--<img alt="Vue logo" src="/assets/images/logo.png">-->
        </div>
        <div class="item-bubble" v-if="imageType">
            <div class="item-message">
                <img v-bind:src="item.source" alt="" @load="loaded">
                <div v-if="item.title" v-html="item.title"></div>
                <div v-if="item.description" v-html="item.description"></div>
            </div>
            <div class="item-time">
            </div>
        </div>
        <div class="item-bubble" v-if="textType">
            <div class="item-message">
                <div v-html="item.text"></div>
            </div>
            <div class="item-time">
            </div>
        </div>
        <div class="item-bubble" v-if="optionType">
            <div class="item-message">
                <div v-html="item.title"></div>
                <div v-if="item.preference=='button'">
                    <button v-for="option in item.options" :key="option.label" class="button" @click="sendMessage(option.value.input.text)">{{ option.label }}</button>
                </div>
                <ul v-if="item.preference=='text'">
                    <li v-for="option in item.options" :key="option.label">
                        <div class="option-list" @click="sendMessage(option.value.input.text)">{{ option.label }}</div>
                    </li>
                </ul>
            </div>
            <div class="item-time">
            </div>
        </div>
        <div class="item-bubble" v-if="pauseType && paused">
            <div class="item-message">
                <div>Typing....</div>
            </div>
        </div>
    </li>

</template>

<script>
    export default {
        name    : "ChatMessageList",
        props   : {
            item: {
                type   : Object,
                default: function () {
                    return {};
                }
            }
        },
        data    : function () {
            return {
                paused: false
            };

        },
        mounted : function () {
            let vm = this;
            this.scroll();
            vm.paused = true;
            setTimeout(function () {
                vm.paused = false;
            }, this.item.time);
        },
        computed: {
            bubbleClass: function () {
                return this.item.user_response ? 'user-response' : 'server-response';
            },
            imageType  : function () {
                return this.item.response_type === 'image';
            },
            textType   : function () {
                return this.item.response_type === 'text';
            },
            optionType : function () {
                return this.item.response_type === 'option';
            },
            pauseType  : function () {
                return this.item.response_type === 'pause';
            }
        },
        methods : {
            sendMessage: function (message) {
                this.$parent.$parent.addRequest(message);
            },
            scroll: function () {
                this.$parent.$parent.scrollToBottom();
            },
            loaded     : function () {
                this.$parent.$parent.scrollToBottom();
            }
        }
    };
</script>

<style scoped>

</style>