def get_input():
    number = input("Enter a positive integer: ")
    while not number.isdigit() or int(number) <= 0:
        number = input("Invalid input. Please enter a positive integer: ")
    return int(number)

def display_multiplication_table(number):
    print(f"Multiplication table for {number}:")
    multiplication = []
    for i in range(1, 11):
        print(f"{number} x {i} = {number * i}")
        multiplication.append(number * i)
    return multiplication

def main():
    number = get_input()
    output = display_multiplication_table(number)
    print("Multiplication table as a list:", ", ".join(str(x) for x in output))

if __name__ == "__main__":
    main()