<template>
    <div class="live-video-message">
        LiveVideoMessage
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'LiveVideoMessage',
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