<template>
    <div class="section-container box-shadow">
        <el-divider class="section-container__title" v-if="title" content-position="left">
            {{ title }}
        </el-divider>
        <div class="ml-20 mr-20">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator'
    @Component({})
    export default class SectionContainer extends Vue {
        @Prop() private title!: string;
        // @Prop() private title: string | undefined;
    }
</script>

<style lang="scss" scoped>
.section-container {
    max-width: 870px;
    padding: 15px 0;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
    /*box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);*/
    .section-container__title .el-divider__text {
        color: var(--primary-color);
    }
}
</style>
