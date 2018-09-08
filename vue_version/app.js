


Vue.component('math-formula', {
    template: `
    <div>
    <span v-for="e in els">
        <div :class="[{digit:true, sign:isDigit(e)}]">{{ e }}</div>
    </span>

    <span v-if="result !== ''">
        <div :class="[{digit:true, ok:isValidResult, nok:!isValidResult}]">{{ result }}</div>
    </span>
    </div>
    `,
    props: ['k', 'formula', 'result'],
    data(){
        return {
        }
    },
    methods:{
        isDigit(n){
            if (isNaN(parseInt(n))) {
                return true
            }
            return false
        },

        showResult(){
            return eval(this.formula)
        }
    },
    computed:{
        els(){
            const formula = this.formula.split(' ')
            formula.push('=')
            return formula
        },

        isValidResult(){
            if(this.showResult() === parseInt(this.result)){
                return true
            }
            return false

        }
    }

  })

new Vue({
    el:'#app',
    data:{
        ha: 'tomek',
        result: null,
        showResult: false
    },
    methods: {
        getResult(){
            return this.result
        }

    }
})


