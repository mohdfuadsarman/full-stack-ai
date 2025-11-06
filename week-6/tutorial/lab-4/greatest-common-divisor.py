def get_greatest_common_divisor(a, b):
    """
    Function to calculate the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
    """
    while b:
        a, b = b, a % b
    return a

def get_least_common_multiple(a, b):
    """
    Function to calculate the least common multiple (LCM) of two numbers.
    The LCM is calculated using the formula: LCM(a, b) = abs(a*b) // GCD(a, b)
    """
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // get_greatest_common_divisor(a, b)

def get_input():
    """
    Function to get two integers from the user.
    """
    while True:
        try:
            a = int(input("Enter the first number: "))
            b = int(input("Enter the second number: "))
            return a, b
        except ValueError:
            print("Invalid input. Please enter valid integers.")

def main():
    num1, num2 = get_input()
    if num1 < 0 or num2 < 0:
        print("Please enter non-negative integers.")
        return
    if num1 == 0 and num2 == 0:
        print("Both numbers are zero. GCD and LCM are undefined.")
        return
    if num1 == 0:
        print(f"GCD of {num1} and {num2} is: {num2}")
        print(f"LCM of {num1} and {num2} is: 0")
        return
    if num2 == 0:
        print(f"GCD of {num1} and {num2} is: {num1}")
        print(f"LCM of {num1} and {num2} is: 0")
        return
    if num1 == num2:
        print(f"GCD of {num1} and {num2} is: {num1}")
        print(f"LCM of {num1} and {num2} is: {num1}")
        return
    if num1 < num2:
        num1, num2 = num2, num1

    gcd = get_greatest_common_divisor(num1, num2)
    lcm = get_least_common_multiple(num1, num2)

    print(f"GCD of {num1} and {num2} is: {gcd}")
    print(f"LCM of {num1} and {num2} is: {lcm}")

if __name__ == "__main__":
    main()