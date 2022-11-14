<template>
  <main>
    <div class="container" v-if="!loading">
      <h1>Splatoon3 フェス100ケツ集計</h1>
      <div class="list-wrapper">
        <div class="form-field">
          <label>フェスを選択</label>
          <select class="fest-list" @change="changeFestData">
            <option v-for="item in store.state.festList" :key="item.name" :value="item.name">{{item.name}}</option>
          </select>
        </div>
      </div>
      <div class="lead">
        <h2>開催期間：{{store.state.currentFest.date}}</h2>
      </div>
      <div class="stat-wrapper">
        <Tab />
        <StatTable v-if="store.state.currentTeam !== ''" />
      </div>
    </div>
  </main>
  <footer>
    <div class="copyright">(c) {{thisYear()}} hellen nico all rights revserved.</div>
  </footer>
</template>
<script setup>
import {ref, reactive, onMounted, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import Tab from './components/Tab.vue'
import StatTable from './components/StatTable.vue';

const store = useStore()

const loading = ref(true)

const getFestList = async() =>{
  const dataPath = 'data'
  const res =  await fetch(`${dataPath}/festlist.json`)
  if(res.status !== 200){
    console.log('error')
    return
  }
  const result = await res.json()
  return result.data.reverse()
}

const getFestData = async (json) => {
  const dataPath = 'data'
  const res =  await fetch(`${dataPath}/${json}`)
  if(res.status !== 200){
    console.log('error')
    return
  }
  const result = await res.json()
  console.log(result)
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

const changeFestData = async(e) =>{
  const target = store.state.festList.find(item => item.name === e.target.value)
  store.dispatch('setCurrentFest', target)
  const festData = await getFestData(store.state.currentFest.file)
  console.log(festData)
  store.dispatch('setFestData', festData)
  store.dispatch('setCurrentTeam', 'All')
}

const thisYear = () =>{
  return new Date().getFullYear()
}

onMounted(async ()=>{
  const festList = await getFestList()
  store.dispatch('setFestList', festList)
  store.dispatch('setCurrentFest', festList[0])
  const festData = await getFestData(store.state.currentFest.file)
  store.dispatch('setFestData', festData)
  store.dispatch('setCurrentTeam', 'All')
  loading.value = false
})

</script>

<style lang='scss' scoped>
main{
  padding-top: 60px;
  @media screen and (max-width: 1024px) {
    padding-top: 12px;
  }
}
.container{
  @media screen and (max-width: 1024px) {
    padding: 12px;
  }
  h1{
    font-size: 20px;
  }
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  .list-wrapper{
    margin-top: 32px;
    .form-field{
      display: flex;
      align-items: center;
      gap: 8px;
      .fest-list{
        padding: 4px 8px;
        border: 1px solid #aaaaaa;
        background: #ffffff;
        color: #333333;
      }
    }
  }

  .lead{
    margin-top: 12px;
  }
  .stat-wrapper{
    margin-top: 20px;
  }
}
footer{
    width: 100%;
    .copyright{
    width: 100%;
    margin: 12px auto;
    text-align: center;
    }
  }
</style>