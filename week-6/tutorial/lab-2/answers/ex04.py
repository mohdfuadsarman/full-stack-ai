import random



nric_type = input('Enter identity card type (S, T, F or G only): ')
nric_type = nric_type.strip().upper()

check_alphabet = ''

if (len(nric_type) == 1) and (nric_type == 'S' or nric_type == 'T' or nric_type == 'F' or nric_type == 'G'):

    random.seed()
    serial_num_1 = random.randint(0, 9)
    serial_num_2 = random.randint(0, 9)
    serial_num_3 = random.randint(0, 9)
    serial_num_4 = random.randint(0, 9)
    serial_num_5 = random.randint(0, 9)
    serial_num_6 = random.randint(0, 9)
    serial_num_7 = random.randint(0, 9)

    weighted_total = serial_num_1 * 2 + serial_num_2 * 7 + serial_num_3 * 6 + serial_num_4 * 5 + serial_num_5 * 4 + serial_num_6 * 3 + serial_num_7 * 2

    if nric_type == 'T' or nric_type == 'G':

        weighted_total += 4

    mod_11 = weighted_total % 11

    if nric_type == 'S' or nric_type == 'T':

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

    identity_card_number = nric_type + str(serial_num_1) + str(serial_num_2) + str(serial_num_3) + str(serial_num_4) + str(serial_num_5) + str(serial_num_6) + str(serial_num_7) + check_alphabet

    print('Generated identity card number is {}'.format(identity_card_number))

else:

    print('ERROR: Invalid identity card type')