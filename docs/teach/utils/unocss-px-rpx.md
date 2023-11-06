

最近公司在做小程序的项目，因为之前一直在写 web 项目，经常使用 unocss 这个工具，所以这次也想在 uniapp 里面使用这个插件。但是遇到了 px 转换为 upx 的问题。众所周知，uniapp 的单位是 rpx，也是小程序的尺寸单位，所以在这里自行编写了一个插件。

最开始是用处的开源社区的一个项目，使用之后发现指令处理有问题，例如 height 400px 会被处理为 100rem， 但是如果是 line height 400px 就会被处理成很离谱的数字。我大概看拉一下作者的实现，感觉过于复杂了，本着自己的需求就开发一个适合自己的插件。

先说一下思路，在 uniapp 的多端编译里面也有多种尺寸单位，web端是 rem，小程序端是 rpx，
rpx -> rem uniapp 内部已经处理了。所以我们只需要将 px 转为 rpx。剩下的就丢给 uniapp处理。

其实代码很简单，模仿官方预设 @unocss/preset-rem-to-px 这个插件就可以搞定。下面的核心代码就是 `i[1] = value.replace(pxToVwRE, (_, p1) => `${p1}rpx`);` 匹配到字符串的 px 将其替换为 rpx。其实大部分逻辑 unocss 都已经帮我们处理好了。
```js
const pxToVwRE = /(-?[\.\d]+)px/g;
export default function pxToVwPreset() {
  return {
    name: '@unocss/preset-px-to-upx',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1];
        if (typeof value === 'string' && pxToVwRE.test(value)) {
          i[1] = value.replace(pxToVwRE, (_, p1) => `${p1}rpx`);
        }
      });
    },
  };
}
```

在使用的过程中也遇到问题，就是在使用 unocss 的指令时出现了 uniapp 没有处理的单位。

![图 0](https://cdn.jsdelivr.net/gh/Journey98/A-week-to-learn@assert/image/47c1735b0d9b09a4fe2911acf9a916d66d6037f9405d2161775c6f22e2fa48a0.png)  


![图 1](https://cdn.jsdelivr.net/gh/Journey98/A-week-to-learn@assert/image/ecaaecc35c054bcabc42900839c3a60a2bf82a2913c975893369ff7547bb032d.png)  


这里的问题是因为在 vite 的执行顺序上 unocss 的 transformerDirectives 模块处理时机晚于 uniapp 插件的处理时间那么就会出现上面的现象。所以要配置一下 unocss 的 transformerDirectives 处理时机 

[unocss transformers  地址](https://unocss.dev/config/transformers#transformers)

[vite文档 enforce 字段](https://cn.vitejs.dev/guide/api-plugin.html#plugin-ordering)

`transformerDirectives({
      enforce: 'pre',
    })`

[unocss 源码地址](https://github.com/unocss/unocss/blob/bda907f15ed2ae0631dd493a3fe21f037f0ed114/packages/vite/src/index.ts#L44)

```ts
export default function UnocssPlugin<Theme extends object>(
  configOrPath?: VitePluginConfig<Theme> | string,
  defaults: UserConfigDefaults = {},
): Plugin[] {
  const ctx = createContext<VitePluginConfig>(configOrPath as any, {
    envMode: process.env.NODE_ENV === 'development' ? 'dev' : 'build',
    ...defaults,
  })
  const inlineConfig = (configOrPath && typeof configOrPath !== 'string') ? configOrPath : {}
  const mode = inlineConfig.mode ?? 'global'

  const plugins = [
    ConfigHMRPlugin(ctx),
    ...createTransformerPlugins(ctx),
    ...createDevtoolsPlugin(ctx, inlineConfig),
    {
      name: 'unocss:api',
      api: <UnocssVitePluginAPI>{
        getContext: () => ctx,
        getMode: () => mode,
      },
    },
  ]

  if (inlineConfig.inspector !== false)
    plugins.push(UnocssInspector(ctx))

  if (mode === 'per-module') {
    plugins.push(...PerModuleModePlugin(ctx))
  }
  else if (mode === 'vue-scoped') {
    plugins.push(VueScopedPlugin(ctx))
  }
  // @ts-expect-error alerts users who were already using this mode before it became its own package
  else if (mode === 'svelte-scoped') {
    throw new Error('[unocss] svelte-scoped mode is now its own package, please use @unocss/svelte-scoped according to the docs')
  }
  else if (mode === 'shadow-dom') {
    plugins.push(ShadowDomModuleModePlugin(ctx))
  }
  else if (mode === 'global') {
    plugins.push(...GlobalModePlugin(ctx))
  }
  else if (mode === 'dist-chunk') {
    plugins.push(
      ChunkModeBuildPlugin(ctx),
      ...GlobalModeDevPlugin(ctx),
    )
  }
  else {
    throw new Error(`[unocss] unknown mode "${mode}"`)
  }

  return plugins.filter(Boolean) as Plugin[]
}
```

可以看到 unocss 最终返回的是一个插件数组, 这就代表着 unocss 内部返回了多个适用于 vite 的插件, vite 会一个一个执行他们.

```ts
  const plugins = [
    ConfigHMRPlugin(ctx),
    ...createTransformerPlugins(ctx),
    ...createDevtoolsPlugin(ctx, inlineConfig),
    {
      name: 'unocss:api',
      api: <UnocssVitePluginAPI>{
        getContext: () => ctx,
        getMode: () => mode,
      },
    },
  ]
```
如果你的 vite.config.ts 是这样的

```ts
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// import Components from 'unplugin-vue-components/vite'

import Components from '@uni-helper/vite-plugin-uni-components'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: './typing/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components/', 'src/uni_modules/hex-ui/', 'src/uni_modules/z-paging/components/'],
      dts: './typing/components.d.ts',
    }),
    uni(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components/'),
    },
  },
})
```

那么 vite 的 plugin 的参数最终是 

```ts
plugins: [ unocss 返回的插件就是类似一个数组的 [PluginA(), { /* PluginA configuration */ }],[PluginB(), { /* PluginB configuration */ }],[PluginC(), { /* PluginC configuration */ }], Components 返回的插件 xxxx ]
```

这个时候如果你的 unocss 内部的 transformer 设置了 enforce: 'pre', 那么最终被 unocss 返回出来的就是一个强制修改执行顺序的插件, vite 执行这个插件的时候就会优先执行这个设置了 `enforce: 'pre'` 的插件


## 使用

下面是正确的使用方式。这里会发现多了一个 `@unocss/preset-rem-to-px` 这个插件是为了兼容以下使用方式 `<div class="w-30"></div>`, 这个时候就需要将 rem 转为 px了。
```ts
import { defineConfig } from 'unocss/vite'
import { presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import pxToUpx from 'unocss-preset-px-to-rpx'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  //@ts-ignore
  presets: [presetUno(), presetRemToPx(), pxToUpx()],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
})
```
