<template>
	<view>
		<chose-city @selectCity="selectCity" v-if="showCity" @closeModal="closeModal"></chose-city>
	</view>
</template>

<script>
	import choseCity from "@/components/chose-city/chose-city"
	export default {
		components: {
			choseCity
		},
		data() {
			return {
				showCity:true
			}
		},
		methods: { 
			selectCity(item) {
				console.log('-您选择的城市-',item)
				// this.showCity = false
			},
			closeModal() {
				this.showCity = false
			},
		}
	}
</script>

<style>

</style>
