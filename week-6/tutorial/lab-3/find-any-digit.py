def get_input():
    number = input("Enter a number: ")
    position = input("Enter a position of digit: ")
    try:
        number = int(number)
        position = int(position)
        return number, position
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return get_input()

def get_digit_at_position(number, position):
    number_of_digit = 0
    list_of_digits = []
    while number > 0:
        number_of_digit += 1
        list_of_digits.append(number % 10)
        number //= 10

    if position >= number_of_digit or position < 0:
        return None
    else:
        return list_of_digits[number_of_digit - position]

def main():
    number, position = get_input()
    digit = get_digit_at_position(number, position)
    if digit is not None:
        print(f"The digit at position {position} in the number {number} is: {digit}")
    else:
        print(f"The number {number} does not have a digit at position {position}.")

if __name__ == "__main__":
    main()