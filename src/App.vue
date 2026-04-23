<script setup>
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import VerticalNavbarLayout from '@/layouts/vertical_navbar_layout.vue'
import HorizontalNavbarLayout from '@/layouts/horizontal_navbar_layout.vue'

const current_route = useRoute();
const layout_component = computed(() => {
  if(current_route.meta.layout === 'vertical_navbar_layout'){
    return VerticalNavbarLayout;
  }else{
    return HorizontalNavbarLayout;
  }
})

</script>
<template>
  <v-app style="background-color:#F5F5F5">
    <component :is="layout_component">
      <RouterView/>
    </component>
  </v-app>
</template>
