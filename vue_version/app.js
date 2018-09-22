


Vue.component('math-formula', {
    template: `
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
    `,
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

})

class SelectFormula {
    constructor() {
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
        this.getFormulasHttp()
    }

    getFormulasHttp(){
        axios.get('http://127.0.0.1:8000/calculer/workbook/edit/1/')
        .then(response => {
            this.formulas = response.data
        })
    }

    getRandomFormula() {
        const randf = Math.floor(Math.random() * this.formulas.length)
        return this.formulas[randf].formula
    }

}

new Vue({
    el: '#app',
    data: {
        ha: 'tomek',
        result: null,
        currentFormula: '',
        showResult: false,
        goodResult: false,
        formulaItems: [
        ]
    },
    mounted() {
        this.sf = new SelectFormula()
        this.currentFormula = this.sf.getRandomFormula()
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
})


