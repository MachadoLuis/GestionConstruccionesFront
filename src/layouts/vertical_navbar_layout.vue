<script setup>
import Navbar from '@/components/navbar.vue';
import {useRoute} from 'vue-router'
import {provide, ref, watch, computed} from "vue";

const current_route = useRoute();

const items_list = computed(() => {
  return current_route.meta.items_list || [];
});

const current_tower_stage = ref();
const current_view = ref();

const receive_stage = (stage) => {
  current_tower_stage.value = stage;
}

const change_view = (view) => {
  current_view.value = view;
}

provide('stage_info', current_tower_stage);
provide('new_view', current_view);
</script>

<template>
  <Navbar :items_list='items_list' @tower_stage='receive_stage' @view="change_view"></Navbar>
  <v-main>
    <RouterView/>
  </v-main>
</template>

<style scoped>

</style>