temp_conversion = {
    'celsius': {
        'fahrenheit': lambda c: (c * 9/5) + 32,
        'kelvin': lambda c: c + 273.15,
        'boiling_point': 100,
        'freezing_point': 0
    },
    'fahrenheit': {
        'celsius': lambda f: (f - 32) * 5/9,
        'kelvin': lambda f: (f - 32) * 5/9 + 273.15,
        'boiling_point': 212,
        'freezing_point': 32
    },
    'kelvin': {
        'celsius': lambda k: k - 273.15,
        'fahrenheit': lambda k: (k - 273.15) * 9/5 + 32,
        'boiling_point': 373.15,
        'freezing_point': 273.15
    },
}

def get_input():
    while True:
        try:
            temp = float(input("Enter the temperature: "))
            current_unit = input("Enter the current unit (celsius, fahrenheit, kelvin): ").lower()
            if current_unit not in temp_conversion:
                raise ValueError("Invalid current unit")
            target_unit = input("Enter the target unit (celsius, fahrenheit, kelvin): ").lower()
            if target_unit not in temp_conversion[current_unit]:
                raise ValueError("Invalid target unit")
            return temp, current_unit, target_unit
        except ValueError as e:
            print(f"Error: {e}. Please try again.")

def convert_temperature(temp, current_unit, target_unit):
    if current_unit == target_unit:
        return {target_unit: temp}

    converted_temp = temp_conversion[current_unit][target_unit](temp)
    boiling_point = temp_conversion[current_unit]['boiling_point']
    freezing_point = temp_conversion[current_unit]['freezing_point']

    return {
        target_unit: converted_temp,
        'boiling_point': boiling_point,
        'freezing_point': freezing_point
    }

def main():
    temp, current_unit, target_unit = get_input()
    converted_temps = convert_temperature(temp, current_unit, target_unit)
    print(f"Converted temperatures from {temp} {current_unit} to {target_unit}: {converted_temps[target_unit]:.2f}")

    if temp > converted_temps['boiling_point']:
        print(f"The temperature is above the boiling point of {converted_temps['boiling_point']} {target_unit}.")
    elif temp < converted_temps['freezing_point']:
        print(f"The temperature is below the freezing point of {converted_temps['freezing_point']} {target_unit}.")
    else:
        print(f"The temperature is between the freezing point of {converted_temps['freezing_point']} and the boiling point of {converted_temps['boiling_point']} {target_unit}.")

if __name__ == "__main__":
    main()