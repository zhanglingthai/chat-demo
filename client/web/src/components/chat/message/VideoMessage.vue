<template>
    <div class="Video-message">
        VideoMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'VideoMessage',
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