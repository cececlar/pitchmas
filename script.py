#The MIT License (MIT)
#Copyright (c) 2016 Jamie Brew

# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
# WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
# OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
# OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# This script takes a source material and stores each unique word in it as an entry in a python dictionary.

# Each entry in the dictionary (for word w) is a tuple of (frequency(w), subdictionary1, subdictionary2)

# subdictionary1 is a dictionary of all words that have occurred one after w
# subdictionary2 is a dictionary of all words that have occurred two after w

# Subdictionary entries have the exact same format as dictionary entries
# e.g. D['foo'][sub1]['zoo'] is a tuple of (frequency(zoo|foo),subdict1,subdict2)
# Where those subdictionaries are now dictionaries of words that follow 'zoo' GIVEN THAT 'zoo' followed 'foo'

__author__ = 'jamie brew'

import sys 
import operator
import textwrap
text = sys.argv[1]

# shorthand for indexing into the dictionary
freq = 0 #frequency
sub1 = 1 #possible next words
sub2 = 2 #possible words after next word

# The predwrite function operates on the constructed nested dictionary to come up with a list of suggestions
# for the likely next word.

# In generating its list of top suggestions, the program uses a weighted combination of
# 1. words likely to follow the most recent word you typed
# 2. words likely to follow 2 after the second most recent word
# 3. words likely to satisfy both of the above conditions (i.e., following that 2-gram sequence)
# 4. the baseline frequency of words in the source

vision = 2 # defines how many words back the program looks. in this iteration of the program, it has to be 2
weight_baseline = .01 # weight given to the list of most frequent words in the overall dictionary
weight_2 = 1 # weight given to the list of words occurring most frequently 2 after the 2nd most recent word typed
weight_1 = 3 # weight given to the list of words occurring most frequently 1 after the 1st most recent word typed
weight_21 = 4 # weight given to the list of words occurring most frequently after the conjunction of 1st and 2nd
default_wts = [.0000001,2,1,10] # this is passed to predwrite, then to weightedCombination

# prints the log in a readable way
def printSentence(log):
    toPrint = ""
    for w in log:
        toPrint = toPrint + " " + w
    print(textwrap.fill(toPrint,80))

#takes a list of dictionaries and a list of associated weights, returns a single list
def weightedCombination(dlist,wtlist):

    if len(dlist) != len(wtlist) or len(dlist) < 2:
        print("Please input two lists of equal length greater than 2")
        return

    combined = {}

    for n in range(0,len(dlist)):
        for w in dlist[n]:
            if w in combined:
                combined[w] = (combined[w][0]+dlist[n][w][0]*wtlist[n],{},{})
            else:
                combined[w] = (dlist[n][w][0]*wtlist[n],{},{})

    normalizeFreqs(combined)

    return combined

# given a dictionary, returns a list of all words in it, ranked by frequency
def ranked(D):
    cur = 0
    toReturn = []
    for w in D:
        toReturn.append([w,D[w][0]])

    ranked = sorted(toReturn, key=operator.itemgetter(1))
    return list(reversed(ranked))

# give a string of the filename, opens the file and returns a list of sentences (splitting the file at '.')
def getSentences(text):
    sentences = text.split('.')
    for s in range (0,len(sentences)):
        sentences[s] = sentences[s].lower()
        sentences[s] = sentences[s].split()
    return sentences

newSentences = getSentences(text)
# print(newSentences)

def addSentence(sentence,diction):
    # v sets the 'vision' of the function, which is how many words it looks ahead, i.e. how many levels deep it goes
    v = vision
    for word in range(0,len(sentence)):
        diction = addWord(diction,sentence,word,v)
    return diction

# Add word at position pos in sentence s to dictionary D with vision v. Returns a dictionary.
def addWord(diction,sentence,position,v):
    #extract string of word from the sentence
    word = sentence[position]
    #base case. v is 0, so we're just returning D with the frequency of s[w] incremented, not altering subdictionaries
    if v == 0:
        # increment the frequency if the word already exists
        if word in diction:
            diction[word] =(diction[word][freq]+1,diction[word][sub1],diction[word][sub2])
        # otherwise, create a new entry in D
        else:
            diction[word] =(1,{},{})
        return diction

    # if v is greater than 0, we increment the frequency and ask for subdictionaries
    elif v>0:
        if word in diction:
            newsub1 = diction[word][sub1]
            if position < len(sentence)-1:
                newsub1 = addWord(diction[word][sub1],sentence,position+1,v-1)

            newsub2 = diction[word][sub2]
            if v>1 and position < len(sentence)-2:
                newsub2 = addWord(diction[word][sub2],sentence,position+2,v-2)

            diction[word] =(diction[word][freq]+1,newsub1,newsub2)
            return diction
        else:
            diction[word] =(1,{},{})

            newsub1 = {}
            if position < len(sentence)-1:
                newsub1 = addWord(diction[word][sub1],sentence,position+1,v-1)

            newsub2 = {}
            if v>1 and position < len(sentence)-2:
                newsub2 = addWord(diction[word][sub2],sentence,position+2,v-2)


            diction[word] =(diction[word][freq]+1,newsub1,newsub2)
            return diction

