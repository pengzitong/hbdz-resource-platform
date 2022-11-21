import ForeignLanguageName from './index.vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ForeignLanguageName.install = Vue => {
  Vue.component(ForeignLanguageName.name, ForeignLanguageName)
}

export default ForeignLanguageName
