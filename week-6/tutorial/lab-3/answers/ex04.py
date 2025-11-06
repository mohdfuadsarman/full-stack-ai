n = int(input('Enter a positive integer greater than 1 = '))
d = 2

if n > 1:

    print('Prime factors of {} are: '.format(n))
    
    while d < n:
    
        if (n % d) == 0:
        
            n //= d
            print('{} x '.format(d), end = '')
        
        else:
        
            if d == 2:
            
                d = 3
                
            else:
            
                d += 2
        
    print(d)

else:

    print('A positive integer greater than 1 is required.')
