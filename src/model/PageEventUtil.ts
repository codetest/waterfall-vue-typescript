import Vue from "vue"
import {ImageInfo} from "../ImageInfo"
export class PageEventUtil{
    private static EventBus: Vue = new Vue()
    public static RegisterImageLoadedEvents(callback: (infos: ImageInfo[])=> void){
        PageEventUtil.EventBus.$on("imagesloaded", callback)
    }

    public static NotifyImageLoadedEvents(infos: ImageInfo[]){
        PageEventUtil.EventBus.$emit("imagesloaded", infos)
    }
}