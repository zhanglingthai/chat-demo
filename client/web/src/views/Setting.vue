<template>
    <div class="setting">
        setting
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'Setting',
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