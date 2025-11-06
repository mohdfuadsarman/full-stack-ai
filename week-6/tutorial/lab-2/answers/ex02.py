angle1, angle2, angle3 = input('Input three angles of triangle: ').split()
angle1 = int(angle1)
angle2 = int(angle2)
angle3 = int(angle3)

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
