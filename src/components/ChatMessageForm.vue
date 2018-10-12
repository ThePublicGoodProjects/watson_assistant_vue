<template>
    <div class="chat-message-form">
        <label>
            <input type="text" v-model="message" @keyup.enter="submit"/>
        </label>
    </div>
</template>

<script>
    export default {
        name   : "ChatMessageList",
        data() {
            return {
                message: ''
            };
        },
        methods: {
            submit: function () {
                if (this.message.length < 1) {
                    return false;
                }
                this.$emit('change', this.message);
                this.message = '';
            }
        }
    };
</script>

<style scoped>

</style>