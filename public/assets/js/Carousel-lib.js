const swiper = new Swiper(".swiper", {
	direction: "horizontal",
	loop: true,
	slidesPerView: .5,
	centeredSlides: true,
	//centerInsufficientSlides: true,
	spaceBetween: 20,
	mousewheel: true,
	speed: 500,
	slideActiveClass: "active",
	slidesOffsetBefore: 0,

	breakpoints: {
		1300: {
			slidesPerView: 3,
			slidesOffsetBefore: -100,
		}
	},
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	pagination: {
		el: ".swiper-pagination",
		dynamicBullets: true,
	},
});

