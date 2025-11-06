import mean_calculator as meancalc



def main():
    
    print('*** Welcome to Mean Calculator ***')
    
    while True:
        
        choice = input('Do you have a new dataset to process? (Y/N) = ').strip().upper()
        
        if choice == 'Y':
            
            nums = meancalc.get_numbers()
            
            if len(nums) > 0:
            
                while True:
                    
                    print('You have entered = {}'.format(nums))
                    print('Please select the required mean number to compute:\n\tA = Arithmetic Mean\n\tG = Geometric Mean\n\tH = Harmonic Mean\n\tQ = Change New Dataset')
                    option = input('> ').strip().upper()
                    
                    if option == 'A':
                        
                        print('Arithmetic Mean is {:.3f}'.format(meancalc.calculate_arithmetic_mean(nums)))
                    
                    elif option == 'G':
                        
                        print('Geometric Mean is {:.3f}'.format(meancalc.calculate_geometric_mean(nums)))
                    
                    elif option == 'H':
                        
                        print('Harmonic Mean is {:.3f}'.format(meancalc.calculate_harmonic_mean(nums)))
                    
                    elif option == 'Q':
                        
                        break;
                        
                    else:
                        
                        print('ERROR!: Invalid option, please try again')
            else:
                
                print('WARNING!: You did not enter any number')
        
        else:
            
            break

    print('Exiting program...')
    


if __name__ == '__main__':
    
    main()
    