const eventBus = new Vue({
    data(){
        return{
            workbook: 1
        }
    }
});


// eventBus.$on('selectWorkbook', (e) => {
//     console.log('BUSSSS ', e)
//     this.workbook = e
//     eventBus.workbook = e
// })

Vue.component('my-select-workbook',{
    template: `
        <div>
            <h3>Select workbook:</h3>
            <div>
                <input v-for="a in books_list" type="radio" name="a" id="a" @click="getWorkbook(a)">
            </div>
            <h3><span><i class="fa fa-plus-square-o add" aria-hidden="true"></i></span></h3>
        </div>
    `,

    data(){
        return{
            books_list: [],
            current: 0,
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/calculer/workbook/').then((response) => {
            this.books_list = response.data
        })
    },
    methods: {
        getWorkbook(e){
            console.log('book number -> ' , e)
            eventBus.$emit('selectWorkbook', e)
        }

    }
})

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
            modified: false,
            currentWorkbook: 1
        }
    },
    props: ['value',],
    created(){
        let vx = this
        eventBus.$on('selectWorkbook', (e) => {
            vx.currentWorkbook = e
        })

    },
    methods: {
        performSave() {
            console.log('save');


        },
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
            
        }
    },
    watch: {

    }
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
        formulas: [],
        currentWorkbook: 1


    },
    created(){
        let vx = this
        eventBus.$on('selectWorkbook', (e) => {
            vx.currentWorkbook = e
            vx.refreshFormulas()
        })

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
            
        }

    },
    computed: {

        listOfFormulas() {

            return this.formulas
        }

    }
})