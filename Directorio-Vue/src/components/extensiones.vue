<template>
  <div class="layout-extensiones">
    <div class="extensiones-header">
      <div class="header-content">
        <h1 class="page-title">📞 Directorio de Extensiones (PBX)</h1>
        <p class="page-subtitle">
          Consulta las extensiones telefónicas del personal
        </p>
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
            placeholder="Buscar por nombre, cargo o extensión..."
          />
        </div>
      </div>

      <div class="filter-group">
        <div class="filter-box-select">
          <label class="filter-label">Categoría</label>
          <select v-model="filtroCategoria" class="filter-select">
            <option value="Todos">Todas las categorías</option>
            <option value="Administrador">Administradores</option>
            <option value="Retencion">Retención</option>
            <option value="Caja">Caja</option>
            <option value="Cartera">Cartera</option>
            <option value="Contabilidad">Contabilidad</option>
            <option value="Sistemas">Sistemas</option>
            <option value="Gerencia">Gerencia</option>
          </select>
        </div>
      </div>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <span class="stat-label">Total Extensiones</span>
          <span class="stat-value">{{ extensionesFiltradas.length }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-info">
          <span class="stat-label">Oficinas</span>
          <span class="stat-value">{{ totalOficinas }}</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💼</div>
        <div class="stat-info">
          <span class="stat-label">Administrativos</span>
          <span class="stat-value">{{ totalAdministrativos }}</span>
        </div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <h2 class="table-title">Extensiones PBX</h2>
        <span class="table-count"
          >{{ extensionesFiltradas.length }} registros</span
        >
      </div>

      <div class="table-container">
        <table class="extensiones-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Extensión</th>
            </tr>
          </thead>
          <tbody><!-- me quede aqui-->
            <tr
              v-for="(extension, index) in extensionesFiltradas"
              :key="index"
              class="table-row"
            >
              <td class="persona-nombre">
                <div class="persona-cell">
                  <span class="persona-avatar">👤</span>
                  <span>{{ extension.nombre_personal }}</span>
                </div>
              </td>
              <td class="cargo">
                <span
                  class="badge-cargo"
                  :class="getCategoriaClass(extension.cargo)"
                >
                  {{ extension.cargo }}
                </span>
              </td>
              <td class="extension">
                <span class="badge-extension">{{ extension.extension }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="extensionesFiltradas.length === 0" class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No se encontraron extensiones</h3>
          <p>Intenta ajustar los filtros de búsqueda</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const filtroTexto = ref("");
const filtroCategoria = ref("Todos");

const pbxData = [
  {
    nombre_personal: "Erika Rivas",
    cargo: "Administrador Oficina Ceibas",
    extension: "1125",
  },
  {
    nombre_personal: "Sandra Balanta",
    cargo: "Administrador Oficina Mariano Ramos",
    extension: "1221",
  },
  {
    nombre_personal: "Diana Carolina Dorado Guauña",
    cargo: "Administrador Oficina Villa Nueva",
    extension: "1117",
  },
  {
    nombre_personal: "Maria Eugenia Diaz",
    cargo: "Administrador Oficina Poblado",
    extension: "1135",
  },
  {
    nombre_personal: "Alejandra Giraldo",
    cargo: "Administrador Oficina Rio Cauca",
    extension: "1127",
  },
  {
    nombre_personal: "Vanessa Villegas G",
    cargo: "Administrador Oficina Cordoba Reservado",
    extension: "1130",
  },
  {
    nombre_personal: "Claudia Vargas",
    cargo: "Administrador Oficina Comuneros",
    extension: "1112",
  },
  {
    nombre_personal: "Brush Zapata",
    cargo: "Retencion Comuneros",
    extension: "1212",
  },
  {
    nombre_personal: "Ana Yibe Fontal",
    cargo: "Caja Comuneros",
    extension: "1116",
  },
  {
    nombre_personal: "Leidy Johana Ospina",
    cargo: "Administrador Oficina Marroquin",
    extension: "1136",
  },
  {
    nombre_personal: "Maira Hernandez",
    cargo: "Retencion y Caja Marroquin",
    extension: "1105",
  },
  {
    nombre_personal: "Sharon Fuentes",
    cargo: "Administrador Oficina Chorros",
    extension: "1110",
  },
  {
    nombre_personal: "Jhoiner Arturo Barbosa Otalvaro",
    cargo: "Administrador Oficina Montebello",
    extension: "1211",
  },
  {
    nombre_personal: "Alejandro Rios",
    cargo: "Administrador Oficina Siloe",
    extension: "1111",
  },
  {
    nombre_personal: "Angelica Hurtado Silva",
    cargo: "Administrador Oficina Cerrito",
    extension: "1211",
  },
  {
    nombre_personal: "Maria José Arias Hernández Acevedo",
    cargo: "Administrador Oficina Andalucia",
    extension: "1215",
  },
  {
    nombre_personal: "Maria del Carmen Morales",
    cargo: "Administrador Oficina Tulua",
    extension: "1207",
  },
  {
    nombre_personal: "Claudia Patricia Jaramillo Montoya",
    cargo: "Administrador Oficina Tarqui",
    extension: "1104",
  },
  {
    nombre_personal: "Maylhen Melo",
    cargo: "Administrador Oficina Florida",
    extension: "1107",
  },
  {
    nombre_personal: "Lizeth Johanna",
    cargo: "Retencion Florida",
    extension: "1118",
  },
  {
    nombre_personal: "Sebastian Prada",
    cargo: "Cartera Florida y Oficinas fuera de cali",
    extension: "1114",
  },
  {
    nombre_personal: "Mayra Alejandra Rivera",
    cargo: "Administrador Oficina Pradera",
    extension: "1220",
  },
  {
    nombre_personal: "Jackeline Rondon",
    cargo: "Caja Pradera",
    extension: "1108",
  },
  {
    nombre_personal: "Nasly Johanna Hernández",
    cargo: "Subgerencia",
    extension: "1102",
  },
  {
    nombre_personal: "Valentina Tamayo Ortega",
    cargo: "Asistente de gerencia",
    extension: "1204",
  },
  {
    nombre_personal: "Katherine Muñoz",
    cargo: "Recursos Humanos",
    extension: "1217",
  },
  {
    nombre_personal: "Anyela Viera",
    cargo: "Almacén - Sistemas",
    extension: "1133",
  },
  {
    nombre_personal: "David Solano",
    cargo: "Proyectos",
    extension: "1126",
  },
  {
    nombre_personal: "Carlos Bejarano",
    cargo: "Portería",
    extension: "1120",
  },
  {
    nombre_personal: "Karina Mariño",
    cargo: "Jefe Cartera",
    extension: "1201",
  },
  {
    nombre_personal: "Valeria Varona",
    cargo: "Auxiliar Cartera",
    extension: "1101",
  },
  {
    nombre_personal: "Luna Mora",
    cargo: "Auxiliar Cartera",
    extension: "1203",
  },
  {
    nombre_personal: "Natalia Valencia",
    cargo: "Contabilidad Telecable",
    extension: "1103",
  },
  {
    nombre_personal: "Monica Marcela Albaran Castaño",
    cargo: "Contabilidad Home tv",
    extension: "1218",
  },
  {
    nombre_personal: "Eliana Erazo",
    cargo: "Contabilidad Telecable",
    extension: "1100",
  },
  {
    nombre_personal: "Lina Marcela",
    cargo: "Contabilidad Cable Cauca",
    extension: "1100",
  },
  {
    nombre_personal: "Pedro Felipe Lopez",
    cargo: "Sistemas - Administrativo",
    extension: "1124",
  },
  {
    nombre_personal: "Sergio Gomez",
    cargo: "Sistemas - Call Center",
    extension: "1119",
  },
  {
    nombre_personal: "Jerson Brand",
    cargo: "Sistemas - Call Center",
    extension: "1301",
  },
  {
    nombre_personal: "Sandra Patricia Escobar",
    cargo: "Sistemas - Call Center",
    extension: "1132",
  },
];

const extensionesFiltradas = computed(() => {
  return pbxData.filter((ext) => {
    const matchTexto =
      !filtroTexto.value ||
      ext.nombre_personal
        .toLowerCase()
        .includes(filtroTexto.value.toLowerCase()) ||
      ext.cargo.toLowerCase().includes(filtroTexto.value.toLowerCase()) ||
      ext.extension.includes(filtroTexto.value);

    const matchCategoria =
      filtroCategoria.value === "Todos" ||
      ext.cargo.toLowerCase().includes(filtroCategoria.value.toLowerCase());

    return matchTexto && matchCategoria;
  });
});

const totalOficinas = computed(() => {
  return pbxData.filter((ext) => ext.cargo.includes("Oficina")).length;
});

const totalAdministrativos = computed(() => {
  return pbxData.filter(
    (ext) =>
      ext.cargo.includes("gerencia") ||
      ext.cargo.includes("Cartera") ||
      ext.cargo.includes("Contabilidad") ||
      ext.cargo.includes("Sistemas")
  ).length;
});

const getCategoriaClass = (cargo) => {
  if (cargo.includes("Administrador")) return "admin";
  if (cargo.includes("Retencion")) return "retencion";
  if (cargo.includes("Caja")) return "caja";
  if (cargo.includes("Cartera")) return "cartera";
  if (cargo.includes("Contabilidad")) return "contabilidad";
  if (cargo.includes("Sistemas")) return "sistemas";
  if (cargo.includes("gerencia")) return "gerencia";
  return "default";
};



</script>

<style scoped>
.layout-extensiones {
  padding: 30px 40px;
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  min-height: calc(100vh - 90px);
}

.extensiones-header {
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
  align-items: flex-end;
}

.filter-group {
  display: flex;
  gap: 20px;
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

.filter-box-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 200px;
}

.filter-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

.filter-select {
  padding: 12px 16px;
  padding-right: 40px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #1e293b;
  background: white;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  appearance: none;
  height: 50px;
}

.filter-select:hover {
  border-color: #cbd5e1;
  background-color: #f8fafc;
}

.filter-select:focus {
  border-color: #2a5298;
  background-color: white;
  box-shadow: 0 0 0 4px rgba(42, 82, 152, 0.08);
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
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.1) 0%,
    rgba(30, 60, 114, 0.1) 100%
  );
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

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
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

.table-container {
  overflow-x: auto;
}

.extensiones-table {
  width: 100%;
  border-collapse: collapse;
}

.extensiones-table thead {
  background: #f8fafc;
}

.extensiones-table th {
  padding: 16px 20px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e2e8f0;
}

.table-row {
  transition: all 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
}

.table-row:hover {
  background: #f8fafc;
}

.extensiones-table td {
  padding: 18px 20px;
  font-size: 15px;
  color: #334155;
}

.persona-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.persona-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  border-radius: 50%;
  font-size: 20px;
  filter: grayscale(100%) brightness(2);
}

