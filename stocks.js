let btn = document.querySelector('#submit')
let holder = document.querySelector("#holder")
let alerts = document.querySelector("#alerts")

//send api request for inputted breed to disp on page
btn.addEventListener('click', e => {
    const ticker = document.querySelector("#ticker").value
    const quantity = document.querySelector("#quantity").value
    const buy = makeDate(document.querySelector("#buy").value)
    const sell = makeDate(document.querySelector("#sell").value)

    console.log("ticker: " + ticker)
    console.log("quantity: " + quantity)
    console.log("buy: " + buy)
    console.log("sell: " + sell)

    sendApiRequest(ticker, buy, sell, quantity)
})

//sends api request to get dog images for breed
function sendApiRequest(ticker, buy, sell, quantity) {
    console.log("sending api request")
    fetch(`https://api.iextrading.com/1.0/stock/${ticker}/chart/date/${buy}`)
        .then(function(data) {
            return data.json()
        })
        .then(function(jsonBuy) {
            fetch(`https://api.iextrading.com/1.0/stock/${ticker}/chart/date/${sell}`)
                .then(function(data) {
                    return data.json()
                })
                .then(function(jsonSell) {
                    console.log("yikes")
                    checkData(jsonBuy, jsonSell, quantity)
                })
        })
}


function checkData(buyData, sellData, quantity){
    console.log(buyData)
    console.log(sellData)
    
    if (buyData.length == 0 || sellData.length == 0) {
        showAlert("Please check your inputs. Date input must be a weekday in the past 30 days. Ticker symbol must be a valid symbol. Quantity must be a numer.")
    }
    
    displayEarnings(buyData, sellData, quantity)
    console.log("check datas")
}

function displayEarnings(buyData, sellData, quantity){
    let buyPrice = buyData[150].marketAverage
    let sellPrice = sellData[150].marketAverage
    
    let earnings = (sellPrice - buyPrice) * quantity
    
    console.log("disp earnings")
    console.log(earnings)
    
    holder.innerHTML = `$ ${earnings.toFixed(2)}`
}

function showAlert(message) {
    alerts.innerHTML += `
        <div class="alert alert-danger" role="alert" id="alert">
          ${message}
        </div>`
}

function makeDate(str){
    return str.replace(new RegExp('-', 'g'), "")
}

//Extensions:
//make the alerts work
//check for weekends?
//idk man like it's kinda bad so like make it better :/ 
// if u lose money, make the response box RED (for failure, or communism, because maybe capitalism is not for you, u have nought to lose but ur chainz)
