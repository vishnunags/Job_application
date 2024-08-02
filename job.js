document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.getElementById('apply-btn');
    const modal = document.getElementById('apply-modal');
    const closeBtn = document.getElementById('close-btn');
    const applicationForm = document.getElementById('application-form');

    // Show modal when "Apply" button is clicked
    applyBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Hide modal when "close" button is clicked
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Hide modal when clicking outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission
    applicationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(applicationForm);
        const application = {
            name: formData.get('name'),
            contact: formData.get('contact'),
            email: formData.get('email')
        };

        fetch('http://ec2-34-205-29-69.compute-1.amazonaws.com:3002/api/applications', { // Adjust URL as needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Application submitted:', data);
            applicationForm.reset();
            modal.style.display = 'none';
            alert('Application submitted successfully!');
        })
        .catch(error => {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        });
    });
});
