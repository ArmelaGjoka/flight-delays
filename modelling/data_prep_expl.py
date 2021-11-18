import logging
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import sqlite3

logging.basicConfig(level=logging.INFO)


# plotting function
def plot_correlation_matrix(df, fontsize):
    fig, ax = plt.subplots(figsize=(15, 15))
    corr = df.corr()
    mask = np.triu(np.ones_like(corr, dtype=bool))
    corr_matrix = sns.heatmap(corr, mask=mask, vmin=-1, cbar=False, cmap="YlGnBu", annot=True, annot_kws={"size": fontsize}, ax=ax)
    fig = corr_matrix.get_figure()
    fig.savefig('./results/eda/correlation_matrix.png')


# reading data
logging.info('Loading filtered_flights data')
con = sqlite3.connect("DVA_PROJECT_DATA_new.db")
df_initial = pd.read_sql_query("SELECT * from FILTERED_FLIGHTS_FINAL", con)

df = df_initial[['MONTH', 'DAY_OF_WEEK', 'FL_DATE', 'HOUR_OF_DAY', 'MKT_UNIQUE_CARRIER', 'ORIGIN_AIRPORT_ID',
                 'DEST_AIRPORT_ID', 'DISTANCE', 'DEP_DELAY', 'CARRIER_DELAY', 'WEATHER_DELAY', 'NAS_DELAY',
                 'SECURITY_DELAY', 'LATE_AIRCRAFT_DELAY', 'ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7',
                 'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7', 'ARR_DELAY']]
logging.info('Data load completed')
print(df.head())

for col in ['ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7', 'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7']:
    df[col].fillna(0, inplace=True)

# data exploration
# Section 1: basic info about the dataset
logging.info('Number of airlines %s', len(df['MKT_UNIQUE_CARRIER'].unique()))
logging.info('Number of origin airports %s and number of destination airports %s',
             len(df['ORIGIN_AIRPORT_ID'].unique()), len(df['DEST_AIRPORT_ID'].unique()))
logging.info('Missing values \n %s', df.isna().sum())
logging.info('Number of data samples: %s', df.shape[0])

# outlier removal
lower = df['ARR_DELAY'].quantile(0.01)
upper = df['ARR_DELAY'].quantile(0.99)
filtered_df = df[(df['ARR_DELAY'] >= lower) & (df['ARR_DELAY'] <= upper)]
logging.info('Removed data points below 1 percentile (%s min) and above 99 percentile (%s min)', lower, upper)
logging.info('Removed %s rows', df.shape[0]-filtered_df.shape[0])

# plot ARR_DELAY distribution + stats
sns.displot(filtered_df, x="ARR_DELAY", bins=20)
plt.xlabel("Arrival delay (min)")
logging.info('Arrival delay mean is %s and standard deviation is %s', round(filtered_df['ARR_DELAY'].mean(),2),
             round(filtered_df['ARR_DELAY'].std(),2))

# plot ARR_DELAY vs time
filtered_df["FL_DATE"] = pd.to_datetime(filtered_df["FL_DATE"])
sns.set(font_scale=1.5)
sns.relplot(
    data=filtered_df,
    x="FL_DATE", y="ARR_DELAY",
    height=5, aspect=2,
    kind="line"
)
plt.xlabel("Date")
plt.ylabel("Arrival delay (min)")

# plot count of flights vs time
df_count = pd.DataFrame(filtered_df.groupby(["FL_DATE"]).size(), columns=["COUNT_OF_FLIGHTS"])
sns.set(font_scale=1.5)
sns.relplot(
    data=df_count,
    x="FL_DATE", y="COUNT_OF_FLIGHTS",
    height=5, aspect=2,
    kind="line"
)
plt.xlabel("Date")
plt.ylabel("Total number of flights")

# plot ARR_DELAY per hour_of_day
sns.barplot(x="HOUR_OF_DAY", y="ARR_DELAY", data=filtered_df, errwidth=0.5)

# plot ARR_DELAY per day_of_week
sns.barplot(x="DAY_OF_WEEK", y="ARR_DELAY", data=filtered_df, errwidth=0.5)

# plot delays per airline
sns.set(font_scale=1.5)
sns.relplot(
    data=filtered_df,
    x="MONTH", y="ARR_DELAY", hue="MKT_UNIQUE_CARRIER",
    height=5, aspect=2,
    kind="line"
)

# correlation matrix
logging.info('Plotting correlation matrix')
plot_correlation_matrix(filtered_df[['MONTH', 'DAY_OF_WEEK', 'HOUR_OF_DAY', 'DISTANCE', 'DEP_DELAY',
                                     'CARRIER_DELAY', 'WEATHER_DELAY', 'NAS_DELAY', 'SECURITY_DELAY',
                                     'LATE_AIRCRAFT_DELAY', 'ORIGIN_CASES_PERC', 'ORIGIN_CASES_INCREASE_7',
                                     'DEST_CASES_PERC', 'DEST_CASES_INCREASE_7', 'ARR_DELAY']], 14)

