function buyCoke() {
    var coinsPaid = valueFromCoinCounts(coinsInserted)
    if (coinsPaid < 25) {
        errorMessage = "Not enough coins inserted"
        updateView();
    }

    if (coinsPaid >= 25) {
        var change = coinsPaid-25
        var changeInCoins = segregateChangeInCoins(change)
        checkCokeInStore()
        addCoinsInMachine(coinsPaid)
        collectedChange(changeInCoins)
        valueFromCoinCounts(changeInCoins)
        reduceCoinsInMachine(changeInCoins)
        coinsInserted = [0, 0, 0, 0];
        updateView();
    }
}

function insertCoin(value) {
    var index = 0;
    if (value===1) index=0
    if (value===5) index=1
    if (value===10) index=2
    if (value===20) index=3
    coinsInserted[index]++;
    updateView();
}

function returnCoins() {
    coinsReturned = [...coinsInserted];
    coinsInserted = [0, 0, 0, 0];
    updateView();
}

function takeCoins() {
    coinsReturned = [0, 0, 0, 0];
    updateView();
}

function addCoinsInMachine(coinsPaid) {
    var amountDifference = coinsPaid;
    while (amountDifference >= 20) {
        amountDifference-=20
        coinsInMachine[3]++
    }

    while (amountDifference >= 10) {
        amountDifference-=10
        coinsInMachine[2]++
    }

    while (amountDifference >= 5) {
        amountDifference-=5
        coinsInMachine[1]++
    }

    while (amountDifference >= 1) {
        amountDifference-=1
        coinsInMachine[0]++
    }
   
    return coinsInMachine
}

function segregateChangeInCoins(change) {
    var changeDifference = change;
    var segregatedCoins = [0,0,0,0]

    while (coinsInMachine[3]!==0&&changeDifference >= 20) {
        changeDifference-=20
        segregatedCoins[3]++
    }

    while (coinsInMachine[2]!==0&&changeDifference >= 10) {
        changeDifference-=10
        segregatedCoins[2]++
    }

    while (coinsInMachine[1]!==0&&changeDifference >= 5) {
        changeDifference-=5
        segregatedCoins[1]++
    }

    while (changeDifference >= 1) {
        changeDifference-=1
        segregatedCoins[0]++
    }
    return segregatedCoins
}

function checkCokeInStore() {
    if (cokesInStore === 0) {
        errorMessage = "Coke Machine is empty"
    } else {
        cokesInStore--
        isCokeInDelivery = true;
    }
    updateView();
}

function reduceCoinsInMachine(changeInCoins) {
    var remainingOnes = coinsInMachine[0]-changeInCoins[0]
    var remainingFives = coinsInMachine[1]-changeInCoins[1]
    var remainingTens = coinsInMachine[2]-changeInCoins[2]
    var remainingTwenties = coinsInMachine[3]-changeInCoins[3]

    if (remainingOnes === 0) {
        errorMessage = "One kroner coins is empty"
    } else if (remainingFives === 0) {
        errorMessage = "Five kroner coins is empty"
    } else if (remainingTens === 0) {
        errorMessage = "Ten kroner coins is empty"
    } else if (remainingTwenties === 0) {
        errorMessage = "Twenty kroner coins is empty"
    }

    coinsInMachine = [remainingOnes, remainingFives, remainingTens, remainingTwenties]
    updateView();
}

function collectedChange(changeInCoins) {
    var ones = coinsReturned[0] + changeInCoins[0]
    var fives = coinsReturned[1] + changeInCoins[1]
    var tens = coinsReturned[2] + changeInCoins[2]
    var twenties = coinsReturned[3] + changeInCoins[3]
    var collectedChangeReturned = [ones, fives, tens, twenties]
    coinsReturned=collectedChangeReturned
}

function takeCoke() {
    isCokeInDelivery=false
    updateView();
}
