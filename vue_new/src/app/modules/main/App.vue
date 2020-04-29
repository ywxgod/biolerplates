<template>
    <transition name="fade">
<!--        <router-view></router-view>-->
        <el-button class="my-btn">hello</el-button>
    </transition>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style scoped lang="scss">
.my-btn {
    font-size: 50px;
    background-color: chocolate;
    span {
        background-color: aquamarine;
    }
}
</style>
