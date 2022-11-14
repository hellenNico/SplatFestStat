<template>
  <div class="container">
    <h1>Splatoon3 フェス100ケツ集計</h1>
    <div class="stat-wrapper">
      <Tab />
      <StatTable v-if="store.state.currentTeam !== ''" />
    </div>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted} from 'vue'
import {useStore} from 'vuex'
import Tab from './components/Tab.vue'
import StatTable from './components/StatTable.vue';

const store = useStore()

const getFesData = async (json) => {
  const dataPath = 'data'
  const res =  await fetch(`${dataPath}/${json}`)
  if(res.status !== 200){
    console.log('error')
    return
  }
  const result = await res.json()
  let data = result.fest.teams.map(team =>{
    return {
      name: team.teamName,
      image: team.image,
      color: convertTo255([team.color.r, team.color.g, team.color.b, team.color.a]),
      ranking: setRanking(team.result.rankingHolders.nodes),
    }
  })
  let allRanking = []
  data.forEach(item => {
    allRanking.push(...item.ranking)
  })
  allRanking = allRanking.reduce((list, current) => {
    const weapon = list.find(item => item.name === current.name)
    if(weapon){
      weapon.count += current.count
    }else{
      list.push({
        name: current.name,
        count: current.count,
      })
    }
    return list
  }, []).sort(function(a, b) {
    return (a.count > b.count) ? -1 : 1;  //オブジェクトの昇順ソート
  })

  data = [
    {
      name: "All",
      image: "",
      color: [100, 100, 100],
      ranking: allRanking,
    },
    ...data,
  ]
  return data
}

const convertTo255 = (nums) => {
  return nums.map(num => {
    return Math.round(num * 255)
  })
}

const setRanking = (data) => {
  const weaponList = data.reduce((list, current) => {
    const weapon = list.find(item => item.name === current.weapon.name)
    if(weapon){
      weapon.count++
    }else{
      list.push({
        name: current.weapon.name,
        count: 1,
      })
    }
    return list
  }, []).sort(function(a, b) {
    return (a.count > b.count) ? -1 : 1;  //オブジェクトの昇順ソート
  })
  return weaponList
}

onMounted(async() =>{
  const fesData = await getFesData('fes2.json')
  store.dispatch('setFesData', fesData)
  store.dispatch('setCurrentTeam', 'All')
})
</script>

<style lang='scss' scoped>
.container{
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  .stat-wrapper{
    margin-top: 60px;
  }
}
</style>