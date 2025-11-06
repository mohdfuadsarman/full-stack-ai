def calculate_arithmetic_mean(numbers):
    """
    Calculate the arithmetic mean of a list of numbers.

    :param numbers: List of numbers
    :return: Arithmetic mean
    """
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

def calculate_geometric_mean(numbers):
    """
    Calculate the geometric mean of a list of numbers.

    :param numbers: List of numbers
    :return: Geometric mean
    """
    if not numbers:
        return 0
    product = 1
    for number in numbers:
        product *= number
    return product ** (1 / len(numbers))

def calculate_harmonic_mean(numbers):
    """
    Calculate the harmonic mean of a list of numbers.

    :param numbers: List of numbers
    :return: Harmonic mean
    """
    if not numbers:
        return 0
    reciprocal_sum = sum(1 / number for number in numbers)
    return len(numbers) / reciprocal_sum

def calculate_mean(numbers, mean_type='arithmetic'):
    """
    Calculate the mean of a list of numbers based on the specified type.

    :param numbers: List of numbers
    :param mean_type: Type of mean to calculate ('arithmetic', 'geometric', 'harmonic')
    :return: Calculated mean
    """
    if mean_type == 'arithmetic':
        return calculate_arithmetic_mean(numbers)
    elif mean_type == 'geometric':
        return calculate_geometric_mean(numbers)
    elif mean_type == 'harmonic':
        return calculate_harmonic_mean(numbers)
    else:
        raise ValueError("Invalid mean type. Choose from 'arithmetic', 'geometric', or 'harmonic'.")

def get_input_numbers():
    """
    Get a list of numbers from user input.

    :return: List of numbers
    """
    numbers = input("Enter numbers separated by spaces: ")
    return [float(num) for num in numbers.split() if num.strip().isdigit()]

def main():
    """
    Main function to execute the mean calculation.
    """
    numbers = get_input_numbers()
    mean_type = input("Enter mean type (arithmetic, geometric, harmonic, all): ").strip().lower()
    try:
        if mean_type == 'all':
            print(f"Arithmetic mean: {calculate_arithmetic_mean(numbers)}")
            print(f"Geometric mean: {calculate_geometric_mean(numbers)}")
            print(f"Harmonic mean: {calculate_harmonic_mean(numbers)}")
        else:
            result = calculate_mean(numbers, mean_type)
            print(f"The {mean_type} mean is: {result}")
    except ValueError as e:
        print(e)

if __name__ == "__main__":
    main()