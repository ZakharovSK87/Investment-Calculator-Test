const ctx = document.getElementById('investment-chart').getContext('2d');

// Получение элементов
const initialInvestmentInput = document.getElementById('initial-investment');
const monthlyInvestmentInput = document.getElementById('monthly-investment');
const investmentPeriodInput = document.getElementById('investment-period');
const investmentOptions = document.getElementById('investment-options');
const customRateInput = document.getElementById('custom-rate');
const totalPortfolioSpan = document.getElementById('total-portfolio');
const totalInvestmentsSpan = document.getElementById('total-investments');
const totalProfitSpan = document.getElementById('total-profit');

// Получение кнопок
const buttons = {
  initialDecrease: document.getElementById('decrease-investment'),
  initialIncrease: document.getElementById('increase-investment'),
  monthlyDecrease: document.getElementById('decrease-monthly'),
  monthlyIncrease: document.getElementById('increase-monthly'),
  periodDecrease: document.getElementById('decrease-period'),
  periodIncrease: document.getElementById('increase-period'),
};

// Показ пользовательской доходности
investmentOptions.addEventListener('change', () => {
  if (investmentOptions.value === 'custom') {
    customRateInput.style.display = 'block';
  } else {
    customRateInput.style.display = 'none';
  }
});

// Функция обновления значений через кнопки
function updateInput(inputElement, step, min, max) {
  const currentValue = parseInt(inputElement.value) || 0;
  const newValue = Math.min(Math.max(currentValue + step, min), max);
  inputElement.value = newValue;
  updateChart(calculateData());
}

// Назначение обработчиков кнопкам
buttons.initialDecrease.addEventListener('click', () => updateInput(initialInvestmentInput, -1, 1, 100000));
buttons.initialIncrease.addEventListener('click', () => updateInput(initialInvestmentInput, 1, 1, 100000));
buttons.monthlyDecrease.addEventListener('click', () => updateInput(monthlyInvestmentInput, -1, 1, 10000));
buttons.monthlyIncrease.addEventListener('click', () => updateInput(monthlyInvestmentInput, 1, 1, 10000));
buttons.periodDecrease.addEventListener('click', () => updateInput(investmentPeriodInput, -1, 1, 40));
buttons.periodIncrease.addEventListener('click', () => updateInput(investmentPeriodInput, 1, 1, 40));

// Обновление графика
let chart;

function updateChart(data) {
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Total Investments',
          data: data.totalInvestments,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Profit',
          data: data.profit,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `£${tooltipItem.raw.toFixed(2)}`;
            },
          },
        },
      },
    },
  });
}

// Расчет данных
function calculateData() {
  const initialInvestment = parseInt(initialInvestmentInput.value) || 0;
  const monthlyInvestment = parseInt(monthlyInvestmentInput.value) || 0;
  const investmentPeriod = parseInt(investmentPeriodInput.value) || 0;
  const rate = parseFloat(
    investmentOptions.value === 'custom' ? customRateInput.value : investmentOptions.value
  ) / 100;

  let totalInvestments = initialInvestment;
  let profit = 0;
  const years = [];
  const totalInvestmentsData = [];
  const profitData = [];

  for (let i = 1; i <= investmentPeriod; i++) {
    years.push(`Year ${i}`);
    totalInvestments += monthlyInvestment * 12;
    profit += (totalInvestments + profit) * rate;
    totalInvestmentsData.push(totalInvestments);
    profitData.push(profit);
  }

  totalPortfolioSpan.textContent = `£${(totalInvestments + profit).toFixed(2)}`;
  totalInvestmentsSpan.textContent = `£${totalInvestments.toFixed(2)}`;
  totalProfitSpan.textContent = `£${profit.toFixed(2)}`;

  return { years, totalInvestments: totalInvestmentsData, profit: profitData };
}

// Обработчики событий для ввода
[initialInvestmentInput, monthlyInvestmentInput, investmentPeriodInput, customRateInput].forEach(
  (input) => input.addEventListener('input', () => updateChart(calculateData()))
);

investmentOptions.addEventListener('change', () => updateChart(calculateData()));

// Начальный рендеринг
updateChart(calculateData());
