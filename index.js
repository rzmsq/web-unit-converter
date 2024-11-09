const mainContainerEl = document.getElementById("main-container")
const dataInpEl = document.getElementById("data-input")
const convertBtn = document.getElementById("convert-btn")
const resultsAreaEl = document.getElementById("results-area")

const titleValues = ["Length (Meter/Feet)", "Volume (Liters/Gallons)", "Mass (Kilograms/Pounds)"]
const nameValuesFrom = ["meters", "liters", "kilos"]
const nameValuesTo = ["feet", "gallons", "pounds"]

let conversionResultsMetric = []
let conversionResultsImperial = []

let prevSizeInpPx = null
dataInpEl.addEventListener("input", function(){
    let sizeInpPx = parseInt(this.style.width) * 16
    if(!sizeInpPx){
        sizeInpPx = 112
    }
    
    if(this.value.length > 3 && this.value.length < 8 &&
       sizeInpPx < mainContainerEl.clientWidth-80) {
        this.style.width = this.value.length * 2.2 + "rem"
        prevSizeInpPx = this.value.length
    } else if(prevSizeInpPx > this.value.length){
        if(this.value.length > 3){
            this.style.width = this.value.length * 2.2 + "rem"
        } else if (this.value.length <= 3){
            this.style.width = "7rem"
        }
    }
})

function convertAndSave(inpData){
    const feet = (inpData * 3.281).toFixed(3)
    const gallons = (inpData * 0.264).toFixed(3)
    const pounds = (inpData * 2.205).toFixed(3)
    conversionResultsImperial.push(feet, gallons, pounds)
    const meter = (inpData/3.281).toFixed(3)
    const liters = (inpData*3.785).toFixed(3)
    const kilos = (inpData/2.205).toFixed(3)
    conversionResultsMetric.push(meter, liters, kilos)
}

function render(inpData){
    let resultContainers = ""
    for(let i = 0; i < titleValues.length; i++){
        resultContainers += `
        <div class="results-container">
            <h3>${titleValues[i]}</h3>
            <p>${inpData} ${nameValuesFrom[i]} = ${conversionResultsImperial[i]} ${nameValuesTo[i]} | ${inpData} ${nameValuesTo[i]} = ${conversionResultsMetric[i]} ${nameValuesFrom[i]}</p>
        </div>
        `
    }
    resultsAreaEl.innerHTML = resultContainers
}

function clearAllData(){
    conversionResultsMetric = []
    conversionResultsImperial = []
}

convertBtn.addEventListener("click", function(){
    const inpData = parseInt(dataInpEl.value)
    convertAndSave(inpData)
    render(inpData)
    clearAllData()
})