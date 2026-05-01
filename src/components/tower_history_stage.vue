<script setup>
import {onMounted, ref} from 'vue'

const props = defineProps({
  tower_info: {
    type: Object,
  },
  tower_stage_tasks:{
    type:Array,
    required:true
  }
})
const headers = [
  { title: 'Trabajo', key: 'Trabajo', align: 'center', sortable:false},
  { title: 'Descripción', key: 'Descripcion', align: 'center' , sortable:false},
  { title: 'Trabajadores', key: 'Trabajadores', align: 'center' , sortable:false},
]
onMounted(() => {
  console.log(props.tower_info.id_tower)
})
</script>

<template>
  <v-card flat class="rounded-0" style="background-color:transparent; color:#9B16F3">
    <h4 class="text-left">Torre {{props.tower_info.id_tower}} - Etapa {{props.tower_info.current_stage}} Se aperturo el 30/04/26 </h4>
    <h4 class="text-left">Tareas</h4>
    <v-sheet style="background-color:#A188FB">
      <v-data-table
          class="custom-table"
          :headers="headers"
          :items="props.tower_stage_tasks"
          items-per-page="-1"
      />
    </v-sheet>
  </v-card>
</template>

<style scoped>
.custom-table {
  background-color: transparent !important;
  color: #F5F5F5 !important;
  border-radius: 8px;
}
</style>