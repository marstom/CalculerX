<template>
<div>
    <span v-for="e in els">
        <div :class="[{digit:true, sign:isDigit(e)}]">{{ e }}</div>
    </span>

    <span v-if="showResult()">
        <div :class="[{digit:true, ok:isValidResult, nok:!isValidResult}]">{{ result }}</div>
    </span>
    <span v-if="showResult() && goodresult && !isValidResult">
        <div class="digit ok">{{ answer }}</div>
    </span>
</div> 
</template>


<script>
export default {
    name:'MathFormula', 
    props: {
        k: {
            type: Boolean,
            default: false
        },
        formula: {
            type: String,
            default: ''
        },
        result: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        },
        goodresult: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            answer: null
        }
    },
    methods: {
        isDigit(n) {
            if (isNaN(parseInt(n))) {
                return true
            }
            return false
        },

        setAnswer() {
            this.answer = eval(this.formula)
            this.answer = Math.round(this.answer * 1000) / 1000
            return this.answer
        },
        showResult() {
            this.answer = eval(this.formula)
            this.answer = Math.round(this.answer * 1000) / 1000
            let res = ((this.result !== '') && (this.show === true))
            return res
        }

    },
    computed: {
        els() {
            // const formula = this.formula.split(' ')
            // const formula = this.formula.split(re)
            let formula = this.formula
            formula = formula.replace(/\+/g, ' + ')
            formula = formula.replace(/\-/g, ' - ')
            formula = formula.replace(/\*/g, ' * ')
            formula = formula.replace(/\//g, ' / ')
            formula = formula.replace(/\(/g, '( ')
            formula = formula.replace(/\)/g, ' )')
            formula = formula.split(' ')
            formula.push('=')
            return formula
        },

        isValidResult() {
            if (this.setAnswer()*1000 === parseInt(this.result*1000)) {
                return true
            }
            return false

        },

    }

}
    
</script>