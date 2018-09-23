<template>
<!-- todo add global event -->
<div>
    <h1> {{ title }} </h1>
    <a href="/" class="back"><--- Back</a>
    <my-select-workbook></my-select-workbook>

    <form action="post" v-on:submit.prevent @submit="submit">
        <input class="oper" type="text" v-model="formula">
        <input type="submit" value="+">
    </form>

    <hr>
    <div v-for="formula in listOfFormulas">
        <my-formula @deletedevent="refreshFormulas" :value="formula"></my-formula>
    </div>

</div>
    
</template>


<script>
    
</script>