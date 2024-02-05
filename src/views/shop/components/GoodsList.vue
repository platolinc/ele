<script setup lang="ts">
import type { IMenu } from '@/types'
import type OpLoadingView from '@/components/OpLoadingView.vue'
import { useAsync } from '@/use/useAsync'
import { fetchGoodsListData } from '@/api/goods'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import GoodsItem from './GoodsItem.vue'

const route = useRoute()
const { id } = route.params
const { data, pending } = useAsync(
  () => fetchGoodsListData(id as string).then((v) => v.data),
  [] as IMenu[],
)

const categoryActive = ref(0)
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-goods-list">
      <VanSidebar v-model="categoryActive">
        <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"></VanSidebarItem>
      </VanSidebar>
      <div class="list">
        <template v-for="v in data" :key="v.label">
          <div class="category-name">{{ v.label }}</div>
          <GoodsItem v-for="cv in v.goods" :key="cv.id" :data="cv" />
        </template>
      </div>
    </div>
  </OpLoadingView>
</template>

<style lang="scss" scoped>
.shop-goods-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px var(--van-padding-sm);
  --van-sidebar-font-size: 13px;

  display: flex;

  .list {
    flex: 1;
    margin: 0 10px;

    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
    }
  }
}
</style>
