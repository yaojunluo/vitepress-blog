// .vitepress/theme/index.js
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/404.vue'
import SidebarMenu from './global-components/SidebarMenu.vue'
import ProseList from './global-components/ProseList.vue'
import "tailwindcss/tailwind.css"
import "./index.css"

export default {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    // register global components
    app.component('sidebar-menu', SidebarMenu)
    app.component('prose-list', ProseList)
    // app.component('MyGlobalComponent', () => import(/* webpackChunkName: "my-global-component" */ './components/MyGlobalComponent.vue'))
  }
}