def evaluate_triangle(angle1, angle2, angle3):
    if angle1 + angle2 + angle3 == 180:
        print('This is a valid triangle')

        if angle1 == angle2 == angle3 == angle3 == 60:
            print('This is an equilateral triangle')
        elif ((angle1 == angle2) or (angle1 == angle3) or (angle2 == angle3)):
            print('This is an isosceles triangle')
        else:
            print('This is a scalene triangle')

        if ((angle1 ==  90) or (angle2 ==  90) or (angle3 ==  90)):
            print('This is a right triangle')
        elif ((angle1 >  90) or (angle2 >  90) or (angle3 >  90)):
            print('This is an obtuse triangle')
        else:
            print('This is an acute triangle')

    else:
        print('This is an invalid triangle')

def get_input():
    while True:
        try:
            angle1, angle2, angle3 = map(int, input('Input three angles of triangle: ').split())
            if angle1 <= 0 or angle2 <= 0 or angle3 <= 0:
                raise ValueError("Angles must be positive integers")
            return angle1, angle2, angle3
        except ValueError as e:
            print(f"Error: {e}. Please enter three positive integers.")

def main():
    angle1, angle2, angle3 = get_input()
    evaluate_triangle(angle1, angle2, angle3)

if __name__ == "__main__":
    main()