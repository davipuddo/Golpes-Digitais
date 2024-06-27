const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(faqItem => {
    const faqQuestion = faqItem.querySelector('.faq-question');
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const faqToggle = faqQuestion.querySelector('.faq-toggle');

    faqQuestion.addEventListener('click', () => {
        faqItem.classList.toggle('active');
        faqToggle.textContent = faqItem.classList.contains('active') ? '-' : '+';
    });
    });
