export function updateUI(game) {
  const currencies = game.currencies;

  const currencyDisplay = document.getElementById('currency-display');
  const generatorsDiv = document.getElementById('generators-container');

  if (!currencyDisplay || !generatorsDiv) {
    return;
  }

  currencyDisplay.textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  const cost = currencies.generatorCost;

  generatorsDiv.innerHTML = `
    <div>Generatoren: ${currencies.generators} (je ${currencies.baseProduction}/s)</div>
    <div>Kosten für nächsten Generator: ${cost} Punkte</div>
    <button id="buy-generator-btn">Generator kaufen</button>
  `;

  const buyBtn = document.getElementById('buy-generator-btn');
  if (buyBtn) {
    buyBtn.onclick = () => {
      currencies.buyGenerator();
    };
    buyBtn.disabled = currencies.points < cost;
  }
}
