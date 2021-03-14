<template>
    <div class="notice-list">
        NoticeList
    </div>
</template>
<script>
export default {
    name: 'NoticeList',
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