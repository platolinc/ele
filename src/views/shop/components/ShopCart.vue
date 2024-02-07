<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png'
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png'
import { useToggle } from '@/use/useToggle'
import GoodsItem from './GoodsItem.vue'
import { showConfirmDialog } from 'vant'

const store = useCartStore()
const packageFee = ref(5)
const cartLogo = computed(() => (store.total ? CartLogo : EmptyCartLogo))
const [isCartListShown, toggleCartListShown] = useToggle(false)
const showCartListPopup = () => {
  if (!store.total) {
    return
  }
  toggleCartListShown()
}
const removeAll = () => {
  showConfirmDialog({
    title: '确定清空购物车?',
  })
    .then(() => {
      store.setCartItems([])
      toggleCartListShown()
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<template>
  <div class="shop-cart">
    <VanPopup v-model:show="isCartListShown" round position="bottom">
      <div class="shop-cart__popup">
        <div class="shop-cart__tips">
          <div>满49减3，还差<span>24.2</span>元<span> 去凑单></span></div>
          <div class="tips-detail">已包含：配送费减 5、特价优惠20元</div>
        </div>
        <div class="popup__all">
          <VanCheckbox
            checked-color=" rgb(31, 175, 243)"
            :model-value="store.isAllChecked"
            @update:model-value="(isAllChecked) => store.toggleAllChecked(isAllChecked)"
          >
            <span class="all-label">全选</span>
          </VanCheckbox>
          <div class="all-total">(已选{{ store.total }}件)</div>
          <span class="all-remove" @click="removeAll"><VanIcon name="delete-o" />清空</span>
        </div>
        <div class="popup__goods">
          <VanCheckboxGroup
            checked-color=" rgb(31, 175, 243)"
            :model-value="store.state.checkedIds"
            @update:model-value="(ids) => store.setCheckedIds(ids)"
          >
            <div v-for="v in store.state.items" :key="v.id" class="goods-item">
              <VanCheckbox :name="v.id"></VanCheckbox>
              <GoodsItem class="flex" :data="v"></GoodsItem>
            </div>
          </VanCheckboxGroup>
        </div>
        <div class="popup__fee">
          <span>包装费</span>
          <span class="label">
            另需<span class="fee">￥{{ packageFee }}</span>
          </span>
        </div>
      </div>
    </VanPopup>
    <div class="shop-cart__tips">配送费<span>满0.01减7</span>、全店<span>满49减3</span></div>
    <div class="shop-cart__content" @click="showCartListPopup">
      <div class="content__left">
        <div class="cart-logo">
          <img :src="cartLogo" />
          <div v-if="store.total" class="total">{{ store.total }}</div>
        </div>
        <div class="cart-info">
          <div class="cart-info__price">
            <template v-if="store.total">
              <span class="cart-info__price--now">
                ￥<span>{{ store.totalPrice }} </span>
              </span>
              <span class="cart-info__price--old"> ￥{{ store.totalOldPrice }}</span>
            </template>
            <span v-else class="cart-info__price--empty">未选购商品</span>
          </div>
          <div class="cart-info__desc">另需配送费 {{ packageFee }} 元</div>
        </div>
      </div>
      <div class="content__right">
        <div v-if="store.total" class="order-btn">
          <div class="label">领券结算</div>
          <div>预计券后￥{{ store.totalPrice }}</div>
        </div>
        <div v-else class="order-btn order-btn--empty">￥20起送</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  --van-checkbox-size: 16px;

  &__popup {
    background: var(--op-gray-bg-color);

    .popup__all {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 10px;
      background: white;

      .all-label {
        font-size: 14px;
        font-weight: bold;
      }

      .all-total {
        flex: 1;
        color: gray;
        font-size: 12px;
      }

      .all-remove {
        color: gray;
      }
    }

    .popup__goods {
      margin-bottom: 10px;
      padding: 15px 10px 0 10px;
      background: white;
      max-height: 400px;
      overflow: auto;

      .goods-item {
        display: flex;
        margin-bottom: 15px;

        .van-checkbox {
          margin-right: 10px;
        }

        .flex {
          flex: 1;
        }
      }
    }

    .popup__fee {
      padding: 14px;
      font-size: 14px;
      background: rgb(254, 254, 254);

      .label {
        margin-left: 30px;
        font-size: 14px;
        color: gray;

        .fee {
          color: red;
          font-size: 18px;
        }
      }
    }
  }

  &__tips {
    text-align: center;
    background: rgb(253, 245, 222);
    font-size: 12px;
    padding: 8px 0;
    span {
      color: rgb(255, 61, 61);
    }
    .tips-detail {
      color: gray;
    }
  }

  &__content {
    width: 100%;
    padding: 0px 10px;
    height: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content__left {
      display: flex;
      align-items: center;
      .cart-logo {
        position: relative;
        img {
          width: 50px;
          height: 44px;
        }
        .total {
          position: absolute;
          right: 0;
          top: 2px;
          transform: translateX(40%);
          width: 17px;
          height: 17px;
          background: rgb(255, 61, 61);
          color: white;
          border-radius: 50%;
          text-align: center;
          font-size: 12px;
          line-height: 17px;
        }
      }
      .cart-info {
        color: gray;
        margin-left: 10px;
        font-size: 12px;

        &__price {
          line-height: 18px;

          &--now {
            font-weight: bold;
            color: rgb(20, 16, 16);
            span {
              font-size: 18px;
            }
          }
          &--old {
            text-decoration: line-through;
          }
          &--empty {
            font-weight: bold;
          }
        }
      }
    }
    .content__right {
      .order-btn {
        height: 36px;
        padding: 0 18px;
        text-align: center;
        color: white;
        border-radius: 18px;
        font-size: 12px;
        background: var(--op-primary-color);
        .label {
          font-size: 14px;
          padding-top: 2px;
        }

        &--empty {
          font-size: 16px;
          background: rgb(152, 152, 152);
          line-height: 36px;
        }
      }
    }
  }
}
</style>
