<template>
  <div class="container">
    <div class="left">
      <a-button type="primary" @click="handleChangeMapThemeClick">地图样式</a-button>
      <a-button type="primary" @click="handleChangeCenterClick">改变中心点</a-button>
      <a-button type="primary" @click="handleAddClick">增加事件</a-button>
      <a-button type="primary" @click="handleChangeZoomClick">缩放</a-button>
    </div>
    <div class="right">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { Scene, Marker, MarkerLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
import { timer } from 'rxjs'

const mapBox = new Mapbox({
  style: 'light',
  pitch: 0,
  center: [116.2825, 39.9],
  zoom: 1
})
let scene
const markers = []

export default {
    name: 'MapPage',
    mounted () {
      this.drawMap()
    },
    methods: {
      drawMap () {
        scene = new Scene({
          id: 'map',
          logoVisible: false,
          map: mapBox
        })
      },
      handleChangeMapThemeClick () {
        scene.setMapStyle('dark')
      },
      handleChangeCenterClick () {
        scene.setZoomAndCenter(4, [107, 30])
      },
      handleAddClick () {
        const dataList = [
          { n: '中国', id: 1, v: '21', g: '1', x: '107.13847552986205', y: '33.56035640326697' },
          { n: '美国', id: 2, v: '21', g: '1', x: '-98.4375', y: '39.09596' },
          { n: '英国', id: 3, v: '21', g: '1', x: '-3.996212596558315', y: '54.92932906692159' },
          { n: '韩国', id: 4, v: '21', g: '1', x: '127.50896059770108', y: '35.892066465517225' },
          { n: '巴西', id: 5, v: '21', g: '1', x: '-54.30334698594532', y: '-10.026407732958548' }
        ]
        const timeSub = timer(0, 5000)
        const sub = timeSub.subscribe(() => {
            this.createMarker(dataList[0])

            if (dataList.length === 0) {
              this.resumeMap()
              sub.unsubscribe()
            }

            dataList.splice(0, 1)
        }, err => {
          console.log(err)
        })
      },
      handleChangeZoomClick () {
        scene.setZoom(4)
      },
      createMarker (data) {
        // if (marker) {
        //   marker.remove()
        // }
        console.log(data)
        if (!data) {
          return
        }
        const { id, x, y } = data
        const markerLayer = new MarkerLayer()
        const el = document.createElement('label')
        el.innerHTML = '<i></i><i></i>'
        el.className = 'labelclass'
        const styleStr = `ani-${id % 3 === 0 ? 3 : (id % 3)}`
        console.log(styleStr)
        el.style.animationName = styleStr
        el.children.forEach(node => {
          node.style.animationName = styleStr
        })
        // el.textContent = n
        const marker = new Marker({
          element: el
        }).setLnglat({ lng: x * 1, lat: y * 1 })
        markerLayer.addMarker(marker)
        markers.push(marker)
        scene.addMarkerLayer(markerLayer)
        scene.setZoomAndCenter(4, [x, y])
      },
      resumeMap () {
        setTimeout(() => {
          markers.forEach(marker => {
            // marker.remove()
          })
          scene.setZoomAndCenter(1, [116.2825, 39.9])
        })
      }
    }
}
</script>

<style lang="less">
.container{
  width: 100%;
  height: 400px;

  .left {
    float:left;
    width: 150px;
    height: 100%;
    display: flex;
    flex-direction: column;

    button {
      margin-top: 8px;
    }
  }

  .right {
    position: relative;
    overflow: hidden;
    height: 100%;
    padding: 0 0 0 16px;

    #map {
      border: #ccc 1px solid;
      color: #b10026
    }
  }
}

.labelclass {
    position:absolute;
    left:50%;
    top:50%;
    right: 0;
    transform: translate(-50%, -50%) !important;
    width:0px;
    height:0px;
    display: block;
    border: 3px solid #000;
    animation: ani 1.2s linear infinite;
    border-radius: 50%;
}

@keyframes ani-2 {
    from {
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        width: 50px;
        height: 50px;
        opacity: 0;
    }
}

@keyframes ani-1 {
    from {
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        width: 30px;
        height: 30px;
        opacity: 0;
    }
}

@keyframes ani-3 {
    from {
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        width: 100px;
        height: 100px;
        opacity: 0;
    }
}

.labelclass i:nth-child(1) {
    display: block;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%) !important;
    width:0px;
    height:0px;
    border: 3px solid #000;
    border-radius:90px;
    animation: ani 1.2s linear infinite;
    animation-delay: .4s;
}

.labelclass i:nth-child(2) {
    display: block;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%) !important;
    width:0px;
    height:0px;
    border: 3px solid #000;
    border-radius:90px;
    animation: ani 1.2s linear infinite;
    animation-delay: .8s;
}
</style>
