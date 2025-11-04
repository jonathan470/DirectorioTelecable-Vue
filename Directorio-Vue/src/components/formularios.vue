<template>
  <div class="layout-formularios">
    <div class="formularios-header">
      <div class="header-content">
        <h1 class="page-title">Formularios de ventas</h1>
        <p class="page-subtitle">Consulta los formularios de ventas</p>
      </div>
    </div>

    <div class="filter-container">
      <div class="filter-group">
        <div class="filter-box">
          <span class="filter-icon">🔍</span>
          <input
            v-model="filtroTexto"
            type="text"
            class="filter-input"
            placeholder="Buscar por oficina..."
          />
        </div>
      </div>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <span class="stat-label">Total de formularios </span>
          <span class="stat-value">{{ formulariosFiltrados.length }}</span>
        </div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <h2 class="table-title">Formularios de ventas</h2>
        <span class="table-count"
          >{{ formulariosFiltrados.length }} registros</span
        >
      </div>
    </div>

    <div class="table-container">
      <table class="formulario-table">
        <thead>
          <tr>
            <th>Formularios</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(formularios, index) in formulariosFiltrados"
            :key="index"
            class="table-row"
          >
            <td class="formulario-nombre">
              <div class="formulario-cell">
                <span class="formulario avatar">📋</span>
                <span>{{ formularios.nombre_formulario }}</span>
              </div>
            </td>
            <td>
              <a
                class="abrir-button"
                :href=" formularios.enlace_formulario"
                target="_blank"
                rel="noopener noreferrer"
                >Abrir Formulario</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const filtroTexto = ref("");

const formulariosData = [
  {
    nombre_formulario: "Formulario de ventas Comuneros",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSdVANncsap2oOAAaN86OD_zlejuOY1n5VN5739H5Qqpbq1Png/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Rio Cauca",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLScbDDd-6MJbAVd4S9MFLWsoZhJfa2W1Rc6ZRIQWf8bImoT7aQ/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Marroquin",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLScbb4OK4tuKYc7B_EW1nK3vPYTTqqEZVTmAWSww2n0FvXtNew/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Ceibas",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSetAURPhFQnpJWg8fbU894ZeVvGUmOXmDbhaazeSOS_kPBSkQ/viewform",
  },
  {
    nombre_formulario:
      "Formulario de ventas Cordoba Reservado - Antonio Nariño",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSc6FRvX9jXrpmh8HOzUUcR9h3pqjAVVi0iAMLgLb1nsckM2zA/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Poblado",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSdczG_eYkGnkVQeAbD6yqEayA1xf6J06_DrETVwKx8fM7Vryg/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Villa Nueva",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSfOjhU9_vcKWzg6hWCxvBr1T8Kldp9Ar8xXO1Wzq97I3ZrPvQ/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Chorros - Melendez",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSf9s2z5CNpdAeyZJYi4av827rYU8VXz6iSPc8fT_DjGZmciMQ/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Montebello",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSflyRoGp8ZViYMdMV8cMGNiRpSybZ2lBChPY5j95tYDXYvYug/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Siloe",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSeVv5Xct_WuQUPXkaXAZjFolJuwLCw4JIP0b7XPRXtW8VCNpw/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Florida",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSdDsypy6ANvhb7f_leAsGVK_VNIX9v3mNtvBOCGhJF0TuBKEw/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Pradera",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSdytMnOmKLFoNpFUk-dnFwozxw4TbGzVGwcOjjXSpDs4Wctbw/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Tulua - Andalucia - Cerrito",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSf5cR6dwwfNPxNdOHqwvZgTLWCESaaLspF5aNDX8qnlPlDRYg/viewform",
  },
  {
    nombre_formulario: "Formulario de ventas Tarqui - Huila - Altamira",
    enlace_formulario:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwvswIcLy8qZSX8qw32D1p5yTgUwsXXbj4Gr-VKi8BvZfPmQ/viewform",
  },
];

const formulariosFiltrados = computed(() => {
  return formulariosData.filter((formulario) => {
    const matchTexto =
      !filtroTexto.value ||
      formulario.nombre_formulario
        .toLowerCase()
        .includes(filtroTexto.value.toLowerCase());

    return matchTexto;
  });
});
</script>

<style scoped>
.layout-formularios {
  padding: 30px 40px;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 90px);
}

.formularios-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}
.header-content {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}
.filter-container {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  flex: 1;
}

.filter-box {
  flex: 1;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.3s ease;
  height: 50px;
}

.filter-box:focus-within {
  border-color: #2a5298;
  box-shadow: 0 0 0 4px rgba(42, 82, 152, 0.08);
}

.filter-icon {
  font-size: 20px;
  color: #94a3b8;
  margin-right: 12px;
}

.filter-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 0;
  font-size: 15px;
  color: #1e293b;
  background: transparent;
}

.filter-input::placeholder {
  color: #94a3b8;
}
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 40px;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(42, 82, 152, 0.1) 0%, rgba(30, 60, 114, 0.1) 100%);
  border-radius: 12px;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #1e3c72;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 2px solid #e2e8f0;
}

.table-title {
  font-size: 20px;
  font-weight: 700;
  color: #1e3c72;
  margin: 0;
}

.table-count {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 20px;
}



</style>