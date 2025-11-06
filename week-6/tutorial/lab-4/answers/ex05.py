def main():
    
    nums = []
    next_num = True
    
    while next_num:
        try:
            num = input('Enter a positive number (leave empty to stop) = ')
            
            if len(num.strip()) == 0:
                
                next_num = False
                break
            
            else:
                
                num = float(num)
                
                if num <= 0:
                    
                    raise ValueError
        
        except ValueError:
            print('Invalid positive number, please try again')
        
        else:
            nums.append(num)

    print('You have entered {}'.format(nums))        
    
    summation = 0
    product = 1
    reciprocal_summation = 0
    
    for num in nums:
        
        summation += num
        product *= num
        reciprocal_summation += 1 / num
    
    arithmetic_mean = summation / len(nums)
    geometric_mean = product ** (1/len(nums))
    harmonic_mean = len(nums) / reciprocal_summation
    
    print('Arithmetic mean is {:.3f}'.format(arithmetic_mean))
    print('Geometric mean is {:.3f}'.format(geometric_mean))
    print('Harmonic mean is {:.3f}'.format(harmonic_mean))


if __name__ == '__main__':
    
    main()
