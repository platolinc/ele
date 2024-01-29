<script setup lang="ts">
import type { IHomeInfo } from '@/types'
import TheTop from './components/TheTop.vue'
import { useToggle } from '@/use/useToggle'
import SearchView from '@/views/search/SearchView.vue'
import { useAsync } from '@/use/useAsync'
import { fetchHomePageData } from '@/api/home'

const recomments = [
  {
    value: 1,
    label: '牛腩',
  },
  {
    value: 2,
    label: '色拉',
  },
]

const [isSearchViewShown, toggleSearchView] = useToggle(false)

const { data, pending } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <SearchView v-if="isSearchViewShown" @cancel="toggleSearchView"></SearchView>
    </Transition>
    <TheTop :recomments="recomments" @searchClick="toggleSearchView" />
    {{ pending }}
    {{ data }}
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
