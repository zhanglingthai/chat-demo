<template>
    <div class="search-result">
        SearchResult
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'SearchResult',
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: mapState({
        loading: state => state.loading.loading
    })
}
</script>
<style lang="scss" scoped>
</style>