num = int(input('Enter positive integer number = '))

if num > 0:

    position = int(input('Enter required position (1 for leftmost) = '))
    
    if position < 1:

        print('Invalid position!')
        
    else:
    
        digit = 1
        temp = num
        
        while temp > 9:
            
            temp /= 10
            digit += 1    
        
        if position > digit:
            
            print('Required position is greater than the number of available digits!')
            
        else:
        
            divide_count = digit - position
            temp = num
            
            while divide_count > 0:
                
                temp //= 10
                divide_count -= 1
            
            print('Digit {} in {} is {}'.format(position, num, temp % 10))                

else:
    print('Invalid positive integer number!')
