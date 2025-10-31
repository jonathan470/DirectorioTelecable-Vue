<template>
  <div class="desarrollo-detalle">
    <div class="detalle-header">
      <button @click="volver" class="btn-volver">
        <span class="icon">←</span>
        <span>Volver a Desarrollos</span>
      </button>
      <h1 class="desarrollo-titulo">{{ desarrollo.nombre_desarrollo }}</h1>
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
              <span class="info-label">Encargado</span>
              <span class="info-value">{{
                desarrollo.Encargado_desarrollo
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Teléfono</span>
              <span class="info-value">{{
                desarrollo.telefono_desarrollo
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Correo Electrónico</span>
              <span class="info-value email">{{
                desarrollo.correo_desarrollo
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dirección</span>
              <span class="info-value">{{
                desarrollo.direccion_desarrollo
              }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Ciudad</span>
              <span class="info-value">{{ desarrollo.ciudad_desarrollo }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Departamento</span>
              <span class="info-value">{{
                desarrollo.departamento_desarrollo
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Barrios Cubiertos -->
      <div class="info-card">
        <div class="card-header">
          <span class="card-icon">🏘️</span>
          <h2 class="card-title">Barrios Cubiertos</h2>
          <span class="badge-count">{{
            desarrollo.barrios_desarrollo.length
          }}</span>
        </div>
        <div class="card-body">
          <div class="barrios-grid">
            <span
              v-for="(barrio, index) in desarrollo.barrios_desarrollo"
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
          <span class="badge-count">{{
            desarrollo.planes_desarrollo.length
          }}</span>
        </div>
        <div class="card-body">
          <div class="planes-grid">
            <div
              v-for="(plan, index) in desarrollo.planes_desarrollo"
              :key="index"
              class="plan-card"
            >
              <div class="plan-header">
                <span class="plan-icon">📶</span>
                <h3 class="plan-nombre">{{ plan.nombre_plan }}</h3>
              </div>
              <div class="plan-precio">{{ plan.precio_plan }}</div>
              <button class="plan-button">Más información</button>
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
            <a
              :href="'tel:' + desarrollo.telefono_desarrollo"
              class="contact-item"
            >
              <span class="contact-icon">📱</span>
              <div class="contact-info">
                <span class="contact-label">Teléfono</span>
                <span class="contact-value">{{
                  desarrollo.telefono_desarrollo
                }}</span>
              </div>
            </a>
            <a
              :href="'mailto:' + desarrollo.correo_desarrollo"
              class="contact-item"
            >
              <span class="contact-icon">✉️</span>
              <div class="contact-info">
                <span class="contact-label">Email</span>
                <span class="contact-value">{{
                  desarrollo.correo_desarrollo
                }}</span>
              </div>
            </a>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-info">
                <span class="contact-label">Ubicación</span>
                <span class="contact-value"
                  >{{ desarrollo.ciudad_desarrollo }},
                  {{ desarrollo.departamento_desarrollo }}</span
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const desarrollo = ref({
  nombre_desarrollo: "",
  Encargado_desarrollo: "",
  telefono_desarrollo: "",
  correo_desarrollo: "",
  direccion_desarrollo: "",
  ciudad_desarrollo: "",
  departamento_desarrollo: "",
  barrios_desarrollo: [],
  planes_desarrollo: [],
});

onMounted(() => {
  const desarrolloData = localStorage.getItem("desarrolloSeleccionado");
  if (desarrolloData) {
    desarrollo.value = JSON.parse(desarrolloData);
  } else {
    router.push("/home/desarrollos");
  }
});

const volver = () => {
  router.push("/home/desarrollos");
};
</script>

<style scoped>
.desarrollo-detalle {
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

.desarrollo-titulo {
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

.info-value.email {
  color: #2a5298;
  text-decoration: underline;
  cursor: pointer;
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
  .desarrollo-detalle {
    padding: 20px;
  }

  .desarrollo-titulo {
    font-size: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .planes-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
