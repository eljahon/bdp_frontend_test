import Vue from 'vue'
import Vuex from 'vuex'
import crud from './crud'
import dynamic from './crud/dynamic'
import socket from './modules/socket'
import upload from './modules/upload'
import company from './modules/company' 
import sidebar from './modules/sidebar'
Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      socket,
      upload,
      company,
      sidebar,
      products: crud('products'),
      productcategories: crud('productcategories'),
      pricelists: crud('pricelists'),
      regions: crud('regions'),
      districts: crud('districts'),
      servicecategories: crud('servicecategories'),
      courses: crud('courses'),
      about: dynamic('pages'),
      serviceposts: crud('serviceposts'),
      coursecategories: crud('coursecategories'),
      chatrooms: crud('chatrooms'),
      chatmessages: crud('chatmessages'),
      users: dynamic('users'),
      partners: crud('partners'),
      companies: crud('companies'),
      companycategories: crud('companycategories'),
      faqs: crud('faqs'),
      pricedates: crud('pricedates'),
      priceanalitics: dynamic('priceanalitics'),
      lessons: crud('lessons'),
      genders: crud('genders'),
      lessongroups: crud('lessongroups'),
      agrocultureareas: crud('agrocultureareas'),
      contuctuses: crud('contactuses'),
      activitytypes: crud('activitytypes'),
      agrocultureareas: crud('agrocultureareas'),
      tradinposts: crud('tradinposts'),
      tradingpostcategories: crud('tradingpostcategories')
    },
    getters: {
      isAuthenticated: state => { return state.auth.loggedIn },
      loggedInUser: state => { return state.auth.user },
    }
  })
}
export default createStore
