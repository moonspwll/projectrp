<template>
    <div class="login-container">
        <h1>ProjectRP</h1>
        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Логін</label>
                <input
                    id="username"
                    v-model="username"
                    type="text"
                    required
                />
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input
                    id="password"
                    v-model="password"
                    type="password"
                    required
                />
            </div>
            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <button type="button" @click="handleRegister" :disabled="loading">
                Register
            </button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            loading: false,
            error: "",
        };
    },
    mounted() {
        window.addEventListener('message', this.onMessage);
    },
    beforeUnmount() {
        window.removeEventListener('message', this.onMessage);
    },
    methods: {
        onMessage(event) {
            if (event.data && event.data.type === 'authError') {
                this.error = event.data.message;
                this.loading = false;
            }
        },
        handleLogin() {
            this.error = "";
            this.loading = true;
            if (window.mp && window.mp.trigger) {
                window.mp.trigger('client:login', this.username, this.password, navigator.userAgent);
            }
        },
        handleRegister() {
            this.error = "";
            this.loading = true;
            if (window.mp && window.mp.trigger) {
                window.mp.trigger('client:register', this.username, this.password, navigator.userAgent);
            }
        },
    },
};
</script>

<style scoped>
.login-container {
    max-width: 350px;
    margin: 80px auto;
    padding: 32px;
    backdrop-filter: blur(2px);
    /* background: #23272a; */
    border-radius: 8px;
    /* box-shadow: 0 2px 12px rgba(0,0,0,0.3); */
    color: #fff;
}
h1 {
    text-align: center;
    margin-bottom: 24px;
}
.form-group {
    margin-bottom: 18px;
}
label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
}
input {
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 4px;
    background: #2c2f33;
    color: #fff;
    font-size: 16px;
}
button {
    width: 100%;
    padding: 10px 0;
    background: #7289da;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}
button:disabled {
    background: #99aab5;
    cursor: not-allowed;
}
.error {
    color: #ff5555;
    margin-top: 12px;
    text-align: center;
}
</style>