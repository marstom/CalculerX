<template>
<div>
    <span>{{ title }}</span>
</div>
</template>


<script>
export default {
    name:'my-radio-button',
    data(){
        return {title:'tomek'}
    }
}
    
</script>


<style lang="scss" scoped>
    div{
        width: 70px;
        height: 40px;
        background-color: rgb(204, 203, 141);
        &:hover{
            background-color: rgb(255, 252, 57);
        }
    }
    p{
        background-color: aqua;
    }
</style>

