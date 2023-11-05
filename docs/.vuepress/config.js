// const { searchPlugin } = require('@vuepress/plugin-search')
import { searchPlugin } from '@vuepress/plugin-search'
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from 'vuepress'
import { defineUserConfig } from 'vuepress'

// const { defaultTheme } = require('vuepress')
// const { viteBundler } = require('@vuepress/bundler-vite')
export default defineUserConfig({
  base: '/blog/',
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
        link: '/teach/utils/rollup-alias.md',
        activeMatch: '^/teach/'
      }, {
        text: '英语',
        link: '/english/Special-questions.md',
        activeMatch: '^/english/'
      },
      {
        text: 'github',
        link: 'https://github.com/Journey98/blog',
      },
    ],
    sidebar: {
      "/teach/": [
        {
          text: 'unocss单位px转rpx,适配uniapp',
          link: '/teach/utils/unocss-px-rpx.md',
        },
        {
          text: 'rollup别名插件匹配原理',
          link: '/teach/utils/rollup-alias.md',
        },
        
        {
          text: 'http报文结构',
          link: '/teach/http/http-message.md',
        },
        {
          text: 'js基础',
          collapsible: true,
          children: [{
            text: '手写promise',
            link: '/teach/base/handwriting-promise.md',
          },
          {
            text: '标签语义化',
            link: '/teach/base/semantic.md',
          },
          {
            text: 'css面试题',
            link: '/teach/base/css-interview.md',
          },
          {
            text: 'js基础',
            link: '/teach/base/js-fundamentals.md',
          }, {
            text: '手写bind-call',
            link: '/teach/base/handwriting-bind-call.md',
          },
          {
            text: '微任务,事件队列',
            link: '/teach/base/microtask-event-queue.md',
          },
          {
            text: '关于axios拦截器的实现',
            link: '/teach/base/axios-interceptor.md',
          },
          {
            text: 'proxy 简单依赖收集',
            link: '/teach/base/proxy-simple.md',
          }]
        },
      ],
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
})
