def get_input():
    while True:
        try:
            nric = input('Enter identity card number: ')
            nric = nric.strip().upper()
            if len(nric) != 9:
                raise ValueError("Identity card number must be 9 characters")
            if nric[0] not in ['S', 'T', 'F', 'G']:
                raise ValueError("The first character of an identity card number must be the alphabet S, T, F or G")
            return nric
        except ValueError as e:
            print(f"Error: {e}. Please try again.")

def calculate_weighted_total(nric):
    weighted_total = int(nric[1]) * 2 + int(nric[2]) * 7 + int(nric[3]) * 6 + int(nric[4]) * 5 + int(nric[5]) * 4 + int(nric[6]) * 3 + int(nric[7]) * 2
    if nric[0] == 'T' or nric[0] == 'G':
        weighted_total += 4
    return weighted_total

def calculate_check_alphabet(nric, mod_11):
    if nric[0] == 'S' or nric[0] == 'T':
        check_alphabet = 'J' if mod_11 == 0 else 'Z' if mod_11 == 1 else 'I' if mod_11 == 2 else 'H' if mod_11 == 3 else 'G' if mod_11 == 4 else 'F' if mod_11 == 5 else 'E' if mod_11 == 6 else 'D' if mod_11 == 7 else 'C' if mod_11 == 8 else 'B' if mod_11 == 9 else 'A'
    else:
        check_alphabet = 'X' if mod_11 == 0 else 'W' if mod_11 == 1 else 'U' if mod_11 == 2 else 'T' if mod_11 == 3 else 'R' if mod_11 == 4 else 'Q' if mod_11 == 5 else 'P' if mod_11 == 6 else 'N' if mod_11 == 7 else 'M' if mod_11 == 8 else 'L' if mod_11 == 9 else 'K'
    return check_alphabet

def validate_nric(nric):
    weighted_total = calculate_weighted_total(nric)
    mod_11 = weighted_total % 11
    check_alphabet = calculate_check_alphabet(nric, mod_11)

    if nric[8] == check_alphabet:
        print('{} is a valid identity card number'.format(nric))
    else:
        print('{} is NOT a valid identity card number'.format(nric))

def main():
    nric = get_input()
    validate_nric(nric)

if __name__ == "__main__":
    main()