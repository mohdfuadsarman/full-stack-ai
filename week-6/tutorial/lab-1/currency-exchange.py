currency_rates = {
    "SGD": {
        "USD": 0.7633587786259541,
    },
    "USD": {
        "SGD": 1.31,
    }
}

def get_input():
    amount = input("Please enter the amount to convert: ")
    try:
        amount = float(amount)
    except ValueError:
        print("Invalid amount. Please enter a numeric value.")
        return get_input()
    if amount <= 0:
        print("Amount must be greater than zero.")
        return get_input()

    original_currency = input("Please choose current currency (SGD/USD): ")
    target_currency = input("Please choose target currency (SGD/USD): ")
    if not validate_currencies(original_currency, target_currency):
        print("Invalid currency selection. Please try again.")
        return get_input()

    return original_currency, amount, target_currency

def validate_currencies(current_currency, target_currency):
    if current_currency == target_currency:
        print("Original and target currencies are the same. No conversion needed.")
        return False
    if current_currency not in currency_rates:
        print(f"Currency '{current_currency}' is not supported.")
        return False
    if target_currency not in currency_rates[current_currency]:
        print(f"Currency '{target_currency}' is not supported for conversion from '{current_currency}'.")
        return False
    return True

def convert_currency(current_currency, amount, target_currency):
    if not currency_rates.get(current_currency) or not currency_rates[current_currency].get(target_currency):
        print(f"Conversion from {current_currency} to {target_currency} is not supported.")
        return None

    converted_amount = amount * currency_rates[current_currency][target_currency]
    return round(converted_amount, 2)

def main():
    original_currency, amount, target_currency = get_input()
    converted_amount = convert_currency(original_currency, amount, target_currency)
    if converted_amount is not None:
        print(f"{amount} {original_currency} is equal to {converted_amount:.2f} {target_currency}")

if __name__ == "__main__":
    main()