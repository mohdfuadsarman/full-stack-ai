sgd = float(input("Enter amount in SGD: "))
usd = round(sgd / 1.3100, 2)
print('{} SGD is equal to {} USD'.format(sgd, usd))
print('{} SGD is equal to {:.2f} USD'.format(sgd, usd))