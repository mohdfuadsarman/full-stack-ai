# calculate hypotenuse given a and b
a = float(input("Enter side a: "))
b = float(input("Enter side b: "))
h = ((a ** 2) + (b ** 2)) ** 0.5
print('Hypotenuse is: {:.2f}'.format(h))



# calculate b given hypotenuse and a
a = float(input("Enter side a: "))
h = float(input("Enter hypotenuse: "))
b = ((h ** 2) - (a ** 2)) ** 0.5
print('Side b is: {:.2f}'.format(b))



# calculate a given hypotenuse and b
b = float(input("Enter side b: "))
h = float(input("Enter hypotenuse: "))
a = ((h ** 2) - (b ** 2)) ** 0.5
print('Side a is: {:.2f}'.format(a))
