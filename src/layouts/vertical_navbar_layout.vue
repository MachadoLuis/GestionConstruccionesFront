<script setup>
import Navbar from '@/components/navbar.vue';
import {useRoute} from 'vue-router'
import {provide, ref, watch} from "vue";
const current_route = useRoute();
const items_list = current_route.meta.items_list

const current_tower_stage = ref()

watch(current_tower_stage, () => {
  console.log("LANZADO DESDE EL NAVBAR",current_tower_stage.value)
})
const receive_stage = (stage) => {
  current_tower_stage.value = stage
}
provide('stage_info', current_tower_stage)
</script>

<template>
  <Navbar :items_list='items_list' @tower_stage='receive_stage'></Navbar>
  <v-main>
    <RouterView/>
  </v-main>
</template>

<style scoped>

</style>