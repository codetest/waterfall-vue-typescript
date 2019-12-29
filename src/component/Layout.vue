<template>
    <div class="fall">
        <slot name="fall1"></slot>
        <slot name="fall2"></slot>
        <slot name="fall3"></slot>
    </div>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    @Component({name: "App"})
    export default class App extends Vue {
        mounted(){

        }
    }
</script>
<style scoped lang="scss">
    .fall{
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: flex-start;
    }
</style>