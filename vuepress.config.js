// const { searchPlugin } = require('@vuepress/plugin-search')
import { searchPlugin } from '@vuepress/plugin-search'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from 'vuepress'
// const { defaultTheme } = require('vuepress')
// const { viteBundler } = require('@vuepress/bundler-vite')
module.exports = {
  lang: 'zh-CN',
  title: '阿臻的博客',
  description: '这是我的第一个 VuePress 站点',
  plugins: [searchPlugin()],
  theme: defaultTheme({
    logo: '/images/logo.png',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '技术',
        link: '/teach/handwriting-promise',
      }, {
        text: '英语',
        link: '/english/Special-questions.md',
      },
      {
        text: 'github',
        link: 'https://github.com/azhen98/English-grammar',
      },
    ],
    sidebar: {
      "/teach/": [{
        text: '手写promise',
        link: '/teach/handwriting-promise.md',
      },
      {
        text: '标签语义化',
        link: '/teach/semantic.md',
      },
      {
        text: 'css面试题',
        link: '/teach/css-interview.md',
      },
      {
        text: 'js基础',
        link: '/teach/js-fundamentals.md',
      }],
      '/english/': [{
        text: '特殊疑问句',
        link: '/english/Special-questions.md',
      }]
    }
    // sidebar: [{
    //   text: 'Foo',
    //   link: '/',
    // },
    // {
    //   text: '特殊疑问句',
    //   link: '/English/Special-questions.md',
    // }]
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