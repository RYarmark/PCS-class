import random
num = random.randint(1, 100)

print('Try to guess my number')
userNum = None
youWin = False
while  not  youWin :
    while userNum == None:
         try:
              userNum = int(input('Please enter a number between 1 and 100 (inclusive)'))
         except ValueError:
             print('That is not a valid entry.')
    if userNum > num:
         print ('Your guess is too high')
         userNum = None
    elif userNum < num:
         print ('Your guess it  too low')
         userNum = None
    else:
         print ('You win!!')
         youWin = True
