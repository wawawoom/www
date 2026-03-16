# IMPORTS DES LIBRAIRIES NECESSAIRES AU FONCTIONNEMENT DU SCRIPT
import urllib.request # Pour recupere le HTML
import requests # to get image from the web
import shutil # to save it locally
from bs4 import BeautifulSoup # Pour parser le HTML
from PIL import Image, ImageFont, ImageDraw, ImageEnhance # dessin
from pyzbar.pyzbar import decode # decode qr
from datetime import datetime # poru calculer le temps d'execution

startTime = datetime.now()

print('----------------------------------')

# ########################### #
# URL de l'étape
# ########################### #
step4_URL = "http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/"
step4_URL_Open = urllib.request.urlopen(step4_URL)

# ########################### #
# Lecture du code source
# ########################### #
step4_HTML = step4_URL_Open.read()
step4_HTML = step4_HTML.decode("utf8")
step4_URL_Open.close()

print('OK => RECUPERATION DU CODE HTML')


# ########################### #
# EXTRACTION DU TAG HTML AYANT POUR ID = "qr-image"
# ########################### #
soup = BeautifulSoup(step4_HTML, 'html.parser')
qrCodeURL = "http://wawawoom.fr/geocaching/GC8GG1R/" + soup.find("img", {"id":"qr-image"})['src']

print('OK => RECUPERATION DE L URL DE L IMAGE')


# ########################### #
# DOWNLOAD QR CODE IMAGE
# ########################### #

qrCodeFilename = "code.png"
request = requests.get(qrCodeURL, stream = True)

# Set decode_content value to True, otherwise the downloaded image file's size will be zero.
request.raw.decode_content = True

# Open a local file with wb ( write binary ) permission.
with open(qrCodeFilename,'wb') as f:
	shutil.copyfileobj(request.raw, f)

print('OK => DOWNLOAD DE L IMAGE')


# ########################### #
# PUT MAKERS ON QR CODE
# ########################### #

pngQrCodeImage = Image.open("code.png")

pngQrCodeImage = Image.open("code.png").convert("RGBA")

draw = ImageDraw.Draw(pngQrCodeImage)
# TOP LEFT MARKER
draw.rectangle(((12, 12), (53, 53)), fill="black")
draw.rectangle(((18, 18), (47, 47)), fill="white")
draw.rectangle(((24, 24), (41, 41)), fill="black")

# BOTTOM LEFT MARKER
draw.rectangle(((12, 168), (53, 210)), fill="black")
draw.rectangle(((18, 174), (47, 203)), fill="white")
draw.rectangle(((24, 180), (41, 198)), fill="black")

# TOP RIGHT MARKER
draw.rectangle(((168, 12), (210, 53)), fill="black")
draw.rectangle(((174, 18), (203, 47)), fill="white")
draw.rectangle(((180, 24), (198, 41)), fill="black")

# SAVE IMAGE WITH MARKERS
pngQrCodeImage.save("code.png", "PNG")

print('OK => AJOUT DES MARKERS')


# ########################### #
# PUT MAKERS ON QR CODE
# ########################### #
qrDecoded = decode(Image.open('code.png'))
qrDecoded = qrDecoded[0].data.decode()

print('OK => DECODE DU QR')

# ########################### #
# SEND QR VALUE TO STEP 4 PAGE
# qr: value
# submit: Submit
# ########################### #

dataPOST = {'qr': qrDecoded, 'submit': "Submit"}
postRequest = requests.post(step4_URL, data = dataPOST)

soupSolution = BeautifulSoup(postRequest.text, 'html.parser')
flag = soupSolution.find("span", {"class":"text-monospace"}).encode_contents().decode()

print('OK => ENVOI DE LA VALEUR DU QR CODE A LA PAGE')

print('FLAG => ' + flag);
print('----------------------------------')
print('EXECUTION DURATION')
print(str(int((datetime.now() - startTime).total_seconds()*1000)) + ' ms')
print('----------------------------------')