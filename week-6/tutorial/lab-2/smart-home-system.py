valid_command = {'A', 'B', 'C', 'D', 'E', 'F'}

def get_input():
    command = input("Enter command (A/B/C/D/E/F): ")
    if command in valid_command:
        return command
    else:
        print("Invalid command. Please enter a valid command (A/B/C/D/E/F).")
        return get_input()

def process_command(command):
    match command:
        case 'A':
            print("Lights turned on")
        case 'B':
            print("Lights turned off")
        case 'C':
            print("Alarm has been set")
        case 'D':
            print("Alarm has been disarmed")
        case 'E':
            print("All doors are now locked")
        case 'F':
            print("All doors are now unlocked")
        case _:
            print("Unknown command")

def main():
    command = get_input()
    process_command(command)

if __name__ == "__main__":
    main()
