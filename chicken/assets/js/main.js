document.addEventListener("DOMContentLoaded", () => {
    document.cookie = "name=value; SameSite=None; Secure";

    // 초기 텍스트 세팅
    updateTextContainer(0);

    const $header = document.querySelector(".main-body .header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            // 아래로 스크롤하면 hide 클래스 추가
            $header.classList.add("hide");
        } else {
            // 위로 스크롤하면 hide 클래스 제거
            $header.classList.remove("hide");
        }

        lastScrollY = currentScrollY;
    });

    // 슬라이드 배치 업데이트
    // updateSlidePositions();

    //인트로

    /* window.addEventListener('load', () => {
        const tl = gsap.timeline();

        // --- [1] 커튼 애니메이션 (동시에)
        tl.add('curtain'); // 라벨 추가
        tl.to('.curtain-left', {
            x: '-100%',
            duration: 1,
            ease: 'power2.out'
        }, 'curtain');
        tl.to('.curtain-right', {
            x: '100%',
            duration: 1,
            ease: 'power2.out'
        }, 'curtain');

        // --- [2] 텍스트 + 이미지 등장 (동시에)
        tl.add('textAndImage');
        tl.fromTo('.ani-txt-right',
            { x: '-100%', opacity: '0' },
            { x: '0%', opacity: '1', duration: 1, ease: 'power2.out' },
            'textAndImage'
        );
        tl.fromTo('.ani-txt-left',
            { x: '100%', opacity: '0' },
            { x: '0%', opacity: '1', duration: 1, ease: 'power2.out' },
            'textAndImage'
        );

        // --- [2-1] 이미지 애니메이션 (텍스트 애니 끝나고 실행)
        tl.add('imageAppear'); // 이전 애니 끝난 후 바로 시작
        tl.fromTo('.ani-img',
            {},
            {
                duration: 1,
                ease: 'power2.out',
                onStart: () => {
                    const img = document.querySelector('.ani-img');
                    img?.classList.add('on');

                    setTimeout(() => {
                        img?.classList.add('on2');
                    }, 1500); // 1초 뒤에 on2 추가
                }
            },
            'imageAppear'
        );

        // --- [3] 새로운 텍스트 애니메이션
        tl.add('newText');
        tl.fromTo('.ani-new',
            { x: '-50%', opacity: '0' },
            { x: '0%', opacity: '1', duration: 1, ease: 'power2.out' },
            'newText'
        );
        tl.fromTo('.intro-mark',
            { scale: '0', opacity: '0' },
            { scale: '1', opacity: '1', duration: 1, ease: 'power2.out' },
            'newText'
        );

        // --- [4] intro → main-section 전환
        tl.add('fadeInIntro');
        tl.to('.intro', {
            // duration: 2,
           // opacity: 1, 
            onComplete: () => {
                gsap.to('.main-section', {
                    duration: 1,
                    top: 0,
                    opacity: 1,
                    ease: 'power2.inOut',
                    delay: 0,
                    onComplete: () => {
						setTimeout(() => {
                            $('html, body').animate({
                                scrollTop: $('.main-section').offset().top
                            }, 800); // 800ms 동안 부드럽게 이동
                        }, 0);

                        //document.body.style.overflow = 'auto'; 
						$('body').removeClass('body-fixed');
						if (window.innerWidth < 769) {
                            ScrollTrigger.normalizeScroll(true);
                        }
                    }
                });
            }
        }, 'fadeInIntro');
    }); */
	

    //뉴스 슬라이드
    var slideNews = new Swiper(".slide-news", {
        navigation: {
            nextEl: ".section-news .swiper-button-next",
            prevEl: ".section-news .swiper-button-prev",
        },
        pagination: {
            el: ".slide-news .swiper-pagination",
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
            },

            formatFractionCurrent: function (number) {
                return number < 10 ? "0" + number : number;
            },

            formatFractionTotal: function (number) {
                return number < 10 ? "0" + number : number;
            },
        },
    });

    // 숯 텍스트 애니메이션
    const section = document.querySelector(".section-char .section-wrap");
    const texts = document.querySelectorAll(".b_txt");

    /* gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "200%", // 스크롤 범위 조정
            scrub: true, // 스크롤에 따라 애니메이션 연동
            pin: true, // 섹션 고정
            markers: false, // 개발 시 확인용 (완성 후 false)
        },
    }).to(texts, {
        clipPath: "inset(0 0% 0 0)",
        duration: 20,
        stagger: 5, // 각 요소 순차적으로 애니메이션 적용
    }); */

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "200%",
                    scrub: true,
                    pin: true,
                    markers: false,
                },
            }).to(texts, {
                clipPath: "inset(0 0% 0 0)",
                duration: 20,
                stagger: 5,
            });
        },
        "(max-width: 768px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "-100% 0%",
                    end: "100% 50%",
                    scrub: true,
                    pin: false,
                    markers: false,
                },
            }).to(texts, {
                clipPath: "inset(0 0% 0 0)",
                duration: 20,
                stagger: 5,
            });
        },
    });

    //이미지 트레이드
    let currentIndex = 1; // 시작 숫자
    const maxIndex = 4; // 마지막 숫자 (예: charcol_5까지)
    const imgElement = document.getElementById("charcoalImg");
    const imgWrap = document.querySelector(".img-wrap");
    let intervalId = null; // setInterval 저장 변수

    /* gsap.timeline({
        scrollTrigger: {
            trigger: ".section-trade",
            start: "top top",
            end: "200%", // 스크롤 범위 조정
            scrub: true, // 스크롤에 따라 애니메이션 연동
            pin: true, // 섹션 고정
            markers: false, // 개발 시 확인용 (완성 후 false)
            onUpdate: (self) => {
                if (self.progress > 0) {
                    document.querySelector(".section-trade .img-wrap").classList.add("active");
                } else {
                    document.querySelector(".section-trade .img-wrap").classList.remove("active");
                }
            },
        },
    }); */

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-trade",
                    start: "top top",
                    end: "200%",
                    scrub: true,
                    pin: true,
                    markers: false,
                    onUpdate: (self) => {
                        const imgWrap = document.querySelector(".section-trade .img-wrap");
                        if (imgWrap) {
                            if (self.progress > 0) {
                                imgWrap.classList.add("active");
                            } else {
                                imgWrap.classList.remove("active");
                            }
                        }
                    },
                },
            });
        },
        "(max-width: 768px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-trade",
                    start: "-100% 0%",
                    end: "0% 100%",
                    scrub: true,
                    pin: false,
                    markers: false,
                    onUpdate: (self) => {
                        const imgWrap = document.querySelector(".section-trade .img-wrap");
                        if (imgWrap) {
                            if (self.progress > 0) {
                                imgWrap.classList.add("active");
                            } else {
                                imgWrap.classList.remove("active");
                            }
                        }
                    },
                },
            });
        },
    });

    /* function changeImage() {
        currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 1; // 1 → 2 → 3 → 4 → 5 → 다시 1
        imgElement.src = `../assets/images/main/charcol-trade_${currentIndex}.png`;
    }

    function startImageTrade() {
        if (!intervalId) {
            // 중복 실행 방지
            setTimeout(() => {
                intervalId = setInterval(changeImage, 500); // 2초마다 이미지 변경
            }, 1000); // 1초 후 시작
        }
    } */

    // MutationObserver 사용해서 클래스 추가 감지
    const observerImgwrap = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === "class" && imgWrap.classList.contains("active")) {
                startImageTrade();
            }
        });
    });

    observerImgwrap.observe(imgWrap, { attributes: true });

    // 숯불 카드
    const cardSection = document.querySelector(".section-card");
    const cards = document.querySelectorAll(".card-scroll");

	/* gsap.timeline({
        scrollTrigger: {
            trigger: cardSection,
            pin: true,
            scrub: 0.3,
            start: "0% 0%",
            end: "450%",
            markers: false,
            onUpdate: (self) => {
                const progress = self.progress; // 0 ~ 1

                // 33.33% 지나가면 .card-2에 on 클래스 추가
                if (progress >= 0.3) {
                    document.querySelector('.card-2').classList.add('on');
                } else {
                    document.querySelector('.card-2').classList.remove('on');
                }

                // 66.66% 지나가면 .card-3에 on 클래스 추가
                if (progress >= 0.6) {
                    document.querySelector('.card-3').classList.add('on');
                } else {
                    document.querySelector('.card-3').classList.remove('on');
                }
            }
        }
    }); */

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
            gsap.timeline({
                scrollTrigger: {
                    trigger: cardSection,
                    pin: true,
                    scrub: 0.3,
                    start: "0% 0%",
                    end: "450%",
                    markers: false,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        const card2 = document.querySelector(".card-2");
                        const card3 = document.querySelector(".card-3");

                        if (card2) {
                            card2.classList.toggle("on", progress >= 0.3);
                        }

                        if (card3) {
                            card3.classList.toggle("on", progress >= 0.6);
                        }
                    },
                },
            });
        }
    });

    /* gsap.timeline({
        scrollTrigger: {
            trigger: cardSection,
            pin: true,
            scrub: 0.3,
            start: "0% 0%",
            end: "320%", // 기존 280
            markers: false,
        },
    })
        .to({}, { duration: 3 })
        .to(cards[0], { yPercent: -84, duration: 3, ease: "none" }) // card-1 이동
        .to({}, { duration: 3 }) // 지연용 dummy tween (아무것도 안 하고 시간만 소비)
        .to(cards[1], { yPercent: -76, duration: 3, ease: "none" }) // card-1이 끝난 후 card-2 이동
        .to({}, { duration: 3 }); */

    //메뉴 슬라이드
    let slideMenu;

    function initSwiper() {
        if (slideMenu) slideMenu.destroy(true, true); // 기존 Swiper 제거

        slideMenu = new Swiper(".slide-menu", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: window.innerWidth <= 768 ? 1.3 : 1.8,
            loop: true,
            initialSlide: 1,
            coverflowEffect: getCoverflowEffect(),
            navigation: {
                nextEl: ".slide-menu .swiper-button-next",
                prevEl: ".slide-menu .swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
            breakpoints: {
                /* 0: {
                    slidesPerView: 1.3,
                    spaceBetween: 30,
                }, */
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: 1.8,
                },
            },
            on: {
                slideChange: function () {
                    updateTextContainer(this.realIndex);
                },
            },
        });
    }

    // 화면 크기에 따라 coverflowEffect 값을 변경하는 함수
    function getCoverflowEffect() {
        return window.innerWidth <= 768
            ? { rotate: 0, stretch: 10, depth: 50, modifier: 1, slideShadows: false }
            : { rotate: 50, stretch: 100, depth: 200, modifier: 1, slideShadows: false };
    }

    // Swiper 초기화
    initSwiper();

    // 반응형 변경 감지 → Swiper 재초기화
    window.addEventListener("resize", () => {
        initSwiper();
    });

    function updateTextContainer(index) {
        const textContainers = document.querySelectorAll(".txt-container");

        textContainers.forEach((container, i) => {
            container.classList.toggle("active", i === index);
        });
    }

    //꿀팁 슬라이드
    var slideTip1 = new Swiper(".slide-tip-1", {
        slidesPerView: 1,
        loop: false,
        watchOverflow: true,
        observer: true, // 요소 변경 감지
        observeParents: true,
        pagination: {
            el: ".slide__inner-1 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".slide__inner-1 .swiper-button-next",
            prevEl: ".slide__inner-1 .swiper-button-prev",
        },
    });

    var slideTip2 = new Swiper(".slide-tip-2", {
        slidesPerView: 1,
        loop: false,
        watchOverflow: true,
        observer: true, // 요소 변경 감지
        observeParents: true,
        pagination: {
            el: ".slide__inner-2 .swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".slide__inner-2 .swiper-button-next",
            prevEl: ".slide__inner-2 .swiper-button-prev",
        },
    });
});
$("#scroller1").simplyScroll({
    pauseOnHover: false,
    speed: 1,
    orientation: "vertical",
});
$("#scroller2").simplyScroll({
    pauseOnHover: false,
    speed: 1,
    orientation: "vertical",
});

