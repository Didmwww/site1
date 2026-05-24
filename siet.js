"use strict"
function scrollProducts(direction) {
    const container = document.querySelector('.product-scroll-container');
    const scrollAmount = 300; 

    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
function openOrderForm() {
    const modal = document.getElementById('orderForm');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}
function navigateToCatalog() {
    const catalogSection = document.getElementById('catalog');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
}
function togglePanel() {
    const panel = document.getElementById('side-panel');
    panel.classList.toggle('open');
}

function navigateTo(event, target) {
    event.preventDefault();
    const section = document.querySelector(target);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    togglePanel();
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

function filterProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const products = document.querySelectorAll('.product-ad');
    const productList = document.querySelector('.product-list');

    let matchedProducts = [];

    products.forEach(product => {
        const name = product.dataset.name.toLowerCase();
        if (name.includes(query)) {
            product.classList.remove('hidden');
            product.classList.add('moving');
            productList.prepend(product);
            setTimeout(() => {
                product.classList.remove('moving');
        }, 500);
        } else {
            product.classList.add('hidden');
        }
    });

    matchedProducts.forEach(product => {
        productList.prepend(product);
    });
}

function clearSearch() {
    const searchInput = document.getElementById('search');
    searchInput.value = '';
    const products = document.querySelectorAll('.product-ad');
    products.forEach(product => {
        product.classList.remove('hidden');
    });
}
function toggleExpand() {
    const scrollContainer = document.querySelector('.product-scroll-container');
    const productList = document.querySelector('.product-list');
    const expandButton = document.querySelector('.expand-button');

    scrollContainer.classList.toggle('expanded');
    productList.classList.toggle('expanded');

    if (scrollContainer.classList.contains('expanded')) {
        expandButton.textContent = 'Сховати піньяти';
    } else {
        expandButton.textContent = 'Показати всі піньяти';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form"); 

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        if (formValidate(form) > 0) {
            alert("Заповніть всі обов'язкові поля правильно!");
            return;
        }

        form.classList.add('_sending');

        let formData = new FormData(form);

        try {
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            let text = await response.text(); 
            console.log("Відповідь сервера:", text);

            let result = JSON.parse(text);

            if (result.status === "success") {
                alert("Форма успішно відправлена!");
                form.reset();
            } else {
                alert("Помилка: " + result.message);
            }
        } catch (error) {
            console.error("Помилка при відправці:", error);
            alert("Помилка з'єднання!");
        } finally {
            form.classList.remove('_sending');
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    let currentIndex = 0;

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % images.length; 
        const offset = -currentIndex * 100;
        slides.style.transform = `translateX(${offset}%)`;
    }

    setInterval(showNextSlide, 5000);
});
function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req'); 

    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "tel" || input.classList.contains('_phone')) {
            if (phoneTest(input)) {
                formAddError(input);
                error++;
            }

        } else if (input.id === "formMessage") {
            if (!pinyataTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
            formAddError(input);
            error++;
        } else {
            if (input.value.trim() === '') {
                formAddError(input);
                error++;
            }
        }
    }

    return error;
}
function pinyataTest(input) {
    const validPinyatas = [
        "Піньята Бамблбі", "Піньята Маквін", "Піньята Гаррі Поттер",
        "Піньята Куромі", "Піньята Поні", "Піньята Динозавр",
        "Піньята Хелло Кіті", "Піньята Футбольна", "Піньята Барбі",
        "Піньята Чікен Ган", "Піньята Венздей", "Піньята Фортнайт",
        "Піньята Кріпер", "Піньята Сонік", "Піньята Супер Маріо",
        "Піньята Веселка", "Піньята Наруто", "Піньята Huggy Wuggy",
        "Піньята Міньйон", "Піньята Angry Birds", "Піньята Brawl Stars",
        "Піньята Minecraft", "Піньята Спайдермен", "Піньята Щенячий патруль",
        "Піньята Фламінго", "Піньята Among Us", "Піньята Кекс",
        "Піньята Черепашки Ніндзя", "Піньята у вигляді цифри 2", "Піньята Зірка",
        "Піньята Pop It", "Піньята Супер-герої", "Піньята Русалочка",
        "Піньята Tik Tok", "Піньята Бетмен", "Піньята Міні Маус",
        "Піньята Морозиво", "Піньята до Школи", "Піньята Єдиноріжки",
        "Піньята Трактор", "Піньята Серденько", "Піньята Колесо",
        "Піньята Луна", "Піньята у вигляді цифри 3", "Піньята Пончик",
        "Піньята у вигляді цифри 5", "Піньята Хмаринка", 
    ];


    return validPinyatas.includes(input.value.trim());
}
function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value.trim());
}

function phoneTest(input) {
    return !/^\+380\d{9}$/.test(input.value.trim());
}
