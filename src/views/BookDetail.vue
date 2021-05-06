<template>
    <div>
        <h3>書籍詳細</h3>
        <table>
            <thead>
                <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>発売日</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ dataObj.title }}</td>
                    <td>{{ dataObj.author }}</td>
                    <td>{{ dataObj.release_date }}</td>
                </tr>
            </tbody>
        </table>
        <router-link :to="{name: 'adminUpdate', params: {id: dataObj.id}}">更新</router-link><br>
        <a href="#" @click.prevent="deleteRecord">削除</a><br>
        <a  v-if="dataObj.rental_info === null" href="#" @click.prevent="rentalThisBook" >貸出</a><br>
        <div v-if="dataObj.rental_info !== null">
            <h3>貸出情報</h3>
        <table>
            <thead>
                <tr>
                    <th>貸出ユーザーID</th>
                    <th>貸出日</th>
                    <th>返却予定日</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ rentalInfo.user_id }}</td>
                    <td>{{ rentalInfo.rental_datetime }}</td>
                    <td>{{ rentalInfo.return_deadline }}</td>
                </tr>
            </tbody>
        </table>
        <a href="">返却</a><br>
        </div>
        <br>
        <router-link to="/book/list">一覧へ戻る</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dataObj: {},
            rentalInfo: {}
        }
    },
    mounted: function() {
        axios.get(`http://localhost:8080/book/detail/${this.$route.params['id']}`, {withCredentials: true})
            .then(response => {
                console.log(response)
                this.dataObj = response.data
                this.rentalInfo = this.dataObj.rental_info
            })
    },
    methods: {
        deleteRecord() {
            if (confirm(`書籍ID: ${this.dataObj.id} の書籍を削除しますか?`)) {
                axios.delete(`http://localhost:8080/admin/book/delete/${this.dataObj.id}`, {withCredentials: true})
                .then( function(response) {
                    console.log("----- success -----")
                    console.log(response)
                    this.$router.push('/admin/book/delete/completed')
                    return response.data.token
                }.bind(this) ).catch( error => {
                    console.log("----- error -----")
                alert("書籍は存在しません")
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
                } )
            }
            
        },
        rentalThisBook() {
            console.log("----- method rental was called -----")
            if(confirm("この本を借りますか？")){
                axios.post("http://localhost:8080/rental/start",
                        {book_id: this.dataObj.id},
                        {withCredentials: true})
                .then(function(response) {
                    console.log("----- success -----")
                    console.log(response)
                    this.$router.go({path: this.$router.currentRoute.path, force: true})
                }.bind(this))
                .catch(error => {
                    console.log("----- error -----")
                    alert("アプリケーションがバグってる可能性が...")
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
}
</script>

<style scoped>
h3 {
    margin-bottom: 5px;
}

table, th, td {
    border: 1px solid black
}

table {
    margin: 0 auto;
}
</style>