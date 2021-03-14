<template>
    <div class="sys-message">
        SysMessage
    </div>
</template>
<script>
export default {
    name: 'SysMessage',
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