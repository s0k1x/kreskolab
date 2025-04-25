document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const price = urlParams.get('price');

    // Actualizar información del servicio
    document.querySelector('.service-name').textContent = service;
    document.querySelector('.service-price').textContent = `€${price}`;
    document.querySelector('.summary-service').textContent = service;
    document.querySelector('.summary-price').textContent = `€${price}`;
    document.querySelector('.summary-total').textContent = `€${price}`;

    // Inicializar elementos
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeModal = document.querySelector('.close-modal');

    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // Mostrar/ocultar detalles de tarjeta según método de pago
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Validación de formulario
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Simular procesamiento de pago
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

        // Simular tiempo de procesamiento
        setTimeout(() => {
            showSuccessMessage('¡Pago procesado con éxito!');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-lock"></i><span>Pagar Ahora</span>';
            checkoutForm.reset();
        }, 2000);
    });

    // Validación de campos
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        // Validar nombre
        if (name.value.trim() === '') {
            showError(name, 'Por favor ingresa tu nombre');
            isValid = false;
        } else {
            removeError(name);
        }

        // Validar email
        if (email.value.trim() === '') {
            showError(email, 'Por favor ingresa tu email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Por favor ingresa un email válido');
            isValid = false;
        } else {
            removeError(email);
        }

        // Validar teléfono
        if (phone.value.trim() === '') {
            showError(phone, 'Por favor ingresa tu teléfono');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Por favor ingresa un teléfono válido');
            isValid = false;
        } else {
            removeError(phone);
        }

        // Validar tarjeta si es el método seleccionado
        if (selectedPayment.value === 'card') {
            const cardNumber = document.getElementById('cardNumber');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');

            if (!isValidCardNumber(cardNumber.value)) {
                showError(cardNumber, 'Número de tarjeta inválido');
                isValid = false;
            } else {
                removeError(cardNumber);
            }

            if (!isValidExpiry(expiry.value)) {
                showError(expiry, 'Fecha de expiración inválida');
                isValid = false;
            } else {
                removeError(expiry);
            }

            if (!isValidCVV(cvv.value)) {
                showError(cvv, 'CVV inválido');
                isValid = false;
            } else {
                removeError(cvv);
            }
        }

        return isValid;
    }

    // Funciones de validación
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[0-9]{9,15}$/;
        return re.test(phone);
    }

    function isValidCardNumber(number) {
        const re = /^[0-9]{16}$/;
        return re.test(number.replace(/\s/g, ''));
    }

    function isValidExpiry(expiry) {
        const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!re.test(expiry)) return false;
        
        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        return (parseInt(year) > currentYear) || 
               (parseInt(year) === currentYear && parseInt(month) >= currentMonth);
    }

    function isValidCVV(cvv) {
        const re = /^[0-9]{3,4}$/;
        return re.test(cvv);
    }

    // Mostrar mensajes de error
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        input.classList.remove('error');
    }

    // Mostrar mensaje de éxito
    function showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;
        checkoutForm.parentElement.insertBefore(successMessage, checkoutForm);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Manejo del modal de términos
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
        }
    });
}); 