<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <nonet-table></nonet-table>
    </div>
</template>

<script>
import NonetTable from './components/nonet/NonetTable.vue';

export default {
    name: 'App',
    components: {
        NonetTable
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
