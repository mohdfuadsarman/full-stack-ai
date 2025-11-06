usd = float(input("Enter amount in USD: "))
sgd = round(usd * 1.3100, 2)
print('{} USD is equal to {} SGD'.format(usd, sgd))
print('{} USD is equal to {:.2f} SGD'.format(usd, sgd))
