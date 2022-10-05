<template>
  <div class="">
    <div class="w-full h-full">
      <div class="map-container">
        <div id="map" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { loadYmap } from 'vue-yandex-maps'
import debounce from 'lodash.debounce'
import axios from 'axios'
import { throwStatement } from '@babel/types'
import imgLatLng from '~/assets/images/lanlng.jpg'
// import locationError from '@/modals/location-error.vue'
// import debounce from 'debounce'
export default {
  props: {
    currentAddress: {
      type: String,
      default: '',
    },
    coords: Array,
    location:Object,
  },
  data() {
    return {
      img: imgLatLng,
      ymaps: null,
      map: null,
      myPlacemark: null,
      choosenPlacemark: null,
      zoom: 12,
      settings: {
        apiKey: this.$const.yandexKey,
        lang: 'ru_RU',
        coordorder: 'latlng',
        version: '2.1',
      },
      sendingAddress: {
        address: '',
        latitude: null,
        longitude: null,
      },
      isOption: 'disable',
      addresses: [],
      address: '',
      searchedAddresses: [],
      placeList: null,
    }
  },
  computed: {},
  watch: {
    location: {
      async handler() {
        this.showLocations()
      },
      immediate: true,
    },
  },
  async mounted() {
      window.removeAllBalloons = this.removeAllBalloons();
      window.call = function(event)  {
      };
    await loadYmap(this.settings)
    this.ymaps = ymaps
    ymaps.ready(this.initMap)
  },
  methods: {
    removeAllBalloons () {
      // if (this.mapObjects.places && this.mapObjects.places.length) {
      //   // this.mapObjects.places.forEach(e => {
      //   //   e.balloon.close()
      //   // })
      // }
    },
    call(event) {
    },
    cardGenerate (data) {
      let url = this.$tools.getFileUrl(data.logo) ? this.$tools.getFileUrl(data.logo)  : this.img;
      let yandexUrl = `https://yandex.ru/maps/?ll=${data.location.lng},${data.location.lat}&z=12`;
      return `
      <div style='width: 318px; overflow: hidden position: relative;'>
              <div style='width: 100%; height: 155px; '>
                <img src=' ${url}' alt='log null or undefaned' style='width: 100%; height: 100%; object-fit: cover'/>
              </div>
              <div style='padding: 10px'>
              <h1>${data.shortinfo}</h1>
              </div>
              <div style='display: flex; gap: 4px; justify-content: space-between; width: 100%; padding: 7px;'>
                <a href='${yandexUrl}' target='_blank' style='background: rgba(6,78,59,0.3); padding: 8px 16px; width: 50%; text-align: center;'>

                                  <svg style="margin: 0 auto" width='24' height='24' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 432.49 432.49" style="enable-background:new 0 0 432.49 432.49;" xml:space="preserve">
<g>
\t<g>
\t\t<path style="fill:none;" d="M178.568,137.364c0,20.775,16.901,37.677,37.677,37.677s37.677-16.901,37.677-37.677    c0-20.774-16.901-37.677-37.677-37.677S178.568,116.59,178.568,137.364z"/>
\t\t<path style="fill:none;" d="M225.096,370.187c-2.273,2.482-5.484,3.895-8.851,3.895c-3.366,0-6.577-1.413-8.851-3.895    c-0.99-1.082-18.303-20.045-40.335-47.596l-99.61,34.143l148.482,51.069l149.109-51.108l-99.512-34.227    C243.449,350.084,226.088,369.103,225.096,370.187z"/>
\t\t<path style='fill:#B0DACC;' d="M95.855,144.392c0,52.005,80.011,153.768,120.39,199.706    c40.379-45.951,120.392-147.736,120.392-199.706C336.636,78.008,282.629,24,216.245,24S95.855,78.008,95.855,144.392z     M216.245,75.688c34.009,0,61.677,27.668,61.677,61.677c0,34.009-27.668,61.677-61.677,61.677s-61.677-27.668-61.677-61.677    C154.568,103.356,182.236,75.688,216.245,75.688z"/>
\t\t<path style='fill:#211E48;' d="M405.897,345.366l-124.755-42.908c3.628-4.769,7.303-9.681,10.987-14.721    c45.457-62.194,68.507-110.423,68.507-143.346C360.636,64.773,295.862,0,216.245,0S71.855,64.773,71.855,144.392    c0,32.923,23.05,81.151,68.507,143.346c3.715,5.081,7.42,10.033,11.076,14.837L26.606,345.362    c-4.848,1.662-8.105,6.22-8.108,11.346c-0.003,5.125,3.251,9.687,8.097,11.354l185.428,63.776    c1.265,0.434,2.584,0.652,3.902,0.652c1.315,0,2.631-0.216,3.892-0.648l186.069-63.776c4.848-1.661,8.105-6.22,8.108-11.345    C413.996,351.595,410.743,347.033,405.897,345.366z M336.636,144.392c0,51.97-80.013,153.755-120.392,199.706    c-40.379-45.938-120.39-147.701-120.39-199.706C95.855,78.008,149.861,24,216.245,24S336.636,78.008,336.636,144.392z     M215.932,407.803L67.449,356.733l99.61-34.143c22.032,27.551,39.345,46.514,40.335,47.596c2.274,2.482,5.484,3.895,8.851,3.895    c3.366,0,6.577-1.413,8.851-3.895c0.992-1.084,18.354-20.103,40.434-47.719l99.512,34.227L215.932,407.803z"/>
\t\t<path style='fill:#211E48;' d="M216.245,199.041c34.009,0,61.677-27.668,61.677-61.677c0-34.009-27.668-61.677-61.677-61.677    s-61.677,27.668-61.677,61.677C154.568,171.373,182.236,199.041,216.245,199.041z M253.922,137.364    c0,20.775-16.901,37.677-37.677,37.677s-37.677-16.901-37.677-37.677c0-20.774,16.901-37.677,37.677-37.677    S253.922,116.59,253.922,137.364z"/>
\t</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

</a>
                <a href='tel:+${data.phone}' style='text-align: center; padding: 8px 16px; background: rgba(6,78,59,0.3); width: 50%;'>
                  <svg style="margin: 0 auto" width='24' height='24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 511.999 511.999' style='enable-background:new 0 0 511.999 511.999;' xml:space='preserve'>
<path style='fill:#B0DACC;' d='M342.315,337.711l-25.981,25.977c-2.223-1.212-4.625-2.415-7.048-3.777  c-22.302-12.368-66.331-42.73-98.447-74.846c-32.186-32.195-62.665-76.239-75.022-98.541c-1.332-2.344-1.876-3.877-3.088-6.071  l24.371-22.904l2.525-2.525c19.309-19.309,19.309-50.613,0-69.923l-38.077-38.076c-19.416-19.416-50.935-19.291-70.197,0.278  l-10.149,10.31c-6.61,8.452-12.216,18.284-16.321,28.768c-3.795,10.015-6.223,19.601-7.274,29.146  c-9.274,76.667,25.755,146.747,120.809,241.84c131.435,131.395,236.67,122.286,241.246,121.774  c9.934-1.172,20.155-4.323,29.86-8.077c10.405-4.066,20.321-9.756,28.733-16.366l10.315-10.142  c19.587-19.259,19.719-50.793,0.295-70.216l-36.63-36.63C392.927,318.405,361.624,318.405,342.315,337.711z'/>
<g>
\t<path style='fill:#211E48;' d='M372.047,495.597c-0.003,0-0.005,0-0.006,0c-27.727,0-127.338-9.149-245.036-126.81   C28.013,269.755-8.332,195.837,1.571,113.681c1.196-10.789,3.884-21.59,8.218-33.02c0.021-0.053,0.042-0.108,0.063-0.163   c4.615-11.79,11.061-23.141,18.636-32.83c0.378-0.483,0.781-0.943,1.211-1.379l10.149-10.31   c12.426-12.625,29.025-19.577,46.741-19.577c17.519,0,33.987,6.822,46.374,19.207l38.076,38.077   c12.386,12.387,19.209,28.857,19.209,46.375s-6.822,33.987-19.209,46.375l-2.526,2.525c-0.118,0.116-0.236,0.234-0.357,0.347   l-15.335,14.412c12.583,21.277,39.75,60.234,69.435,89.929c30.105,30.105,70.192,57.821,91.219,70.069l17.427-17.425   c12.387-12.386,28.856-19.206,46.373-19.206c17.519,0,33.987,6.822,46.374,19.207l36.631,36.63   c12.462,12.463,19.283,29.03,19.207,46.654c-0.074,17.621-7.036,34.131-19.601,46.486l-10.315,10.14   c-0.426,0.42-0.875,0.814-1.345,1.183c-9.737,7.65-21.09,14.119-32.831,18.709c-12.728,4.925-23.782,7.887-33.843,9.073   C380.589,495.282,377.361,495.597,372.047,495.597z M39.945,92.186c-3.348,8.847-5.406,17.062-6.292,25.111   c-0.006,0.057-0.013,0.113-0.019,0.169c-8.602,71.12,25.064,137.317,116.2,228.494   c108.922,108.886,197.619,117.353,222.208,117.353c0.002,0,0.003,0,0.005,0c3.81,0,5.814-0.21,5.834-0.211   c7.222-0.852,15.701-3.175,25.816-7.09c8.513-3.327,16.776-7.982,23.906-13.477l9.65-9.487c6.381-6.274,9.914-14.655,9.953-23.603   c0.039-8.949-3.425-17.361-9.753-23.688l-36.63-36.63c-6.289-6.289-14.652-9.753-23.546-9.753c-8.894,0-17.256,3.464-23.545,9.751   l-25.981,25.977c-5.062,5.065-12.854,6.184-19.14,2.759c-0.846-0.462-1.719-0.92-2.61-1.388c-1.508-0.794-3.059-1.613-4.618-2.489   c-22.018-12.21-67.425-42.977-101.953-77.504c-34.51-34.521-65.944-80.886-77.69-102.065c-0.969-1.711-1.63-3.098-2.165-4.216   c-0.294-0.615-0.578-1.228-0.972-1.939c-3.567-6.458-2.303-14.515,3.073-19.569l24.187-22.734l2.349-2.347   c6.287-6.289,9.751-14.651,9.751-23.545c0-8.896-3.464-17.256-9.753-23.546l-38.077-38.077c-6.289-6.289-14.651-9.753-23.545-9.753   c-8.994,0-17.424,3.53-23.734,9.939l-9.477,9.627C47.955,75.333,43.321,83.587,39.945,92.186z'/>
\t<path style='fill:#211E48;' d='M403.287,258.505c-4.376,0-8.775-1.022-12.856-3.091c-9.548-4.843-15.492-14.484-15.535-25.183   h-78.273c-24.305,0-44.077-19.772-44.077-44.077v-29.729c0-24.305,19.774-44.077,44.077-44.077h10.444   c8.915,0,16.142,7.228,16.142,16.142c0,8.914-7.227,16.142-16.142,16.142h-10.444c-6.504,0-11.793,5.29-11.793,11.793v29.729   c0,6.502,5.29,11.793,11.793,11.793h94.415c8.915,0,16.142,7.228,16.142,16.142v8.307l69.821-51.104l-69.821-51.106v8.305   c0,8.914-7.227,16.142-16.142,16.142H364.94c-8.915,0-16.142-7.228-16.142-16.142s7.227-16.142,16.142-16.142h9.956   c0.042-10.697,5.987-20.339,15.535-25.183c9.584-4.862,20.922-3.935,29.59,2.408l80.365,58.823   c7.272,5.324,11.614,13.882,11.613,22.894c-0.002,9.012-4.342,17.569-11.614,22.891l-80.365,58.822   C415.045,256.647,409.187,258.505,403.287,258.505z'/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
                </a>
              </div>
            </div>

      `
    },
    showLocations() {
      if (this.coords && this.map) {
        if (this.location.location) this.map.panTo([this.location.location.lat,this.location.location.lng], { checkZoomRange: true })
        this.map.geoObjects.remove(this.placeList);
        let placemark = new ymaps.Placemark(
          [this.location.location.lat,this.location.location.lng],
          {
            balloonContent: this.cardGenerate(this.location),
          },
          {
            preset: 'islands#icon',
            iconColor: '#0095b6'
          }
        );
        this.map.geoObjects.add(placemark)
        this.placeList = placemark;
        // for (let index = 0; index < this.coords.length; index++) {
        //   let placemark = new ymaps.Placemark(
        //     [this.coords[index].lng, this.coords[index].lat],
        //     {
        //       balloonContent: 'Small icon',
        //     },
        //     {
        //       preset: 'islands#icon',
        //       iconColor: '#0095b6'
        //     }
        //   )
        //   this.map.geoObjects.add(placemark)
        // }
      }
    },
    initMap() {
      this.map = new ymaps.Map(
        'map',
        {
          center: [42.460341, 59.617996],
            // this.location && this.location.coords ? this.location.coords : [42.460341, 59.617996],
          zoom: 13,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      )
      if (this.map) {
        this.showLocations()
      }

      // this.map.events.add('click', (e) => {
      //   this.map.geoObjects.remove(this.choosenPlacemark)
      //   const coords = e.get('coords')
      //   this.map.panTo(coords, { checkZoomRange: true })
      //   // Moving the placemark if it was already created
      //   if (this.myPlacemark) {
      //     this.myPlacemark.geometry.setCoordinates(coords)
      //   }
      //   else {
      //     this.myPlacemark = this.createPlacemark(coords)
      //     this.map.geoObjects.add(this.myPlacemark)
      //     this.myPlacemark.events.add('dragend', () => {
      //       this.getAddress(this.myPlacemark.geometry.getCoordinates())
      //     })
      //   }
      //   this.getAddress(coords)
      // })
    },
    createPlacemark(coords) {
      return new this.ymaps.Placemark(
        coords,
        {
          iconCaption: 'searching...',
        },
        {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true,
        }
      )
    },
    createChoosenPlacemark(point) {
      return new this.ymaps.Placemark(
        [point.coordinates[1], point.coordinates[0]],
        {
          iconCaption: point.address,
        },
        {
          preset: 'islands#violetDotIconWithCaption',
          draggable: true,
        }
      )
    },
    getAddress(coords) {
      this.myPlacemark.properties.set('iconCaption', 'searching...')
      this.ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0)

        this.address = firstGeoObject.getAddressLine().split(', ').slice(1).join(', ')
        this.sendingAddress.latitude = coords[0]
        this.sendingAddress.longitude = coords[1]
        this.sendingAddress.address = this.address
        this.myPlacemark.properties.set({
          // Forming a string with the object's data.
          iconCaption: [
            firstGeoObject.getLocalities().length
              ? firstGeoObject.getLocalities()
              : firstGeoObject.getAdministrativeAreas(),

            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
          ]
            .filter(Boolean)
            .join(', '),
          // Specifying a string with the address of the object as the balloon content.
          balloonContent: firstGeoObject.getAddressLine(),
        })
      })
    },
  },
}
</script>

<style>
.modal {
  @apply static;
  @apply relative;
  @apply mx-auto;
  @apply max-h-full;
  @apply overflow-scroll;
  @apply bg-white;
  @apply rounded;

  width: 70rem;
  height: 40rem;
}
.ymaps-2-1-79-balloon__content {
  padding: 0 !important;
}
.ymaps-2-1-79-balloon__close+.ymaps-2-1-79-balloon__content {
  margin-right: 0px !important;
}
.ymaps-2-1-79-balloon__close {
  background: #ffffff !important;
}
.close {
border: 1px solid #333;
  border-radius: 8px;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 24px;
  height: 24px;
  opacity: 0.7;
  transition: all, .3s;
  background: #fff;
  cursor: pointer;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  left: 11.2px;
  top: 5px;
  content: ' ';
  height: 15px;
  width: 2px;
  background-color: #737171;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.bgg {
  transform: translate(288px, -152px);
  width: 27px;
  height: 27px;
}

.map-container {
  height: 32rem;
}
</style>