//영상 슬라이드
let slideVideo;

function initSwiper_video() {
    if (slideVideo) slideVideo.destroy(true, true); // 기존 Swiper 제거

    slideVideo = new Swiper(".slide-video", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        coverflowEffect: getCoverflowEffect(),
        navigation: {
            nextEl: ".slide-video .swiper-button-next",
            prevEl: ".slide-video .swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1.1,
                spaceBetween: 0,
            },
            1025: {
                slidesPerView: 1.8,
                spaceBetween: 0,
            },
            /* 360: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            520: {
                slidesPerView: 1.8,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 1.8,
                spaceBetween: 0,
            }, */
        },
        on: {
            /* init: function () {
                setTimeout(function () {
                    const sectionPlay = gsap.timeline();
                    sectionPlay.from(".slide-video .swiper-slide-prev", { x: "100%" }).from(".slide-video .swiper-slide-next", { x: "-100%" }, "<");

                    ScrollTrigger.create({
                        trigger: ".section-play",
                        start: "20% center",
                        end: "bottom center",
                        animation: sectionPlay,
                    });
                }, 300);
            }, */
        },
    });
}

// 반응형 coverflow 설정 함수
function getCoverflowEffect() {
    const width = window.innerWidth;

    if (width <= 768) {
        // 작은 모바일
        return {
            rotate: 0,
            stretch: width * 0.215,
            depth: 150,
            modifier: 3,
            slideShadows: false,
        };
    /* } else if (width <= 768) {
        // 일반 모바일~작은 태블릿
        return {
            rotate: 0,
            stretch: 145,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        }; */
    } else if (width <= 1024) {
        // 태블릿~작은 데스크탑
        return {
            rotate: 0,
            stretch: width * 0.21,
            depth: 150,
            modifier: 3,
            slideShadows: false,
        };
    } else {
        // 일반 데스크탑 이상
        return {
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 5,
            slideShadows: false,
        };
    }
}

