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
    const termsModal = document.getElementById('termsModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const termsLink = document.querySelector('.terms-link');
    const closeTermsButton = document.querySelector('.close-terms');

    // Preloader
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // Mostrar/ocultar detalles de tarjeta
    document.querySelectorAll('input[name="paymentMethod"]').forEach(method => {
        method.addEventListener('change', function() {
            const cardDetails = document.getElementById('cardDetails');
            cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
        });
    });

    // Validación de tarjeta
    const cardNumber = document.getElementById('cardNumber');
    const cardExpiry = document.getElementById('cardExpiry');
    const cardCvv = document.getElementById('cardCvv');

    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            e.target.value = value;
        });
    }

    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    if (cardCvv) {
        cardCvv.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 3) value = value.slice(0, 3);
            e.target.value = value;
        });
    }

    // Abrir modal de términos
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.style.display = 'block';
    });

    // Cerrar modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Cerrar modal de términos
    closeTermsButton.addEventListener('click', function() {
        termsModal.style.display = 'none';
    });

    // Manejar el envío del formulario
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customerName').value;
            const email = document.getElementById('customerEmail').value;
            const phone = document.getElementById('customerPhone').value;
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            const terms = document.getElementById('terms').checked;
            
            // Validaciones
            if (!paymentMethod) {
                showError(checkoutForm, 'Por favor selecciona un método de pago');
                return;
            }

            if (!terms) {
                showError(checkoutForm, 'Debes aceptar los términos y condiciones');
                return;
            }

            if (paymentMethod.value === 'card') {
                const cardNumber = document.getElementById('cardNumber').value;
                const cardExpiry = document.getElementById('cardExpiry').value;
                const cardCvv = document.getElementById('cardCvv').value;

                if (!isValidCardNumber(cardNumber)) {
                    showError(checkoutForm, 'Número de tarjeta inválido');
                    return;
                }

                if (!isValidExpiry(cardExpiry)) {
                    showError(checkoutForm, 'Fecha de expiración inválida');
                    return;
                }

                if (!isValidCvv(cardCvv)) {
                    showError(checkoutForm, 'CVV inválido');
                    return;
                }
            }

            // Mostrar estado de carga
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando pago...';
            submitButton.disabled = true;

            try {
                // Simular proceso de pago
                await simulatePayment(service, price, email, paymentMethod.value);
                
                // Enviar correos
                await sendConfirmationEmail(email, service, price, name);
                await sendAdminNotification(email, service, price, name, phone);
                
                // Mostrar mensaje de éxito
                showSuccessMessage('¡Pago completado con éxito! Hemos enviado un correo de confirmación.');
                
                // Redirigir a la página principal después de 3 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);
                
            } catch (error) {
                showError(this, 'Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
            } finally {
                // Restaurar botón
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }
});

// Funciones auxiliares
function showError(form, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const existingError = form.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    form.insertBefore(errorElement, form.firstChild);
    setTimeout(() => {
        errorElement.remove();
    }, 5000);
}

function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${message}</p>
    `;
    
    const checkoutSection = document.querySelector('.checkout');
    checkoutSection.insertBefore(successMessage, checkoutSection.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

function isValidCardNumber(number) {
    return /^\d{16}$/.test(number);
}

function isValidExpiry(expiry) {
    return /^\d{2}\/\d{2}$/.test(expiry);
}

function isValidCvv(cvv) {
    return /^\d{3}$/.test(cvv);
}

// Simular proceso de pago
async function simulatePayment(service, price, email, paymentMethod) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Aquí iría la integración con la pasarela de pago real
            // Por ahora simulamos un pago exitoso
            resolve();
        }, 2000);
    });
}

// Enviar correo de confirmación al cliente
async function sendConfirmationEmail(email, service, price, name) {
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: email,
            subject: `Confirmación de compra - ${service}`,
            text: `Hola ${name},\n\nGracias por tu compra de ${service} por €${price}.\n\nDetalles de tu compra:\n- Servicio: ${service}\n- Precio: €${price}\n- Fecha: ${new Date().toLocaleDateString()}\n\nNos pondremos en contacto contigo pronto para comenzar con tu proyecto.\n\nSaludos,\nEl equipo de Kresko Lab`,
            type: 'confirmation'
        })
    });
    
    if (!response.ok) {
        throw new Error('Error al enviar correo de confirmación');
    }
}

// Enviar notificación al administrador
async function sendAdminNotification(email, service, price, name, phone) {
    const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: 'admin@kreskolab.com',
            subject: `Nueva compra - ${service}`,
            text: `Nueva compra realizada:\n\n- Cliente: ${name}\n- Email: ${email}\n- Teléfono: ${phone}\n- Servicio: ${service}\n- Precio: €${price}\n- Fecha: ${new Date().toLocaleDateString()}\n- Método de pago: ${paymentMethod}`,
            type: 'notification'
        })
    });
    
    if (!response.ok) {
        throw new Error('Error al enviar notificación al administrador');
    }
} 