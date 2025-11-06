word = input('Enter a word or phrase of any number of alphabets: ').strip().lower()

if len(word) > 0:
    
    
    char_list = []
    
    for char in word:
        
        if char.isalpha():
            
            char_list.append(char)
    
    is_palindrome = True
    i = 0
    j = len(char_list) -1
    
    while i < j:
        
        if char_list[i] != char_list[j]:
            
            is_palindrome = False
            break
        
        i += 1
        j -= 1
    
    if is_palindrome:
        
        print('{} is a palindrome'.format(word))
        
    else:
        
        print('{} is NOT a palindrome'.format(word))
    
else:
    
    print('ERROR!: No word was entered')
