<template>
    <div class="chat-message-item" :class="bubbleClass">
        <div class="item-avatar" v-if="!pauseType && !isUser">
            <div class="avatar-image"></div>
        </div>
        <div class="item-bubble" v-if="imageType">
            <div class="item-message">
                <img v-bind:src="item.source" alt="" @load="loaded">
                <p class="title" v-if="item.title" v-html="item.title"></p>
                <p class="description" v-if="item.description" v-html="item.description"></p>
            </div>
        </div>
        <div class="item-bubble type-text" v-if="textType">
            <div class="item-message">
                <p v-html="item.text" @load="loaded"></p>
            </div>
        </div>
        <div class="item-bubble" v-if="optionType">
            <div class="item-message">
                <p class="title" v-html="item.title" v-if="item.title"></p>
                <div class="button-group" v-if="item.preference=='button'">
                    <button v-for="option in item.options" :key="option.label" class="button options-button" @click="sendMessage(option.value.input.text)">{{ option.label }}
                    </button>
                </div>
                <div v-else>
                    <div v-for="option in item.options" :key="option.label">
                        <a class="options-list" href="#" @click.prevent="sendMessage(option.value.input.text)">{{ option.label }}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-avatar" v-if="pauseType && paused">
            <div class="avatar-image"></div>
        </div>
        <div class="item-bubble" v-if="pauseType && paused">
            <div class="item-message">
                <div>...</div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name    : "ChatMessageItem",
        props   : {
            item: {
                type   : Object,
                default: function () {
                    return {};
                }
            }
        },
        data    : function () {
            console.log(this.item);
            return {
                paused: false
            };

        },
        mounted : function () {
            let vm    = this;
            vm.paused = true;
            this.scroll();
            setTimeout(function () {
                vm.paused = false;
            }, this.item.time || 0);
            this.$nextTick(function () {
                vm.scroll();

                // @todo - handle image load
                setTimeout(function () {
                    vm.scroll();
                }, 1000);
            });
        },
        computed: {
            bubbleClass: function () {
                let className = this.isUser ? 'user-response' : 'server-response';
                if (this.imageType) {
                    className += ' image';
                }
                if (this.textType) {
                    className += ' text';
                }
                if (this.optionType) {
                    className += ' option';
                }
                if (this.pauseType) {
                    className += ' pause';
                }
                className += '-type';
                return className;

            },
            isUser     : function () {
                return !!this.item.user_response;
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
            scroll     : function () {
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