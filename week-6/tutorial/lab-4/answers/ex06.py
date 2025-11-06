lists = []

while True:

    response = input("Do you want to enter a new list? (Y): ")

    if response == 'Y':

        lists.append(input('Enter a list of string values: ').split())

    else:

        break

if len(lists) == 0:

    print('You did not enter any list of string values')

else:

    if len(lists) == 1:

        newList = lists[0]

    else:

        newList = []

        longerLength = -1

        for lst in lists:

            if len(lst) > longerLength: longerLength = len(lst)

        for i in range(longerLength):

            currentString = ''

            for lst in lists:

                if i < len(lst): currentString += lst[i]

            newList.append(currentString)

    print(newList)
