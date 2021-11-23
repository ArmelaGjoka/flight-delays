import logging
import os
import pandas as pd
import utils
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from time import time
from sklearn.metrics import mean_absolute_error as mae

logging.basicConfig(level=logging.INFO)

# setting random state
random_state = 10

# loading data
logging.info('Loading filtered_flights data')
data, labels, features = utils.load_data_for_airport_id()
logging.info('Data load completed')

# encoding categorical features
features = pd.get_dummies(features, columns=['MKT_UNIQUE_CARRIER', 'ORIGIN_AIRPORT_ID', 'DEST_AIRPORT_ID'])

# getting a subset of data for testing
logging.info('Retrieving a subset of data')
x_subset, x_rest, y_subset, y_rest = train_test_split(features, labels, test_size=0.99, stratify=features['CLASS'],
                                                      random_state=random_state)
y_subset.value_counts(bins=3)

# splitting data into train and test set
logging.info('Splitting data into train and test set')
x_train, x_test, y_train, y_test = train_test_split(x_subset, y_subset, test_size=0.3, stratify=x_subset['CLASS'],
                                                    random_state=random_state)
y_train.value_counts(bins=3)
y_test.value_counts(bins=3)
x_train = x_train.drop('CLASS', axis=1)
x_test = x_test.drop('CLASS', axis=1)

# fitting RF regressor and checking training and testing MAE
rgr = RandomForestRegressor(random_state=random_state)
print('Training started')
t1 = time()
rgr.fit(x_train, y_train)
t2 = time()
print('Training completed')
print('Training time with origin and destination airport IDs is ', t2-t1)
y_train_pred = rgr.predict(x_train)
print('Training MAE with origin and destination airport IDs is', mae(y_train, y_train_pred))
y_test_pred = rgr.predict(x_test)
print('Testing MAE with origin and destination airport IDs is', mae(y_test, y_test_pred))

# without airport id features
x_train_without_airport_id = x_train[x_train.columns[:19]]
x_test_without_airport_id = x_test[x_train.columns[:19]]
rgr = RandomForestRegressor(random_state=random_state)
print('Training started')
t3 = time()
rgr.fit(x_train_without_airport_id, y_train)
t4 = time()
print('Training completed')
print('Training time with origin and destination airport IDs is ', t4-t3)
y_train_pred = rgr.predict(x_train_without_airport_id)
print('Training MAE without origin and destination airport IDs is', mae(y_train, y_train_pred))
y_test_pred = rgr.predict(x_test_without_airport_id)
print('Testing MAE without origin and destination airport IDs is', mae(y_test, y_test_pred))

