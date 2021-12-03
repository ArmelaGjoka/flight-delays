import logging
import pandas as pd
from sklearn.model_selection import GridSearchCV, ShuffleSplit
from sklearn.metrics import mean_absolute_error as mae, mean_squared_error as mse, mean_absolute_percentage_error as mape, r2_score as r2
import sqlite3

logging.basicConfig(level=logging.INFO)

# setting random state
random_state = 10
cv = ShuffleSplit(random_state=random_state)


def load_data_for_airport_id():
    con = sqlite3.connect("DVA_PROJECT_DATA_new.db")
    df_initial = pd.read_sql_query("SELECT * from FILTERED_FLIGHTS_FINAL", con)

    df = df_initial[['MONTH', 'DAY_OF_WEEK', 'HOUR_OF_DAY', 'MKT_UNIQUE_CARRIER', 'ORIGIN_AIRPORT_ID',
                     'DEST_AIRPORT_ID', 'DISTANCE', 'DEP_DELAY', 'ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7',
                     'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7', 'ARR_DELAY']]
    for col in ['ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7']:
        df[col].fillna(0, inplace=True)
    print(df.head())

    # outlier removal
    lower = df['ARR_DELAY'].quantile(0.01)
    upper = df['ARR_DELAY'].quantile(0.99)
    filtered_df = df[(df['ARR_DELAY'] >= lower) & (df['ARR_DELAY'] <= upper)]

    # add a class column
    class_target = 'ARR_DELAY'
    filtered_df['CLASS'] = [0 if x < 15 else 1 if 15 <= x < 60 else 2 for x in filtered_df['ARR_DELAY']]
    labels = filtered_df[class_target]
    features = filtered_df.drop(class_target, axis=1)
    return filtered_df, labels, features


def load_data():
    con = sqlite3.connect("DVA_PROJECT_DATA_new.db")
    df_initial = pd.read_sql_query("SELECT * from FILTERED_FLIGHTS_FINAL", con)

    df = df_initial[['MONTH', 'DAY_OF_WEEK', 'HOUR_OF_DAY', 'MKT_UNIQUE_CARRIER', 'DISTANCE', 'DEP_DELAY',
                     'ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7',
                     'ARR_DELAY']]
    for col in ['ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7']:
        df[col].fillna(0, inplace=True)
    # outlier removal
    lower = df['ARR_DELAY'].quantile(0.01)
    upper = df['ARR_DELAY'].quantile(0.99)
    filtered_df = df[(df['ARR_DELAY'] >= lower) & (df['ARR_DELAY'] <= upper)]

    # add a class column
    class_target = 'ARR_DELAY'
    filtered_df['CLASS'] = [0 if x < 15 else 1 if 15 <= x < 60 else 2 for x in filtered_df['ARR_DELAY']]
    labels = filtered_df[class_target]
    features = filtered_df.drop(class_target, axis=1)
    return filtered_df, labels, features


def grid_search_cv(pipeline, parameters, x_train, y_train, analysis, scoring='balanced_accuracy'):
    print("Starting the grid search")
    clf = GridSearchCV(estimator=pipeline, param_grid=parameters, scoring=scoring, n_jobs=4, cv=3, refit=True,
                       verbose=4, return_train_score=True)
    clf.fit(x_train, y_train)
    print("Grid search completed")
    all_clfs = pd.DataFrame(clf.cv_results_)

    all_clfs.to_csv('./results/flights/{}/all_clfs.csv'.format(analysis), index=False)
    return clf


def summary_best_estimator(rgr, x_test, y_test, analysis):
    df = pd.DataFrame(columns=['best_parameters', 'best_validation_score'], data=[[rgr.best_params_, rgr.best_score_]])
    y_pred = rgr.predict(x_test)
    df['mae'] = mae(y_test, y_pred)
    df['mse'] = mse(y_test, y_pred)
    df['mape'] = mape(y_test, y_pred)
    df['r2'] = r2(y_test, y_pred)
    df.to_csv('./results/flights/{}/results_summary.csv'.format(analysis), index=False)








