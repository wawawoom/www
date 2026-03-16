import urllib.request # Pour recupere le HTML
import requests
from bs4 import BeautifulSoup # Pour parser le HTML
import re #chercher balise image
import shutil # pour sauvegarder image
import matplotlib.pyplot as plt
from PIL import Image
import matplotlib.patches as patches
from pyzbar.pyzbar import decode # decode qrcode
from pyzbar import pyzbar # decode qrcode
#import cv2
import matplotlib.image as mpimg
#import numpy as np
#from PIL import Image

result = decode(Image.open('qrcodewawafini.png'))

print(result)