// import Swiper from "swiper";
// import { Navigation, Pagination, Scrollbar, Keyboard } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

// window.Webflow = window.Webflow || [];
// window.Webflow.push(function () {

//     document
//     .querySelectorAll(".slider-main_component")
//     .forEach((sliderComponent) => {
//         new Swiper(sliderComponent.querySelector(".swiper"), {
//         modules: [Navigation, Pagination, Scrollbar, Keyboard],
//         speed: 300,
//         loop: false,
//         rewind: true,
//         autoHeight: false,
//         centeredSlides: false,
//         followFinger: true,
//         freeMode: true,
//         slideToClickedSlide: false,
//         slidesPerView: "auto",
//         keyboard: {
//             enabled: true,
//             onlyInViewport: true,
//         },
//         pagination: {
//             el: sliderComponent.querySelector(".swiper-bullet-wrapper"),
//             bulletActiveClass: "is-active",
//             bulletClass: "swiper-bullet",
//             bulletElement: "button",
//             clickable: true,
//         },
//         navigation: {
//             nextEl: sliderComponent.querySelector(".swiper-next"),
//             prevEl: sliderComponent.querySelector(".swiper-prev"),
//             disabledClass: "is-disabled",
//         },
//         scrollbar: {
//             el: sliderComponent.querySelector(".swiper-drag-wrapper"),
//             draggable: true,
//             dragClass: "swiper-drag",
//             snapOnRelease: false,
//         },
//         slideActiveClass: "is-active",
//         slideDuplicateActiveClass: "is-active",
//         });
//     });
// });