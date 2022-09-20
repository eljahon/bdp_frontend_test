  <template>
      <div class='flex justify-end  items-center lang-switcher-wapper'>
        <button class=' lang-switcher-button w-full flex items-center '>
          <img class='w-6' :src='localeImage[$i18n.locale]' alt=''>
          <span>{{$i18n.locales.find(el => el.code === locale).name}}</span>
        </button>
        <nav class='none-active nav'>
          <ul>
            <li v-for="(lang, index) in $i18n.locales" :key='index' @click='onChange(lang)' >
              <button  class='w-6 h-6 flex items-center gap-1.5'><img :src='localeImage[lang.code]' alt=''>{{lang.name}}</button>
            </li>
          </ul>
        </nav>
      </div>
  </template>

  <script>
  import en from '~/assets/svg/Eng.svg'
  import ka from '~/assets/svg/Kaa.svg'
  import ru from '~/assets/svg/Ru.svg'
  import uz from '~/assets/svg/Uz.svg'
  export default  {
    name: 'LangSwitcher',
    data() {
      return {
        locale: this.$i18n.locale,
        isLang: false,
        localeImage: {
          uz: uz,
          kaa: ka,
          ru: ru,
          en: en
        }
      }
    },
    methods: {
      onChange(event) {
        this.$router.push(this.switchLocalePath(event.code))
        this.isLang = !this.isLang;
        this.locale = this.$i18n.locale
      },
    },
    mounted() {
    }
  }
  </script>
  <style lang='css' scoped>
  .none-active {
    display: none;
  }
  .active {

  }
  .lang-switcher-wapper {
    position: relative;
  }
  nav {
    position:absolute ;
    color: black;
    background-color: white;
    width: 162px;
    padding: 5px;
    border-radius:2px ;
    transition: 0.5s;
  }
  .lang-switcher-wapper:hover .nav{
    display: block;
    top: 22px;
    left: -50px;
    transition: 0.5s;
  }

  ul >  li {
    transition: 0.5s;
  }
  ul > li:hover {
    background-color: #DCE0EB;
    border-radius: 2px;
  }
  button > span {
    margin-left: 5px;
  }
  @media (max-width: 1024px) {
    .nav {
      left: -20px;
    }
  }
  </style>
