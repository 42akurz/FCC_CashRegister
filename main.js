const Values = {
  penny: 0.01,
  nickel: 0.05,
  dime: 0.1,
  quarter: 0.25,
  one: 1,
  five: 5,
  ten: 10,
  twenty: 20,
  hundred: 100
}

let changeObj = [
  ["ONE HUNDRED", 0],
  ["TWENTY", 0],
  ["TEN", 0],
  ["FIVE", 0],
  ["ONE", 0],
  ["QUARTER", 0],
  ["DIME", 0],
  ["NICKEL", 0],
  ["PENNY", 0],
];

let Final = {
  status: "",
  change: changeObj
}

let changeMoney = 0

function moneyCalculations(value, coIndex, cidIndex, cid) {
    changeObj[coIndex][1] = Number((changeObj[coIndex][1] + value).toFixed(2))
    changeMoney = Number((changeMoney - value).toFixed(2))
    cid[cidIndex][1] =  Number((cid[cidIndex][1] - value).toFixed(2))
    return cid
}

function calculateChange(cid) {
  while (changeMoney > 0)
  {
    if (changeMoney - Values.hundred >= 0 && cid[8][1] - Values.hundred >= 0)
      cid = moneyCalculations(Values.hundred, 0, 8, cid)
    else if (changeMoney - Values.twenty >= 0 && cid[7][1] - Values.twenty >= 0)
      cid = moneyCalculations(Values.twenty, 1, 7, cid)
    else if (changeMoney - Values.ten >= 0 && cid[6][1] - Values.ten >= 0)
      cid = moneyCalculations(Values.ten, 2, 6, cid)
    else if (changeMoney - Values.five >= 0 && cid[5][1] - Values.five >= 0)
      cid = moneyCalculations(Values.five, 3, 5, cid)
    else if (changeMoney - Values.one >= 0 && cid[4][1] - Values.one >= 0)
      cid = moneyCalculations(Values.one, 4, 4, cid)
    else if (changeMoney - Values.quarter >= 0 && cid[3][1] - Values.quarter >= 0)
      cid = moneyCalculations(Values.quarter, 5, 3, cid)
    else if (changeMoney - Values.dime >= 0 && cid[2][1] - Values.dime >= 0)
      cid = moneyCalculations(Values.dime, 6, 2, cid)
    else if (changeMoney - Values.nickel >= 0 && cid[1][1] - Values.nickel >= 0)
      cid = moneyCalculations(Values.nickel, 7, 1, cid)
    else if (changeMoney - Values.penny >= 0 && cid[0][1] - Values.penny >= 0)
      cid = moneyCalculations(Values.penny, 8, 0, cid)
    else
      return false
  }
  return cid
}

function sumCID(cid) {
    return cid.reduce((total, element) => {
      return Number((total += element[1]).toFixed(2))
  }, 0)
}

function setFinal(statusValue, changeValue) {
    Final.status = statusValue
    Final.change = changeValue
    return Final
}

function checkCashRegister(price, cash, cid) {

  let allMyMoney = sumCID(cid)

  changeMoney = cash - price

  if (changeMoney > allMyMoney)
    return setFinal("INSUFFICIENT_FUNDS", [])

  if (changeMoney === allMyMoney)
    return setFinal("CLOSED", cid)

  cid = calculateChange(cid)

  if (cid === false)
    return setFinal("INSUFFICIENT_FUNDS", [])

  changeObj = changeObj.filter(element => {
    return element[1] != 0
    })

  return setFinal("OPEN", changeObj)
}
