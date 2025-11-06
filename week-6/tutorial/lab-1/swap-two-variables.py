def swap_two_variables_third_var(varA, varB):
    # Using a thrid variable to swap two variables
    varTemp = varA
    varA = varB
    varB = varTemp
    return varA, varB

# Using a special Python language construct/syntax
def swap_two_variables_pythonic(varA, varB):
    varA, varB = varB, varA
    return varA, varB

# Using complementary arithmetic operations, i.e., + and -, or * and /
# For integer numbers, we can also use XOR ^
def swap_two_variables_arithmetic(varA, varB):
    varA = varA + varB
    varB = varA - varB
    varA = varA - varB
    return varA, varB

def get_input():
    while True:
        try:
            varA = int(input("Enter the first variable: "))
            varB = int(input("Enter the second variable: "))
            return varA, varB
        except ValueError as e:
            print(f"Error: {e}. Please try again.")

def main():
    varA, varB = get_input()

    print("Original values:", varA, varB)

    varAOut, varBOut = swap_two_variables_third_var(varA, varB)
    print("After swapping using third variable:", varAOut, varBOut)

    varAOut, varBOut = swap_two_variables_pythonic(varA, varB)
    print("After swapping using Pythonic way:", varAOut, varBOut)

    varAOut, varBOut = swap_two_variables_arithmetic(varA, varB)
    print("After swapping using arithmetic operations:", varAOut, varBOut)

if __name__ == "__main__":
    main()
