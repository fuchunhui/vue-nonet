<template>
    <input
        :min="min"
        v-model="localValue"
        type="number"
        @keyup.enter="enterValue($event)"
        @blur="inputValue"
        class="nonet-input"/>
</template>

<script>
export default {
    name: 'NonetInput',

    props: {
        placeholder: {
            type: String,
            default: '请输入内容'
        },
        min: {
            type: Number,
            default: 0
        },
        value: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            localValue: 0
        }
    },

    created() {
        this.localValue = this.value;
    },

    methods: {
        enterValue(event) {
            event.target.blur();
        },
        inputValue() {
            this.$emit('update:value', Number(this.localValue));
        }
    }
}
</script>

<style lang="less">
.nonet-input {
    width: 100px;
    height: 24px;
    font-size: 12px;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    background-color: #FFFFFF;
    color: #3F3F3F;
    text-indent: 2px;
    outline: none;
    &:focus {
        border-color: #3A87FF;
        box-shadow: 0 0 3px 1px rgba(30,113,242,0.32);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance:textfield;
}
</style>
