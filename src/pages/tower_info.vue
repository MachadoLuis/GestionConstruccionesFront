<script setup>
import TowerHistoryStage from '@/components/tower_history_stage.vue'
import {inject, markRaw, nextTick, ref, shallowRef, watch} from 'vue'
import {useRoute} from 'vue-router'
import OpenTowerStage from "@/components/open_tower_stage.vue";

const views = {
  TowerHistoryStage: TowerHistoryStage,
  OpenTowerStage: OpenTowerStage
}
const current_route = useRoute()
const id_tower = current_route.params.id_tower
const current_stage = inject('stage_info')
const current_view = inject('new_view')

const current_component = ref(markRaw(TowerHistoryStage))
const tasks_shown = ref([
  {Trabajo:"ETAPA1", Descripcion:"NOSEE", Trabajadores: 100},
  {Trabajo:"ETAPA1", Descripcion:"NOSEE", Trabajadores: 50},
  {Trabajo:"ETAPA1", Descripcion:"NOSEE", Trabajadores: 70},
  {Trabajo:"ETAPA1", Descripcion:"NOSEE", Trabajadores: 10}
])

const get_tower_stage_tasks = async (id_tower) => {}

watch(current_stage, () => {
  tasks_shown.value.forEach(task => {task.Trabajo = `ETAPA${current_stage.value}`})
})

watch(current_view, () => {
  const component = views[current_view.value]
  if(component) {
    current_component.value = markRaw(component)
  }
})
</script>

<template>
  <v-container>
    <component
      :is="current_component"
      :tower_info="{id_tower, current_stage}"
      :tower_stage_tasks="tasks_shown"
    />
  </v-container>
</template>

<style scoped>

</style>