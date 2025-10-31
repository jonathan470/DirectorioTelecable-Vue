<template>
  <div class="layout">
    <header class="layout-header">
      <div class="layout-header-logo">
        <img src="../assets/Logo.png" alt="Telecable Logo" class="logo" />
        <div class="logo-text">
          <h1>Directorio Telecable</h1>
          <p class="subtitle">Portal Corporativo</p>
        </div>
      </div>
      
      <nav class="layout-header-nav">
        <router-link to="/home/oficinas" class="nav-link">
          <span class="nav-icon">🏢</span>
          <span>Oficinas</span>
        </router-link>
        <router-link to="/home/desarrollos" class="nav-link">
          <span class="nav-icon">💻</span>
          <span>Desarrollos</span>
        </router-link>
        <router-link to="/home/extensiones" class="nav-link">
          <span class="nav-icon">📞</span>
          <span>Extensiones</span>
        </router-link>
        <a href="#" class="nav-link">
          <span class="nav-icon">📋</span>
          <span>Formularios</span>
        </a>
      </nav>

      <div class="layout-header-actions">
        <button class="user-menu" @click="toggleUserMenu">
          <span class="user-avatar">👤</span>
          <span class="user-name">Usuario</span>
          <span class="dropdown-arrow">▼</span>
        </button>
        
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="user-info">
            <div class="user-info-avatar">👤</div>
            <div class="user-info-text">
              <p class="user-info-name">Usuario</p>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <button @click="handleLogout" class="dropdown-item logout">
            <span class="dropdown-icon">⬅</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </header>

    <section class="content">
      <!-- Aquí se renderiza el contenido dinámico -->
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showUserMenu = ref(false)

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleProfile = () => {
  showUserMenu.value = false
  console.log('Ir a perfil')
}

const handleLogout = () => {
  showUserMenu.value = false
  localStorage.removeItem('usuarioAutenticado')
  router.push('/')
}

const handleClickOutside = (event) => {
  const userMenu = document.querySelector('.user-menu')
  const dropdown = document.querySelector('.user-dropdown')
  
  if (userMenu && dropdown && 
      !userMenu.contains(event.target) && 
      !dropdown.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  gap: 40px;
  min-height: 90px;
}

.layout-header-logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  height: 70px;
  width: 280px;
  object-fit: contain;
  border-radius: 8px;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo-text h1 {
  font-size: 26px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
  line-height: 1;
}

.subtitle {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

.layout-header-nav {
  display: flex;
  gap: 12px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #334155;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: transparent;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 3px;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  background: linear-gradient(135deg, rgba(42, 82, 152, 0.1) 0%, rgba(30, 60, 114, 0.1) 100%);
  color: #1e3c72;
  transform: translateY(-2px);
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.nav-icon {
  font-size: 22px;
}

.layout-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #334155;
  font-size: 16px;
}

.user-menu:hover {
  border-color: #2a5298;
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.15);
}

.user-avatar {
  font-size: 24px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  border-radius: 50%;
  filter: grayscale(100%) brightness(2);
}

.dropdown-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
  color: #94a3b8;
}

.user-menu:hover .dropdown-arrow {
  transform: translateY(2px);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 280px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: dropdownSlide 0.3s ease;
  overflow: hidden;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.user-info-avatar {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  border-radius: 50%;
  font-size: 24px;
  filter: grayscale(100%) brightness(2);
}

.user-info-text {
  flex: 1;
}

.user-info-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.user-info-email {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  color: #334155;
  text-align: left;
}

.dropdown-item:hover {
  background: #f8fafc;
}

.dropdown-item.logout {
  color: #dc2626;
}

.dropdown-item.logout:hover {
  background: #fef2f2;
}

.dropdown-icon {
  font-size: 18px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  flex: 1;
}

@media (max-width: 1024px) {
  .layout-header {
    flex-wrap: wrap;
    padding: 16px 20px;
  }

  .layout-header-nav {
    width: 100%;
    order: 3;
    justify-content: flex-start;
    overflow-x: auto;
    padding-top: 12px;
    border-top: 1px solid #e2e8f0;
    margin-top: 12px;
  }

  .nav-link {
    font-size: 14px;
    padding: 8px 16px;
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .logo {
    height: 40px;
    width: 160px;
  }

  .logo-text h1 {
    font-size: 16px;
  }

  .subtitle {
    display: none;
  }

  .user-name {
    display: none;
  }

  .nav-link span:last-child {
    display: none;
  }

  .nav-icon {
    font-size: 20px;
  }
}
</style>