command = input("Enter a command for the smart home system: ").strip()

match command:
    case 'A':
        print('Lights turned on')
    case 'B':
        print('Lights turned off')
    case 'C':
        print('Alarm has been set')
    case 'D':
        print('Alarm has been disarmed')
    case 'E':
        print('All doors are now locked')
    case 'F':
        print('All doors are now unlocked')
    case _:
        print('Invalid command.')
