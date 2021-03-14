<template>
    <div class="inputbox">
        InputBox
    </div>
</template>
<script>

export default {
    name: 'InputBox',
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