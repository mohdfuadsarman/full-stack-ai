def get_input():
    triangle_base = input("Enter the base of the triangle: ")
    try:
        triangle_base = float(triangle_base)
        if triangle_base <= 0:
            print("Base must be a positive number.")
            return get_input()
        return triangle_base
    except ValueError:
        print("Invalid input. Please enter a number.")
        return get_input()

def calculate_height(base):
    # Assuming the height is half of the base for simplicity
    return (base + 1) / 2

def display_triangle(height):
    for i in range(int(height)):
        spaces = ' ' * (int(height) - i - 1)
        stars = '*' * (2 * i + 1)
        print(spaces + stars)

def main():
    base = get_input()
    height = calculate_height(base)
    print(f"Height of the triangle: {height}")
    display_triangle(height)

if __name__ == "__main__":
    main()