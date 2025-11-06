pascal_tri_row = int(input('Enter the Number of Rows Required = '))

if pascal_tri_row >= 1:

    print('You have requested a Pascal Triangle of {} rows :)\n'.format(pascal_tri_row))
    
    for n in range(pascal_tri_row):
    
        # Print leading spaces
        print('  ' * (pascal_tri_row - n - 1), end = '')        
            
        # Print binomial coefficients
        for k in range(n + 1):
        
            product = 1
            k_plus_one = k + 1
            
            while k_plus_one <= n:
            
                product *= k_plus_one
                k_plus_one += 1
            
            factorial = 1
            n_minus_k = n - k
            
            while n_minus_k > 1:
            
                factorial *= n_minus_k
                n_minus_k -= 1
                
            product_divide_by_factorial = product // factorial
            print('{:2d}  '.format(product_divide_by_factorial), end = '')
            
        print()

else:

    print('You have requested an undersized Pascal Triangle that I cannot print :(')
