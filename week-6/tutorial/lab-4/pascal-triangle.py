def generate_pascals_triangle(n):
    triangle = []
    for i in range(n):
        row = []
        for j in range(i + 1):
            if j == 0 or j == i:
                row.append(1)
            else:
                row.append(row[j - 1] * (i - j + 1) // j)
        triangle.append(row)

    for row in triangle:
        row_str = " " * (n - len(row))
        row_str +=" ".join(map(str, row))
        print(row_str)

def get_input():
    while True:
        try:
            n = int(input("Enter the number of rows for Pascal's Triangle: "))
            if n < 0:
                raise ValueError("Number of rows must be non-negative.")
            return n
        except ValueError as e:
            print(e)
            print("Invalid input. Please enter a non-negative integer.")

def main():
    n = get_input()
    generate_pascals_triangle(n)

if __name__ == "__main__":
    main()