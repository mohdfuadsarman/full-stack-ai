formula = {
    "hypotenuse": {
        'formula': lambda a, b: (a**2 + b**2) ** 0.5,
        'required_input': ['side a', 'side b'],
    },
    "side": {
        'formula': lambda a, b: (a**2 - b**2) ** 0.5,
        'required_input': ['hypotenuse', 'side'],
    },
}

def get_input():
    value_to_calculate = input("What do you want to calculate? (hypotenuse/side): ").lower()
    if value_to_calculate not in formula:
        print("Invalid input. Please enter 'hypotenuse' or 'side'.")
        return get_input()
    inputs = []
    for input_name in formula[value_to_calculate]['required_input']:
        value = input(f"Please enter {input_name}: ")
        try:
            value = float(value)
        except ValueError:
            print("Invalid input. Please enter a numeric value.")
            return get_input()
        if value <= 0:
            print("Value must be greater than zero.")
            return get_input()
        inputs.append(value)
    return value_to_calculate, inputs

def calculate(value_to_calculate, inputs):
    return formula[value_to_calculate]['formula'](*inputs)

def main():
    value_to_calculate, inputs = get_input()
    result = calculate(value_to_calculate, inputs)
    print(f"The result is: {result:.2f}")

if __name__ == "__main__":
    main()