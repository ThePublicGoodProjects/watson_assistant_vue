<template>
    <div class="chat-message-list">
        <chat-message-item v-for="item in messages" :key="item.id" :item="item"></chat-message-item>
    </div>
</template>

<script>
    import chatMessageItem from './ChatMessageItem.vue';

    export default {
        name      : "ChatMessageList",
        components: {
            chatMessageItem
        },
        props     : {
            messages: {
                type   : Array,
                default: function () {
                    return [];
                }
            }
        },
        created() {

        }
    };
</script>

<style scoped>

</style>