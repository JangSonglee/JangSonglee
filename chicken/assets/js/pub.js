document.addEventListener("DOMContentLoaded", () => {
    //top버튼
    scrollFix();

    window.addEventListener("scroll", function () {
        scrollFix();
    });

    function scrollFix() {
        let curr = window.scrollY;
        let topBtn = document.querySelector(".topBtn");
        if (curr > 800) {
            topBtn.classList.add("fix");
        } else {
            topBtn.classList.remove("fix");
        }
    }

    document.querySelector(".topBtn").addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    let wrapBoxes = document.querySelectorAll(".wrap-box"); // 여러 개의 wrap-box 선택

    wrapBoxes.forEach((wrapBox, wrapIndex) => {
        let rollers = wrapBox.querySelectorAll(".rolling-list"); // 각 wrap-box 안의 .rolling-list 요소 선택

        rollers.forEach((roller, index) => {
            roller.id = `roller${wrapIndex + 1}-${index + 1}`; // 아이디 부여 (각 wrap-box마다 고유하게)

            let clone = roller.cloneNode(true);
            clone.id = `roller${wrapIndex + 1}-${index + 2}`; // 복제된 아이디 부여
            wrapBox.appendChild(clone); // 각 wrap-box 안에 복제된 요소 추가

            roller.classList.add("original");
            clone.classList.add("clone");
        });
    });

    //감지 애니메이션
    const $observeItem = document.querySelectorAll(".observeItem");

    const observerActive = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        {threshold: 0.5} // 100% 보여야 active 적용
    );
    $observeItem.forEach((el) => observerActive.observe(el));
});
