<template>
  <div>
    <Navbar />
    <main class="container">
      <div class="auth-card card">
        <h1>Create account</h1>
        <form @submit.prevent="handleSubmit" novalidate>
          <label for="email">Email</label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" />
          <div v-if="errors.email" class="form-error" role="alert">{{ errors.email }}</div>

          <label for="password">Password</label>
          <input id="password" v-model="form.password" type="password" autocomplete="new-password" />
          <div v-if="errors.password" class="form-error" role="alert">{{ errors.password }}</div>

          <div class="form-actions">
            <button class="btn btn-primary" type="submit">Sign up</button>
            <RouterLink to="/login" class="btn btn-outline">Have an account?</RouterLink>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import { useRouter } from 'vue-router'
import { validateAuth } from '../utils/validation'
import { loginSession } from '../utils/auth'

const router = useRouter()
const form = reactive({ email: '', password: '' })
const errors = reactive({})

function handleSubmit() {
  const err = validateAuth(form)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, err)
  if (Object.keys(err).length) return
  loginSession({ email: form.email })
  router.push('/dashboard')
}
</script>
