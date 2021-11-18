import logging
import os
import pandas as pd
import utils
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from time import time
from sklearn.metrics import mean_absolute_error as mae, mean_squared_error as mse, r2_score as r2
from sklearn.dummy import DummyRegressor
import seaborn as sns
import joblib

logging.basicConfig(level=logging.INFO)

# setting random state
random_state = 10
analysis = 'rf_main_analysis'

# Making decision_tree results folder
path = './results/flights/{}'.format(analysis)
if not os.path.exists(path):
    logging.info('Making flights ' + analysis + ' results folder')
    os.makedirs(path)

# loading data
logging.info('Loading filtered_flights data')
data, labels, features = utils.load_data()
logging.info('Data load completed')

# encoding categorical features
features = pd.get_dummies(features, columns=['MKT_UNIQUE_CARRIER'])

# splitting data into train and test set
logging.info('Splitting data into train and test set')
x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.5, stratify=features['CLASS'],
                                                    random_state=random_state)
x_train = x_train.drop('CLASS', axis=1)
x_test = x_test.drop('CLASS', axis=1)

# fitting a baseline regressor that always predicts the mean of the training dataset
dummy_rgr = DummyRegressor()
dummy_rgr.fit(x_train, y_train)
y_train_pred = dummy_rgr.predict(x_train)
print('Baseline regressor training MAE is', mae(y_train, y_train_pred))
y_test_pred = dummy_rgr.predict(x_test)
print('Baseline regressor testing MAE is', mae(y_test, y_test_pred))

# fitting RF regressor and checking training and testing MAE
rgr = RandomForestRegressor(random_state=random_state)
print('Training started')
t1 = time()
rgr.fit(x_train, y_train)
t2 = time()
print('Training completed')
print('Training time is ', t2-t1)
y_train_pred = rgr.predict(x_train)
print('Training MAE is', mae(y_train, y_train_pred))
y_test_pred = rgr.predict(x_test)
print('Testing MAE is', mae(y_test, y_test_pred))

# feature importance
features = x_train.columns
fi = pd.DataFrame(columns=['feature', 'importance'])
fi['feature'] = features
fi['importance'] = rgr.feature_importances_
fi.sort_values(by=['importance'], ascending=False, inplace=True)
fi.to_csv(path+'/feature_importance.csv', index=False)
sns.set(font_scale = 1)
sns.barplot(y="feature", x="importance", data=fi, orient='h')

# retrain without corona features
rgr_no_covid = RandomForestRegressor(random_state=random_state)
x_train_no_covid = x_train.drop(['ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC',
                                 'DEST_CASES_INCREASE_7'], axis=1)
x_test_no_covid = x_test.drop(['ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC',
                               'DEST_CASES_INCREASE_7'], axis=1)
print('Training started')
rgr_no_covid.fit(x_train_no_covid, y_train)
print('Training completed')
y_train_pred_no_covid = rgr_no_covid.predict(x_train_no_covid)
print('Training MAE is', mae(y_train, y_train_pred_no_covid))
y_test_pred_no_covid = rgr_no_covid.predict(x_test_no_covid)
print('Testing MAE is', mae(y_test, y_test_pred_no_covid))

# grid search with oob
x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, stratify=features['CLASS'],
                                                    random_state=random_state)
x_train = x_train.drop('CLASS', axis=1)
x_test = x_test.drop('CLASS', axis=1)

results = []
for n_estimators in [10, 20, 50, 100]:
    for max_depth in [5, 10, 20]:
        for max_features in ["auto", "sqrt"]:
            print("Generating results for {} n_estimators, {} max_depth and {} max_features."
                  .format(n_estimators, max_depth, max_features))
            rgr = RandomForestRegressor(n_estimators=n_estimators, max_depth=max_depth, max_features=max_features,
                                        oob_score=True, random_state=random_state)
            rgr.fit(x_train, y_train)
            results.append([n_estimators, max_depth, max_features, rgr.oob_score_])

results = pd.DataFrame(results, columns=['n_estimators', 'max_depth', 'max_features', 'oob'])
results.to_csv('./results/flights/{}/RF_results.csv'.format(analysis), index=False)

# retrain with selected hyperparameters
rgr_final = RandomForestRegressor(max_depth=20, max_features='sqrt', random_state=random_state)
print('Training started')
rgr_final.fit(x_train, y_train)
print('Training completed')
y_train_pred = rgr_final.predict(x_train)
print('Training MAE is', mae(y_train, y_train_pred))
y_test_pred = rgr_final.predict(x_test)
print('Testing MAE is', mae(y_test, y_test_pred))
print('Testing MSE is', mse(y_test, y_test_pred))
print('Testing R2 is', r2(y_test, y_test_pred))

# Dumping the final model object to save it as pkl file
joblib.dump(rgr_final, open('model.pkl', 'wb+'))





