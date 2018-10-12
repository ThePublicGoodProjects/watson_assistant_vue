<template>
    <div class="chat-container">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <chat></chat>
    </div>
</template>

<script>
    import Chat from './components/Chat.vue';
    export default {
        name      : 'chat-module',
        components: {
            Chat
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
