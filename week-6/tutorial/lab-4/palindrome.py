def check_palindrome(s):
    for i in range(len(s) // 2):
        if s[i] != s[-(i + 1)]:
            return False
    return True

def get_input():
    s = input("Enter a string: ")
    return s.lower().strip()

def main():
    s = get_input()
    if check_palindrome(s):
        print(f"{s} is a palindrome")
    else:
        print(f"{s} is not a palindrome")

if __name__ == "__main__":
    main()