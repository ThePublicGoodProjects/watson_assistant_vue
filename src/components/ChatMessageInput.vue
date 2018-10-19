<template>
    <div class="chat-message-input">
        <label class="inputOutline">
            <input name="text-input" type="text" v-model="message" placeholder="Ask a question..." @keyup.enter="submit" @keyup="change" @focus="focus($event)" @blur="blur($event)"/>
            <a href="#" class="send-button" @click.prevent="submit"><i class="fab fa-telegram"></i></a>
        </label>
        <!--<span class="dummy-input">{{message}}</span>-->
    </div>
</template>

<script>
    export default {
        name   : "ChatMessageInput",
        data() {

            return {
                message: '',
                hasInput: false
            };
        },
        watch  : {
            message: function () {

            }
        },
        mounted: function () {
            let vm = this;
            this.inputEl                = this.$el.querySelector('input');
            setTimeout(function () {
                vm.inputEl.focus();
            }, 500);
        },
        methods: {
            press() {

            },

            blur(event) {
                if (!this.message) {
                    event.target.classList.remove('underline');
                }
            },

            focus(event) {
                event.target.classList.add('underline');
            },

            change () {
                this.$emit('changeInput', true);
            },

            submit () {
                if (this.message.length < 1) {
                    return false;
                }
                this.$emit('submitMessage', this.message);
                this.message = '';
            }
        }
    };
</script>

<style scoped>

</style>