// Swiper 초기화
initSwiper_video();

// 화면 크기 변경 시 Swiper 재초기화
window.addEventListener("resize", () => {
    initSwiper_video();
});

//쇼츠 슬라이드
var slideShorts = new Swiper(".slide-shorts", {
    centeredSlides: true,
    loop: true,
    loopedSlides: 5,
    freeMode: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },

    breakpoints: {
        0: {
            slidesPerView: 1.4,
            spaceBetween: 10,
        },
        520: {
            slidesPerView: 2.2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3.6,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 5.3,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 6.4,
            spaceBetween: 30,
        },
    },
});

//꿀팁 호버
let timeoutId; // 타이머 ID 저장용 변수

$('.slide-wrap').hover(
    function () {
        $(this).on('mousemove.hoverEffect', function (e) {
            const offset = $(this).offset();
            const width = $(this).width();
            const relativeX = e.pageX - offset.left;

            // 이전 타이머 제거 (중복 방지)
            clearTimeout(timeoutId);

            if (relativeX <= width / 2) {
                $('.slide__inner-1').addClass('on');
                $('.slide__inner-2').removeClass('on on2');

                timeoutId = setTimeout(() => {
                    $('.slide__inner-1').addClass('on2');
                }, 0);
            } else {
                $('.slide__inner-2').addClass('on');
                $('.slide__inner-1').removeClass('on on2');

                timeoutId = setTimeout(() => {
                    $('.slide__inner-2').addClass('on2');
                }, 0);
            }
        });
    },
    function () {
        $(this).off('mousemove.hoverEffect');
        clearTimeout(timeoutId); // 예약된 on2 추가 방지
        $('.slide__inner-1, .slide__inner-2').removeClass('on on2');
    }
);

window.addEventListener("resize", function () {
    setTimeout(function () {
        gsap.matchMediaRefresh();
        $('.card-2, .card-3').removeClass('on');
    }, 200);
});