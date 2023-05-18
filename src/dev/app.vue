<template>
    <div>
        <VueCalendar />
    </div>
</template>

<script>
import { defineComponent } from 'vue';

import VueCalendar from '@/lib';

export default defineComponent({
    components: {
        VueCalendar,
    },
});
</script>