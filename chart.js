function chartPokemon(i) {
    const ctx = document.getElementById(`myChart${i}`);

new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: [attackName1[i], attackName2[i], attackName3[i], attackName4[i], attackName5[i]],
    datasets: [{
      
      data: [attackValue1[i], attackValue2[i], attackValue3[i], attackValue4[i], attackValue5[i]],
      borderWidth: 1,
      backgroundColor: [
        'rgb(0, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ],
      label: ' ',
    }]
  },
});
}

