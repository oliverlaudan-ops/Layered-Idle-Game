export function updateUI(game) {
  const currencies = game.currencies;

  // Currency Display
  document.getElementById('currency-display').textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  // Generators
  const generatorsInfo = document.getElementById('generators-info');
  const cost = currencies.generatorCost;
  generatorsInfo.textContent = 
    `Generatoren: ${currencies.generators} (je ${currencies.baseProduction}/s) — Kosten: ${cost}`;
  document.getElementById('buy-generator-btn').disabled = currencies.points < cost;

  // Upgrades
  const upgradesInfo = document.getElementById('upgrades-info');
  const clickCost = currencies.clickUpgradeCost;
  const genUpgradeCost = currencies.generatorUpgradeCost;
  
  upgradesInfo.innerHTML = `
    <div>Klick-Power: x${currencies.clickPower.toFixed(1)}</div>
    <button id="buy-click-upgrade-btn" ${currencies.points < clickCost ? 'disabled' : ''}>
      Klick x2 (Kosten: ${clickCost})
    </button>
    <div>Generator-Multi: x${currencies.generatorMultiplier.toFixed(1)}</div>
    <button id="buy-generator-upgrade-btn" ${currencies.points < genUpgradeCost ? 'disabled' : ''}>
      Generator x2 (Kosten: ${genUpgradeCost})
    </button>
  `;

  // Layers (später)
  document.getElementById('layers-container').innerHTML = '';
}
