const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const themeButton = document.getElementById("themeButton");
const themeIcon = themeButton.querySelector("i");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.innerHTML = isOpen
        ? '<i class="ri-close-line"></i>'
        : '<i class="ri-menu-4-line"></i>';
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = '<i class="ri-menu-4-line"></i>';
    });
});

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.className = "ri-moon-line";
}

themeButton.addEventListener("click", () => {
    const isLight =
        document.documentElement.getAttribute("data-theme") === "light";

    if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "dark");
        themeIcon.className = "ri-sun-line";
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("portfolio-theme", "light");
        themeIcon.className = "ri-moon-line";
    }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});