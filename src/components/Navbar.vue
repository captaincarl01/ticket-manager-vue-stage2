<template>
  <header class="site-header">
    <div class="container nav-row">
      <RouterLink to="/" class="brand">TicketManager<span class="dot">.</span></RouterLink>
      <nav class="nav" aria-label="Main navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="logged" to="/dashboard">Dashboard</RouterLink>
        <RouterLink v-if="!logged" to="/login">Login</RouterLink>
        <RouterLink v-if="!logged" to="/signup">Sign up</RouterLink>
      </nav>
      <div class="nav-actions">
        <span v-if="logged" class="muted">{{ session.email }}</span>
        <button v-if="logged" @click="handleLogout" class="btn">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { isLoggedIn, logoutSession, getSession } from '../utils/auth'

const router = useRouter()
const logged = computed(() => isLoggedIn())
const session = computed(() => getSession() || {})

function handleLogout() {
  logoutSession()
  router.push('/login')
}
</script>
