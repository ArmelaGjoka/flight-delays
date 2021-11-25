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
        month = 1
        if request_data['month'] != None:
            month = request_data['month']
        day_of_week = 1
        if request_data['day_of_week'] != None:
            day_of_week = request_data['day_of_week']
        hour_of_day = 10
        if request_data['hour_of_day'] != None:
            hour_of_day = request_data['hour_of_day']
        distance = 100.0
        if request_data['distance'] != None:
            distance = float(request_data['distance'])
        dep_delay = 0.0
        if request_data['dep_delay'] != None:
            dep_delay = float(request_data['dep_delay'])
        orig_cases_perc = 0.0
        if request_data['orig_cases_perc'] != None:
            orig_cases_perc = float(request_data['orig_cases_perc'])
        orig_cases_increase_7 = 0.0
        if request_data['orig_cases_increase_7'] != None:    
            orig_cases_increase_7 = float(request_data['orig_cases_increase_7'])
        dest_cases_perc = 0.0
        if request_data['dest_cases_perc'] != None:
            dest_cases_perc = float(request_data['dest_cases_perc'])
        dest_cases_increase_7 = 0.0
        if request_data['dest_cases_increase_7'] != None:
            dest_cases_increase_7 = float(request_data['dest_cases_increase_7'])
        airline = request_data['airline']
        return predict_function.predict(month, day_of_week, hour_of_day, distance, dep_delay, 
                                orig_cases_perc, orig_cases_increase_7, dest_cases_perc, dest_cases_increase_7,  airline)
                    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
