num = int(input('Enter a positive integer number = '))

if num > 0:
    
    i = 1
    
    while i <= 10:
        
        print("{} x {} = {}".format(num, i, num * i))
        i += 1

else:
    
    print('Invalid integer number!')
