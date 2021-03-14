<template>
    <div class="friend-list">
        FriendList
    </div>
</template>
<script>

export default {
    name: 'FriendList',
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