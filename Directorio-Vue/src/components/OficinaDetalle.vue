<template>
  <div class="oficina-detalle">
    <div class="detalle-header">
      <button @click="volver" class="btn-volver">
        <span class="icon">←</span>
        <span>Volver a Oficinas</span>
      </button>
      <h1 class="oficina-titulo">{{ oficina.nombre }}</h1>
    </div>

    <div class="detalle-content">
      <!-- Información General -->
      <div class="info-card">
        <div class="card-header">
          <span class="card-icon">📋</span>
          <h2 class="card-title">Información General</h2>
        </div>
        <div class="card-body">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Administrador</span>
              <span class="info-value">{{ oficina.administrador }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">PBX</span>
              <span class="info-value badge-pbx">{{ oficina.pbx }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Teléfono</span>
              <span class="info-value">{{ oficina.telefono }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dirección</span>
              <span class="info-value">{{ oficina.direccion }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Ciudad</span>
              <span class="info-value">{{ oficina.ciudad }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Departamento</span>
              <span class="info-value">{{ oficina.departamento }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barrios Cubiertos -->
      <div class="info-card">
        <div class="card-header">
          <span class="card-icon">🏘️</span>
          <h2 class="card-title">Barrios Cubiertos</h2>
          <span class="badge-count">{{ oficina.barrios?.length || 0 }}</span>
        </div>
        <div class="card-body">
          <div class="barrios-grid">
            <span
              v-for="(barrio, index) in oficina.barrios"
              :key="index"
              class="barrio-badge"
            >
              {{ barrio }}
            </span>
          </div>
        </div>
      </div>

      <!-- Planes Disponibles -->
      <div class="info-card">
        <div class="card-header">
          <span class="card-icon">💰</span>
          <h2 class="card-title">Planes Disponibles</h2>
          <span class="badge-count">{{ oficina.planes?.length || 0 }}</span>
        </div>
        <div class="card-body">
          <div class="planes-grid">
            <div
              v-for="(plan, index) in oficina.planes"
              :key="index"
              class="plan-card"
            >
              <div class="plan-header">
                <span class="plan-icon">📶</span>
                <h3 class="plan-nombre">{{ plan.nombre }}</h3>
              </div>
              <div class="plan-precio">{{ plan.precio }}</div>
              <button class="plan-button">Más información</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Puntos de Recaudo -->
      <div
        class="info-card"
        v-if="oficina.puntosRecaudo && oficina.puntosRecaudo.length > 0"
      >
        <div class="card-header">
          <span class="card-icon">🏪</span>
          <h2 class="card-title">Puntos de Recaudo</h2>
          <span class="badge-count">{{ oficina.puntosRecaudo.length }}</span>
        </div>
        <div class="card-body">
          <div class="puntos-grid">
            <div
              v-for="(punto, index) in oficina.puntosRecaudo"
              :key="index"
              class="punto-card"
            >
              <div class="punto-icon">🏪</div>
              <div class="punto-info">
                <span class="punto-nombre">{{ punto.nombre }}</span>
                <span v-if="punto.direccion" class="punto-direccion">{{
                  punto.direccion
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Adicional -->
      <div class="info-card" v-if="tienePersonalAdicional">
        <div class="card-header">
          <span class="card-icon">👥</span>
          <h2 class="card-title">Personal Adicional</h2>
          <span class="badge-count">{{
            oficina.personalAdicional.length
          }}</span>
        </div>
        <div class="card-body">
          <div class="personal-grid">
            <div
              v-for="(persona, index) in oficina.personalAdicional"
              :key="index"
              class="personal-card"
            >
              <div class="personal-header">
                <span class="personal-avatar">👤</span>
                <div class="personal-info">
                  <h3 class="personal-nombre">{{ persona.nombre }}</h3>
                  <p class="personal-cargo">{{ persona.cargo }}</p>
                </div>
              </div>
              <div class="personal-contacto">
                <div v-if="persona.pbx" class="contacto-item">
                  <span class="contacto-label">PBX:</span>
                  <span class="contacto-value">{{ persona.pbx }}</span>
                </div>
                <div v-if="persona.telefono" class="contacto-item">
                  <span class="contacto-label">Tel:</span>
                  <span class="contacto-value">{{ persona.telefono }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información de Contacto -->
      <div class="info-card contact-card">
        <div class="card-header">
          <span class="card-icon">📞</span>
          <h2 class="card-title">Información de Contacto</h2>
        </div>
        <div class="card-body">
          <div class="contact-grid">
            <a :href="'tel:' + oficina.telefono" class="contact-item">
              <span class="contact-icon">📱</span>
              <div class="contact-info">
                <span class="contact-label">Teléfono</span>
                <span class="contact-value">{{ oficina.telefono }}</span>
              </div>
            </a>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div class="contact-info">
                <span class="contact-label">PBX</span>
                <span class="contact-value">{{ oficina.pbx }}</span>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-info">
                <span class="contact-label">Ubicación</span>
                <span class="contact-value"
                  >{{ oficina.ciudad }}, {{ oficina.departamento }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const oficina = ref({});

onMounted(() => {
  const oficinaData = localStorage.getItem("oficinaSeleccionada");
  if (oficinaData) {
    oficina.value = JSON.parse(oficinaData);
  } else {
    router.push("/home/oficinas");
  }
});

const tienePersonalAdicional = computed(() => {
  return (
    oficina.value.personalAdicional &&
    oficina.value.personalAdicional.length > 0 &&
    oficina.value.personalAdicional[0].nombre !== "NO"
  );
});

const volver = () => {
  router.push("/home/oficinas");
};
</script>

<style scoped>
.oficina-detalle {
  padding: 30px 40px;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 90px);
}

.detalle-header {
  margin-bottom: 30px;
}

.btn-volver {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  color: #334155;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.btn-volver:hover {
  border-color: #2a5298;
  background: #f8fafc;
  transform: translateX(-4px);
}

.btn-volver .icon {
  font-size: 20px;
}

.oficina-titulo {
  font-size: 36px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
}

.detalle-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 2px solid #e2e8f0;
}

.card-icon {
  font-size: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
  flex: 1;
}

.badge-count {
  padding: 4px 12px;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
}

.card-body {
  padding: 24px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
}

.badge-pbx {
  display: inline-block;
  padding: 6px 14px;
  color: #1e293b;
  border-radius: 20px;
  font-weight: 700;
  width: fit-content;
}

.barrios-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.barrio-badge {
  padding: 8px 16px;
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.1) 0%,
    rgba(30, 60, 114, 0.1) 100%
  );
  color: #2a5298;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(42, 82, 152, 0.2);
  transition: all 0.3s ease;
}

.barrio-badge:hover {
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.2) 0%,
    rgba(30, 60, 114, 0.2) 100%
  );
  transform: translateY(-2px);
}

.planes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.plan-card {
  padding: 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.plan-card:hover {
  border-color: #2a5298;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(42, 82, 152, 0.15);
}

.plan-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.plan-icon {
  font-size: 28px;
}

.plan-nombre {
  font-size: 18px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
}

.plan-precio {
  font-size: 32px;
  font-weight: 700;
  color: #2a5298;
  text-align: center;
  padding: 12px 0;
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.1) 0%,
    rgba(30, 60, 114, 0.1) 100%
  );
  border-radius: 8px;
}

.plan-button {
  padding: 12px;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.plan-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.3);
}

.puntos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.punto-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.punto-card:hover {
  border-color: #10b981;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.punto-icon {
  font-size: 32px;
}

.punto-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.punto-nombre {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.punto-direccion {
  font-size: 13px;
  color: #64748b;
}

.personal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.personal-card {
  padding: 18px;
  background: #f8fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.personal-card:hover {
  border-color: #2a5298;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.15);
}

.personal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.personal-avatar {
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

.personal-info {
  flex: 1;
}

.personal-nombre {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.personal-cargo {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.personal-contacto {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contacto-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.contacto-label {
  font-weight: 600;
  color: #64748b;
}

.contacto-value {
  color: #1e293b;
}

.contact-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e8f0fe 100%);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-item:hover {
  border-color: #2a5298;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 82, 152, 0.15);
}

.contact-icon {
  font-size: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.1) 0%,
    rgba(30, 60, 114, 0.1) 100%
  );
  border-radius: 12px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.contact-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

@media (max-width: 768px) {
  .oficina-detalle {
    padding: 20px;
  }

  .oficina-titulo {
    font-size: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .planes-grid {
    grid-template-columns: 1fr;
  }

  .puntos-grid {
    grid-template-columns: 1fr;
  }

  .personal-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
