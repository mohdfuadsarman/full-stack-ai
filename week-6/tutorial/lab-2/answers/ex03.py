nric = input('Enter identity card number: ')
nric = nric.strip().upper()

check_alphabet = ''

if len(nric) == 9:

    if nric[0] == 'S' or nric[0] == 'T' or nric[0] == 'F' or nric[0] == 'G':

        weighted_total = int(nric[1]) * 2 + int(nric[2]) * 7 + int(nric[3]) * 6 + int(nric[4]) * 5 + int(nric[5]) * 4 + int(nric[6]) * 3 + int(nric[7]) * 2

        if nric[0] == 'T' or nric[0] == 'G':

            weighted_total += 4

        mod_11 = weighted_total % 11

        if nric[0] == 'S' or nric[0] == 'T':

            if mod_11 == 0:
                check_alphabet = 'J'
            elif mod_11 == 1:
                check_alphabet = 'Z'
            elif mod_11 == 2:
                check_alphabet = 'I'
            elif mod_11 == 3:
                check_alphabet = 'H'
            elif mod_11 == 4:
                check_alphabet = 'G'
            elif mod_11 == 5:
                check_alphabet = 'F'
            elif mod_11 == 6:
                check_alphabet = 'E'
            elif mod_11 == 7:
                check_alphabet = 'D'
            elif mod_11 == 8:
                check_alphabet = 'C'
            elif mod_11 == 9:
                check_alphabet = 'B'
            elif mod_11 == 10:
                check_alphabet = 'A'

        else:

            if mod_11 == 0:
                check_alphabet = 'X'
            elif mod_11 == 1:
                check_alphabet = 'W'
            elif mod_11 == 2:
                check_alphabet = 'U'
            elif mod_11 == 3:
                check_alphabet = 'T'
            elif mod_11 == 4:
                check_alphabet = 'R'
            elif mod_11 == 5:
                check_alphabet = 'Q'
            elif mod_11 == 6:
                check_alphabet = 'P'
            elif mod_11 == 7:
                check_alphabet = 'N'
            elif mod_11 == 8:
                check_alphabet = 'M'
            elif mod_11 == 9:
                check_alphabet = 'L'
            elif mod_11 == 10:
                check_alphabet = 'K'

        if nric[8] == check_alphabet:

            print('{} is a valid identity card number'.format(nric))

        else:

            print('{} is NOT a valid identity card number'.format(nric))

    else:

        print('The first character of an identity card number must be the alphabet S, T, F or G')

else:

    print('Identity card number must be 9 characters')
