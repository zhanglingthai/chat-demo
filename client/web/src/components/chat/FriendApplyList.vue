<template>
    <div class="friend-apply-list">
        FriendApplyList
    </div>
</template>
<script>

export default {
    name: 'FriendApplyList',
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