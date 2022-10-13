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
       <div class="img-card iCard-style3">
        <div class="card-content">
          <div class="card-image">
            <img src=' ${url}' alt='log null or undefaned'/>
          </div>
          <div class="card-text">
            <h1>${data.shortinfo}</h1>
          </div>
        </div>
        <div class='card-btn'>
          <a href='${yandexUrl}' target='_blank' style='background: rgba(6,78,59,0.3); padding: 8px 16px; width: 50%; text-align: center;'>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#064E3B" stroke="none">
            <path d="M418 987 c-135 -38 -230 -178 -214 -315 4 -30 14 -70 24 -90 29 -58 213 -375 230 -394 18 -21 65 -24 80 -5 31 38 235 397 249 439 30 93 -1 212 -74 285 -77 77 -193 108 -295 80z m187 -61 c114 -54 169 -175 135 -296 -14 -49 -225 -405 -240 -405 -7 0 -65 90 -128 199 -105 181 -116 205 -120 258 -14 191 181 326 353 244z"/>
            <path d="M420 847 c-73 -38 -108 -129 -79 -204 15 -40 67 -91 107 -104 104 -34 222 53 222 164 0 54 -40 118 -90 144 -55 29 -105 29 -160 0z m148 -43 c71 -49 67 -170 -8 -209 -106 -55 -214 46 -170 159 21 56 127 86 178 50z"/>
            <path d="M265 294 c-79 -19 -139 -56 -155 -94 -37 -88 84 -168 291 -192 166 -20 363 14 444 76 76 58 67 134 -21 176 -59 29 -156 52 -167 41 -13 -13 1 -31 22 -31 31 0 108 -31 126 -50 42 -46 -30 -91 -180 -111 -185 -24 -422 15 -441 73 -12 37 20 57 154 94 15 4 12 26 -4 30 -5 1 -36 -4 -69 -12z"/>
            </g>
            </svg>
          </a>
          <a href='tel:+${data.phone}' style='text-align: center; padding: 8px 16px; background: rgba(6,78,59,0.3); width: 50%;'>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24" height="24" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#064E3B" stroke="none">
            <path d="M135 888 c-47 -37 -57 -75 -41 -160 50 -257 211 -464 448 -572 134 -61 255 -81 308 -50 48 29 60 62 60 166 0 133 -22 164 -133 193 -87 23 -111 20 -141 -16 -26 -30 -27 -31 -52 -14 -45 29 -105 88 -135 132 l-30 43 30 26 c36 30 38 50 15 147 -13 53 -24 74 -51 97 -33 29 -36 30 -142 30 -96 0 -111 -2 -136 -22z m232 -70 c6 -7 16 -37 23 -67 13 -54 7 -70 -26 -71 -6 0 -19 -9 -30 -21 -18 -20 -18 -21 11 -77 36 -71 162 -198 232 -235 60 -32 82 -27 103 23 12 30 15 31 54 25 23 -4 52 -12 66 -19 24 -11 25 -15 25 -106 l0 -95 -65 1 c-165 4 -388 149 -489 317 -72 121 -119 288 -92 321 17 20 173 23 188 4z"/>
            <path d="M677 904 c-11 -11 -8 -49 5 -62 7 -7 30 -12 52 -12 l39 0 -77 -80 c-74 -76 -78 -81 -64 -102 8 -12 20 -24 27 -26 6 -2 47 31 91 74 l80 77 0 -40 c0 -46 17 -66 52 -61 22 3 23 6 23 118 l0 115 -111 3 c-60 1 -113 -1 -117 -4z"/>
            </g>
            </svg>
          </a>
<!--          <a href="#" title="Read Full">-->
<!--            <span>Go To Link</span>-->
<!--          </a>-->
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


/* Map Catrd */

.ymaps-2-1-79-balloon__close-button {
  width: 26px !important;
  height: 26px !important;
}
.card-link a {
  color: #fff;
}
.img-card {
  width:300px;
  position: relative;
  border-radius: 5px;
  text-align: left;

  -webkit-box-shadow: 0px 5px 5px 0px #B4CAC4;
  -moz-box-shadow: 0px 5px 5px 0px #B4CAC4;
  -o-box-shadow: 0px 5px 5px 0px #B4CAC4;
  box-shadow: 0px 5px 5px 0px #B4CAC4;
}

.ymaps-2-1-79-map ymaps, .ymaps-2-1-79-balloon__layout {
  border-radius: 5px;
}

.img-card .card-image {
  position: relative;
  margin: auto;
  overflow: hidden;
  border-radius: 5px 5px 0px 0px;
  height: 200px;
}

.img-card .card-image img {
  width:100%;
  border-radius: 5px 5px 0px 0px;

  -webkit-transition: all 0.8s;
  -moz-transition: all 0.8s;
  -o-transition: all 0.8s;
  transition: all 0.8s;
}

.img-card .card-image:hover img {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
}

.img-card .card-text {
  padding: 0 15px 15px;
  line-height: 1.5;
}

.img-card .card-link {
  padding: 20px 15px 30px;
  width: -webkit-fill-available;
}

.img-card .card-link a {
  text-decoration: none;
  position: relative;
  padding: 10px 0;
}

.img-card .card-link a:after {
  top: 30px;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  width: 0;

  -webkit-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  -moz-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  -o-transition: width 0.3s ease 0s, left 0.3s ease 0s;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
}

.img-card .card-link a:hover:after {
  width: 100%;
  left: 0;
}

.img-card.iCard-style3 {
  text-align: center;
}

.img-card.iCard-style3 .card-title {
  top: 80%;
  font-size: 30px;
  color: #fff;
  position: absolute;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
}

.img-card.iCard-style3 .card-text {
  color: #636060;
}

.img-card.iCard-style3 .card-link {
  border-top: 1px solid #e8e8e8;
}
.img-card.iCard-style3 .card-link a {
  color: #585858;
}
.img-card.iCard-style3 .card-link a:after {
  background: #585858;
}
.card-btn {
  display: flex;
  gap: 2px;
}
.card-btn a:hover svg {
  transform: scale(1.2);
  transition: .5s;
}
.card-btn a {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ymaps-2-1-79-balloon__tail:after {
  background-color: #B4CAC4 !important;
}
.ymaps-2-1-79-balloon_to_top .ymaps-2-1-79-balloon__tail {
  background: #B4CAC4 !important;
}
.ymaps-2-1-79-balloon {
  padding-bottom: 0 !important;
}
.ymaps-2-1-79-map-copyrights-promo, .ymaps-2-1-79-gototech, .ymaps-2-1-79-copyright__wrap {
  display: none !important;
}
</style>
