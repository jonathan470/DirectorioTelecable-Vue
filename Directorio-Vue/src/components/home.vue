<template>
  <div class="layout">
    <header class="layout-header">
      <div class="layout-header-logo">
        <img src="../assets/Logo.png" alt="Telecable Logo" class="logo" />
        <h1>Directorio Telecable</h1>
      </div>
      <!-- barra de navegacion -->
      <div class="layout-header-bar">
        <div class="layout-header-nav">
          <nav id="app-nav" class="nav">
            <a href="#oficinas" class="nav-link">Oficinas</a>
            <a href="#desarrollos" class="nav-link">Desarrollos</a>
            <a href="#extensiones" class="nav-link">Extensiones (PBX)</a>
            <a href="#formularios" class="nav-link">Formularios ventas</a>
          </nav>
        </div>
      </div>
    </header>
    <section id="app-content" class="content">
      <!-- Contenido dinámico cargado por app.js -->
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-header {
  display: flex;
  text-align: center;
  padding: 5px;
  border-bottom: solid #919090;
  background-color: #e0e0e0;
  border-radius: 10px;
}
.layout-header-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: auto;
  font-weight: bold;
  font-size: 16px;
  padding-left: 5px;
}

.logo {
  height: 60px;
  width: 230px;
  gap: 10px;
  border-radius: 10px;
}

.layout-header-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.layout-header-nav {
  display: flex;
  gap: 30px;
  font-weight: bold;
  font-size: 20px;
}

.nav-link {
  text-decoration: none;
  color: #000000;
  padding: 15px 25px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-link:hover {
  background-color: #3a5ba1;
  color: #fff;
  border-radius: 10px;
}


</style>
