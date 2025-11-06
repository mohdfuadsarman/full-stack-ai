def calculate_interest(principal, annual_interest_rate, time_in_years, compound_frequency):
    future_value = principal * ((1.0 + (annual_interest_rate / 100.0) / compound_frequency) ** (time_in_years * compound_frequency))
    compound_interest = future_value - principal
    return compound_interest, future_value

def get_user_input():
    principal = float(input("Enter the principal amount: "))
    annual_interest_rate = float(input("Enter the annual interest rate (in %): "))
    time_in_years = float(input("Enter the time in years: "))
    compound_frequency = int(input("Enter the number of times interest is compounded per year: "))
    return principal, annual_interest_rate, time_in_years, compound_frequency

def main():
    print("Welcome to the Compound Interest Calculator!")
    principal, annual_interest_rate, time_in_years, compound_frequency = get_user_input()

    compound_interest, future_value = calculate_interest(principal, annual_interest_rate, time_in_years, compound_frequency)

    print(f"Compound Interest: {compound_interest:.2f}")
    print(f"Future Value: {future_value:.2f}")

if __name__ == "__main__":
    main()