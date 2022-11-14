<template>
  <div class="table-wrapper">
    <table>
      <tr>
        <th>No.</th>
        <th>ブキ名</th>
        <th>使用数</th>
      </tr>
      <tr v-for="(item, index) in tableList">
        <td>{{index + 1}}</td>
        <td>{{item.name}}</td>
        <td>{{item.count}}</td>
      </tr>
    </table>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import {useStore} from 'vuex'

const store = useStore()

const tableList = computed(() =>{
  const data = store.state.fesData.find(item => item.name === store.state.currentTeam)
  return data.ranking
})

const isActive = (item) =>{
  console.log(item)
}

</script>

<style lang="scss" scoped>
.table-wrapper{
  margin-top: 20px;
  table{
    width: 100%;
    td{
      padding: 4px;
      border-bottom: 1px solid #cccccc;
    }
  }
}
</style>