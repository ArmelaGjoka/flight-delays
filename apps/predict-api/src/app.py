from flask import Flask, jsonify, request
from flask_cors import CORS
import predict_function


def create_app():
    app = Flask(__name__)
    CORS(app)
    # Other initialization goes here

    @app.route('/predict-api', methods=['POST'])
    def endpoint():
        request_data = request.json['value']
        month = request_data['month']
        day_of_week = request_data['day_of_week']
        hour_of_day = request_data['hour_of_day']
        distance = request_data['distance']
        dep_delay = request_data['dep_delay']
        orig_cases_perc =  request_data['orig_cases_perc']
        orig_cases_increase_7 =  request_data['orig_cases_increase_7']
        dest_cases_perc = request_data['dest_cases_perc']
        dest_cases_increase_7 = request_data['dest_cases_increase_7']
        airline = request_data['airline']
        return predict_function.predict(month, day_of_week, hour_of_day, distance, dep_delay, 
                                orig_cases_perc, orig_cases_increase_7, dest_cases_perc, dest_cases_increase_7,  airline)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
