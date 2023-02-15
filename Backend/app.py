import os
import numpy as np
from flask import Flask, request,jsonify
from flask_cors import CORS
from PIL import Image,ImageOps
from keras.models import load_model

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def home():
   return jsonify({"message":"SatwikDiet"})

@app.route('/upload',methods=['GET', 'POST'])
def classify():
   if(request.method == 'POST'):
      bytesOFImage = request.get_data()
      with open('image.jpeg', 'wb') as out:
         out.write(bytesOFImage)
      img = Image.open("image.jpeg")
      print("Image:",img)
      model = load_model("SingleFoodItemRecog.h5",compile=False)
      class_names = open("labels.txt","r").readlines()
      data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
      size = (224,224)
      image = ImageOps.fit(img, size, Image.Resampling.LANCZOS)
      image_array = np.asarray(image)
      normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
      data[0] = normalized_image_array
      prediction = model.predict(data)
      index = np.argmax(prediction)
      class_name = class_names[index]
      print("index",index)
      print("class Name:",class_name)
             

      return jsonify(class_name.strip())