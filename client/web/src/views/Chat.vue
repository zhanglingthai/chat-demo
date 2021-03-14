<template>
    <div class="chat">
        chat
    </div>
</template>
<script>

export default {
    name: 'Chat',
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