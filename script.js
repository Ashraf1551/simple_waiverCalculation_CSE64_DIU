const semesterData = {
    fall2024: { tuitionFees: 103200 },
    spring2025: { tuitionFees: 98400 },
    fall2025: { tuitionFees: 98400 },
    spring2026: { tuitionFees: 90600 },
    fall2026: { tuitionFees: 48500 }
};

function updateSemester() {
    const semesterSelect = document.getElementById('semesterSelect');
    const selectedSemester = semesterSelect.value;

    const tuitionFees = semesterData[selectedSemester].tuitionFees;
    document.getElementById('tuitionFees').textContent = tuitionFees.toFixed(2);
}

function calculatePayment() {
    const selectedSemester = document.getElementById('semesterSelect').value;
    const tuitionFees = semesterData[selectedSemester].tuitionFees;

    // Constants
    const registrationFees = 20250; // Existing registration fees (20,250)
    const initialPayment = 12000; // Amount paid at the time of registration (12,000)

    // Get input values
    let waiverPercentage = document.getElementById('waiverInput').value;
    const selectedPercentage = document.getElementById('waiverPercentageSelect').value;

    // Check if waiverPercentage is empty (null or empty string)
    if (!waiverPercentage && waiverPercentage !== 0) {
        // If waiverPercentage is empty, use the selectedPercentage from dropdown
        waiverPercentage = selectedPercentage;
    }

    // Validate input (although HTML 'number' input should restrict non-numeric input)
    if (waiverPercentage === '' || isNaN(waiverPercentage)) {
        alert('Please enter a valid waiver percentage.');
        return;
    }

    // Convert waiverPercentage to a number
    waiverPercentage = parseFloat(waiverPercentage);

    // Calculate waiver amount and remaining fees based on selected percentage
    const waiverAmount = tuitionFees * (waiverPercentage / 100);
    const remainingTuitionAfterWaiver = tuitionFees - waiverAmount;
    const remainingFees = remainingTuitionAfterWaiver - initialPayment;
    const midTermPayment = remainingFees / 2;
    const finalTermPayment = remainingFees / 2;

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Semester:</strong> ${semesterSelect.options[semesterSelect.selectedIndex].text}</p>
        <p><strong>Tuition Fees:</strong> ${tuitionFees.toFixed(2)}</p>
        <p><strong>Registration Fees:</strong> ${registrationFees}</p>
        <p><strong>Initial Payment:</strong> ${initialPayment}</p>
        <p><strong>Tuition Fees After Waiver (${waiverPercentage}%):</strong> ${remainingTuitionAfterWaiver.toFixed(2)}</p>
        <p><strong>Remaining Fees after Waiver and Initial Payment:</strong> ${remainingFees.toFixed(2)}</p>
        <p><strong>Amount to be paid before Mid-Term:</strong> ${midTermPayment.toFixed(2)}</p>
        <p><strong>Amount to be paid before Final-Term:</strong> ${finalTermPayment.toFixed(2)}</p>
    `;
}

function clearWaiverInput() {
    document.getElementById('waiverInput').value = '';
}

function clearWaiverSelect() {
    document.getElementById('waiverPercentageSelect').value = '';
}

// Initialize with Fall 2024 semester
updateSemester();
