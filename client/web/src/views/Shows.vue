<template>
    <div class="shows">
        shows
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Shows',
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