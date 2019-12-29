<template>
    <div class="imagefall" v-if="infos.length > 0">
        <img v-for="(item, index) in infos" :key="index" :src="item.url" class="imagegap" :style="{'width': item.width.toString() + 'px', 'height': item.height.toString() + 'px'}"></img>
    </div>
</template>
<script lang="ts">
    import {ImageInfo} from "../ImageInfo"
    import {Prop, Vue, Component} from "vue-property-decorator"
    @Component({name: "App"})
    export default class App extends Vue {
        @Prop()
        infos: ImageInfo[]

        mounted(){
        }        
    }
</script>
<style scoped lang="scss">
    .imagefall{
        display: flex;
        flex-direction: column;
        justify-content: start;
    }

    .imagegap{
        margin-bottom: 10px;
        margin-right: 10px;
    }
</style>