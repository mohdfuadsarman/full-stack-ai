num = int(input('Enter a positive integer number = '))

if num > 0:
    
    for i in range(1, 11):
        
        print('{} x {} = {}'.format(num, i, num * i))

else:
    
    print('Invalid integer number!')
