<template>
    <LayoutComp>
        <template v-slot:fall1>
            <ImageFallComp :infos="infos1"/>
        </template>
        <template v-slot:fall2>
            <ImageFallComp :infos="infos2"/>
        </template>
        <template v-slot:fall3>
            <ImageFallComp :infos="infos3"/>
        </template>
    </LayoutComp>
</template>
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    import LayoutComp from "./component/Layout.vue"
    import ImageFallComp from "./component/ImageFall.vue"
    import {ImageLoader} from "./ImageLoader"
    import {ImageInfo} from "./ImageInfo"
    import {ImageDistributor} from "./model/ImageDistributor"

    var distributor: ImageDistributor
    @Component({name: "App", components: {LayoutComp, ImageFallComp}})
    export default class App extends Vue{
        infos1: ImageInfo[] = []
        infos2: ImageInfo[] = []
        infos3: ImageInfo[] = []
        async mounted(){
            var loader:ImageLoader = new ImageLoader(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"])
            loader.preLoadImages();
            distributor = new ImageDistributor([this.infos1, this.infos2, this.infos3], document.body.clientHeight)
            window.addEventListener("scroll", () => {
                distributor.loadMoreImages(window.pageYOffset, document.body.clientHeight)
            })
        }
    }
</script>
<style scoped lang="scss">
    .test{
        font-size: 100px;
        color:blue;
        background-color: gray;
    }
</style>