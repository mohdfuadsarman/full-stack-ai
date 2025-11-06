principal = float(input('Enter Principal = '))
annual_interest_rate = float(input('Enter Annual Interest Rate (%) = '))
time_in_years = int(input('Enter Time in Years = '))
compound_frequency = int(input('Enter No. of Times Interest Compounded Annually = '))

future_value = principal * ((1.0 + (annual_interest_rate / 100.0) / compound_frequency) ** (time_in_years * compound_frequency))
compound_interest = future_value - principal
        
print('Compound interest is ${:.2f}'.format(compound_interest))
print('Future value is ${:.2f}'.format(future_value))
