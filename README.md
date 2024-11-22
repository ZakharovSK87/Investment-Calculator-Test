Inputs: 
● Initial investment: Amount in pounds, whole numbers only, between 1 and 100,000. 
Default value is 1,000. The value can be adjusted using + and - buttons (increments 
of 1,000) or via keyboard input. 
● Monthly investment: Amount in pounds, whole numbers only, between 1 and 
10,000. Default value is 100. The value can be adjusted using + and - buttons 
(increments of 100) or via keyboard input. 
● Investment period: Investment duration in years, whole numbers only, between 1 
and 40. Default value is 10. The value can be adjusted using + and - buttons 
(increments of 1) or via keyboard input. 
● Invest in options: A clickable field that opens a modal for selecting from the 
following options: 
○ 8.91% (MSCI World) 
○ 11.19% (S&P 500) 
○ 4.95% (Money Market Funds) 
○ Enter your own return figure: A field for entering a custom annual return 
rate, as a whole number or a decimal (up to two decimal places), between 0 
and 100. 
After selecting or entering a return rate, the modal should close, and the chosen value 
should populate the "Invest in" field. 
All fields should include validation (e.g., empty input, exceeding allowed limits). Upon 
changing any field, the output should update immediately. 
Outputs: A bar chart with the following details: 
● X-axis: Investment period (years) 
● Y-axis: Amount in pounds Each bar represents the total amount invested and the 
earned dividends, displayed in different colours. On hover, a tooltip should show the 
year, total invested, and earned dividends for that year. 
Next to the chart, display the following totals: 
● Portfolio value: Total invested amount plus dividends earned over the entire period 
● Total invested: Sum of all investments over the period 
● Total return: Dividends earned over the period
