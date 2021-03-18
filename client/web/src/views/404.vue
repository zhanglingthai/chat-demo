<template>
    <div class="page404">
        404
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Page404',
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