<template>
    <div>
        <h3>Select workbook:</h3>
        <my-radio-button></my-radio-button>
        <div>
            <input v-for="a in books_list" type="radio" name="a" id="a" @click="selectWorkbook(a)">
        </div>
        <h3 @click="addWorkbook"><span><i class="fa fa-plus-square-o add" aria-hidden="true"></i></span></h3>
        <h3 @click="deleteWorkbook(current)"><span><i class="fa fa-minus-square-o add" aria-hidden="true"></i></span></h3>
    </div>

</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import eventBus from '../event-bus.js'
import MyRadioButton from '@/components/MyRadioButton.vue'

    export default {
    components:{MyRadioButton},
    name:'my-select-workbook',
    data(){
        return{
            books_list: [],
            current: 0,
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
            this.books_list = response.data.workbooks
            this.current = response.data.activeWorkbook
        })
    },
    methods: {
        // select workbook radiobutton
        selectWorkbook(e){
            eventBus.workbook = this.current
            console.log(e)
            axios.post('http://127.0.0.1:8000/calculer/workbook/', {active: e}).then((response) => {
                console.log('book number -> ' , e)
                this.current = e
                eventBus.$emit('selectWorkbook', e)
                console.log(response.status);
                
            })
        },
        addWorkbook(){
            console.log('Adding workbook');
            axios.post('http://127.0.0.1:8000/calculer/workbook/create', {name: 'workbookX'}).then(() => {
                this.reloadWorkbooks()
            })
        },
        deleteWorkbook(id){
            console.log(`Deleteing workbook ${id}`)
            axios.delete(`http://127.0.0.1:8000/calculer/workbook/edit/${id}/`).then((response) =>{
                console.log(response.status);
                
                this.reloadWorkbooks()
            })
        },

        reloadWorkbooks(){
            axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
                this.books_list = response.data.workbooks
            })
        }
    }
}
</script>