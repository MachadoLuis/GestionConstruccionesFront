<script setup>
import {useField, useForm} from "vee-validate"
const {handleSubmit} = useForm({
  validationSchema: {
    username(value) {return value ? true : "El nombre de usuario es requerido"},
    password(value) {
      if(!value){
        return "La contraseña de usuario es requerida"
      }
      const password_regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
      if(!password_regex.test(value)){
        return 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial'
      }
      return true
    },
    confirm_password(value, context) {
      if(!value){
        return "Ingrese la contraseña de usuario"
      }
      const password = context.form.password
      if(value !== password){
        return "La contraseña no coincide"
      }
      return true
    }
  }
})

const user_name = useField('username')
const user_password = useField('password')
const confirm_password = useField('confirm_password')

const submit = handleSubmit(values => {
  console.log(values)
})
</script>

<template>
    <h2>Granite Resonance</h2>
    <form @submit.prevent="submit">
      <v-text-field
          v-model="user_name.value.value"
          :error-messages="user_name.errorMessage.value"
          label="Usuario"
      />
      <v-text-field
          v-model="user_password.value.value"
          :error-messages="user_password.errorMessage.value"
          label="Contraseña"
      />
      <v-text-field
          v-model="confirm_password.value.value"
          :error-messages="confirm_password.errorMessage.value"
          label="Confirmar Contraseña"
      />
      <v-btn color="#A188FB" min-width="50%" type="submit">Registrar</v-btn>
    </form>
</template>

<style scoped>

</style>