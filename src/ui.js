export function updateUI(game) {
  const currencies = game.currencies;

  // 1. Klick-Button: Prestige-Multiplier einbeziehen
  const clickBtn = document.getElementById('click-btn');
  const effectiveClickPower = currencies.clickPower * currencies.prestigeMultiplier;
  clickBtn.textContent = `Klicken (+${effectiveClickPower.toFixed(1)})`; // ✅ 1.5 bei Prestige 5

  // 2. Currency Display: Gesamt-Prod inkl. Prestige
  document.getElementById('currency-display').textContent =
  `Punkte: ${currencies.points} (Prod: ${currencies.totalProductionPerSecond.toFixed(1)}/s)`;

  // 3. Generators: Effektive Produktion pro Generator zeigen
  const generatorsInfo = document.getElementById('generators-info');
  const genCost = currencies.generatorCost;
  const effectiveGenProd = currencies.baseProduction * currencies.generatorMultiplier * currencies.prestigeMultiplier;
  generatorsInfo.textContent = 
    `Generatoren: ${currencies.generators} (je ${effectiveGenProd.toFixed(1)}/s) — Kosten: ${genCost}`;

  // 4. Generator Button
  document.getElementById('buy-generator-btn').disabled = currencies.points < genCost;

  // 5. Upgrade Buttons
  const clickUpgradeBtn = document.getElementById('buy-click-upgrade-btn');
  clickUpgradeBtn.textContent = `Klick x2 (Kosten: ${currencies.clickUpgradeCost})`;
  clickUpgradeBtn.disabled = currencies.points < currencies.clickUpgradeCost;
  
  const genUpgradeBtn = document.getElementById('buy-generator-upgrade-btn');
  genUpgradeBtn.textContent = `Generator x2 (Kosten: ${currencies.generatorUpgradeCost})`;
  genUpgradeBtn.disabled = currencies.points < currencies.generatorUpgradeCost;

  // 6. Status-Infos
  const upgradesInfo = document.getElementById('upgrades-info');
  upgradesInfo.innerHTML = `
    <div>Klick-Power: x${currencies.clickPower.toFixed(1)}</div>
    <div>Generator-Multi: x${currencies.generatorMultiplier.toFixed(1)}</div>
    <div><strong>Prestige Multi: x${currencies.prestigeMultiplier.toFixed(2)}</strong></div>
  `;

  // 7. Prestige (deine Implementierung)
  const prestigeInfo = document.getElementById('prestige-info');
  const prestigeBtn = document.getElementById('prestige-btn');
  prestigeInfo.innerHTML = `
    <div>Prestige Points: ${currencies.prestigePoints}</div>
    <div>Gewinn beim Reset: ${currencies.prestigeGain}</div>
  `;
  prestigeBtn.textContent = `Prestige Reset (+${currencies.prestigeGain})`;
  prestigeBtn.disabled = currencies.prestigeGain <= 0;

  // 8. Layers Container 
  const layersContainer = document.getElementById('layers-container');
  const layers = game.layers;
  const unlockedLayers = layers.unlockedLayers;
  
  if (unlockedLayers.length > 1) {
    layersContainer.innerHTML = unlockedLayers.map(layer => `
      <div class="layer-section">
        <h3>Layer ${layer.id}: ${layer.name}</h3>
        <div>${layer.currency.points} (${layer.currency.totalProductionPerSecond.toFixed(1)}/s)</div>
        <button onclick="game.layers.layers[${layer.id-1}].currency.buyGenerator()">
          Generator kaufen (${layer.currency.generatorCost})
        </button>
      </div>
    `).join('');
  } else {
    layersContainer.innerHTML = '<div>Neue Layers werden freigeschaltet...</div>';
  }

}
