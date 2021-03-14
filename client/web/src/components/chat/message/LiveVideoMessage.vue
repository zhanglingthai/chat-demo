<template>
    <div class="live-video-message">
        LiveVideoMessage
    </div>
</template>
<script>
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
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss" scoped>
</style>