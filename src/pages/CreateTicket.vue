<template>
  <div>
    <Navbar />
    <main class="container">
      <h1>Create Ticket</h1>
      <form @submit.prevent="handleSubmit" class="card form-card" novalidate>
        <label for="title">Title</label>
        <input id="title" v-model="form.title" />
        <div v-if="errors.title" class="form-error" role="alert">{{ errors.title }}</div>

        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" rows="6"></textarea>
        <div v-if="errors.description" class="form-error" role="alert">{{ errors.description }}</div>

        <label for="status">Status</label>
        <select id="status" v-model="form.status">
          <option>Open</option>
          <option>Closed</option>
        </select>

        <div class="form-actions">
          <button class="btn btn-primary" type="submit">Create</button>
          <button type="button" class="btn btn-outline" @click="cancel">Cancel</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from '../components/Navbar.vue'
import { createTicket } from '../utils/storage'
import { validateTicket } from '../utils/validation'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ title: '', description: '', status: 'Open' })
const errors = reactive({})

function handleSubmit() {
  const err = validateTicket(form)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, err)
  if (Object.keys(err).length) return
  createTicket(form)
  router.push('/dashboard')
}

function cancel() { router.push('/dashboard') }
</script>
