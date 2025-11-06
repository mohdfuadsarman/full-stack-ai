def get_number():
    
    while True:
        
        num = input('Enter a number = ').strip()
        
        if len(num) == 0:
            
            return None
        
        else:
            
            if num.find('.') == -1:
                
                try:
                    return int(num)
                except ValueError:
                    pass
            
            else:
                
                try:
                    return float(num)
                except ValueError:
                    pass
                
            print('ERROR!: Invalid number, please try again')



def get_numbers():
    
    nums = list([])
    
    while True:
        
        num = get_number()
        
        if num == None:
            
            return nums
        
        else:
            
            nums.append(num)



def calculate_arithmetic_mean(nums):
    
    if isinstance(nums, list):
        
        if len(nums) > 0:            
            
            summation = 0
            
            for num in nums:
                
                summation += num
            
            return summation / len(nums)
    
    return None



def calculate_geometric_mean(nums):
    
    if isinstance(nums, list):
        
        if len(nums) > 0:            
            
            product = 1
            
            for num in nums:
                
                product *= num
            
            return product ** (1/len(nums))
    
    return None



def calculate_harmonic_mean(nums):
    
    if isinstance(nums, list):
        
        if len(nums) > 0:            
            
            reciprocal_summation = 0
            
            for num in nums:
                
                reciprocal_summation += 1 / num
            
            return len(nums) / reciprocal_summation 
    
    return None
