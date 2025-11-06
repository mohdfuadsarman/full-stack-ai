conversion_type = input('Enter temperature conversion type\n(C for Celsius to Fahrenheit | F for Fahrenheit to Celsius) = ')

if conversion_type == 'C':
    
    temp_c = float(input('Enter temperature to convert in Celsius = '))
    
    if temp_c < 0 or temp_c > 100:
        print('Invalid temperature range for Celsius')
    else:
        temp_f = (temp_c * 9 / 5) + 32
        print('Temperature in Fahrenheit is {:.1f}'.format(temp_f));

elif conversion_type == 'F':
    
    temp_f = float(input('Enter temperature to convert in Fahrenheit = '))
    
    if temp_f < 32 or temp_f > 212:
        print('Invalid temperature range for Fahrenheit')
    else:
        temp_c = (temp_f - 32) * 5 / 9
        print('Temperature in Celsius is {:.1f}'.format(temp_c));

else:
    
    print('ERROR: Invalid temperature conversion type')
