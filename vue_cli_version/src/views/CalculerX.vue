<template>
<div>
    <h1>Calcul X</h1>
    <div>Calculer X this is official 0.0.2alpha version:</div>

    <a href="options.html" class="options">
    <i class="fa fa-file-text-o" aria-hidden="true"></i>
    </a>

    <div class="ans">
    <form v-on:submit.prevent>
        <input type="text" id="result" v-model="result">
        <input type="submit" value="ok" @click="answerButton" @submit="answerButton">
        <label>Show good result</label> <input type="checkbox" v-model="goodResult">
    </form>
    </div>

    <math-formula :formula="currentFormula" :result="result" :show="showResult" :goodresult="goodResult"></math-formula>
    <div v-for="item in formulaItems">
        <math-formula :formula="item.formula" :result="item.result.toString()" :show="Boolean(1)" :goodresult="goodResult"></math-formula>
    </div>
</div>
    
</template>


<script>
import axios from 'axios'
import MathFormula from '@/components/MathFormula.vue'

class SelectFormula {
    constructor(current_workbook) {
        // this.formulas = [
        //     '2 + 12 + 2',
        //     '3 - 12 + 3',
        //     '25 + 11 - 16',
        //     '3 * ( 2 - 3 )',
        //     '2 + 11 - 8',
        //     '2 + 2',
        //     '16 + 23 + 129',
        // ]
        this.formulas = [{
            id:0,
            formula: "2+1"
        }]
        this.getFormulasHttp(current_workbook)
    }

    getFormulasHttp(current_workbook){
        console.log(`load workbook ${current_workbook}`);
        
        axios.get(`http://127.0.0.1:8000/calculer/workbook/edit/${current_workbook}/`)
        .then(response => {
            this.formulas = response.data
        })
    }

    getRandomFormula() {
        const randf = Math.floor(Math.random() * this.formulas.length)
        return this.formulas[randf].formula
    }

}

export default {

    name:'app',
    components:{MathFormula},

    data() {
        return {
            ha: 'tomek',
            result: null,
            currentFormula: '',
            showResult: false,
            goodResult: false,
            formulaItems: []

        }
    },
    mounted() {
        let current_workbook = null
        axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
            current_workbook = response.data.activeWorkbook
            this.sf = new SelectFormula(current_workbook)
            this.currentFormula = this.sf.getRandomFormula()
        })
    },

    methods: {
        getResult() {
            return this.result
        },

        answerButton() {
            // this.showResult = true
            if (this.result) {
                this.formulaItems.unshift({
                    formula: this.currentFormula,
                    result: this.result
                })
                if (this.formulaItems.length > 4) {
                    this.formulaItems.pop()
                }
                this.currentFormula = this.sf.getRandomFormula()
                this.result = null;

            }
        }

    }
}
    
</script>

<style lang="scss">
.digit{
    display: inline-block;
    margin-top: 30px;
    margin-right: 10px;
    padding-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    text-align: center;
    align-content: center;
    position: relative;
    font-size: 30px;
    border-style: solid;
    width: 3ch;
    height: 3ch;
    background-color: #00d4fa;
    color: rgb(0, 0, 0);
}

.ok{
    background-color: #4CAF50;
}

.nok{
    background-color: red;
}

.sign{
    width: 19px;
    background-color: #008dc5;
    color: rgb(229, 255, 0);
    font-size: 33px;
}

.ans{
    align-items: center;
}


input[type=text] {
    width: 15%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid #555;
    outline: none;
    font-size: 40px;
    background-color: #d9fcff;
    &:focus{
        background-color: lightblue;
    }
}

input[type=button], input[type=submit], input[type=reset] {
    background-color: #4CAF50;
    font-size: 20px;
    border: none;
    color: white;
    text-decoration: none;
    cursor: pointer;
    padding: 31px 40px 17px;
    margin-bottom: 10px;
    margin: 1px;

    &:hover{
        background-color: rgb(78, 202, 82);
    }
}



// plusiki
.add {
    color: rgb(35, 99, 35);
    &:hover{
        color: rgb(60, 173, 60);
    }
}


// koperta
.options{
    color: rebeccapurple;
    width: 40px;
    font-size: 50px;
    position: absolute;
    right: 200px;
    top: 100px;
    &:hover{
        color: rgb(141, 73, 209);
        width: 40px;
        font-size: 50px;
        position: absolute;
        right: 200px;
        top: 100px;

    }
    &:active{
        color: rgb(73, 209, 146);
        width: 40px;
        font-size: 50px;
        position: absolute;
        right: 200px;
        top: 100px;

    }
}


/*  in options tab */

.oper{
    height: 67px;
    width: 590px !important;
    font-size: 25px !important;
}

.bsave{
    background-color:rgb(32, 161, 161) !important;
    &:hover{
        background-color:rgb(41, 182, 182) !important;
    }
}

.bdelete{
    background-color:rgb(216, 78, 78) !important;
    &:hover{
        background-color:rgb(228, 81, 81) !important;
    }
}

.modified{
    background-color: rgb(74, 224, 230) !important;
}


</style>
