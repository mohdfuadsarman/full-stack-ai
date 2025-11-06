def get_input():
    number = input("Enter a number: ")
    try:
        number = int(number)
        return number
    except ValueError:
        print("Invalid input. Please enter a valid number.")
        return get_input()

def find_factors(number):
    factors = []
    for i in range(1, number + 1):
        if number % i == 0:
            factors.append(i)
    return factors

def find_prime_factors(number):
    prime_factors = []
    for i in range(2, number + 1):
        if number % i == 0:
            is_prime = True
            for j in range(2, int(i**0.5) + 1):
                if i % j == 0:
                    is_prime = False
                    break
            if is_prime:
                prime_factors.append(i)
    return prime_factors

def main():
    number = get_input()
    factors = find_factors(number)
    print(f"The factors of {number} are: {', '.join(map(str, factors))}")
    prime_factors = find_prime_factors(number)
    print(f"The prime factors of {number} are: {', '.join(map(str, prime_factors))}")

if __name__ == "__main__":
    main()