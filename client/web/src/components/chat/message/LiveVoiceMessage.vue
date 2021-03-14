<template>
    <div class="live-voice-message">
        LiveVoiceMessage
    </div>
</template>
<script>
export default {
    name: 'LiveVoiceMessage',
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