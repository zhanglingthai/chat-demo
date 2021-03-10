<template>
    <div class="main">
    	<router-view />
    </div>
</template>
<script>

export default {
    name: 'Main',
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
.main{

}
</style>