const eventBus = new Vue();

Vue.component('my-formula', {
    template: `
        <div>
            <input :class="[{oper:true, modified:modified}]" type="text" v-model="value.formula" @change="modified = true">
            <input @click="performSave" type="button" :value="modified?['Save*']:['Save']" class="bsave">
            <input @click="performDelete"type="button" value="X" class="bdelete">
        </div>
    `,
    data() {
        return {
            content: '',
            modified: false
        }
    },
    props: ['value',],
    methods: {
        performSave() {
            console.log('save');


        },
        performDelete() {
            console.log('delete');
            console.log(this.value.id);
            var vm = this
            axios.delete(`http://localhost:3000/calculer/${this.value.id}`)
            .then(response => {
                console.log(response);
                vm.$emit('deletedevent')
            })
        },
        performSave(){
            axios.patch(`http://localhost:3000/calculer/${this.value.id}`, {formula:this.value.formula})
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
            
        }
    },
})


const splitFormula = (formula) => {
    formula = formula.trim()
    let re = /\+|\-\*|\//
    return formula
}

new Vue({
    el: '#app',
    data: {
        title: 'Options',
        formula: '',
        formulas: []

    },
    mounted() {
        this.refreshFormulas()
    },
    methods: {
        submit() {
            console.log('Add formula');
            this.postFormula()
            this.formula = ''


        },

        refreshFormulas() {
            axios.get('http://localhost:3000/calculer')
                .then(response => {
                    this.formulas = response.data
                    console.log(this.formulas)
                })
        },

        postFormula(){
            const f = splitFormula(this.formula)
            axios.post('http://localhost:3000/calculer', {formula: f})
            .then(response => {
                console.log(response)
                this.refreshFormulas()
                }
            )
        },
        hello(){
            console.log('log from root');
            
        }

    },
    computed: {

        listOfFormulas() {

            return this.formulas
        }

    }
})