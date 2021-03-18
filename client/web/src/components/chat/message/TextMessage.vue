<template>
    <div class="text-message">
        TextMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TextMessage',
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