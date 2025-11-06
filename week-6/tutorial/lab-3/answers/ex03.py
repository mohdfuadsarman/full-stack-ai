base = int(input('Enter Base of Triangle (Odd Number Integer, Minimum is 3 units) = '))

if base >= 3:
    
    if (base % 2) == 0:
    
        # base is an even number, which is invalid
        # So return a 0
        base = 0
    
else:

    # Base is less than 3, which is invalid
    # So return a 0
    base = 0

if base > 0:

    print('You have requested a triangle with a base of {} units :)'.format(base))
    
    height = (base + 1) // 2
    
    print('This triangle has a computed height of {} units :)'.format(height))
    print('Here is your triangle...\n')
    
    for i in range(1, height + 1):
        
        num_of_asterisks = int(2 * i - 1) # 1 + ((i - 1) * 2) = 1 + (2i - 2) = 2i - 1        
        num_of_leading_spaces = int((base - num_of_asterisks) / 2)
        
        print(' ' * num_of_leading_spaces, end = '')
        print('*' * num_of_asterisks)        

else:

    print('You have entered an invalid base :(')
