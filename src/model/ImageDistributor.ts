import {ImageInfo} from "../ImageInfo"
import {PageEventUtil} from "./PageEventUtil"

export class ImageDistributor{
    private infos: ImageInfo[] = []
    private colInfos: ImageInfo[][] = []
    private height: number[] = []
    private maxHeight: number = 0
    private currentHeight: number = 0
    private renderingImages: boolean = false
    constructor(colInfos: ImageInfo[][], maxHeight: number){
        PageEventUtil.RegisterImageLoadedEvents(this.imageLoadedCallback.bind(this))
        this.colInfos = colInfos
        this.maxHeight = maxHeight
        for(var inx = 0; inx < this.colInfos.length; ++inx){
            this.height.push(0)
        }
    }

    private fetchRadomImage(): ImageInfo{
        var randInx = Math.floor(Math.random() * this.infos.length)
        return this.infos[randInx]
    }

    private selectMinIndex(height: number[]): number{
        var min = Number.MAX_VALUE
        var ret = -1
        for (var inx = 0; inx < height.length; ++inx){
            if (min > height[inx]){
                ret = inx;
                min = height[inx]
            }
        }

        return ret
    }

    private fetchMoreImages(){
        while(true){
            for (var inx = 0; inx < this.height.length; ++inx){
                var min = this.selectMinIndex(this.height)
                var randImage = this.fetchRadomImage()
                this.height[min] = this.height[min] + randImage.height + 10
                this.colInfos[min].push(randImage)     
                min = this.selectMinIndex(this.height)           
                if (this.height[min]  >= this.maxHeight){
                    this.currentHeight = this.height[min]
                    return;
                }
            }
        }
    }

    imageLoadedCallback(infos: ImageInfo[]){
        this.infos = infos
        this.fetchMoreImages()
    }

    loadMoreImages(scrollHeight: number, clientHeight: number){
        if (this.renderingImages){
            return;
        }

        this.renderingImages = true
        if (scrollHeight + clientHeight * 5 / 4 >= this.currentHeight){
            this.fetchMoreImages()
        }

        this.renderingImages = false;
    }
}
