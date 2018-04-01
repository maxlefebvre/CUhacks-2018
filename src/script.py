from bs4 import BeautifulSoup as BS
import urllib

soup = BS(urllib.request.urlopen("http://www.octranspo.com/routes").read())
contents = [x['value'] for x in soup.find(id="selectRoute").find_all('option')]
print(contents)