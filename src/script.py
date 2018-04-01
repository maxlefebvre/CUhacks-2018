from bs4 import BeautifulSoup as BS
import urllib

thefile = ''

soup = BS(urllib.request.urlopen("http://www.octranspo.com/routes").read())
contents = [int(x['value']) for x in soup.find(id="selectRoute").find_all('option')]
print(contents)

file = open("bus_numbers.txt","w")
for x in contents: 
    file.write(str(x)+',\n')
file.close() 