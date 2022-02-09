// .vitepress/theme/index.js
import Layout from './layouts/Layout.vue'
import NotFound from './layouts/404.vue'
import SidebarMenu from './global-components/SidebarMenu.vue'
import "tailwindcss/tailwind.css"
import "./index.css"

// import { TroisJSVuePlugin } from 'https://unpkg.com/troisjs@0.3.3/build/trois.module.cdn.min.js';

export default {
  Layout,
  NotFound,
  enhanceApp({ app }) {
    // register global components
    app.component('sidebar-menu', SidebarMenu)
    // app.use(TroisJSVuePlugin)
    // app.component('MyGlobalComponent', () => import(/* webpackChunkName: "my-global-component" */ './components/MyGlobalComponent.vue'))
  }
}