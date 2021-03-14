<template>
    <div class="friend-apply-message">
        FriendApplyMessage
    </div>
</template>
<script>
export default {
    name: 'FriendApplyMessage',
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