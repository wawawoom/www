# IMPORTS DES LIBRAIRIES NECESSAIRES AU FONCTIONNEMENT DU SCRIPT
import urllib.request # Pour recupere le HTML
import requests # to get image from the web
import shutil # to save it locally
# import sys # To manage system file (save PNG)
from bs4 import BeautifulSoup # Pour parser le HTML
from PIL import Image, ImageFont, ImageDraw, ImageEnhance
from pyzbar.pyzbar import decode

# ########################### #
# URL de l'étape
# ########################### #
step4_URL = urllib.request.urlopen("http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/")

# ########################### #
# Lecture du code source
# ########################### #
step4_HTML = step4_URL.read()
step4_HTML = step4_HTML.decode("utf8")
step4_URL.close()

# ########################### #
# EXTRACTION DU TAG HTML AYANT POUR ID = "qr-image"
# ########################### #
soup = BeautifulSoup(step4_HTML, 'html.parser')
qrCodeURL = "http://wawawoom.fr/geocaching/GC8GG1R/" + soup.find("img", {"id":"qr-image"})['src']

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

# ########################### #
# PUT MAKERS ON QR CODE
# ########################### #
qrDecoded = decode(Image.open('code.png'))
qrDecoded = qrDecoded[0].data.decode()

# ########################### #
# SEND QR VALUE TO STEP 4 PAGE
# qr: value
# submit: Submit
# ########################### #

dataPOST = {'qr': qrDecoded, 'submit': "Submit"}
postRequest = requests.post(step4_URL, data = dataPOST)

print(postRequest.text)