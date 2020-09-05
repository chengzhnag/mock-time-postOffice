<template>
<div class="about-box">
    <img src="../../assets/img/about.png" alt="">
</div>
</template>

<script>
export default {
    data() {
        return {

        };
    },

    beforeMount() {},

    mounted() {},

    methods: {},

}
</script>

<style lang="scss" scoped>
.about-box {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 30px 12% 30px 12%;

    img {
        object-fit: contain;
    }
}
</style>
