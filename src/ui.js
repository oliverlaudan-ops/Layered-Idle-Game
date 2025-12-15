export function updateUI(game) {
  const currencies = game.currencies;

  document.getElementById('currency-display').textContent =
    `Punkte: ${currencies.points} (Prod: ${currencies.productionPerSecond}/s)`;

  // vorerst keine Generator-UI, bis wir sie sauber gebaut haben
  document.getElementById('generators-container').textContent = '';
}
