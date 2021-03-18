<template>
    <div class="file-message">
        FileMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'FileMessage',
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