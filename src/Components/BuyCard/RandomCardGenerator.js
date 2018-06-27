export const randomCardGenerator = (cards, goldSpent) => {
  const allCards = cards

  const tier1 = allCards.filter(card => card.tier === 1)
  const tier2 = allCards.filter(card => card.tier === 2)
  const tier3 = allCards.filter(card => card.tier === 3)

  const purchaseArr = []
  let chosenCard = {}

  if (goldSpent === 1) {
    for (let i = 0; i < 7; i++) {
      purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
    }
    for (let i = 0; i < 2; i++) {
      purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
    }
    for (let i = 0; i < 1; i++) {
      purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
    }
  }
  if (goldSpent === 2) {
    for (let i = 0; i < 3; i++) {
      purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
    }
    for (let i = 0; i < 5; i++) {
      purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
    }
    for (let i = 0; i < 2; i++) {
      purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
    }
  }
  if (goldSpent === 3) {
    for (let i = 0; i < 2; i++) {
      purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
    }
    for (let i = 0; i < 5; i++) {
      purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
    }
    for (let i = 0; i < 3; i++) {
      purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
    }
  }

  chosenCard = purchaseArr[Math.floor(Math.random() * purchaseArr.length)]
  // console.log('chosenCard', chosenCard)
  return chosenCard
}
