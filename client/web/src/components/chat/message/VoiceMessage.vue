<template>
    <div class="voice-message">
        VoiceMessage
    </div>
</template>
<script>
export default {
    name: 'VoiceMessage',
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