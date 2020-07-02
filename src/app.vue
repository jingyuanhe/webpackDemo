<template>
    <div id="container">
        <h1>{{name}}</h1>
    </div>
</template>
<script>
export default {
    data:function(){
        return{
            name:'测试'
        }
    }
}
</script>
<style scoped lang="scss">
    #container{
        padding: 10px;
    }
</style>