// script.js

function calculatePayment() {
    // Constants
    const registrationFees = 20250; // Existing registration fees (20,250)
    const totalTuitionFees = 103200; // Total tuition fees
    const initialPayment = 12000; // Amount paid at the time of registration (12,000)

    // Get input values
    let waiverPercentage = document.getElementById('waiverPercentage').value;
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
    const waiverAmount = totalTuitionFees * (waiverPercentage / 100);
    const remainingTuitionAfterWaiver = totalTuitionFees - waiverAmount;
    const remainingFees = remainingTuitionAfterWaiver - initialPayment;
    const midTermPayment = remainingFees / 2;
    const finalTermPayment = remainingFees / 2;

    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Registration Fees:</strong> ${registrationFees}</p>
        <p><strong>Total Tuition Fees:</strong> ${totalTuitionFees}</p>
        <p><strong>Initial Payment:</strong> ${initialPayment}</p>
        <p><strong>Tuition Fees After Waiver (${waiverPercentage}%):</strong> ${remainingTuitionAfterWaiver.toFixed(2)}</p>
        <p><strong>Remaining Fees after Waiver and Initial Payment:</strong> ${remainingFees.toFixed(2)}</p>
        <p><strong>Amount to be paid before Mid-Term:</strong> ${midTermPayment.toFixed(2)}</p>
        <p><strong>Amount to be paid before Final-Term:</strong> ${finalTermPayment.toFixed(2)}</p>
    `;
}
