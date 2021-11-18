import logging
import os
import pandas as pd
import utils
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.ensemble import VotingRegressor
from sklearn.linear_model import ElasticNet
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

logging.basicConfig(level=logging.INFO)

# setting random state
random_state = 10
analysis = 'voting_regression'

# Making voting regressor results folder
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
x_train, x_test, y_train, y_test = train_test_split(features, labels, test_size=0.3, stratify=features['CLASS'],
                                                    random_state=random_state)
x_train = x_train.drop('CLASS', axis=1)
x_test = x_test.drop('CLASS', axis=1)

r1 = RandomForestRegressor(max_depth=20, max_features='sqrt', random_state=random_state)
r2 = ElasticNet(random_state=random_state)

pipeline = Pipeline([('scale', StandardScaler()), ('predict', VotingRegressor([('rf', r1), ('en', r2)]))])
params = {
    'predict__en__alpha': [0.01, 1, 100],
    'predict__en__l1_ratio': [0, 0.5, 1]
}

# hyperparameter selection
er_final = utils.grid_search_cv(pipeline=pipeline, parameters=params, x_train=x_train, y_train=y_train,
                                analysis=analysis, scoring='neg_mean_absolute_error')

# results summary for best estimator
logging.info('Writing results summary for the best estimator')
utils.summary_best_estimator(rgr=er_final, x_test=x_test, y_test=y_test, analysis=analysis)





