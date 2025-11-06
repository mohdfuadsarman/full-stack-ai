import json
from flask import Response
from flask import request
import joblib
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from tensorflow.keras.models import load_model
import pandas as pd
import numpy as np



def irisClassifier():

    try:
    
        # Load the model
        model = joblib.load('../models/iris_dtree_classifier.joblib')

        # Get the input data from the request body in JSON format
        data = request.get_json()

        # Extract features from the input data into a Pandas DataFrame so that featrue names can be used
        features = pd.DataFrame([{
            'sepal_length': data['sepal_length'],
            'sepal_width': data['sepal_width'],
            'petal_length': data['petal_length'],
            'petal_width': data['petal_width']
        }])        

        # Perform classification using the loaded model
        prediction = model.predict(features)

        # Return the prediction as a JSON response
        return Response(json.dumps({'prediction': prediction[0]}), status=200, mimetype='application/json')

    except Exception as e:

        # Handle any exceptions that occur during the process
        return Response(json.dumps({'error': str(e)}), status=500, mimetype='application/json')



def preprocess_image(image_path, img_size=(64, 64)):

    img = load_img(image_path, target_size=img_size)
    img_array = img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array



def shapesClassifier():

    try:
        
        # Load the model
        model = load_model('../models/shape_classifier_cnn.keras')

        # Get the image file from the request
        image_file = request.files['image']

        # Save the image to a temporary location
        image_path = f'../temp/{image_file.filename}'
        image_file.save(image_path)

        # Preprocess the image
        image_array = preprocess_image(image_path)

        # Perform classification using the loaded model
        prediction = model.predict(image_array)
        predicted_class = np.argmax(prediction, axis=1)[0]        
        label_map = {0: 'circle', 1: 'square', 2: 'star', 3: 'triangle'}
        predicted_label = label_map[predicted_class]

        # Return the prediction as a JSON response
        return Response(json.dumps({'prediction': predicted_label}), status=200, mimetype='application/json')

    except Exception as e:

        # Handle any exceptions that occur during the process
        return Response(json.dumps({'error': str(e)}), status=500, mimetype='application/json')
