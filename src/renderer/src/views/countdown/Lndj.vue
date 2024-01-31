<template>
    <div class="select-none">
        <div class="absolute left-5rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-left -tracking-3rem whitespace-nowrap font-[HongLeiXingShuJianTi]">
            放假倒计时
        </div>
        <div class="absolute right-0rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-right -tracking-3rem font-[HongLeiXingShuJianTi]">
            <div
                v-show="duration.days > 0 || duration.hours > 0"
                class="whitespace-nowrap flex"
            >
                <div v-show="duration.days > 0">
                    <span
                        v-show="duration.days > 0"
                        class="write-initial tracking-1rem h-8rem w-10.5rem text-center"
                    >{{ duration.days }}</span>天
                </div>
                <div v-show=" duration.hours > 0 || duration.days > 0">
                    <span
                        v-show="duration.hours > 0"
                        class="write-initial tracking-1rem h-8rem w-10.5rem text-center"
                    >{{ duration.hours }}</span>小时
                </div>
            </div>
            <div
                v-show="duration.minutes > 0 || duration.seconds > 0"
                class="whitespace-nowrap flex"
            >
                <div v-show="duration.minutes > 0 || duration.hours > 0 || duration.days > 0">
                    <span
                        v-show="duration.minutes > 0"
                        class="write-initial tracking-1rem h-8rem w-10.5rem text-center"
                    >{{ duration.minutes }}</span>
                    分
                </div>
                <div v-show="duration.seconds > 0 || duration.minutes > 0 || duration.hours > 0 || duration.days > 0">
                    <span
                        v-show="duration.seconds > 0 || duration.minutes > 0 || duration.hours > 0 || duration.days > 0"
                        class="write-initial tracking-1rem h-8rem w-10.5rem text-center"
                    >
                        {{ duration.seconds }}
                    </span>
                    秒
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>

const props = withDefaults(defineProps<{
    duration:{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }
}>(), {
    duration: ()=>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
});

const { duration } = toRefs(props);

</script>
<style lang='less' scoped>

</style>