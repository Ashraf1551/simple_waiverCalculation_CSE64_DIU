const semesterData = {
    fall2024: {
        tuitionFees: 103200,
        courses: [
            "CSE221-Object Oriented Programming(3)",
            "CSE222-OOP Lab(1.5)",
            "CSE223-Digital Logic Design(3)",
            "CSE224-DLD Lab(1.5)",
            "CSE225-Data Communication(3)",
            "CSE226-Numerical Methods(3)",
            "CSE227-System Analysis and Design(3)",
            "CSE228-Theory of Computation(3)"
        ]
    },
    spring2025: {
        tuitionFees: 98400,
        courses: [
            "CSE311-Database Management System(3)",
            "CSE312-DBMS Lab(1.5)",
            "CSE313-Compiler Design(3)",
            "CSE314-CD Lab(1.5)",
            "CSE315-Software Engineering(3)",
            "CSE316-Artificial Intelligence(3)",
            "CSE317-Microprocessor and Microcontrollers(3)",
            "STA101-Statistics and Probability(3)"
        ]
    },
    fall2025: {
        tuitionFees: 98400,
        courses: [
            "CSE321-Computer Networks(3)",
            "CSE322-CN Lab(1.5)",
            "CSE323-Operating Systems(3)",
            "CSE324-OS Labs(1.5)",
            "CSE325-Instrumentation and Control(3)",
            "CSE326-Social and Professional Issues in Computing(3)",
            "ACT327-Financial and Managerial Accounting(3)",
            "CSE***-Elective-I(3)"
        ]
    },
    spring2026: {
        tuitionFees: 90600,
        courses: [
            "CSE411-Computer Graphics(3)",
            "CSE412-CG Labs(1.5)",
            "CSE413-Computer Architecture and Organization(3)",
            "CSE***-Elective-II(3)",
            "CSE***-Elective-III(3)",
            "CSE***-Elective-IV(3)",
            "CSE498-FYDP/Capstone Project Phase(3)"
        ]
    },
    fall2026: {
        tuitionFees: 48500,
        courses: [
            "ECO426-Engineering Economics(3)",
            "CSE***-Elective-V(3)",
            "CSE***-Elective-VI(3)",
            "CSE499-FYDP/Capstone Project Phase(3)"
        ]
    }
};

function updateSemester() {
    const semesterSelect = document.getElementById('semesterSelect');
    const selectedSemester = semesterSelect.value;

    const tuitionFees = semesterData[selectedSemester].tuitionFees;

    const actualFeesDiv = document.getElementById('actualFees');
    actualFeesDiv.innerHTML = `
        <div style="display: flex; flex-wrap: wrap;">
            <div style="flex: 1; padding: 10px;">
                <p><strong>Actual Fees for ${semesterSelect.options[semesterSelect.selectedIndex].text}</strong></p>
                <p><strong>Tuition Fees:</strong> ${tuitionFees.toFixed(2)}</p>
                <p><strong>Registration Fees:</strong> 20250</p>
                <p><strong>Initial Payment:</strong> 12000</p>
                <p><strong>Remaining Fees after Initial Payment:</strong> ${(tuitionFees - 12000).toFixed(2)}</p>
                <p><strong>Amount to be paid before Mid-Term:</strong> ${((tuitionFees - 12000) / 2).toFixed(2)}</p>
                <p><strong>Amount to be paid before Final-Term:</strong> ${((tuitionFees - 12000) / 2).toFixed(2)}</p>
                <hr>
            </div>
            <div style="flex: 1; padding: 10px;">
                <p><strong>Course List:</strong></p>
                <ul>
                    ${semesterData[selectedSemester].courses.map(course => `<li>${course}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function calculatePayment() {
    const selectedSemester = document.getElementById('semesterSelect').value;
    const tuitionFees = semesterData[selectedSemester].tuitionFees;

    const remainingFees = tuitionFees - 12000;
    const midTermPayment = remainingFees / 2;
    const finalTermPayment = remainingFees / 2;

    let waiverPercentage = document.getElementById('waiverInput').value;
    const selectedPercentage = document.getElementById('waiverPercentageSelect').value;

    if (!waiverPercentage && waiverPercentage !== 0) {
        waiverPercentage = selectedPercentage;
    }

    if (waiverPercentage === '' || isNaN(waiverPercentage) || waiverPercentage < 0 || waiverPercentage > 100) {
        displayError('Please enter a valid waiver percentage between 0 and 100.');
        return;
    }

    waiverPercentage = parseFloat(waiverPercentage);
    const waiverAmount = tuitionFees * (waiverPercentage / 100);
    const remainingTuitionAfterWaiver = tuitionFees - waiverAmount;
    const remainingFeesAfterWaiver = remainingTuitionAfterWaiver - 12000;
    const midTermPaymentAfterWaiver = remainingFeesAfterWaiver / 2;
    const finalTermPaymentAfterWaiver = remainingFeesAfterWaiver / 2;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Semester:</strong> ${document.getElementById('semesterSelect').options[document.getElementById('semesterSelect').selectedIndex].text}</p>
        <p><strong>Tuition Fees:</strong> ${tuitionFees.toFixed(2)}</p>
        <p><strong>Registration Fees:</strong> 20250</p>
        <p><strong>Initial Payment:</strong> 12000</p>
        <hr>
        <p><strong>Waiver Amount (${waiverPercentage}%):</strong> ${waiverAmount.toFixed(2)}</p>
        <p><strong>Remaining Tuition Fees after Waiver:</strong> ${remainingTuitionAfterWaiver.toFixed(2)}</p>
        <p><strong>Remaining Fees after Waiver and Initial Payment:</strong> ${remainingFeesAfterWaiver.toFixed(2)}</p>
        <p><strong>Amount to be paid before Mid-Term:</strong> ${midTermPaymentAfterWaiver.toFixed(2)}</p>
        <p><strong>Amount to be paid before Final-Term:</strong> ${finalTermPaymentAfterWaiver.toFixed(2)}</p>
    `;

    clearError();
}

function resetForm() {
    document.getElementById('results').innerHTML = '';
    clearError();
    clearWaiverInput();
    clearWaiverSelect();
}

function clearWaiverInput() {
    document.getElementById('waiverInput').value = '';
}

function clearWaiverSelect() {
    document.getElementById('waiverPercentageSelect').value = '';
}

function displayError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
}

updateSemester();
