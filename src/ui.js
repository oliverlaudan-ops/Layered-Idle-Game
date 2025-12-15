export function updateUI(game) {
  const currencies = game.currencies;

  document.getElementById('currency-display').textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  const generatorsDiv = document.getElementById('generators-container');
  const cost = currencies.generatorCost;

  generatorsDiv.innerHTML = `
    <div>Generatoren: ${currencies.generators} (je ${currencies.baseProduction}/s)</div>
    <div>Kosten für nächsten Generator: ${cost} Punkte</div>
    <button id="buy-generator-btn">Generator kaufen</button>
  `;

  const buyBtn = document.getElementById('buy-generator-btn');
  if (buyBtn) {
    buyBtn.onclick = () => currencies.buyGenerator();
    buyBtn.disabled = currencies.points < cost;
  }
}
