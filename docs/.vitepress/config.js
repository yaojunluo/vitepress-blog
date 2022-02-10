const { version } = require('os')
const { getPosts, generatePaginationPages } = require('./theme/pages')

async function config() {

  // const pageSize = 2
  // await generatePaginationPages(pageSize)

  return {
    title: '干饭人',
    description: 'Just playing around.',
    // 引入样式 
    head: [
      [
        'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
        { rel: 'icon', href: 'favicon.png' }
      ],
      ['link', { rel: 'stylesheet', href:'//at.alicdn.com/t/font_3171857_jvphawt6f2m.css' }],
      ['script', { }, `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?0781e96341b7bede1a9b132b08a790f1";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `],
      // ['script', { src: 'https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js' }],
      
    ],
    body: [],
    themeConfig: {
      
      logo: '/logo.svg',
      nav: [
        { 
          text: '首页', 
          link: '/', 
          icon: 'iconfont icon-home', 
          activeMatch: '^/$|^/index.html$' 
        },
        {
          text: '文章',
          link: '/guide/',
          icon: 'iconfont icon-bookmark',
          activeMatch: '^/(?!index)(?!about)(.*/|.*html)$'
        },
        {
          text: '关于我',
          icon: 'iconfont icon-heart-o',
          link: '/about/',
          activeMatch: '^/about/'
        },
        {
          text: '',
          icon: 'iconfont icon-github big',
          link: 'https://github.com/vuejs/vitepress/releases'
        }
      ],
      sidebar: [
        ...getGuideSidebar(),
        ...getFunnySidebar()
      ],
      pages: await getPosts(),
      // 版权版本信息
      info: {
        copyright: 'Copyright © 2022 · 粤ICP备19008991号-3',
        beian: 'http://www.beian.gov.cn/',
        version: '0.0.1',
        author: 'Yaojunluo',
      }
    },
    markdown: {
      lineNumbers: true,
    }
  }
}



function getGuideSidebar() {
  return [
    {
      text: '前端修仙',
      link: '/code/',
      children: []
    },
    {
      text: '摸鱼日志',
      link: '/moyu/',
      children: [
        { text: '服务器常用技巧', link: '/moyu/server' },
        // { text: 'Frontmatter', link: '/guide/frontmatter' },
      ]
    }
  ]
}

function getFunnySidebar() {
  return [
    {
      text: '奇思妙想',
      link: '/idea/',
      children: [
        
      ]
    },
  ]
}



module.exports =  config()