# given a dictionary of keys with freqs in position [0], returns a dictionary with these frequencies rescaled to sum to 1
# calls itself on all subdictionaries
def normalizeFreqs(D):
    if not D:
        return D
    s = 0
    #take the sum of all frequencies in D
    for k in D:
        s = s + D[k][0]
    # divide each frequency by the sum
    for k in D:
        D[k] = (D[k][0]/float(s),normalizeFreqs(D[k][1]),normalizeFreqs(D[k][2]))
    return D

# prints all the info about a word in D
def printEntry(D,w):
    print(w)
    print("freq: " + str(D[w][0]))
    print("\nFIRST")
    printD(D[w][sub1],"")
    print("\nSECOND")
    printD(D[w][sub2],"")

# prints a dictionary (can also be called on subdictionaries)
def printD(D,indent):
    for x in reversed(sorted(D.items(), key=operator.itemgetter(1))):
        word = x[0]
        print(indent + word + ": " + str(D[word][0]))
        print(indent + word + '[sub1]:')
        printD(D[word][1],indent+"   ")
        print(indent + word + '[sub2]:')
        printD(D[word][2],indent+"   ")
        if indent == "":
            print('\n')

# given a filename, returns a dictionary of words with info about that filename
def makedict(text):
    # print("Making dictionary...")
    sentences = getSentences(text)
    dictionary = {}
    for s in sentences:
        dictionary = addSentence(s,dictionary)
    dictionary = normalizeFreqs(dictionary)
    return dictionary


# main writing function. takes a dictionary, an integer number of options, and a list of weights
def predwrite(D,num_opts,wtlist):
    fullLog = []
    linelog = []
    cur = 0
    baseline = D

    while 1:
        rankings = ranked(baseline)
        if len(linelog) == 0: # if nothing written, predict with no prior context, using whole-dict freqs
            rankings = rankings # do not change from the baseline
        if len(linelog) == 1:
            prev1 = linelog[0]
            if prev1 in D:
                subdict1 = D[prev1][1] #subdict of words coming 1 after the first chosen word
                rankings = ranked(weightedCombination([baseline,subdict1],[wtlist[0],wtlist[1]]))
        if len(linelog) > 1:
            prev1 = linelog[cur - 1]
            prev2 = linelog[cur - 2]
            if prev1 in D:
                subdict1 = {}
                if D[prev1][1]:
                    subdict1 = D[prev1][1]  # subdict of words coming 1 after word at [cur-1]
                rankings = ranked(weightedCombination([baseline,subdict1],[wtlist[0],wtlist[1]]))
            elif prev2 in D:
                subdict2 = {}
                if D[prev2][2]:
                    subdict2 = D[prev2][2]  # subdict of words coming 2 after word at [cur-2]
                rankings = ranked(weightedCombination([baseline,subdict2],[wtlist[0],wtlist[1]]))
            if prev1 in D and prev2 in D:
                subdict1 = {}
                if D[prev1][1]:
                    subdict1 = D[prev1][1]  # subdict of words coming 1 after word at [cur-1]
                subdict2 = {}
                if D[prev2][2]:
                    subdict2 = D[prev2][2]  # subdict of words coming 2 after word at [cur-2]
                subdict2_1 = {}
                if prev1 in D[prev2][1]:
                    subdict2_1 = D[prev2][1][prev1][1]  # subdict of words following conjunction of ([cur-2],[cur-1])
                rankings = ranked(weightedCombination([baseline, subdict1, subdict2, subdict2_1], [wtlist[0], wtlist[1], wtlist[2], wtlist[3]]))

        for n in range(0,num_opts): #print the options for the user
            print(str(rankings[n][0]))

        response = input('Choose a word from above.')
        if response.isdigit():
            response = int(response)
            if response >= 0 and response <= num_opts:
                linelog = linelog + [str(rankings[response][0])]

    print('\n')
    return

textDict = makedict(text)
predwrite(textDict,20,[.0000001,2,1,10])