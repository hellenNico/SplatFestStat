<template>
  <div class="table-wrapper">
    <table>
      <tr>
        <th>No.</th>
        <th>ブキ名</th>
        <th>使用数</th>
      </tr>
      <tr class="table-item" v-for="(item, index) in tableList">
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
  const data = store.state.festData.find(item => item.name === store.state.currentTeam)
  return data.ranking
})
</script>

<style lang="scss" scoped>
.table-wrapper{
  margin-top: 20px;
  table{
    width: 100%;
    .table-item{
        &:nth-of-type(2){
          font-size: 20px;
          color: #C1AB05;
        }
        &:nth-of-type(3){
          font-size: 18px;
          color: #c0c0c0;
        }
        &:nth-of-type(4){
          color: #815a2b;
        }
      }
    td{
      padding: 4px;
      border-bottom: 1px solid #cccccc;
    }
  }
}
</style>