def fizbuzz(n):
    for i in range(1, n + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("{} FizzBuzz" .format(i))
        elif i % 3 == 0:
            print("{} Fizz" .format(i))
        elif i % 5 == 0:
            print("{} Buzz" .format(i))
        else:
            print(i)

def get_input():
    try:
        n = int(input("Enter a number: "))
        if n <= 0:
            raise ValueError("The number must be positive.")
        return n
    except ValueError as e:
        print(f"Invalid input: {e}")
        return get_input()

def main():
    n = get_input()
    fizbuzz(n)

if __name__ == "__main__":
    main()