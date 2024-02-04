<script setup lang="ts">
import type { IShopDetail } from '@/types'
import { computed } from 'vue'
import { useToggle } from '@/use/useToggle'
// 优惠类型(枚举)
enum DiscountEnum {
  Reduction = 1,
  Dilivery = 2,
  Special = 3,
  Optional = 4,
}

interface IProps {
  data: IShopDetail
}
const props = defineProps<IProps>()
const [isPopupShown, showPopup] = useToggle()

const topThreeServices = computed(() => props.data.services.slice(0, 3))
const reduction = computed(() => {
  const reduction = props.data.discounts.find((v) => v.type === DiscountEnum.Reduction)
  return reduction ? reduction.content : []
})
const reductionLabel = computed(() => {
  return reduction.value.map((v) => `满${v.if}减${v.count}`)
})
</script>

<template>
  <div class="shop-header">
    <div class="shop-header__info">
      <div class="info__left">
        <div class="shop-name op-ellipsis">
          {{ data.shopName }}<span v-if="data.branch">{{ data.branch }}</span>
        </div>
        <div class="delivery">
          <div v-if="data.deliveryTags" class="delivery-tag op-thin-border">
            {{ data.deliveryTags[0] }}
          </div>
          <div class="delivery-time">{{ data.deliveryTime }}</div>
          <div class="monthly-count">月售 {{ data.monthlyCount }}</div>
        </div>
      </div>
      <div class="info__right">
        <img :src="data.postUrl" />
      </div>
    </div>
    <div class="shop-header__service">
      <div v-for="v in topThreeServices" :key="v.label" class="service">
        <VanIcon name="passed"></VanIcon>
        {{ v.label }}
      </div>
    </div>
    <div class="shop-header__announcement op-ellipsis">公告：{{ data.announcement }}</div>
    <div class="shop-header__redbags">
      <div v-for="v in data.redbags" :key="v.type" class="redbag">
        <span class="redbag-left">
          ￥<span class="count">{{ v.count }}</span>
          <span>{{ v.if }}</span>
        </span>
        <span class="redbag-right">领</span>
      </div>
    </div>
    <div class="shop-header__discounts" @click="showPopup">
      <div class="flex">
        <div v-for="v in reductionLabel" :key="v" class="activity op-thin-border">
          {{ v }}
        </div>
      </div>
      <VanIcon name="arrow-down" color="rgb(207, 207, 207)"></VanIcon>
    </div>
  </div>

  <VanActionSheet class="shop-header__action-sheet" v-model:show="isPopupShown" title="红包优惠">
    <div class="content">
      <h4>红包</h4>

      <h4>商家会员专享</h4>
      <h4>优惠</h4>
    </div>
  </VanActionSheet>
</template>

<style lang="scss">
.shop-header {
  background: white;
  border-radius: 10px;
  font-size: 12px;
  padding: 10px;
  margin: var(--op-page-padding);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);

  &__info {
    display: flex;
    margin-bottom: 5px;

    .info__left {
      flex: 1;
      .shop-name {
        width: 90%;
        font-size: 19px;
        font-weight: bold;
        margin: 6px 0 8px 0;
      }
      .delivery {
        display: flex;
        .delivery-tag {
          color: var(--op-primary-color);
          padding: 1px 5px;
          &::before {
            border: 1px solid var(--op-primary-color);
          }
        }
        .delivery-time {
          margin-left: 10px;
        }
        .monthly-count {
          margin-left: 10px;
        }
      }
    }
    .info__right {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  &__service {
    display: flex;
    margin-bottom: 5px;

    .service {
      margin-right: 5px;
    }
  }

  &__announcement {
    color: gray;
  }

  &__redbags {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;

    .redbag {
      color: white;
      margin-right: 5px;
      display: flex;
      .redbag-left {
        display: flex;
        align-items: center;
        padding: 2px 4px;
        border-radius: 4px 2px 2px 4px;
        border-right: 2px dashed rgb(252, 91, 68);
        background: linear-gradient(to right, rgb(252, 120, 85), rgb(252, 91, 68));
        .count {
          font-size: 18px;
          margin-right: 4px;
        }
      }
      .redbag-right {
        display: flex;
        align-items: center;
        padding: 2px 10px 2px 4px;
        background: rgb(252, 91, 68);
        border-radius: 2px 4px 4px 2px;
      }
    }
  }

  &__discounts {
    display: flex;
    margin-top: 10px;

    .flex {
      flex: 1;
    }

    .activity {
      display: inline-block;
      color: rgb(247, 68, 68);
      padding: 0 4px;
      margin-right: 5px;
      margin-bottom: 2px;
      &::before {
        border: 1px solid Orgb(247, 68, 68);
      }
    }
  }
}
</style>
