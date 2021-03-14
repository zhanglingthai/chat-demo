<template>
    <div class="Video-message">
        VideoMessage
    </div>
</template>
<script>
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
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss" scoped>
</style>