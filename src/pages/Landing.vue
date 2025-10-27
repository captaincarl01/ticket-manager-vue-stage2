<template>
  <div>
    <Navbar />
    <main class="container hero" role="main">
      <div class="hero-inner">
        <div class="hero-copy">
          <h1>Ticket Manager</h1>
          <p>Track issues, manage requests, and stay organized — built with simplicity and speed in mind.</p>
          <div class="hero-ctas">
            <RouterLink to="/login" class="btn btn-primary">Login</RouterLink>
            <RouterLink to="/signup" class="btn btn-outline">Sign up</RouterLink>
          </div>
        </div>
        <div class="hero-visual" aria-hidden>
          <svg viewBox="0 0 1440 320" class="wave" preserveAspectRatio="none">
            <path fill="#4f46e5" fill-opacity="1" d="M0,64L48,90.7C96,117,192,171,288,192C384,213,480,203,576,192C672,181,768,171,864,154.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64V320H0Z"/>
          </svg>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>
