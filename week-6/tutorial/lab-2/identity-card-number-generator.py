import random

def get_input():
    while True:
        try:
            resident_type = input("Enter resident type (S/T/F/G): ")
            if resident_type not in ['S', 'T', 'F', 'G']:
                raise ValueError("Invalid resident type. Must be one of S, T, F, G.")
            return resident_type
        except ValueError as e:
            print(e)

def generate_serial_number():
    random.seed()

    serial_number = []
    for _ in range(7):
        serial_number.append(str(random.randint(0, 9)))

    return serial_number

def calculate_weighted_total(resident_type, serial_number):
    weighted_total = int(serial_number[0]) * 2 + int(serial_number[1]) * 7 + int(serial_number[2]) * 6 + int(serial_number[3]) * 5 + int(serial_number[4]) * 4 + int(serial_number[5]) * 3 + int(serial_number[6]) * 2
    if resident_type == 'T' or resident_type == 'G':
        weighted_total += 4
    return weighted_total

def calculate_check_alphabet(resident_type, mod_11):
    if resident_type == 'S' or resident_type == 'T':
        check_alphabet = 'J' if mod_11 == 0 else 'Z' if mod_11 == 1 else 'I' if mod_11 == 2 else 'H' if mod_11 == 3 else 'G' if mod_11 == 4 else 'F' if mod_11 == 5 else 'E' if mod_11 == 6 else 'D' if mod_11 == 7 else 'C' if mod_11 == 8 else 'B' if mod_11 == 9 else 'A'
    else:
        check_alphabet = 'X' if mod_11 == 0 else 'W' if mod_11 == 1 else 'U' if mod_11 == 2 else 'T' if mod_11 == 3 else 'R' if mod_11 == 4 else 'Q' if mod_11 == 5 else 'P' if mod_11 == 6 else 'N' if mod_11 == 7 else 'M' if mod_11 == 8 else 'L' if mod_11 == 9 else 'K'
    return check_alphabet

def main():
    resident_type = get_input()
    serial_number = generate_serial_number()

    weighted_total = calculate_weighted_total(resident_type, serial_number)
    mod_11 = weighted_total % 11
    check_alphabet = calculate_check_alphabet(resident_type, mod_11)

    print("Final Serial Number:", resident_type + ''.join(serial_number) + check_alphabet)

if __name__ == "__main__":
    main()
