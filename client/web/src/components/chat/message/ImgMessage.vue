<template>
    <div class="img-message">
        ImgMessage
    </div>
</template>
<script>
export default {
    name: 'ImgMessage',
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