.persona-nombre {
  font-weight: 600;
  color: #1e3c72;
}

.badge-cargo {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.badge-cargo.admin {
  background: linear-gradient(
    135deg,
    rgba(42, 82, 152, 0.1) 0%,
    rgba(30, 60, 114, 0.1) 100%
  );
  color: #2a5298;
}

.badge-cargo.retencion {
  background: linear-gradient(
    135deg,
    rgba(236, 72, 153, 0.1) 0%,
    rgba(219, 39, 119, 0.1) 100%
  );
  color: #db2777;
}

.badge-cargo.caja {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(5, 150, 105, 0.1) 100%
  );
  color: #059669;
}

.badge-cargo.cartera {
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1) 0%,
    rgba(217, 119, 6, 0.1) 100%
  );
  color: #d97706;
}

.badge-cargo.contabilidad {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(124, 58, 237, 0.1) 100%
  );
  color: #7c3aed;
}

.badge-cargo.sistemas {
  background: linear-gradient(
    135deg,
    rgba(14, 165, 233, 0.1) 0%,
    rgba(2, 132, 199, 0.1) 100%
  );
  color: #0284c7;
}

.badge-cargo.gerencia {
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.1) 0%,
    rgba(185, 28, 28, 0.1) 100%
  );
  color: #b91c1c;
}

.badge-cargo.default {
  background: linear-gradient(
    135deg,
    rgba(100, 116, 139, 0.1) 0%,
    rgba(71, 85, 105, 0.1) 100%
  );
  color: #475569;
}

.badge-extension {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
  border-radius: 20px;
  font-weight: 700;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1e3c72;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 15px;
  color: #64748b;
}

@media (max-width: 768px) {
  .layout-extensiones {
    padding: 20px;
  }

  .extensiones-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    font-size: 24px;
  }

  .button-export {
    width: 100%;
    justify-content: center;
  }

  .filter-container {
    flex-direction: column;
  }

  .filter-box {
    min-width: 100%;
  }

  .table-container {
    overflow-x: scroll;
  }

  .extensiones-table {
    min-width: 700px;
  }
}
</style>
