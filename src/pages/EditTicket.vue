<template>
  <div>
    <Navbar />
    <main class="container">
      <h1>Edit Ticket</h1>
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
          <button class="btn btn-primary" type="submit">Save</button>
          <button type="button" class="btn btn-outline" @click="cancel">Cancel</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import { getTicketById, updateTicket } from '../utils/storage'
import { validateTicket } from '../utils/validation'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id
const form = reactive({ title: '', description: '', status: 'Open' })
const errors = reactive({})

onMounted(() => {
  const t = getTicketById(id)
  if (!t) return router.push('/dashboard')
  form.title = t.title
  form.description = t.description
  form.status = t.status
})

function handleSubmit() {
  const err = validateTicket(form)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, err)
  if (Object.keys(err).length) return
  try {
    updateTicket(id, form)
    router.push('/dashboard')
  } catch (e) {
    alert('Error updating ticket')
  }
}

function cancel() { router.push('/dashboard') }
</script>
