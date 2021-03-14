<template>
    <div class="message-list">
        MessageList
    </div>
</template>
<script>
export default {
    name: 'MessageList',
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