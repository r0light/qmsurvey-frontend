import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleRight, faCircleLeft, faCircleXmark, faQuestion, faPause, faPlay, faArrowRotateLeft, faCircleQuestion, faAward, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'

library.add(faCircleRight, faCircleLeft, faCircleXmark, faQuestion, faFaceSmile, faPause, faPlay, faArrowRotateLeft, faCircleQuestion, faAward, faFlagCheckered)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
