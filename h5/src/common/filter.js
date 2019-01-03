import Vue from 'vue'
import { toNumber } from "@/common/utils"
Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('toLowerCase', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.toLowerCase()
})

Vue.filter('formatTime', function (value) {
    if(!toNumber(value)){
        return ""
    }
    let date = new Date(toNumber(value))
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // console.log("filter");
    return Y + M + D
})