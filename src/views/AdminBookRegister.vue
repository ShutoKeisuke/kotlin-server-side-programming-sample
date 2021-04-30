<template>
    <div>
        <h3>書籍登録</h3>
        <table>
            <tr>
                <th>ID</th>
                <td><input type="text" v-model="id"></td>
            </tr>
            <tr>
                <th>タイトル</th>
                <td><input type="text" v-model="title"></td>
            </tr>
            <tr>
                <th>著者</th>
                <td><input type="text" v-model="author"></td>
            </tr>
            <tr>
                <th>発売日</th>
                <td><input type="text" v-model="releaseDate"></td>
            </tr>
        </table>
        <br>
        <button @click="register">登録</button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            id: null,
            title: null,
            author: null,
            releaseDate: null
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:8080/admin/book/register",
            {
                id: Number(this.id),
                title: this.title,
                author: this.author,
                'release_date': this.releaseDate
            },{withCredentials: true}).then(function(response) {
                console.log("----- success -----")
                console.log(response)
                this.$router.push('/admin/book/register/completed')
                return response.data.token
            }.bind(this)).catch(error => {
                console.log("----- error -----")
                alert("入力情報が誤っています")
                if (error.response) {
                    console.log("----- response -----")
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    console.log("----- request -----")
                    console.log("error: request")
                } else {
                    console.log("----- else -----")
                    console.log('Error', error.message)
                }
                console.log("----- config -----")
                console.log(error.config)
                
            })
        }
    }
}
</script>

<style scoped>
h3 {
    margin-bottom: 5px;
}

table, th, td {
    border: solid 1px black;
}

table {
    margin: 0 auto;
}
</style>