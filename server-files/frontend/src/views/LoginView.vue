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
    methods: {
        async handleLogin() {
            this.error = "";
            this.loading = true;
            try {
                // Replace with your actual login API call
                // Example:
                // await this.$axios.post('/api/login', { username: this.username, password: this.password });
                if (this.username === "admin" && this.password === "admin") {
                    // Simulate successful login
                    window.mp.events.call("hideLogin");
                } else {
                    throw new Error("Invalid username or password");
                }
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
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