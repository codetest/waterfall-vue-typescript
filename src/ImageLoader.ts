import {ImageInfo} from "./ImageInfo"
import {PageEventUtil} from "./model/PageEventUtil"
require("../1.jpg")
require("../2.jpg")
require("../3.jpg")
require("../4.jpg")
require("../5.jpg")
require("../6.jpg")
require("../7.jpg")
require("../8.jpg")
require("../9.jpg")
require("../10.jpg")

export class ImageLoader{
    private infos: ImageInfo[] = []
    private rawUrls: string[] = []
    constructor(images: string[]){
        this.rawUrls = images
    }

    preLoadImages(): Promise<boolean>{
        const that = this
        return new Promise<boolean>((resolve, reject) => {
            var loadedCount = 0
            for (var inx = 0; inx < that.rawUrls.length; ++inx){
                const img = new Image()
                const newIndex = inx
                img.onload = (evt: Event) => {
                    that.infos.push({width: 200, height: img.height * 200 / img.width, url: that.rawUrls[newIndex]})
                    ++loadedCount;
                    if (loadedCount >= that.rawUrls.length){
                        PageEventUtil.NotifyImageLoadedEvents(that.infos)
                        resolve(true)
                    }
                }

                img.onerror = (evt: Event) => {
                    ++loadedCount;
                    if (loadedCount >= that.rawUrls.length){
                        PageEventUtil.NotifyImageLoadedEvents(that.infos)
                        resolve(true)
                    }
                }

                img.src = that.rawUrls[inx]

            }
        })
    }
}