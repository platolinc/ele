<script setup lang="ts">
// import type { ISearchResult } from '@/types'
// import { ref, computed, watch } from 'vue'
// import OpSearch from '@/components/OpSearch.vue'
// import { fetchSearchData } from '@/api/search'
// import { useToggle } from '@/use/useToggle'
// import { useDebounce } from '@/use/useDebounce'

interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()
</script>

<template>
  <div class="search-view" @click="emits('cancel')">
    sousuo
    <!-- <OpSearch
      show-action
      v-model="searchValue"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('cancel')"
    ></OpSearch>
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">历史搜索</div>
      <TransitionGroup name="list">
        <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)">
          {{ v }}
        </div>
        <div class="history-tag" key="arrow" @click="toggleHistoryTag">
          <VanIcon v-if="isHistoryTagShown" name="arrow-up"></VanIcon>
          <VanIcon v-else name="arrow-down"></VanIcon>
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索~</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <div class="no-result" v-if="!searchResult.length">~暂无推荐~</div>
      </template>
    </div>-->
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 999;
}
</style>
