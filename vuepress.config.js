const { searchPlugin } = require('@vuepress/plugin-search')
const { defaultTheme } = require('vuepress')
const { viteBundler } = require('@vuepress/bundler-vite')
module.exports = {
  lang: 'zh-CN',
  title: 'English study diary',
  description: '这是我的第一个 VuePress 站点',
  plugins: [
    searchPlugin({
      // 配置项
    }),

  ],
  theme: defaultTheme({
    logo: '/images/logo.png',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'github',
        link: 'https://github.com/azhen98/English-grammar',
      },
    ],
    sidebar: [{
      text: 'Foo',
      link: '/',
    },
    {
      text: '特殊疑问句',
      link: '/English/特殊疑问句.md',
    }]
  }),
  bundler: viteBundler({
    viteOptions: {
      build: {
        outDir: 'dist'
      }
    },
    vuePluginOptions: {},
  }),
}