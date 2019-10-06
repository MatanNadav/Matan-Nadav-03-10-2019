
export default {
    name: 'weather-filter',
    template: `
   
    <section class="filter-container">
        <h5>Search for a city</h5>
        <input type="text" v-model="filterBy.txt" list="options" @keydown.enter="emitFilter">
        <button class="btn btn-primary filter-btn" @click="emitFilter">Find</button>
        
    </section>
    `,

    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },

    props: [],
    computed: {
      
    },

    methods: {
        emitFilter() {
            this.$emit('emit-filter', this.filterBy);
            this.filterBy.txt = ''
        }
    },

    created() {
    },
    components: {
    }
}