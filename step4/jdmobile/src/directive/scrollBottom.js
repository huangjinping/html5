export default {
	inserted (el, binding){
        // console.log(el)
		let isScrollBottom = (pageX) => {
			let [
				scrollTop,
				winHeight,
				bodyHeight
			] = [
				(document.body.scrollTop),
				(window.outerHeight),
				(document.body.clientHeight)
			]
			// console.log(scrollTop,winHeight,bodyHeight)
			if (bodyHeight-scrollTop <= winHeight+100 ){
				return true
			}else{
				return false
			}		
		}
		document.addEventListener('scroll',(e) =>{
			// console.log(isScrollBottom())				
			if(isScrollBottom()){
				binding.value()
			}
		},false)
	}
}
