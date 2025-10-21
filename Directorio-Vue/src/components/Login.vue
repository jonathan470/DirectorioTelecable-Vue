<template>
  <div class="login-card">
    <div class="login-icon">
      <img src="../assets/Logo.png" alt="User icon" />
    </div>
    <div class="card-header">
      <div class="log">Login</div>
    </div>
    <div v-if="errorMessage" class="error-message" role="alert">
      {{ errorMessage }}
    </div>

    <form id="login-form" @submit.prevent="handleLogin" novalidate>
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          v-model="form.username"
          class="input-login"
          required
          name="username"
          id="username"
          type="email"
          placeholder="Correo"
          autocomplete="username"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          v-model="form.password"
          type="password"
          class="input-login"
          name="password"
          id="password"
          required
          placeholder="Contraseña"
          autocomplete="current-password"
        />
      </div>
      <div class="form-group">
        <input class="input-login" :disabled="loading" type="submit" :value="loading ? 'Entrando...' : 'Login'" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const validCredentials = [
  { email: 'soporte.riocauca@cablecauca.com', password: 'admin123' }
]

const form = reactive({
  username: '',
  password: ''
})

const errorMessage = ref('')
const loading = ref(false)
const router = useRouter()

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleLogin() {
  errorMessage.value = ''

  if (!form.username || !form.password) {
    errorMessage.value = 'Por favor completa todos los campos.'
    return
  }

  if (!isValidEmail(form.username)) {
    errorMessage.value = 'Ingresa un email válido.'
    return
  }

  loading.value = true
  try {
    const match = validCredentials.some(
      (c) => c.email === form.username && c.password === form.password
    )

    if (match) {
      localStorage.setItem('usuarioAutenticado', 'true')
      router.push('/home')
    } else {
      errorMessage.value = '❌ Credenciales incorrectas. Intenta de nuevo.'
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Ocurrió un error. Intenta más tarde.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ...estilos iguales a los del login en App.vue... */
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 12px;
  background-color: #e0e0e0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #ccc;
  animation: fadeInUp 0.6s ease-out;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.login-icon {
  text-align: center;
  margin-bottom: 15px;
}
.login-icon img {
  width: 250px;
  height: 60px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.card-header {
  text-align: center;
  margin-bottom: 20px;
}
.card-header .log {
  font-size: 28px;
  font-weight: bold;
  color: #3a5ba1;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-size: 17px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
}
.input-login[type="text"],
.input-login[type="email"],
.input-login[type="password"] {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}
.input-login[type="text"]:focus,
.input-login[type="email"]:focus,
.input-login[type="password"]:focus {
  border-color: #3a5ba1;
  box-shadow: 0 2px 12px rgba(0, 120, 215, 0.15);
}
.input-login[type="submit"] {
  width: 100%;
  background-color: #3a5ba1;
  color: white;
  padding: 14px 20px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
.input-login[type="submit"]:hover {
  background-color: #2c4680;
  color: #fff;
  box-shadow: 0 2px 12px rgba(0, 120, 215, 0.15);
}
.error-message {
  display: block;
  background: #ffeaea;
  color: #d32f2f;
  border: 1px solid #f5c2c7;
  border-radius: 8px;
  padding: 12px 18px;
  margin-bottom: 18px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(211, 47, 47, 0.08);
  text-align: center;
  align-items: center;
  gap: 8px;
  animation: fadeIn 0.4s;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
