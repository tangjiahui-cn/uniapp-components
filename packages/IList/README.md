# IList

一个适用于 uni-app 列表查询的解决方案。

## Quick Start

基本使用。

```vue
<script>
async function mockQuery() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 30,
        list: Array(10).fill({ name: 'ddd' })
      })
    }, 300)
  })
}
</script>
<template>
  <IList :query="mockQuery" style="height: 60%; background: white; color: blue">
    <template #default="{ list }">
      <div v-for="item in list" style="height: 50px">
        {{ item.name }}
      </div>
    </template>
  </IList>
</template>
```

支持筛选项触发查询 （会重置到第一页）。

```vue
<script>
import { ref } from 'vue'

const filterRef = ref({
  count: 0
})

async function mockQuery() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 30,
        list: Array(10).fill({ name: 'ddd' })
      })
    }, 300)
  })
}
</script>
<template>
  <button @click="filterRef.count++">查询</button>
  <IList
    :query="mockQuery"
    :effectParams="[filterRef.count]"
    style="height: 60%; background: white; color: blue"
  >
    <template #default="{ list }">
      <div v-for="item in list" style="height: 50px">
        {{ item.name }}
      </div>
    </template>
  </IList>
</template>
```

导出组件内部实例。

```vue
<script>
import { ref } from 'vue'

const insRef = ref()
async function mockQuery() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 30,
        list: Array(10).fill({ name: 'ddd' })
      })
    }, 300)
  })
}
</script>
<template>
  <button @click="insRef.reset()">重置</button>
  <button @click="insRef.queryNextPage()">下一页</button>
  <IList
    ref="insRef"
    :query="mockQuery"
    style="height: 60%; background: white; color: blue"
  >
    <template #default="{ list }">
      <div v-for="item in list" style="height: 50px">
        {{ item.name }}
      </div>
    </template>
  </IList>
</template>
```
