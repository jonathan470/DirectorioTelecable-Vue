<template></template>

<script setup></script>

<template>
  <div class="layout-formularios">
    <div class="formularios-header">
      <div class="header-content">
        <h1 class="page-title">📋 Formularios de ventas</h1>
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
          <span class="stat-label">Total de formulario</span>
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
          <tr v-for="(formularios, index) in formulariosFiltrados" :key="index" class="table-row">
            <td class="formulario-nombre">
              <div class="formulario-cell">
                <span class="formulario avatar">📋</span>
                <span>{{ formularios.nombre_formulario }}</span>
              </div>
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
