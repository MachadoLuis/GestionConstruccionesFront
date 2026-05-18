<script setup>
import {useField, useForm} from "vee-validate";
import {useRouter} from "vue-router";

const emits = defineEmits(["form_success"])

const {handleSubmit, handleReset} = useForm({
  validationSchema:{
    user_info_company(value) {
      if(!value){
        return 'Nombre de compañia o constructora es requerida'
      }

      const string_regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

      if(!string_regex.test(value)) {
        return 'No se admiten numeros ni caracteres especiales'
      }
      return true
    },
    user_info_full_name(value) {
      if(!value){
        return 'Nombre completo del usuario es requerido'
      }

      const string_regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/

      if(!string_regex.test(value)) {
        return 'No se admiten numeros ni caracteres especiales'
      }
      return true
    },
    user_info_phone(value) {
      if(!value){
        return 'Numero telefonico del usuario es requerido'
      }

      const phone_regex = /^\d{9}$/

      if(!phone_regex.test(value)) {
        return 'No se admiten numeros de mas de 9 digitos'
      }
      return true
    },
    user_info_email(value) {
      if(!value){
        return 'Correo electronico del usuario es requerido'
      }

      const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if(!email_regex.test(value)) {
        return 'No se admite este formato de correo electronico'
      }
      return true
    }
  }
})

const user_info_company = useField("user_info_company")
const user_info_full_name = useField("user_info_full_name")
const user_info_phone = useField("user_info_phone")
const user_info_email = useField("user_info_email")

const submit = handleSubmit(values => {
  emits("form_success", true)
})

</script>

<template>
      <h2>Granite Resonance</h2>
      <form @submit.prevent="submit">
        <v-text-field
            v-model="user_info_company.value.value"
            :error-messages="user_info_company.errorMessage.value"
            label="Constructora"
        />
        <v-text-field
            v-model="user_info_full_name.value.value"
            :error-messages="user_info_full_name.errorMessage.value"
            label="Nombre Completo"
        />
        <v-text-field
            v-model="user_info_phone.value.value"
            :error-messages="user_info_phone.errorMessage.value"
            label="Numero Telefonico"
        />
        <v-text-field
            v-model="user_info_email.value.value"
            :error-messages="user_info_email.errorMessage.value"
            label="Correo Electronico"
        />
        <div class="d-flex justify-center ga-2" >
          <v-btn color="#A188FB" min-width="25%" type="submit">Continuar</v-btn>
          <v-btn color="#A188FB" min-width="25%" @click="handleReset">Limpiar</v-btn>
        </div>
      </form>
</template>

<style scoped>

</style>