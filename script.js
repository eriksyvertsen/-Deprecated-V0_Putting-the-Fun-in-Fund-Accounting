// Function to switch between modules
function showModule(moduleId) {
    const modules = document.querySelectorAll(".module");
    modules.forEach((module) => module.style.display = "none");

    document.getElementById(moduleId).style.display = "block";
}

// Module 1: Drag and Drop Logic
const gpZone = document.getElementById("gpZone");
const lpZone = document.getElementById("lpZone");
const gpDrag = document.getElementById("gpDrag");
const lpDrag = document.getElementById("lpDrag");

gpDrag.addEventListener("dragstart", dragStart);
lpDrag.addEventListener("dragstart", dragStart);

gpZone.addEventListener("dragover", allowDrop);
lpZone.addEventListener("dragover", allowDrop);

gpZone.addEventListener("drop", dropGP);
lpZone.addEventListener("drop", dropLP);

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function dropGP(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    if (data === "gpDrag") {
        event.target.textContent = "General Partner (GP)";
        document.getElementById("dragDropResult").textContent = "Correct! GPs manage the fund.";
    } else {
        document.getElementById("dragDropResult").textContent = "Incorrect, try again!";
    }
}

function dropLP(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    if (data === "lpDrag") {
        event.target.textContent = "Limited Partner (LP)";
        document.getElementById("dragDropResult").textContent = "Correct! LPs provide the capital.";
    } else {
        document.getElementById("dragDropResult").textContent = "Incorrect, try again!";
    }
}

// Module 2: NAV Calculation
function calculateNAV() {
    const totalAssets = parseFloat(document.getElementById("totalAssets").value);
    const totalLiabilities = parseFloat(document.getElementById("totalLiabilities").value);
    const capitalCalls = parseFloat(document.getElementById("capitalCalls").value);
    const distributions = parseFloat(document.getElementById("distributions").value);

    if (isNaN(totalAssets) || isNaN(totalLiabilities) || isNaN(capitalCalls) || isNaN(distributions)) {
        document.getElementById("navResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const nav = (totalAssets - totalLiabilities) + capitalCalls - distributions;
    document.getElementById("navResult").innerHTML = `The calculated NAV is: $${nav.toFixed(2)}`;
}

// Module 2: Capital Call Calculation
function calculateCapitalCall() {
    const lp1 = parseFloat(document.getElementById("lp1").value);
    const lp2 = parseFloat(document.getElementById("lp2").value);
    const lp3 = parseFloat(document.getElementById("lp3").value);
    const totalCapitalCall = parseFloat(document.getElementById("totalCapitalCall").value);

    if (isNaN(lp1) || isNaN(lp2) || isNaN(lp3) || isNaN(totalCapitalCall)) {
        document.getElementById("capitalCallResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const totalCommitments = lp1 + lp2 + lp3;
    const lp1Call = (lp1 / totalCommitments) * totalCapitalCall;
    const lp2Call = (lp2 / totalCommitments) * totalCapitalCall;
    const lp3Call = (lp3 / totalCommitments) * totalCapitalCall;

    document.getElementById("capitalCallResult").innerHTML = `
        LP1 Capital Call: $${lp1Call.toFixed(2)}<br>
        LP2 Capital Call: $${lp2Call.toFixed(2)}<br>
        LP3 Capital Call: $${lp3Call.toFixed(2)}
    `;
}

// Module 3: Management Fee Calculation
function calculateManagementFee() {
    const navAmount = parseFloat(document.getElementById("navAmount").value);
    const managementFeeRate = parseFloat(document.getElementById("managementFeeRate").value);

    if (isNaN(navAmount) || isNaN(managementFeeRate)) {
        document.getElementById("feeResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const managementFee = (managementFeeRate / 100) * navAmount;
    document.getElementById("feeResult").innerHTML = `Management Fee: $${managementFee.toFixed(2)}`;
}

// Module 4: Waterfall Calculation
function calculateWaterfall() {
    const totalProfits = parseFloat(document.getElementById("totalProfits").value);
    const preferredReturn = parseFloat(document.getElementById("preferredReturn").value);
    const gpCarry = parseFloat(document.getElementById("gpCarry").value);

    if (isNaN(totalProfits) || isNaN(preferredReturn) || isNaN(gpCarry)) {
        document.getElementById("waterfallResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const preferredReturnAmount = (preferredReturn / 100) * totalProfits;
    const remainingProfits = totalProfits - preferredReturnAmount;
    const gpCarryAmount = (gpCarry / 100) * remainingProfits;
    const lpProfits = remainingProfits - gpCarryAmount;

    document.getElementById("waterfallResult").innerHTML = `
        Preferred Return (to LPs): $${preferredReturnAmount.toFixed(2)}<br>
        GP Carry: $${gpCarryAmount.toFixed(2)}<br>
        Remaining Profits to LPs: $${lpProfits.toFixed(2)}
    `;
}

// Module 5: Fair Value Adjustment
function calculateFairValue() {
    const initialValuation = parseFloat(document.getElementById("initialValuation").value);
    const currentValuation = parseFloat(document.getElementById("currentValuation").value);

    if (isNaN(initialValuation) || isNaN(currentValuation)) {
        document.getElementById("fairValueResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const fairValueAdjustment = currentValuation - initialValuation;
    document.getElementById("fairValueResult").innerHTML = `Fair Value Adjustment: $${fairValueAdjustment.toFixed(2)}`;
}

// Module 6: Tax Calculation
function calculateTaxableIncome() {
    const totalIncome = parseFloat(document.getElementById("totalIncome").value);
    const deductions = parseFloat(document.getElementById("deductions").value);

    if (isNaN(totalIncome) || isNaN(deductions)) {
        document.getElementById("taxResult").innerHTML = "Please enter valid numbers.";
        return;
    }

    const taxableIncome = totalIncome - deductions;
    document.getElementById("taxResult").innerHTML = `Taxable Income: $${taxableIncome.toFixed(2)}`;
}
