document.addEventListener("DOMContentLoaded", function () {

  //password
  if (document.querySelector(".password-input")) {
    const passwordInputs = document.querySelectorAll(".password-input");
    const passwordControls = document.querySelectorAll(".password-control");

    passwordControls.forEach((control, index) => {
      control.addEventListener("click", function () {
        if (passwordInputs[index].type === "password") {
          passwordInputs[index].type = "text";
          // control.classList.add("view");
        } else {
          passwordInputs[index].type = "password";
          // control.classList.remove("view");
        }
      });
    });
  }

  // tabs
  if (document.querySelector(".custom-tab")) {
    const tabs = document.querySelectorAll('.custom-tab');
    const tabContents = document.querySelectorAll('.custom-tab-content');

    function switchTab(index) {
      tabContents.forEach(content => {
        content.classList.remove('opened');
      });
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });

      tabContents[index].classList.add('opened');
      tabs[index].classList.add('active');
    }

    tabs?.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        switchTab(index);
      });
    });
  }

  //popup
  if (document.querySelector(".popup")) {
    const popups = document.querySelectorAll("[data-popup-id]");

    popups.forEach((popup) => {
      const popupId = popup.getAttribute("data-popup-id");
      const openPopupButtons = document.querySelectorAll(
        `[data-popup-open="${popupId}"]`
      );

      openPopupButtons.forEach((button) => {
        button.addEventListener("click", () => {
          popups.forEach((panel) => {
            panel.classList.remove("opened");
          });
          popup.classList.add("opened");
          document.body.classList.add("modal-open");
        });
      });
    });

    document.addEventListener("click", function (e) {
      let target = e.target;
      if (
        target.classList.contains("popup-close") ||
        target.classList.contains("popup__inner")
      ) {
        document.querySelectorAll(".popup").forEach((popup) => {
          popup.classList.remove("opened");
        });
        document.body.classList.remove("modal-open");
      }
    });
  }

  //referral-link
  document.querySelector('.referral-link_copy-btn')?.addEventListener('click', function () {
    const input = document.querySelector('input[name="referral-link"]');

    input.select();
    input.setSelectionRange(0, 99999);

    document.execCommand('copy');
  });


  //form validation
  if (document.querySelector(".js-account-form")) {
    const forms = document.querySelectorAll('.js-account-form');

    forms.forEach(form => {
      const checkbox = form.querySelector('input[type="checkbox"]');
      const passwordInput = form.querySelector('input[name="password"]');
      const passwordRepeatInput = form.querySelector('input[name="password-repeat"]');

      // валидация паролей
      if (passwordInput && passwordRepeatInput) {
        passwordInput.addEventListener('input', validatePasswords);
        passwordRepeatInput.addEventListener('input', validatePasswords);
      }

      function validatePasswords() {
        const passwordFilled = passwordInput.value.trim() !== '';
        const passwordRepeatFilled = passwordRepeatInput.value.trim() !== '';

        if (passwordFilled && passwordRepeatFilled) {
          if (passwordInput.value !== passwordRepeatInput.value) {
            passwordRepeatInput.closest(".input-item").classList.add('error');
          } else {
            passwordRepeatInput.closest(".input-item").classList.remove('error');
          }
        } else {
          passwordRepeatInput.closest(".input-item").classList.remove('error');
        }
      }

      form.addEventListener('submit', function (event) {
        let isValid = true;

        if (checkbox && !checkbox.checked) {
          isValid = false;
          checkbox.closest(".checkbox-ios").classList.add('error');
        }

        if (!isValid) {
          event.preventDefault();
        }
      });

      // валидация чекбокса
      if (checkbox) {
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            checkbox.closest(".checkbox-ios").classList.remove('error');
          }
        });
      }

    });
  }


});

$(document).ready(function () {

  $(document).ready(function () {
    // Изначальная маска для телефона
    let currentMask = "+7 999 999-99-99";
    $('input[type="tel"]').mask(currentMask);

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const countryDropdowns = document.querySelectorAll('.country-dropdown');

    dropdownToggles.forEach((dropdownToggle, index) => {
        dropdownToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            const countryDropdown = countryDropdowns[index];
            countryDropdown.style.display = (countryDropdown.style.display === 'block') ? 'none' : 'block';
        });
    });

    document.querySelectorAll('.country-option').forEach(option => {
        option.addEventListener('click', function () {
            const countryCode = option.getAttribute('data-country-code');
            const countryIcon = option.querySelector('.country-icon img').src;

            const inputField = option.closest('.phone-dropdown-container').nextElementSibling; // Получаем поле ввода
            $(inputField).val(countryCode);

            // Обновляем иконку страны
            const dropdownToggle = option.closest('.phone-dropdown-container').querySelector('.dropdown-toggle'); // Получаем соответствующий dropdownToggle
            dropdownToggle.innerHTML = `<span class="country-icon"><img src="${countryIcon}" alt="country-icon"></span>`;
            option.closest('.country-dropdown').style.display = 'none'; 

            
            // Изменение маски в зависимости от выбранной страны
            let newMask; // Переменная для новой маски
            switch (countryCode) {
                case '+1':
                    newMask = "+1 (999) 999-9999";
                    break;
                case '+44':
                    newMask = "+44 9999 999 999";
                    break;
                case '+7':
                    newMask = "+7 999 999-99-99";
                    break;
                default:
                    newMask = "+7 999 999-99-99"; // Значение по умолчанию
            }

            $(inputField).mask(newMask);
        });
    });

    document.addEventListener('click', function (event) {
        dropdownToggles.forEach((dropdownToggle, index) => {
            const countryDropdown = countryDropdowns[index];
            if (!dropdownToggle.contains(event.target) && !countryDropdown.contains(event.target)) {
                countryDropdown.style.display = 'none';
            }
        });
    });
});

});