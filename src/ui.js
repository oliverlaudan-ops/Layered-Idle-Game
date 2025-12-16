export function updateUI(game) {
  const currencies = game.currencies;

  // Currency Display
  document.getElementById('currency-display').textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  // Generators (statisch - nur Werte updaten)
  const generatorsInfo = document.getElementById('generators-info');
  const genCost = currencies.generatorCost;
  generatorsInfo.textContent = 
    `Generatoren: ${currencies.generators} (je ${currencies.baseProduction}/s) — Kosten: ${genCost}`;
  document.getElementById('buy-generator-btn').disabled = currencies.points < genCost;

  // Upgrades (STATISCH - nur Text + disabled updaten)
  const clickUpgradeBtn = document.getElementById('buy-click-upgrade-btn');
  const genUpgradeBtn = document.getElementById('buy-generator-upgrade-btn');
  
  if (clickUpgradeBtn) {
    clickUpgradeBtn.textContent = `Klick x2 (Kosten: ${currencies.clickUpgradeCost})`;
    clickUpgradeBtn.disabled = currencies.points < currencies.clickUpgradeCost;
  }
  
  if (genUpgradeBtn) {
    genUpgradeBtn.textContent = `Generator x2 (Kosten: ${currencies.generatorUpgradeCost})`;
    genUpgradeBtn.disabled = currencies.points < currencies.generatorUpgradeCost;
  }

  // Status-Infos (nur Text)
  const upgradesInfo = document.getElementById('upgrades-info');
  if (upgradesInfo) {
    upgradesInfo.innerHTML = `
      <div>Klick-Power: x${currencies.clickPower.toFixed(1)}</div>
      <div>Generator-Multi: x${currencies.generatorMultiplier.toFixed(1)}</div>
    `;
  }

  // Layers (placeholder)
  document.getElementById('layers-container').innerHTML = '';
}
