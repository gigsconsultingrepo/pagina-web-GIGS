<template>
  <div class="not-found">
    <div class="container">
      <svg class="robot" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="20" width="100" height="60" rx="10" fill="#D0D0D0" />
        <rect x="65" y="0" width="70" height="30" rx="5" fill="#D0D0D0" />
        <circle cx="80" cy="15" r="4" fill="#333" />
        <circle cx="120" cy="15" r="4" fill="#333" />
        <line x1="100" y1="0" x2="100" y2="-15" stroke="#333" stroke-width="2" />
        <circle cx="100" cy="-17" r="3" fill="#333" />
        <rect x="80" y="90" width="40" height="60" fill="#D0D0D0" />
        <rect x="70" y="150" width="60" height="10" fill="#333" />
      </svg>

      <h1>Error 404</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <router-link class="back-link" to="/">Volver al inicio</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
}

.container {
  text-align: center;
}

.robot {
  margin-bottom: 20px;
}

h1 {
  font-size: 3em;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #666;
}

.back-link {
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: #2980b9;
}
</style>