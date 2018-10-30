<template>
    <div class="chat-container">
        <chat :debug-mode="debugMode"></chat>
    </div>
</template>

<script>
    import 'url-search-params-polyfill';
    import Chat from './components/Chat.vue';
    export default {
        name      : 'chat-module',
        components: {
            Chat
        },
        data() {
            let urlParams = new URLSearchParams(window.location.search),
                debugMode = urlParams.get('test-mode') === 'debug';

            return {
                debugMode: debugMode
            }
        }
    };
</script>

<style>
    #app {
        font-family             : 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing  : antialiased;
        -moz-osx-font-smoothing : grayscale;
        text-align              : center;
        color                   : #2c3e50;
        margin-top              : 60px;
    }
</style>
