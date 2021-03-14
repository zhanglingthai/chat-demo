<template>
    <div class="text-message">
        TextMessage
    </div>
</template>
<script>
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
    computed: {
        loading: function() {
            return this.$store.state.loading.loading
        }
    }
}
</script>
<style lang="scss" scoped>
</style>