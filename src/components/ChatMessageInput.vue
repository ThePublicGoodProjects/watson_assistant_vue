<template>
    <div class="chat-message-input">
        <label class="inputOutline">
            <input name="text-input" type="text" v-model="message" placeholder="Ask a question..." @keyup.enter="submit"/>
        </label>
        <span class="dummy-input">{{message}}</span>
    </div>
</template>

<script>
    export default {
        name   : "ChatMessageInput",
        data() {

            return {
                message: ''
            };
        },
        watch  : {
            message: function (newValue) {
                let hasValue = !!newValue.length,
                    input    = this.inputEl,
                    dummy    = this.dummyEl;

                if (!hasValue) {
                    // If the input box is empty, remove the underline
                    input.classList.remove('underline');
                    input.setAttribute('style', 'width:' + '100%');
                    input.style.width = '100%';

                }
                else {
                    input.classList.add('underline');
                    this.$nextTick(function() {
                        input.style.width = dummy.offsetWidth + 'px';
                    });
                }
            }
        },
        mounted: function () {
            let inputStyle;
            this.inputEl = this.$el.querySelector('input');
            inputStyle = window.getComputedStyle(this.inputEl);
            this.inputPadding = parseInt(inputStyle.getPropertyValue('padding-left'), 10) + parseInt(inputStyle.getPropertyValue('padding-right'), 10);
            this.dummyEl = this.$el.querySelector('.dummy-input');
            this.dummyEl.style.position = 'absolute';
            this.dummyEl.style.top = '-1000px';

        },
        methods: {
            submit       : function () {
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