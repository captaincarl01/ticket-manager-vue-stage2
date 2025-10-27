<template>
  <div>
    <Navbar />
    <main class="container">
      <div class="page-head">
        <h1>Dashboard</h1>
        <div><RouterLink to="/create" class="btn btn-primary">Create Ticket</RouterLink></div>
      </div>

      <div class="summary-grid">
        <div class="card"><h4>Total</h4><strong>{{ total }}</strong></div>
        <div class="card"><h4>Open</h4><strong>{{ open }}</strong></div>
        <div class="card"><h4>Closed</h4><strong>{{ closed }}</strong></div>
      </div>

      <section class="analytics card">
        <h2>Ticket analytics</h2>
        <TicketsChart :tickets="tickets" />
      </section>

      <section class="tickets-grid" aria-live="polite">
        <div v-if="tickets.length === 0" class="card">No tickets yet — create one.</div>
        <article v-for="t in tickets" :key="t.id" class="ticket-card card">
          <h3>{{ t.title }}</h3>
          <p>{{ t.description }}</p>
          <div class="meta">Status: {{ t.status }} • Created: {{ new Date(t.createdAt).toLocaleString() }}</div>
          <div class="actions">
            <RouterLink :to="`/edit/${t.id}`" class="btn btn-outline">Edit</RouterLink>
            <button class="btn" @click="handleDelete(t.id)">Delete</button>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import TicketsChart from '../components/TicketsChart.vue'
import { getTickets, deleteTicket } from '../utils/storage'
import { RouterLink } from 'vue-router'

const tickets = ref([])

function load() { tickets.value = getTickets() }
onMounted(load)

function handleDelete(id) {
  if (!confirm('Delete this ticket?')) return
  try {
    deleteTicket(id)
    load()
  } catch (err) {
    alert('Could not delete ticket')
  }
}

const total = computed(() => tickets.value.length)
const open = computed(() => tickets.value.filter(t => t.status === 'Open').length)
const closed = computed(() => tickets.value.filter(t => t.status === 'Closed').length)
</script>
