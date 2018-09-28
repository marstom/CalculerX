<template>
<!-- todo add global event -->
<div>
    <h1> {{ title }} </h1>
    <a href="/" class="back"><--- Back</a>
    <my-select-workbook></my-select-workbook>

    <form action="post" v-on:submit.prevent @submit="submit">
        <input class="oper" type="text" v-model="formula">
        <input type="submit" value="+">
    </form>

    <hr>
    <div v-for="formula in listOfFormulas">
        <my-formula @deletedevent="refreshFormulas" :value="formula"></my-formula>
    </div>

</div>
    
</template>


<script>
import MyFormula from '@/components/MyFormula.vue'
import MySelectWorkbook from '@/components/MySelectWorkbook.vue'
import axios from 'axios'
import eventBus from '../event-bus.js'

const splitFormula = (formula) => {
    formula = formula.trim()
    let re = /\+|\-\*|\//
    return formula
}


export default {
    components:{MyFormula, MySelectWorkbook},

        data(){
            return {
            title: 'Options',
            formula: '',
            formulas: [],
            currentWorkbook: 1}
        },
    created(){
        this.readCurrentWorkbook()
        let vx = this
        eventBus.$on('selectWorkbook', (e) => {
            vx.currentWorkbook = e
            vx.refreshFormulas()
        })


    },
    mounted() {
    },
    methods: {
        submit() {
            console.log('Add formula');
            this.postFormula()
            this.formula = ''


        },

        refreshFormulas() {
            axios.get(`http://127.0.0.1:8000/calculer/workbook/edit/${this.currentWorkbook}/`)
                .then(response => {
                    this.formulas = response.data
                    console.log(this.formulas)
                })
        },

        postFormula(){
            const f = splitFormula(this.formula)
            axios.post(`http://127.0.0.1:8000/calculer/workbook/edit/${this.currentWorkbook}/`, {formula: f})
            .then(response => {
                console.log(response)
                this.refreshFormulas()
                }
            )
        },
        hello(){
            console.log('log from root');
            
        },
        readCurrentWorkbook(){
            axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
                this.currentWorkbook = response.data.activeWorkbook
                this.refreshFormulas()
            })
        }

    },
    computed: {

        listOfFormulas() {

            return this.formulas
        }

    }

}
 
</script>


<style>

</style>
