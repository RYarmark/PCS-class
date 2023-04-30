import random

class Die:
    def __init__(self, sides) :
        self.sides = sides
    def roll(self):
        num = random.randint(1, self.sides)
        return num

class  SixSidedDie(Die) :
    def __init__(self):
        super().__init__(6)
  

die1 = Die(12)  
die2 = SixSidedDie()  

for i in range(1, 11):
    print (f'12 sided die, roll {i}: {die1.roll()}')

print()
for i in range(1, 11):    
    print (f'6 sided die, roll {i}: {die2.roll()}')
