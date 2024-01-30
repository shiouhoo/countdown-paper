<template>
    <div>
        <div class="absolute left-5rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-left -tracking-3rem whitespace-nowrap font-[HongLeiXingShuJianTi]">
            放假倒计时
        </div>
        <div class="absolute right-0rem top-50% -translate-y-50% text-#fff text-8rem write-vertical-right -tracking-3rem font-[HongLeiXingShuJianTi]">
            <div class="whitespace-nowrap">
                <span class="write-initial tracking-1rem h-8rem w-10.5rem text-center">{{ duration.days }}</span> 天
                <span class="write-initial tracking-1rem h-8rem w-10.5rem text-center">{{ duration.hours }}</span> 小时
            </div>
            <div class="whitespace-nowrap">
                <span class="write-initial tracking-1rem h-8rem w-10.5rem text-center">{{ duration.minutes }}</span> 分钟
                <span class="write-initial tracking-1rem h-8rem w-10.5rem text-center">{{ duration.seconds }}</span> 秒
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