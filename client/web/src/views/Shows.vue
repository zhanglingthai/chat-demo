<template>
    <div class="shows">
        shows
    </div>
</template>
<script>

export default {
    name: 'Shows',
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
<style lang="scss">
</style>