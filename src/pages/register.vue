<script setup>
import {computed, ref} from "vue";
import UserInfoForm from '@/components/user_info_form.vue'
import UserForm from '@/components/user_form.vue'

const component = ref(UserInfoForm)


const change_form = (bool) => {
  if(!bool){
    return
  }
  component.value=UserForm
}
</script>

<template>
  <v-sheet class="fill-height d-flex" style="background-color:#9B16F3">
    <v-container class="align-self-center" max-width="30rem">
      <component :is="component" @form_success="change_form"></component>
    </v-container>
  </v-sheet>
</template>

<style scoped>

</style>