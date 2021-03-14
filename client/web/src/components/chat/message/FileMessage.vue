<template>
    <div class="file-message">
        FileMessage
    </div>
</template>
<script>
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
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss" scoped>
</style>