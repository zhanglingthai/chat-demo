<template>
    <div class="group-message-list">
        GroupMessageList
    </div>
</template>
<script>
export default {
    name: 'GroupMessageList',
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