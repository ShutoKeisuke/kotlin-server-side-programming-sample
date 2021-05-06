<template>
    <div>
        <input type="text" placeholder="Eメール" v-model="email">
        <input type="text" placeholder="パスワード" v-model="pass">
        <br>
        <button @click="login">ログイン</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            email: "",
            pass: ""
        }
    },
    methods: {
        login() {
            var params = new URLSearchParams()
            params.append('email', this.email)
            params.append('pass', this.pass)

            axios.post('http://localhost:8080/login', params)
                .then(function(response) {
                    console.log('----- success ------')
                    console.log(response)
                    this.$router.push('/book/list')
                }.bind(this)).catch(error => {
                    console.log('----- error ------')
                    console.log(error)
                })
        }
    }
}
</script>

<style scoped>
input, button {
    margin: 0 auto;
    display: block;
}
</style>