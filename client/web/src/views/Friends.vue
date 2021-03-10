<template>
    <div class="friends">
        friends
    </div>
</template>
<script>

export default {
    name: 'Friends',
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