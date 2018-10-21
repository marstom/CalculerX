<template>
<div>
    <input
    :class="[{oper:true, modified:modified}]"
    type="text" v-model="value.formula" 
    @change="modified = true">

    <input 
    @click="performSave" 
    type="button" 
    :value="modified?['Save*']:['Save']" 
    class="bsave">

    <input 
    @click="performDelete"
    type="button" 
    value="X" 
    class="bdelete">
</div>
</template>


<script>
import axios from 'axios'
import Vue from 'vue'
import eventBus from '../event-bus.js'

export default {
    name:'my-formula',
    data() {
        return {
            content: '',
            modified: false,
            currentWorkbook: 1
        }
    },
    props: ['value',],
    created(){
        this.readCurrentWorkbook()
        eventBus.$on('selectWorkbook', () =>{
            // everytime when i change radiobutton!
            this.readCurrentWorkbook()
        })
    },
    methods: {
        performDelete() {
            console.log('delete');
            console.log(this.value.id);
            var vm = this
            axios.delete(`http://127.0.0.1:8000/calculer/workbook/edit/${this.currentWorkbook}/${this.value.id}/`)
            .then(response => {
                console.log(response);
                vm.$emit('deletedevent')
            })
        },
        performSave(){
            axios.patch(`http://127.0.0.1:8000/calculer/workbook/edit/${this.currentWorkbook}/${this.value.id}/`, {formula:this.value.formula})
            .then(response => {
                console.log(response);
                this.modified = false
            })
        },
        setModified(){
            this.modified = true
        },
        hello(){
            console.log('event trigger et my-formula');
            
        },
        readCurrentWorkbook(){
            axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
                this.currentWorkbook = response.data.activeWorkbook
            })
        }
    },
    computed:{

    }
}
    
</script>



<style lang="scss" scoped>



</style>
