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
if (!layersContainer) return;

const layers = game.layers.unlockedLayers;

// Wenn nur Layer 1 frei ist → Hinweis anzeigen
if (layers.length <= 1) {
  layersContainer.innerHTML = '<div>Neue Layers werden freigeschaltet…</div>';
  return;
}

// Layer 2 (und später evtl. weitere) anzeigen
layersContainer.innerHTML = layers
  .filter(l => l.id === 2) // nur Layer 2 anzeigen
  .map(layer => {
    const c = layer.currency;

    const points = (typeof c.points === 'number') ? c.points : 0;
    const prod = typeof c.totalProductionPerSecond === 'number'
      ? c.totalProductionPerSecond.toFixed(1)
      : (typeof c.productionPerSecond === 'number'
          ? c.productionPerSecond.toFixed(1)
          : '0.0');

    const cost = typeof c.generatorCost === 'number' ? c.generatorCost : 0;

    return `
      <div class="layer-section">
        <h3>Layer ${layer.id}: ${layer.name}</h3>
        <div>Coins: ${points} (${prod}/s)</div>
        <button type="button" onclick="game.layers.getCurrencyForLayer(${layer.id}).buyGenerator()">
          Generator kaufen (${cost})
        </button>
      </div>
    `;
  })
  .join('');


}
