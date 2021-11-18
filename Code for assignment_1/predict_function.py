import pandas as pd
import joblib


def predict():
    # TO DO: get data from the predict form, below dummy data
    month = 1
    day_of_week = 3
    hour_of_day = 10
    distance = 100.0
    dep_delay = 10.0
    orig_cases_perc = 0.5
    orig_cases_increase_7 = 10.0
    dest_cases_perc = 0.5
    dest_cases_increase_7 = 10.0
    airline = 'B6'
    # call preprocessDataAndPredict and pass inputs
    prediction = preprocess_data_and_predict(month, day_of_week, hour_of_day, distance, dep_delay, orig_cases_perc,
                                             orig_cases_increase_7, dest_cases_perc, dest_cases_increase_7, airline)
    print(prediction)
    # TO DO: pass prediction to predict form in app UI
    return prediction


def preprocess_data_and_predict(month=1, day_of_week=1, hour_of_day=10, distance=100.0, dep_delay=0.0,
                                orig_cases_perc=0.0, orig_cases_increase_7=0.0, dest_cases_perc=0.0,
                                dest_cases_increase_7=0.0, airline='AA'):

    data = {'MONTH': [month], 'DAY_OF_WEEK': [day_of_week], 'HOUR_OF_DAY': [hour_of_day], 'DISTANCE': [distance],
            'DEP_DELAY': [dep_delay], 'ORIGIN_CASES_PERC': [orig_cases_perc],
            'ORIGIN_CASES_INCREASE_7': [orig_cases_increase_7], 'DEST_CASES_PERC': [dest_cases_perc],
            'DEST_CASES_INCREASE_7': [dest_cases_increase_7]}

    data_df = pd.DataFrame(data)

    for carrier in ['AA', 'AS', 'B6', 'DL', 'F9', 'G4', 'HA', 'NK', 'UA', 'WN']:
        if airline == carrier:
            data_df['MKT_UNIQUE_CARRIER_'+carrier] = 1
        else:
            data_df['MKT_UNIQUE_CARRIER_' + carrier] = 0
    # open model file
    file = open("model.pkl", "rb")

    # load trained model
    trained_model = joblib.load(file)

    # predict
    prediction = trained_model.predict(data_df)
    return prediction
