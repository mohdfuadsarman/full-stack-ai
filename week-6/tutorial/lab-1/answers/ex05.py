# Using a thrid variable to swap two variables
varA = 111
varB = 888
print(varA, varB)

varTemp = varA
varA = varB
varB = varTemp
print(varA, varB)



# Using a special Python language construct/syntax

varA = 111
varB = 888
print(varA, varB)

varA, varB = varB, varA
print(varA, varB)



# Using complementary arithmetic operations, i.e., + and -, or * and /
# For integer numbers, we can also use XOR ^

varA = 111
varB = 888
print(varA, varB)

varA = varA + varB
varB = varA - varB
varA = varA - varB
print(varA, varB)
