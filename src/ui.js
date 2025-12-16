export function updateUI(game) {
  const currencies = game.currencies;

  // 1. Klick-Button Text mit aktueller Klick-Power
  const clickBtn = document.getElementById('click-btn');
  clickBtn.textContent = `Klicken (+${currencies.clickPower.toFixed(1)})`; // ✅ dynamisch!

  // 2. Currency Display
  document.getElementById('currency-display').textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  // 3. Generators Info mit Multiplier
  const generatorsInfo = document.getElementById('generators-info');
  const genCost = currencies.generatorCost;
  generatorsInfo.textContent = 
    `Generatoren: ${currencies.generators} (je ${currencies.baseProduction * currencies.generatorMultiplier}/s) — Kosten: ${genCost}`; // ✅ Multiplier!

  // 4. Generator Button disabled
  document.getElementById('buy-generator-btn').disabled = currencies.points < genCost;

  // 5. Upgrade Buttons Text + disabled
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
  `;

  // 7. Prestige
  const prestigeInfo = document.getElementById('prestige-info');
  const prestigeBtn = document.getElementById('prestige-btn');
  const currencies = game.currencies;
  
  prestigeInfo.innerHTML = `
    <div>Prestige Points: ${currencies.prestigePoints}</div>
    <div>Prestige Multi: x${currencies.prestigeMultiplier.toFixed(2)}</div>
    <div>Gewinn beim Reset: ${currencies.prestigeGain}</div>
  `;
  
  prestigeBtn.textContent = `Prestige Reset (+${currencies.prestigeGain})`;
  prestigeBtn.disabled = currencies.prestigeGain <= 0;

  // Layers
  document.getElementById('layers-container').innerHTML = '';
}
