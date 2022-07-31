import Vue from 'vue'

const constants = {
  defaultDirection: 'ltr',
  localeOptions: [
    { id: 'en', name: 'English LTR', direction: 'ltr' },
    { id: 'ru', name: 'Русский', direction: 'ltr' },
    { id: 'uz', name: "O'zbek tili", direction: 'ltr' },
  ],
  defaultLocale: 'en',
  languages: [
    {
      id: 1,
      name: {
        uz: "O'zbekcha",
        ru: 'Узбекский',
        en: 'Uzbek',
      },
      short: 'uz',
    },
    {
      id: 2,
      name: {
        uz: 'Ruscha',
        ru: 'Русский',
        en: 'Russian',
      },
      short: 'ru',
    },
    {
      id: 3,
      name: {
        uz: 'Inglizcha',
        ru: 'Английский',
        en: 'English',
      },
      short: 'en',
    },
  ],
  pagination: {
    page: 1,
    total: 0,
    pageSize: 9,
    pageCount: 1,
  },
  yandexKey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
  role: {
    authenticated: 1,
    consultant: 4,
    contentprovider: 5,
    guest: 3,
    manager: 8,
    moderator: 7,
    priceagent: 6,
    public: 2,
    superadmin: 9
  }
}
export default constants
Vue.prototype.$const = constants
