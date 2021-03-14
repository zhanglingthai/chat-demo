<template>
    <div class="setting">
        setting
    </div>
</template>
<script>

export default {
    name: 'Setting',
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