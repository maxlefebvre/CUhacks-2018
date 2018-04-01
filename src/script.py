from bs4 import BeautifulSoup as BS
import urllib
import json

# Route numbers
soup = BS(urllib.request.urlopen("http://www.octranspo.com/routes").read())
contents = [int(x['value']) for x in soup.find(id="selectRoute").find_all('option')]
#print(contents)

file = open("bus_numbers.txt","w")
for x in contents: 
    file.write('{\n'
                '   "name": {\n'
                '       "value": "'+ str(x) +'"\n'
                '    }\n'
                '},\n')
file.close() 

# Get station numbers
with open('stops_input.txt') as temp_file:
  stops = [line.rstrip('\n').split(',')[1] for line in temp_file]

# Clean up list, get rid of empty strings and the table header
stops = list(filter(None, stops))
stops = stops[1:]
file = open("stop_numbers.txt","w")
for x in stops: 
    file.write('{\n'
                '   "name": {\n'
                '       "value": "'+ str(x) +'"\n'
                '    }\n'
                '},\n')
file.close()
#stops = filter(bool, stops)

#print(stops)