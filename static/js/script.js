document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Form validation for all forms
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // Payment form validation
    const paymentForms = document.querySelectorAll('.payment-form');
    if (paymentForms) {
        paymentForms.forEach(form => {
            form.addEventListener('submit', function(event) {
                const amountInput = this.querySelector('input[name="payment_amount"]');
                const amount = parseFloat(amountInput.value);

                if (isNaN(amount) || amount <= 0) {
                    event.preventDefault();
                    alert('Please enter a valid payment amount greater than zero.');
                }
            });
        });
    }

    // Grade form validation
    const gradeForm = document.getElementById('gradeForm');
    if (gradeForm) {
        gradeForm.addEventListener('submit', function(event) {
            const maxScore = parseFloat(document.getElementById('max_score').value);
            const scoreInputs = document.querySelectorAll('input[name^="score-"]');

            let valid = true;
            scoreInputs.forEach(input => {
                const score = parseFloat(input.value);
                if (!isNaN(score) && (score < 0 || score > maxScore)) {
                    valid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (!valid) {
                event.preventDefault();
                alert(`Scores must be between 0 and ${maxScore}.`);
            }
        });
    }

    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.querySelector(this.getAttribute('toggle'));
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Attendance form - select all present button
    const selectAllPresentBtn = document.getElementById('selectAllPresent');
    if (selectAllPresentBtn) {
        selectAllPresentBtn.addEventListener('click', function() {
            const attendanceSelects = document.querySelectorAll('select[name^="status-"]');
            attendanceSelects.forEach(select => {
                select.value = 'present';
            });
        });
    }

    // Course search filter
    const courseSearchInput = document.getElementById('courseSearch');
    if (courseSearchInput) {
        courseSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');

            courseCards.forEach(card => {
                const courseTitle = card.querySelector('.course-title').textContent.toLowerCase();
                const courseCode = card.querySelector('.course-code').textContent.toLowerCase();

                if (courseTitle.includes(searchTerm) || courseCode.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Student search filter
    const studentSearchInput = document.getElementById('studentSearch');
    if (studentSearchInput) {
        studentSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const studentRows = document.querySelectorAll('tr.student-row');

            studentRows.forEach(row => {
                const studentName = row.querySelector('.student-name').textContent.toLowerCase();
                const studentId = row.querySelector('.student-id').textContent.toLowerCase();

                if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Calculate and display grade averages
    function calculateGradeAverages() {
        const gradeTables = document.querySelectorAll('.grade-table');
        gradeTables.forEach(table => {
            const gradeRows = table.querySelectorAll('tbody tr');
            let totalWeightedScore = 0;
            let totalWeight = 0;

            gradeRows.forEach(row => {
                const score = parseFloat(row.querySelector('.grade-score').textContent);
                const maxScore = parseFloat(row.querySelector('.grade-max-score').textContent);
                const weight = parseFloat(row.querySelector('.grade-weight').textContent);

                const scorePercentage = (score / maxScore) * 100;
                totalWeightedScore += scorePercentage * weight;
                totalWeight += weight;
            });

            const averageGrade = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
            const gradeAverage = table.querySelector('.grade-average');
            if (gradeAverage) {
                gradeAverage.textContent = averageGrade.toFixed(2) + '%';

                // Set color based on grade
                if (averageGrade >= 90) {
                    gradeAverage.classList.add('text-success');
                } else if (averageGrade >= 70) {
                    gradeAverage.classList.add('text-primary');
                } else if (averageGrade >= 60) {
                    gradeAverage.classList.add('text-warning');
                } else {
                    gradeAverage.classList.add('text-danger');
                }
            }
        });
    }

    // Call the function if we have grade tables
    if (document.querySelector('.grade-table')) {
        calculateGradeAverages();
    }
});
