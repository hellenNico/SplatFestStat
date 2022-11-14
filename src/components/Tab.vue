<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="item in tabItems"
      :key="item.name"
      :style="{background: setStyle(item)}"
      :class="{active: store.state.currentTeam === item.name}"
      @click="changeCurrentTeam(item.name)"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {useStore} from 'vuex'

const store = useStore()

const tabItems = computed(() => {
  return store.state.fesData.map(data =>{
    return {
      name: data.name,
      color: data.color,
    }
  })
})

const setStyle = (item) =>{
  return store.state.currentTeam === item.name ? `rgba(${item.color})` : "inherit"
}

const changeCurrentTeam = (name) =>{
  store.dispatch('setCurrentTeam', name)
}

</script>

<style lang='scss' scoped>
  .tabs{
    display: flex;
    .tab{
      border: 1px solid #cccccc;
      padding: 4px 2px;
      min-width: 100px;
      text-align: center;
      cursor: pointer;
      transition: opacity 0.3s;
      &:hover{
        opacity: 0.75;
      }
    }
  }
</style>