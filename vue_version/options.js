Vue.component('my-formula', {
    template: `
        <div>
            <input class="oper" :value="value.formula" type="text" v-model="value.formula">
            <input @click="performSave" type="button" value="Save" class="bsave">
            <input @click="performDelete"type="button" value="X" class="bdelete">
        </div>
    `,
    data() {
        return {
            content: ''
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
            axios.delete(`http://localhost:3000/calculer/${this.value.id}`)
            .then(response => {
                console.log(response);
            })
        },
        performSave(){
            axios.patch(`http://localhost:3000/calculer/${this.value.id}`, {formula:this.value.formula})
            .then(response => {
                console.log(response);
            })
        }
    }
})

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
            axios.post('http://localhost:3000/calculer', {formula: this.formula})
            .then(response => {
                console.log(response)
                this.refreshFormulas()
                }
            )
        }

    },
    computed: {

        listOfFormulas() {

            return this.formulas
        }

    }
})