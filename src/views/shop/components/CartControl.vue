<script setup lang="ts">
import type { IGood } from '@/types'
import { ref } from 'vue'

interface IProps {
  data: IGood
}
const props = defineProps<IProps>()

const cartCount = ref(props.data.cartCount)
const minus = () => {
  cartCount.value--
}
const add = () => {
  cartCount.value++
}
</script>

<template>
  <div class="shop-cart-control">
    <Transition name="move">
      <div v-if="cartCount" class="minus" @click.stop="minus"></div>
    </Transition>
    <Transition name="fade">
      <div v-if="cartCount" class="count">{{ cartCount }}</div>
    </Transition>
    <div class="add" @click.stop="add"></div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart-control {
  display: flex;
  align-items: center;
  height: 22px;
  .add {
    background: var(--op-primary-color);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    position: relative;
    &:before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transform: translate(-50%, -50%);
    }
    &:after {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  .count {
    width: 30px;
    text-align: center;
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.2s ease-out;
    }
    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
  }
  .minus {
    background: white;
    border: 1px solid var(--op-primary-color);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    box-sizing: border-box;
    position: relative;
    &:before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: var(--op-primary-color);
      border-radius: 2px;
      transform: translate(-50%, -50%);
    }

    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.3s ease-out;
    }
    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
      transform: translate(34px) rotate(180deg);
    }
  }
}
</style>
