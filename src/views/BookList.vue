<template>
    <div>
        <h3>書籍リスト</h3>
        <table>
            <thead>
                <tr>
                    <th>タイトル</th>
                    <th>著者</th>
                    <th>貸出状況</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in dataAry" :key="data.title">
                    <td>{{ data.title }}</td>
                    <td>{{ data.author }}</td>
                    <td>{{ data.rentalStatus }}</td>
                    <td>
                        <router-link :to="{name: 'adminUpdate', params: {id: data.id}}">更新</router-link>
                        &nbsp;
                        <a href="#" @click.prevent="deleteRecord" :data-id="data.id">削除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            dataAry: []
        }
    },
    mounted: function() {
        axios.get('http://localhost:8080/book/list', {withCredentials: true}).then(function(response) {
            console.log("----- success -----")
            console.log(response)
            this.dataAry = response.data.book_list
            this.dataAry.forEach(data => {
                if (!data.is_rental) {
                    data.rentalStatus = "貸出可"
                } else {
                    data.rentalStatus = "貸出不可"
                }
            });
        }.bind(this)).catch( error => {
            console.log("----- error -----")
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
    },
    methods: {
        deleteRecord(event) {
            // alert(`書籍ID: ${event.currentTarget.getAttribute('data-id')} の書籍を削除しますか?`)
            if (confirm(`書籍ID: ${event.currentTarget.getAttribute('data-id')} の書籍を削除しますか?`)) {
                axios.delete(`http://localhost:8080/admin/book/delete/${event.currentTarget.getAttribute('data-id')}`, {withCredentials: true})
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