from bs4 import BeautifulSoup as BS
import urllib

# Route numbers
soup = BS(urllib.request.urlopen("http://www.octranspo.com/routes").read())
contents = [int(x['value']) for x in soup.find(id="selectRoute").find_all('option')]
print(contents)

file = open("bus_numbers.txt","w")
for x in contents: 
    file.write(str(x)+',\n')
file.close() 

# Station numbers
soup = BS(urllib.request.urlopen("http://www.octranspo.com/go_mobile/transitway_station_numbers").read())
table = soup.find("table", {"class","alternating sortable"})

file = open("stop_numbers.txt", "w")
second = False
for item in table.findAll('td'):
    if second:
        file.write(item.string.strip()+',\n')
    second = not second
file.close()