from flask import Flask, jsonify
from flask_cors import CORS
import predict_function


def create_app():
    app = Flask(__name__)
    CORS(app)
    # Other initialization goes here

    @app.route('/predict-api')
    def endpoint():
        return predict_function.predict()
    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
