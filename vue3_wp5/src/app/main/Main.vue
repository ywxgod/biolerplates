<template>
    <div class="title">{{ title }}</div>
    <p>{{ x }}, {{y}}</p>
</template>

<script>
import {ref,computed} from "vue";

export default {
    name: 'Main.vue',
    props: {
        title: String
    },
    setup(props) {

        const x = ref(0);
        const y = computed(() => Date.now());

        setInterval(() => {
            x.value = Date.now();
        }, 1000);

        return {
            x,
            y
        }
    }
}
</script>

<style scoped lang='scss'>
    .title {
        padding: 4em;
        background-color: beige;
    }
    .no-use {
        padding: 2em;
        margin: 3em;
    }
</style>
